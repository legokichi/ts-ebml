import {EventEmitter} from "events";
import * as EBML from './EBML';
import * as tools from './tools';

/**
 * This is an informal code for reference.
 * EBMLReader is a class for getting information to enable seeking Webm recorded by MediaRecorder.
 * So please do not use for regular WebM files.
 */

export default class EBMLReader extends EventEmitter {
  private metadataloaded: boolean;

  private stack: (EBML.MasterElement & EBML.ElementDetail)[];
  private chunks: EBML.EBMLElementDetail[];

  private segmentOffset: number;
  private last2SimpleBlockVideoTrackTimecode: [number, number];
  private last2SimpleBlockAudioTrackTimecode: [number, number];
  private lastClusterTimecode: number;
  private lastClusterPosition: number;
  private firstVideoBlockRead: boolean;
  private firstAudioBlockRead: boolean;
  timecodeScale: number;
  metadataSize: number;
  metadatas: EBML.EBMLElementDetail[];

  private currentTrack: {TrackNumber: number, TrackType: number, DefaultDuration: (number | null), CodecDelay: (number | null) };
  private trackTypes: number[]; // equals { [trackID: number]: number };
  private trackDefaultDuration: (number | null)[];
  private trackCodecDelay: (number | null)[];

  private first_video_simpleblock_of_cluster_is_loaded: boolean;

  private ended: boolean;
  trackInfo: { type: "video" | "audio" | "both"; trackNumber: number; } | { type: "nothing" };
  /**
   * usefull for thumbnail creation.
   */
  use_webp: boolean;
  use_duration_every_simpleblock: boolean; // heavy
  logging: boolean;
  logGroup: string = "";
  private hasLoggingStarted: boolean = false;
  /**
   * usefull for recording chunks.
   */
  use_segment_info: boolean;
  /** see: https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22 */
  drop_default_duration: boolean;

  cues: {CueTrack: number; CueClusterPosition: number; CueTime: number; }[];

  constructor(){
    super();
    this.metadataloaded = false;
    this.chunks = [];
    
    this.stack = [];
    this.segmentOffset = 0;
    this.last2SimpleBlockVideoTrackTimecode = [0, 0];
    this.last2SimpleBlockAudioTrackTimecode = [0, 0];
    this.lastClusterTimecode = 0;
    this.lastClusterPosition = 0;
    this.timecodeScale = 1000000; // webm default TimecodeScale is 1ms
    this.metadataSize = 0;
    this.metadatas = [];
    this.cues = [];
    this.firstVideoBlockRead = false;
    this.firstAudioBlockRead = false;

    this.currentTrack = {TrackNumber: -1, TrackType: -1, DefaultDuration: null, CodecDelay: null};
    this.trackTypes = [];
    this.trackDefaultDuration = [];
    this.trackCodecDelay = [];
    this.trackInfo = { type: "nothing" };
    this.ended = false;

    this.logging = false;

    this.use_duration_every_simpleblock = false;
    this.use_webp = false;
    this.use_segment_info = true;
    this.drop_default_duration = true;
  }
  
  /**
   * emit final state.
   */
  stop() {
    this.ended = true;
    this.emit_segment_info();

    // clean up any unclosed Master Elements at the end of the stream.
    while (this.stack.length) {
      this.stack.pop();
      if (this.logging) {
        console.groupEnd();
      }
    }

    // close main group if set, logging is enabled, and has actually logged anything.
    if  (this.logging && this.hasLoggingStarted && this.logGroup) {
      console.groupEnd();
    }
  }

