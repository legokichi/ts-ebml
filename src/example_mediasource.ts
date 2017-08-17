/**
 * https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
 * MediaStream -> MediaRecorder -> MediaSource -> HTMLVideoElement
 * remove DefaultDuration demo
 */

import * as EBML from './';
import {Decoder, Encoder, Reader, tools} from './';

async function main(){
  const logging = true;
  let tasks: Promise<void> = Promise.resolve(void 0);
  
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.table(devices);
  
  const stream: MediaStream = await (
    navigator.mediaDevices.getUserMedia instanceof Function ? navigator.mediaDevices.getUserMedia({video: true, audio: true}) :
    navigator.getUserMedia instanceof Function ? new Promise<MediaStream>((resolve, reject)=> navigator.getUserMedia({video: true, audio: true}, resolve, reject)) :
    navigator["webkitGetUserMedia"] instanceof Function ? new Promise<MediaStream>((resolve, reject)=> navigator["webkitGetUserMedia"]({video: true, audio: true}, resolve, reject)) :
    Promise.reject<MediaStream>(new Error("cannot use usermedia"))
  );
  
  if(logging){
  	stream.addEventListener("active", (ev)=>{ console.log(ev.type); });
    stream.addEventListener("inactive", (ev)=>{ console.log(ev.type); });
    stream.addEventListener("addtrack", (ev)=>{ console.log(ev.type); });
    stream.addEventListener("removetrack", (ev)=>{ console.log(ev.type); });
  }
  
  const rec = new MediaRecorder(stream, {mimeType: 'video/webm; codecs="opus,vp8"'});
  if(logging){
  	rec.addEventListener("dataavailable", (ev)=>{ console.log(ev.type); });
  	rec.addEventListener("pause", (ev)=>{ console.log(ev.type); });
  	rec.addEventListener("resume", (ev)=>{ console.log(ev.type); });
  	rec.addEventListener("start", (ev)=>{ console.log(ev.type); });
    rec.addEventListener("stop", (ev)=>{ console.log(ev.type); });
    rec.addEventListener("error", (ev)=>{ console.error(ev.type, ev); });
  }
  
  const ms = new MediaSource();
  if(logging){
    ms.addEventListener('sourceopen', (ev)=>{ console.log(ev.type); });
    ms.addEventListener('sourceended', (ev)=>{ console.log(ev.type); });
    ms.addEventListener('sourceclose', (ev)=>{ console.log(ev.type); });
    ms.sourceBuffers.addEventListener('addsourcebuffer', (ev)=>{ console.log(ev.type); });
    ms.sourceBuffers.addEventListener('removesourcebuffer', (ev)=>{ console.log(ev.type); });
  }
  
  const video = document.createElement("video");
  if(logging){
    video.addEventListener('loadstart', (ev)=>{ console.log(ev.type); });
    video.addEventListener('progress', (ev)=>{ console.log(ev.type); });
    video.addEventListener('loadedmetadata', (ev)=>{ console.log(ev.type); });
    video.addEventListener('loadeddata', (ev)=>{ console.log(ev.type); });
    video.addEventListener('canplay', (ev)=>{ console.log(ev.type); });
    video.addEventListener('canplaythrough', (ev)=>{ console.log(ev.type); });
    video.addEventListener('playing', (ev)=>{ console.log(ev.type); });
    video.addEventListener('waiting', (ev)=>{ console.log(ev.type); });
    video.addEventListener('seeking', (ev)=>{ console.log(ev.type); });
    video.addEventListener('seeked', (ev)=>{ console.log(ev.type); });
    video.addEventListener('ended', (ev)=>{ console.log(ev.type); });
    video.addEventListener('emptied', (ev)=>{ console.log(ev.type); });
    video.addEventListener('stalled', (ev)=>{ console.log(ev.type); });
    video.addEventListener('timeupdate', (ev)=>{ console.log(ev.type); }); // annoying
    video.addEventListener('durationchange', (ev)=>{ console.log(ev.type); });
    video.addEventListener('ratechange', (ev)=>{ console.log(ev.type); });
    video.addEventListener('play', (ev)=>{ console.log(ev.type); });
    video.addEventListener('pause', (ev)=>{ console.log(ev.type); });
    video.addEventListener('error', (ev)=>{ console.warn(ev.type, ev); });
  }
  //video.srcObject = ms;
  video.src = URL.createObjectURL(ms);
  video.volume = 0;
  video.controls = true;
  video.autoplay = true;
  document.body.appendChild(video);
  
  await new Promise((resolve)=>{ ms.addEventListener('sourceopen', ()=> resolve(), {once: true}); });

  const sb = ms.addSourceBuffer(rec.mimeType);
  if(logging){
    sb.addEventListener('updatestart', (ev)=>{ console.log(ev.type); }); // annoying
    sb.addEventListener('update', (ev)=>{ console.log(ev.type); }); // annoying
    sb.addEventListener('updateend', (ev)=>{ console.log(ev.type); }); // annoying
    sb.addEventListener('error', (ev)=>{ console.error(ev.type, ev); });
    sb.addEventListener('abort', (ev)=>{ console.log(ev.type); });
	}

  async function stop(){
  	console.info("stopping");
  	if(sb.updating){ sb.abort(); }
    if(ms.readyState === "open"){ ms.endOfStream(); }
    rec.stop();
    stream.getTracks().map((track)=>{ track.stop(); });
    await video.pause();
    console.info("end");
  }

  let aborted = false;
  async function abort(err: any){
    if(aborted){ return; }
    console.error(err);
    await stop();
    aborted = true;
    return Promise.reject(err);
  }
  
  const button = document.createElement("button");
  button.innerHTML = "stop";
  button.addEventListener("click", ()=>{
    document.body.removeChild(button);
  	tasks = tasks.then(stop);
  }, <any>{once: true});
  document.body.appendChild(button);

  const decoder = new Decoder();
  const reader = new Reader();
  reader.drop_default_duration = true;
  reader.addListener("metadata", (ev)=>{
    tasks = tasks.then(async ()=>{
      try{
        const buf = new Encoder().encode(ev.data);
        await appendBuffer(buf);
      }catch(err){
        await abort(err);
      }
    });
  });
  reader.addListener("cluster", (ev)=>{
    tasks = tasks.then(async ()=>{
      try{
        const buf = new Encoder().encode(ev.data);
        await appendBuffer(buf);
      }catch(err){
        await abort(err);
      }
    });
  });

  rec.ondataavailable = ({data})=>{
    tasks = tasks.then(async ()=>{
      try{
        if(logging){ console.log("dataavailable", "size:", data.size); }

        if(data.size === 0){
          console.warn("empty recorder data");
          throw new Error("empty recorder data");
        }

        const buf = await readAsArrayBuffer(data);

        const elms = decoder.decode(buf);
        elms.forEach((elm)=>{ reader.read(elm); });

      }catch(err){
        await abort(err);
      }
    });
  };

  async function appendBuffer(buf: ArrayBuffer): Promise<void>{
    sb.appendBuffer(buf);

    await new Promise((resolve, reject)=>{
      sb.addEventListener('updateend', ()=> resolve(), {once: true});
      sb.addEventListener("error", (ev)=> reject(ev), {once: true});
    });

    if(logging){
      console.log("timestampOffset", sb.timestampOffset);
      console.log("appendWindowStart", sb.appendWindowStart);
      console.log("appendWindowEnd", sb.appendWindowEnd);
      for(let i=0; i<sb.buffered.length; i++){
        console.log("buffered", i, sb.buffered.start(i), sb.buffered.end(i));
      }
      for(let i=0; i<video.seekable.length; i++){
        console.log("seekable", i, video.seekable.start(i), video.seekable.end(i));
      }
      console.log("webkitAudioDecodedByteCount", video["webkitAudioDecodedByteCount"]);
      console.log("webkitVideoDecodedByteCount", video["webkitVideoDecodedByteCount"]);
      console.log("webkitDecodedFrameCount", video["webkitDecodedFrameCount"]);
      console.log("webkitDroppedFrameCount", video["webkitDroppedFrameCount"]);
    }

    if (video.buffered.length > 1) {
      console.warn("MSE buffered has a gap!");
      throw new Error("MSE buffered has a gap!");
    }
  } 
  
  rec.start(1000);
  console.info("start");
}


function readAsArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = ()=>{ resolve(reader.result); };
    reader.onerror = (ev)=>{ reject(ev.error); };
  });
}

function sleep(ms: number): Promise<any>{
  return new Promise((resolve)=> setTimeout(resolve, ms) );
}

// MediaRecorder API
interface BlobEvent extends Event {
  data: Blob;
}

interface MediaRecorderEventMap {
  "dataavailable": BlobEvent;
  "pause": Event;
  "resume": Event;
  "start": Event;
  "stop": Event;
  "error": Event;
}

declare class MediaRecorder extends EventTarget {
  constructor(stream: MediaStream, opt: any);
  start(timeslice?: number): void;
  stop(): void;
  mimeType: string; 
  state: "inactive"|"recording"|"paused";
  stream: MediaStream;
  videoBitsPerSecond: number;
  audioBitsPerSecond: number;
  ondataavailable?: (ev: BlobEvent)=> void;
  onerror?: (ev: ErrorEvent)=> void;
  addEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => any, useCapture?: boolean): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  requestData(): Blob;
}


main();
