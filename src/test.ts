import EBML, {Decoder, Encoder, Refiner, tools} from "./";

const Buffer: typeof global.Buffer = require("buffer/").Buffer;

const decoder = new Decoder();
const encoder = new Encoder();
const refiner = new Refiner();

async function recorder_main() {
	const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  const rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });  
  const tasks: Promise<void>[] = []; 
  let WebM = new Blob([], {type: "video/webm"});
  
  rec.ondataavailable = (ev: BlobEvent)=>{
    const chunk = ev.data;
    WebM = new Blob([WebM, chunk], {type: chunk.type});
    
    const task = readAsArrayBuffer(chunk)
      .then((buf)=>{
        const chunks = decoder.decode(buf);
        const WebPs = tools.WebPFrameFilter(chunks);
        refiner.read(chunks);
        const prms = WebPs
          .map(URL.createObjectURL)
          .map(fetchImage);
        return Promise.all(prms)
          .then((imgs)=>{
            imgs.forEach((img)=>{
              console.assert(Number.isFinite(img.width));
              document.body.appendChild(img);
            });
        });
      });
    
    tasks.push(task);
  };
  rec.start(100);

  await new Promise((resolve)=> setTimeout(resolve, 30 * 1000) );
  
  rec.stop();
  rec.ondataavailable = undefined;
  rec.stream.getTracks().map((track) => { track.stop(); });
  
  await tasks.reduce((o, prm) => o.then(() => prm), Promise.resolve(void 0));

  // insert new header
  const {metadata, clusterStartPos} = refiner.putRefinedMetaData();
  const webmBuf = await readAsArrayBuffer(WebM);
  const clustersBuf = webmBuf.slice(clusterStartPos);
  const refined = new Blob([metadata, clustersBuf], {type: "video/webm"});

  const originalVid = await putVideo(WebM, "plain recorded webm");
  const refinedVid = await putVideo(refined, "refined webm");

  console.assert(! Number.isFinite(originalVid.duration));
  console.assert(  Number.isFinite(refinedVid.duration));

  originalVid.currentTime = 1000 * 60 * 60 * 24 * 7;
  originalVid.onseeked = ()=>{
    originalVid.onseeked = <any>undefined;
    originalVid.currentTime = 0;
    console.assert(refinedVid.duration === originalVid.duration);
  }
}




function node_main() {
  const fs = require('fs');
  fs.readFile('moz.webm', function(err, data) {
    if (err) throw err;
    console.log("show", decoder.decode(data));
  });
}

async function serv_main() {
  const res = await fetch('../mediarecorder_original.webm');
  const webmBuf = await res.arrayBuffer();
  const elms = decoder.decode(webmBuf);
  refiner.read(elms);

  // insert new header
  const {metadata, clusterStartPos} = refiner.putRefinedMetaData();
  const clustersBuf = webmBuf.slice(clusterStartPos);
  const original = new Blob([webmBuf], {type: "video/webm"});
  const refined = new Blob([metadata, clustersBuf], {type: "video/webm"});

  const refinedBuf = await readAsArrayBuffer(refined);
  const redinedElms = new Decoder().decode(refinedBuf);



  const originalVid = await putVideo(original, "plain recorded webm");
  const refinedVid = await putVideo(refined, "refined webm");

  console.assert(!Number.isFinite(originalVid.duration));
  console.assert(Number.isFinite(refinedVid.duration));
}

function writer_main(){
  const tagStream: (EBML.EBMLElementValue)[] = [
    {name: "EBML", type: "m"},
    {name: "EBMLVersion", type: "u", value: 1},
    {name: "EBMLReadVersion", type: "u", value: 1},
    {name: "EBMLMaxIDLength", type: "u", value: 4},
    {name: "EBMLMaxSizeLength", type: "u", value: 8},
    {name: "DocType", type: "s", value: "webm"},
    {name: "DocTypeVersion", type: "u", value: 4},
    {name: "DocTypeReadVersion", type: "u", value: 2},
    {name: "EBML", type: "m", isEnd: true},
    {name: "Segment", type: "m", unknownSize: true},
    {name: "SeekHead", type: "m"},
    {name: "SeekHead", type: "m", isEnd: true},
    {name: "Info", type: "m"},
    {name: "TimecodeScale", type: "u", value: 1000000},
    {name: "Info", type: "m", isEnd: true},
    {name: "Cluster", type: "m", unknownSize: true},
    {name: "Timecode", type: "u", value: 1},
    {name: "SimpleBlock", type: "b", value: new Buffer(1024)},
  ];
  const binarized = tagStream.map(Encoder.encodeValueToBuffer);
  const abuf = encoder.encode(binarized);
  const elms = decoder.decode(abuf);
  elms.forEach((elm, i)=>{
    const origin = tagStream[i];
    console.assert(elm.name === origin.name);
    console.assert(elm.type === origin.type);
    if(elm.type === "m" || origin.type === "m"){ return; }
    console.assert(elm.value === origin.value);
  });
}



function byteToBit(byte: number): string{
  let bits = byte.toString(2);
  const padding = 8 - bits.length;
  for(let i=0; i<padding; i++){
    bits = "0" + bits;
  }
  return bits;
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

function putVideo(blob: Blob, title: string): Promise<HTMLVideoElement> {
  const url = URL.createObjectURL(blob);
  console.log(url);
  const video = document.createElement("video");
  video.src = url;
  video.controls = true;
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode(title));
  document.body.appendChild(h1);
  document.body.appendChild(video);
  return new Promise((resolve, reject)=>{
    video.onloadedmetadata = ()=>{ resolve(video); };
    video.onerror = (ev)=>{ reject(ev.error); };
  });
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

//console.clear();
//node_main();
//serv_main().catch(console.error);
//writer_main();
recorder_main().catch(console.error);
// tsc --target es5 test/test.ts; browserify test/test.js -o test/test.browser.js; http-server

