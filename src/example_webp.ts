import * as EBML from './';
import EBMLReader from './EBMLReader';

async function main() {
  const decoder = new EBML.Decoder();
  const encoder = new EBML.Encoder();
  const reader = new EBMLReader();
  reader.use_webp = true;

  let tasks = Promise.resolve(void 0);

  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  const rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });  

  
  reader.addListener("webp", async (ev)=>{
    const {webp, currentTime} = ev;
    const src = URL.createObjectURL(webp);
    try{
      const img = await fetchImage(src);
      put(img, ""+currentTime);
    }catch(err){
      console.error(err);
    }
    URL.revokeObjectURL(src);
  });

  rec.ondataavailable = (ev: BlobEvent)=>{
    const chunk = ev.data;
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
}


function put(elm: HTMLElement, title: string): void {
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode(title));
  document.body.appendChild(h1);
  document.body.appendChild(elm);
}

function fetchImage(src: string): Promise<HTMLImageElement>{
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.src = src;
    img.onload = ()=>{ resolve(img); };
    img.onerror = (err)=>{ reject(err.error); };
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