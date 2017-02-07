const Buffer: typeof global.Buffer = require("buffer/").Buffer;

import Encoder from "./EBMLEncoder";
import Decoder from "./EBMLDecoder";
import * as tools from "./tools";
import * as EBML from "./EBML";

export default class EBMLMetaDataRefiner {
  /**
   * SeekHead に記載すべき Cluster Element
   */
  private clusters: (EBML.MasterElement & EBML.ElementDetail)[];
  private segments: (EBML.MasterElement & EBML.ElementDetail)[];
  private currentTrack: {TrackNumber: number, TrackType: number, DefaultDuration: (number | null) };
  private trackTypes: number[];//{ [trackID: number]: number };
  /**
   * Number of nanoseconds (not scaled via TimecodeScale) per frame ('frame' in the Matroska sense -- one Element put into a (Simple)Block).
   */
  private trackDefaultDuration: (number | null)[];
  private timecodeScale: number;
  private clusterTimecode: number;
  /**
    * based on timecodescale
    */
  _duration: number;
  private reachFirstCluster: boolean;
  private metadata: EBML.EBMLElementDetail[];
  private clusterStartPos: number;

  constructor(){
    this.clusters = [];
    this.segments = [];
    this.currentTrack = {TrackNumber: -1, TrackType: -1, DefaultDuration: null};
    this.trackTypes = [];
    this.timecodeScale = 0;
    this.clusterTimecode = 0;
    this._duration = -1;
    this.trackDefaultDuration = [];
    this.reachFirstCluster = false;
    this.metadata = [];
    this.clusterStartPos = -1;
  }
  
  /**
   * SeekHead および Info > Duration 構成のための情報を集める
   * Cluster と KeyFrame を探す
   */
  read(elms: EBML.EBMLElementDetail[]): void {
    elms.forEach((elm)=>{
      if(!this.reachFirstCluster){
        this.metadata.push(elm);
      }
      if(elm.type === "m" && elm.name === "Segment"){
        //console.log(`Segment: `, elm.start);
        this.segments.push(elm);
        return;
      }
      if(elm.type === "m" && elm.name === "Cluster"){
        if(!this.reachFirstCluster){
          this.reachFirstCluster = true;
          this.clusterStartPos = elm.start;
          this.metadata.pop(); // Cluster を取り除く
        }
        if(!elm.isEnd){
          //console.log(`Cluster: `, elm.start);
          this.clusters.push(elm);
        }
        return;
      }
      if(elm.type === "m" && elm.name === "TrackEntry"){
        if(elm.isEnd){
          this.trackTypes[this.currentTrack.TrackNumber] = this.currentTrack.TrackType;
          this.trackDefaultDuration[this.currentTrack.TrackNumber] = this.currentTrack.DefaultDuration;
        }
        this.currentTrack = {TrackNumber: -1, TrackType: -1, DefaultDuration: null };
        return;
      }
      if(elm.type === "b" && elm.name === "SimpleBlock"){
        const {timecode, trackNumber} = tools.ebmlBlock(elm.data);
        if(this.trackTypes[trackNumber] !== 1){ return; } // trackType === 1 => video track
        //logger(new Error, "log")(`SimpleBlock: `, elm.dataStart, "keyframe:", keyframe,"(", this.clusterTimecode, "+", timecode ,")*", this.timecodeScale, "nano sec");
        this._duration = this.clusterTimecode + timecode;
        return;
      }
      if(elm.type !== "u"){ return; }
      switch(elm.name){
        case "TimecodeScale":
          this.timecodeScale = elm.value;
          return;
        case "TrackType":
          this.currentTrack.TrackType = elm.value;
          return;
        case "TrackNumber":
          this.currentTrack.TrackNumber = elm.value;
          return;
        case "DefaultDuration":
          this.currentTrack.DefaultDuration = elm.value;
          return;
        case "Timecode":
          this.clusterTimecode = elm.value;
          //logger(new Error, "info")(`Timecode: `, elm.dataStart, this.clusterTimecode);
          return;
      }
    });
  }
  /**
   * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
   * 単位 timecodeScale
   */
  private get duration(){
    const videoTrackNum = this.trackTypes.indexOf(1); // find first video track
    if(videoTrackNum < 0){ return 0; }
    const defaultDuration = this.trackDefaultDuration[videoTrackNum];
    if(typeof defaultDuration !== "number"){ return this._duration; }
    // defaultDuration は 生の nano sec
    // this._duration は timecodescale 考慮されている
    const duration_nanosec = (this._duration * this.timecodeScale) + defaultDuration;
    const duration = duration_nanosec / this.timecodeScale;
    return duration|0;
  }

