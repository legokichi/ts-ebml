const Buffer: typeof global.Buffer = require("buffer/").Buffer;
const ebmlBlock: (buf: Buffer)=> EBML.SimpleBlock = require("ebml-block");

import Encoder from "./EBMLEncoder";
import * as tools from "./tools";
import * as EBML from "./EBML";

export default class EBMLMetaDataRefiner {
  /**
   * SeekHead に記載すべき Cluster Element の start
   */
  private clusters: number[];
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
  private _duration: number;
  private reachFirstCluster: boolean;
  private metadata: EBML.EBMLElementDetail[];

  constructor(){
    this.clusters = [];
    this.currentTrack = {TrackNumber: -1, TrackType: -1, DefaultDuration: null};
    this.trackTypes = [];
    this.timecodeScale = 0;
    this.clusterTimecode = 0;
    this._duration = -1;
    this.trackDefaultDuration = [];
    this.reachFirstCluster = false;
    this.metadata = [];
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
      if(elm.type === "m" && elm.name === "Cluster"){
        if(!this.reachFirstCluster){
          this.reachFirstCluster = true;
          this.metadata.pop(); // Cluster を取り除く
        }
        if(!elm.isEnd){
          //console.log(`Cluster: `, elm.start);
          this.clusters.push(elm.tagStart);
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
        const {timecode, trackNumber} = ebmlBlock(elm.data);
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
  get duration(){
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
    const clusterStartPos = this.clusters[0];
    const metadata = tools.putRefinedMetaData(
      this.metadata,
      this.clusters,
      this.duration
    );
    const metadataBuf = new Encoder().encode(metadata);
    return {metadata: metadataBuf, clusterStartPos};
    
  }
}


