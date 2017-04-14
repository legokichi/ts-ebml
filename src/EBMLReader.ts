import {EventEmitter} from "events";
import * as EBML from './EBML';
import * as tools from './tools';

export default class EBMLReader extends EventEmitter {
  private metadataloaded: boolean;

  private stack: (EBML.MasterElement & EBML.ElementDetail)[];
  private chunks: EBML.EBMLElementBufferValue[];

  private lastSimpleBlockVideoTrackTimecode: number;
  private lastClusterTimecode: number;
  private deltaDuration: number;
  private timecodeScale: number;


  private currentTrack: {TrackNumber: number, TrackType: number, DefaultDuration: (number | null) };
  private trackTypes: number[]; // equals { [trackID: number]: number };
  private trackDefaultDuration: (number | null)[];

  private _duration: number;

  private ended: boolean;
  use_webp: boolean;
  emit_duration_every_simpleblock: boolean; // heavy
  logging: boolean;

  constructor(){
    super();
    this.metadataloaded = false;
    this.chunks = [];
    
    this.stack = [];
    this.lastSimpleBlockVideoTrackTimecode = 0;
    this.lastClusterTimecode = 0;
    this.deltaDuration = 0;
    this.timecodeScale = 0;


    this.currentTrack = {TrackNumber: -1, TrackType: -1, DefaultDuration: null};
    this.trackTypes = [];
    this.trackDefaultDuration = [];

    this._duration = 0;

    this.logging = false;
    this.ended = false;
    this.emit_duration_every_simpleblock = false;
    this.use_webp = false;

  }
  stop(){
    this.ended = true;
    this.flush();
    if(this.logging){
      console.groupEnd(); // </Cluster>
      console.groupEnd(); // </Segment>
    }
  }
  private flush(){
    if(this.logging){ this.chunks.forEach(put); }
    const data = this.chunks;
    this.chunks = [];
    if(!this.metadataloaded){
      this.metadataloaded = true;
      this.emit("metadata", {data});
    }else{
      const timecode = this.lastClusterTimecode;
      const duration = this.duration;
      const timecodeScale = this.timecodeScale;
      this.emit("cluster", {timecode, data}),
      this.emit("duration", {timecodeScale, duration})
    }
  }
  read(elm: EBML.EBMLElementDetail){
    if(this.ended){ return; }
    if(elm.type === "m"){
      // 閉じタグの自動挿入
      if(elm.isEnd){
        this.stack.pop();
      }else{
        const parent = this.stack[this.stack.length-1];
        if(parent != null && parent.level >= elm.level){
          // 閉じタグなしでレベルが下がったら閉じタグを挿入
          this.stack.pop();
          parent.dataEnd = elm.dataEnd;
          parent.dataSize = elm.dataEnd - parent.dataStart;
          parent.unknownSize = false;
          this.chunks.push({name: parent.name, type: parent.type, isEnd: true});
        }
        this.stack.push(elm);
      }
    }
    if(elm.type === "b" && elm.name === "SimpleBlock"){
      const {timecode, trackNumber, frames} = tools.ebmlBlock(elm.data);
      if(this.trackTypes[trackNumber] === 1){ // trackType === 1 => video track
        // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
        // default duration がないときに使う delta
        this.deltaDuration = timecode - this.lastSimpleBlockVideoTrackTimecode;
        this.lastSimpleBlockVideoTrackTimecode = timecode;
        // デバグ処理ここまで
        this._duration = this.lastClusterTimecode + timecode;
      }
      if(this.use_webp){
        frames.forEach((frame)=>{
          const startcode = frame.slice(3, 6).toString("hex");
          if(startcode !== "9d012a"){ return; }; // VP8 の場合
          const webpBuf = tools.VP8BitStreamToRiffWebPBuffer(frame);
          const webp = new Blob([webpBuf], {type: "image/webp"});
          const currentTime = this.duration;
          this.emit("webp", {currentTime, webp});
        });
      }
      if(this.emit_duration_every_simpleblock){
        const duration = this.duration;
        const timecodeScale = this.timecodeScale;
        this.emit("duration", {timecodeScale, duration})
      }
    }else if(elm.type === "m" && elm.name === "Cluster" && !elm.isEnd){
      this.emit("cluster_ptr", elm.tagStart);
      this.flush();
    }else if(elm.type === "u" && elm.name === "Timecode"){
      this.lastClusterTimecode = elm.value;
    }else if(elm.type === "u" && elm.name === "TimecodeScale"){
      this.timecodeScale = elm.value;
    }else if(elm.type === "m" && elm.name === "TrackEntry"){
      if(elm.isEnd){
        this.trackTypes[this.currentTrack.TrackNumber] = this.currentTrack.TrackType;
        this.trackDefaultDuration[this.currentTrack.TrackNumber] = this.currentTrack.DefaultDuration;
      }
      this.currentTrack = {TrackNumber: -1, TrackType: -1, DefaultDuration: null };
    }else if(elm.type === "u" && elm.name === "TrackType"){
      this.currentTrack.TrackType = elm.value;
    }else if(elm.type === "u" && elm.name === "TrackNumber"){
      this.currentTrack.TrackNumber = elm.value;
    }else if(elm.type === "u" && elm.name === "DefaultDuration"){
      console.warn("DefaultDuration detected!, remove it");
      // this.currentTrack.DefaultDuration = elm.value;
      // media source api は DefaultDuration を計算するとバグる。
      // https://bugs.chromium.org/p/chromium/issues/detail?id=606000
      // opus,vp9
      // chrome 58 ではこれを回避するために DefaultDuration 要素を抜き取った。
      // chrome 58 以前でもこのタグを抜き取ることで回避できる
      return;
    }else if(elm.name === "unknown"){
      console.warn(elm);
    }
    this.chunks.push(elm);
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
  /** emit on every cluster element start */
  addListener(event: "cluster_ptr", listener: (ev: number )=> void): this;
  /** latest EBML > Info > TimecodeScale and EBML > Info > Duration */
  addListener(event: "duration", listener: (ev: DurationInfo )=> void): this;
  /** EBML header without Cluster Element */
  addListener(event: "metadata", listener: (ev: EBMLInfo )=> void): this;
  /** emit every Cluster Element and its children */
  addListener(event: "cluster", listener: (ev: EBMLInfo & {timecode: number })=> void): this;
  /** for thumbnail */
  addListener(event: "webp", listener: (ev: ThumbnailInfo)=> void): this;
  addListener(event: string, listener: (ev: any)=> void): this {
    return super.addListener(event, listener);
  }
}
export interface EBMLInfo {data: EBML.EBMLElementBufferValue[]}
export interface DurationInfo {duration: number; timecodeScale: number;}
export interface ThumbnailInfo {webp: Blob; currentTime: number;}


export function put(elm: EBML.EBMLElementDetail){
  if(elm.type === "m"){
    if(elm.isEnd){
      console.groupEnd();
    }else{
      console.group(elm.name+":"+elm.tagStart);
    }
  }else if(elm.type === "b"){
    //if(elm.name === "SimpleBlock"){
      //const o = EBML.tools.ebmlBlock(elm.value);
      //console.log(elm.name, elm.type, o.trackNumber, o.timecode);
    //}else{
      console.log(elm.name, elm.type);
    //}
  }else{
    console.log(elm.name, elm.tagStart, elm.type, elm.value);
  }
}