  putRefinedMetaData(): { metadata: ArrayBuffer, clusterStartPos: number } {
    const clusterStartPos = this.clusterStartPos;
    const fstSgm = this.segments[0];
    if(fstSgm == null){ return {metadata: new ArrayBuffer(0), clusterStartPos}; } // まだ Segment まで読んでない
    if(!this.reachFirstCluster){ return {metadata: new ArrayBuffer(0), clusterStartPos}; } // まだ Cluster に到達していない => metadata 全部読めてない
    const lastmetadata = this.metadata[this.metadata.length-1];
    
    if(lastmetadata == null){ return {metadata: new ArrayBuffer(0), clusterStartPos}; }
    if(lastmetadata.dataEnd < 0){ throw new Error("metadata does not have size"); } // metadata が 不定サイズ
    const metadataSize = lastmetadata.dataEnd; // 書き換える前の metadata のサイズ
    const create = (sizeDiff=0)=>{
      let metadata: EBML.EBMLElementBuffer[] = this.metadata.slice(0);
      for(let i=0; i<metadata.length; i++){
        const elm = metadata[i];
        if(elm.type === "m" && elm.name === "Info" && elm.isEnd){
          const durBuf = new Buffer(4);
          durBuf.writeFloatBE(this.duration, 0);
          const durationElm: EBML.ChildElementBuffer = {name: "Duration", type: "f", data: durBuf };
          metadata.splice(i, 0, durationElm); // </Info> 前に <Duration /> を追加
          i++; // <duration /> 追加した分だけインクリメント
        }
      }
      const seekHead: EBML.EBMLElementBuffer[] = [];
      seekHead.push({name: "SeekHead", type: "m"});
      this.clusters.forEach((cluster)=>{
        seekHead.push({name: "Seek", type: "m"});
        // [0x1F, 0x43, 0xB6, 0x75] で Cluster の意
        seekHead.push({name: "SeekID", type: "b", data: new Buffer([0x1F, 0x43, 0xB6, 0x75]) });
        const posBuf = new Buffer(4); // 実際可変長 int なので 4byte 固定という実装は良くない
        // しかし ms 単位だとすれば 0xFFFFFFFF は 49 日もの時間を記述できるので実用上問題ない
        // 64bit や 可変長 int を js で扱うの面倒
        const {start} = cluster;
        const offset = start +  sizeDiff;
        posBuf.writeUInt32BE(offset, 0);
        seekHead.push({name: "SeekPosition", type: "u", data: posBuf});
        seekHead.push({name: "Seek", type: "m", isEnd: true});
      });
      seekHead.push({name: "SeekHead", type: "m", isEnd: true});
      metadata = metadata.concat(seekHead); // metadata 末尾に <SeekHead /> を追加
      return metadata;
    };
    const encorder = new Encoder();
    // 一旦 seekhead を作って自身のサイズを調べる
    const bufs = create(0).reduce<ArrayBuffer[]>((lst, elm)=> lst.concat(encorder.encode([elm])), []);
    const totalByte = bufs.reduce((o, buf)=> o + buf.byteLength, 0);
    // 自分自身のサイズを考慮した seekhead を再構成する
    //console.log("sizeDiff", totalByte - metadataSize);
    const metadata = create(totalByte - metadataSize);
    const metadataBuf = new Encoder().encode(metadata);
    return {metadata: metadataBuf, clusterStartPos};
    
  }
}


