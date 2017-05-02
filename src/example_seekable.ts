import * as EBML from './';
import {Decoder, Encoder, tools} from './';
import EBMLReader from './EBMLReader';

async function main() {
  const decoder = new Decoder();
  const reader = new EBMLReader();
  reader.logging = true;

  let tasks = Promise.resolve(void 0);
  let metadataElms: EBML.EBMLElementDetail[] = [];
  let metadataSize = 0;
  let webM = new Blob([], {type: "video/webm"});
  let last_duration = 0;
  const cluster_ptrs: number[] = [];
  const cue_points: {CueTrack: number; CueClusterPosition: number; CueTime: number; }[] = [];


  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  const rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"'});

  reader.addListener("metadata", ({data, metadataSize: size})=>{
      metadataElms = data;
      metadataSize = size;
    });

  reader.addListener("duration", ({timecodeScale, duration})=>{
    last_duration = duration;
  });

  reader.addListener("cluster_ptr", (ptr)=>{
    cluster_ptrs.push(ptr);
  });

  reader.addListener("cue_info", ({CueTrack, CueClusterPosition, CueTime}) =>{
    cue_points.push({CueTrack, CueClusterPosition, CueTime});
  })

  rec.ondataavailable = (ev: BlobEvent)=>{
    const chunk = ev.data;
    webM = new Blob([webM, chunk], {type: chunk.type});
    const task = async ()=>{
      const buf = await readAsArrayBuffer(chunk);
      const elms = decoder.decode(buf);
      elms.forEach((elm)=>{ reader.read(elm); });
    };
    tasks = tasks.then(()=> task() );
  };

  rec.start(100);

  await sleep(10 * 1000);

  rec.stop();
  rec.ondataavailable = undefined;
  rec.stream.getTracks().map((track) => { track.stop(); });
  reader.stop();

  const refinedMetadataElms = tools.putRefinedMetaData(metadataElms, cluster_ptrs, last_duration, cue_points);
  const refinedMetadataBuf = new Encoder().encode(refinedMetadataElms);
  const webMBuf = await readAsArrayBuffer(webM);
  const body = webMBuf.slice(metadataSize);
  const refinedWebM = new Blob([refinedMetadataBuf, body], {type: webM.type});
  
  const refinedBuf = await readAsArrayBuffer(refinedWebM);
  const _reader = new EBMLReader();
  _reader.logging = true;
  new Decoder().decode(refinedBuf).forEach((elm)=> _reader.read(elm) );
  _reader.stop();
  
  const raw_video = document.createElement("video");
  raw_video.src = URL.createObjectURL(webM);
  raw_video.controls = true;
  put(raw_video, "media-recorder-original(not seekable)");

  const refined_video = document.createElement("video");
  refined_video.src = URL.createObjectURL(refinedWebM);
  refined_video.controls = true;
  put(refined_video, "add-seekhead-and-duration(seekable)");
}


function put(elm: HTMLElement, title: string): void {
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode(title));
  document.body.appendChild(h1);
  document.body.appendChild(elm);
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
  addEventListener(event: "dataavailable", callback: (ev: BlobEvent)=> any);
}



main();