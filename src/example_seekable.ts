import * as EBML from './';
import EBMLReader from './EBMLReader';

async function main() {
  const decoder = new EBML.Decoder();
  const reader = new EBMLReader();

  let tasks = Promise.resolve(void 0);
  let metadataBuf: ArrayBuffer = new ArrayBuffer(0);
  let webM = new Blob([], {type: "video/webm"});
  let last_duration = 0;
  const cluster_ptrs: number[] = [];


  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  const rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });  

  reader.addListener("metadata", ({data})=>{
    metadataBuf = new EBML.Encoder().encode(data);
  });

  reader.addListener("duration", ({timecodeScale, duration})=>{
    last_duration = duration;
  });

  reader.addListener("cluster_ptr", (ptr)=>{
    cluster_ptrs.push(ptr);
  });

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

  if(metadataBuf.byteLength === 0){ throw new Error("cluster element not found."); }
  
  const metadataElms = new EBML.Decoder().decode(metadataBuf);
  const refinedElms = EBML.tools.putRefinedMetaData(metadataElms, cluster_ptrs, last_duration);
  const refinedMetadataBuf = new EBML.Encoder().encode(refinedElms);
  const webMBuf = await readAsArrayBuffer(webM);
  const body = webMBuf.slice(metadataBuf.byteLength);
  const refinedWebM = new Blob([refinedMetadataBuf, body], {type: webM.type});

  const raw_video = await fetchVideo(URL.createObjectURL(webM));
  put(raw_video, "media-recorder-original(not seekable)");

  const refined_video = await fetchVideo(URL.createObjectURL(refinedWebM));
  put(refined_video, "add-seekhead-and-duration(seekable)");
}


function put(elm: HTMLElement, title: string): void {
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode(title));
  document.body.appendChild(h1);
  document.body.appendChild(elm);
}

function fetchVideo(src: string): Promise<HTMLVideoElement>{
  return new Promise((resolve, reject)=>{
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.onloadeddata = ()=>{
      video.onloadeddata = <any>null;
      resolve(video);
    };
    video.onerror = (err)=>{
      video.onerror = <any>null;
      reject(err);
    };
  });
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