  /**
   * emit chunk info
   */
  private emit_segment_info(){
    const data = this.chunks;
    this.chunks = [];
    if(!this.metadataloaded){
      this.metadataloaded = true;
      this.metadatas = data;
      const videoTrackNum = this.trackTypes.indexOf(1); // find first video track
      const audioTrackNum = this.trackTypes.indexOf(2); // find first audio track
      this.trackInfo = videoTrackNum >= 0 && audioTrackNum >= 0 ? {type: "both", trackNumber: videoTrackNum }
                     : videoTrackNum >= 0 ? {type: "video", trackNumber: videoTrackNum }
                     : audioTrackNum >= 0 ? {type: "audio", trackNumber: audioTrackNum }
                     :                      {type: "nothing" };
      if(!this.use_segment_info){ return; }
      this.emit("metadata", {data, metadataSize: this.metadataSize});
    }else{
      if(!this.use_segment_info){ return; }
      const timecode = this.lastClusterTimecode;
      const duration = this.duration;
      const timecodeScale = this.timecodeScale;
      this.emit("cluster", {timecode, data});
      this.emit("duration", {timecodeScale, duration});
    }
  }
  read(elm: EBML.EBMLElementDetail){
    let drop = false;
    if(this.ended){
      // reader is finished
      return;
    }
    if(elm.type === "m"){
      // 閉じタグの自動挿入
      if(elm.isEnd){
        this.stack.pop();
      }else{
        const parent = this.stack[this.stack.length-1];
        if(parent != null && parent.level >= elm.level){
          // 閉じタグなしでレベルが下がったら閉じタグを挿入
          this.stack.pop();

          // From http://w3c.github.io/media-source/webm-byte-stream-format.html#webm-media-segments
          // This fixes logging for webm streams with Cluster of unknown length and no Cluster closing elements.
          if (this.logging){
            console.groupEnd();
          }

          parent.dataEnd = elm.dataEnd;
          parent.dataSize = elm.dataEnd - parent.dataStart;
          parent.unknownSize = false;
          const o = Object.assign({}, parent, {name: parent.name, type: parent.type, isEnd: true});
          this.chunks.push(o);
        }
        this.stack.push(elm);
      }
    }
    if(elm.type === "m" && elm.name == "Segment"){
      if(this.segmentOffset != 0) {
        console.warn("Multiple segments detected!");
      }
      this.segmentOffset = elm.dataStart;
      this.emit("segment_offset", this.segmentOffset);
    }else if(elm.type === "b" && elm.name === "SimpleBlock"){
      const {timecode, trackNumber, frames} = tools.ebmlBlock(elm.data);
      if(this.trackTypes[trackNumber] === 1){ // trackType === 1 => video track
        if(!this.firstVideoBlockRead){
          this.firstVideoBlockRead = true;
          if(this.trackInfo.type === "both" || this.trackInfo.type === "video"){
            const CueTime = this.lastClusterTimecode + timecode;
            this.cues.push({CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime});
            this.emit("cue_info", {CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: this.lastClusterTimecode});
            this.emit("cue", {CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime});
          }
        }
        this.last2SimpleBlockVideoTrackTimecode = [this.last2SimpleBlockVideoTrackTimecode[1], timecode];
      }else if(this.trackTypes[trackNumber] === 2){ // trackType === 2 => audio track
        if(!this.firstAudioBlockRead){
          this.firstAudioBlockRead = true;
          if(this.trackInfo.type === "audio"){
            const CueTime = this.lastClusterTimecode + timecode;
            this.cues.push({CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime});
            this.emit("cue_info", {CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: this.lastClusterTimecode});
            this.emit("cue", {CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime});
          }
        }
        this.last2SimpleBlockAudioTrackTimecode = [this.last2SimpleBlockAudioTrackTimecode[1], timecode];
      }
      if(this.use_duration_every_simpleblock){
        this.emit("duration", {timecodeScale: this.timecodeScale, duration: this.duration});
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
    }else if(elm.type === "m" && elm.name === "Cluster" && elm.isEnd === false){
      this.firstVideoBlockRead = false;
      this.firstAudioBlockRead = false;
      this.emit_segment_info();
      this.emit("cluster_ptr", elm.tagStart);
      this.lastClusterPosition = elm.tagStart;
    }else if(elm.type === "u" && elm.name === "Timecode"){
      this.lastClusterTimecode = elm.value;
    }else if(elm.type === "u" && elm.name === "TimecodeScale"){
      this.timecodeScale = elm.value;
    }else if(elm.type === "m" && elm.name === "TrackEntry"){
      if(elm.isEnd){
        this.trackTypes[this.currentTrack.TrackNumber] = this.currentTrack.TrackType;
        this.trackDefaultDuration[this.currentTrack.TrackNumber] = this.currentTrack.DefaultDuration;
        this.trackCodecDelay[this.currentTrack.TrackNumber] = this.currentTrack.CodecDelay;
      }else{
        this.currentTrack = {TrackNumber: -1, TrackType: -1, DefaultDuration: null, CodecDelay: null };
      }
    }else if(elm.type === "u" && elm.name === "TrackType"){
      this.currentTrack.TrackType = elm.value;
    }else if(elm.type === "u" && elm.name === "TrackNumber"){
      this.currentTrack.TrackNumber = elm.value;
    }else if(elm.type === "u" && elm.name === "CodecDelay"){
      this.currentTrack.CodecDelay = elm.value;
    }else if(elm.type === "u" && elm.name === "DefaultDuration"){
      // media source api は DefaultDuration を計算するとバグる。
      // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
      // chrome 58 ではこれを回避するために DefaultDuration 要素を抜き取った。
      // chrome 58 以前でもこのタグを抜き取ることで回避できる
      if(this.drop_default_duration){
        console.warn("DefaultDuration detected!, remove it");
        drop = true;
      }else{
        this.currentTrack.DefaultDuration = elm.value;
      }
    }else if(elm.name === "unknown"){
      console.warn(elm);
    }
    if(!this.metadataloaded && elm.dataEnd > 0){
      this.metadataSize = elm.dataEnd;
    }
    if(!drop){ this.chunks.push(elm); }
    if(this.logging){ this.put(elm); }
  }
  /**
   * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
   * 単位 timecodeScale
   * 
   * !!! if you need duration with seconds !!!
   * ```js
   * const nanosec = reader.duration * reader.timecodeScale;
   * const sec = nanosec / 1000 / 1000 / 1000;
   * ```
   */
  get duration(){
    if(this.trackInfo.type === "nothing"){
      console.warn("no video, no audio track");
      return 0;
    }
    // defaultDuration は 生の nano sec
    let defaultDuration = 0;
    // nanoseconds
    let codecDelay = 0;
    let lastTimecode = 0;

    const _defaultDuration = this.trackDefaultDuration[this.trackInfo.trackNumber];
    if(typeof _defaultDuration === "number"){
      defaultDuration = _defaultDuration;
    }else{
      // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
      // default duration がないときに使う delta
      if(this.trackInfo.type === "both"){
        if(this.last2SimpleBlockAudioTrackTimecode[1] > this.last2SimpleBlockVideoTrackTimecode[1]){
          // audio diff
          defaultDuration = (this.last2SimpleBlockAudioTrackTimecode[1] - this.last2SimpleBlockAudioTrackTimecode[0]) * this.timecodeScale;
          // audio delay
          const delay = this.trackCodecDelay[this.trackTypes.indexOf(2)]; // 2 => audio
          if(typeof delay === "number"){ codecDelay = delay; }
          // audio timecode
          lastTimecode = this.last2SimpleBlockAudioTrackTimecode[1];
        }else{
          // video diff
          defaultDuration = (this.last2SimpleBlockVideoTrackTimecode[1] - this.last2SimpleBlockVideoTrackTimecode[0]) * this.timecodeScale;
          // video delay
          const delay = this.trackCodecDelay[this.trackTypes.indexOf(1)]; // 1 => video
          if(typeof delay === "number"){ codecDelay = delay; }
          // video timecode
          lastTimecode = this.last2SimpleBlockVideoTrackTimecode[1];
        }
      }else if(this.trackInfo.type === "video"){
        defaultDuration = (this.last2SimpleBlockVideoTrackTimecode[1] - this.last2SimpleBlockVideoTrackTimecode[0]) * this.timecodeScale;
        const delay = this.trackCodecDelay[this.trackInfo.trackNumber]; // 2 => audio
        if(typeof delay === "number"){ codecDelay = delay; }
        lastTimecode = this.last2SimpleBlockVideoTrackTimecode[1];
      }else if(this.trackInfo.type === "audio"){
        defaultDuration = (this.last2SimpleBlockAudioTrackTimecode[1] - this.last2SimpleBlockAudioTrackTimecode[0]) * this.timecodeScale;
        const delay = this.trackCodecDelay[this.trackInfo.trackNumber]; // 1 => video
        if(typeof delay === "number"){ codecDelay = delay; }
        lastTimecode = this.last2SimpleBlockAudioTrackTimecode[1];
      }// else { not reached }
    }
    // convert to timecodescale
    const duration_nanosec = ((this.lastClusterTimecode + lastTimecode) * this.timecodeScale) + defaultDuration - codecDelay;
    const duration = duration_nanosec / this.timecodeScale;
    return Math.floor(duration);
  }
  /**
   * @deprecated
   * emit on every segment
   * https://www.matroska.org/technical/specs/notes.html#Position_References
  */
  addListener(event: "segment_offset", listener: (ev: number )=> void): this;
  /**
   * @deprecated
   * emit on every cluster element start.
   * Offset byte from __file start__. It is not an offset from the Segment element.
   */
  addListener(event: "cluster_ptr", listener: (ev: number )=> void): this;
  /** @deprecated
   * emit on every cue point for cluster to create seekable webm file from MediaRecorder
   * */
  addListener(event: "cue_info", listener: (ev: CueInfo )=> void): this;
  /** emit on every cue point for cluster to create seekable webm file from MediaRecorder */
  addListener(event: "cue", listener: (ev: CueInfo )=> void): this;
  /** latest EBML > Info > TimecodeScale and EBML > Info > Duration to create seekable webm file from MediaRecorder */
  addListener(event: "duration", listener: (ev: DurationInfo )=> void): this;
  /** EBML header without Cluster Element for recording metadata chunk */
  addListener(event: "metadata", listener: (ev: SegmentInfo & {metadataSize: number})=> void): this;
  /** emit every Cluster Element and its children for recording chunk */
  addListener(event: "cluster", listener: (ev: SegmentInfo & {timecode: number})=> void): this;
  /** for thumbnail */
  addListener(event: "webp", listener: (ev: ThumbnailInfo)=> void): this;
  addListener(event: string, listener: (ev: any)=> void): this {
    return super.addListener(event, listener);
  }

  put(elm: EBML.EBMLElementDetail) {
    if (!this.hasLoggingStarted) {
      this.hasLoggingStarted = true;
      if  (this.logging && this.logGroup) {
        console.groupCollapsed(this.logGroup);
      }
    }
    if(elm.type === "m"){
      if(elm.isEnd){
        console.groupEnd();
      }else{
        console.group(elm.name+":"+elm.tagStart);
      }
    }else if(elm.type === "b"){
      // for debug
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
}
/** CueClusterPosition: Offset byte from __file start__. It is not an offset from the Segment element. */
export interface CueInfo {CueTrack: number; CueClusterPosition: number; CueTime: number; };
export interface SegmentInfo {data: EBML.EBMLElementDetail[];};
export interface DurationInfo {duration: number; timecodeScale: number;};
export interface ThumbnailInfo {webp: Blob; currentTime: number;};


