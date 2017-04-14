import EBML, {Decoder, Encoder} from "./";
import {tools} from "./";
import EBMLReader from './EBMLReader';

const Buffer: typeof global.Buffer = require("buffer/").Buffer;
const QUnit     = <QUnit>require('qunitjs');
const empower   = <Function>require('empower');
const formatter = <Function>require('power-assert-formatter');
const qunitTap  = <Function>require("qunit-tap");

QUnit.config.autostart = true;
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function() { console.log.apply(console, arguments); }, {showSourceOnFailure: false});

QUnit.module("ts-EBML");

QUnit.test("encoder-decoder", async (assert: Assert)=>{
  const decoder = new Decoder();
  const encoder = new Encoder();
  const res = await fetch("../ok.webm");
  const buf = await res.arrayBuffer();
  const elms = new Decoder().decode(buf);
  const buf2 = new Encoder().encode(elms);
  const elms2 = new Decoder().decode(buf2);
  assert.ok(buf.byteLength === buf2.byteLength, "This problem is due to not implementing the variable int writing tools.putRefinedMetaData function");
  assert.ok(elms.length === elms2.length);
});

QUnit.test("handwrite-encoder", async (assert: Assert)=>{
  const tagStream: EBML.EBMLElementValue[] = [
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
  const binarized = tagStream.map(tools.encodeValueToBuffer);
  const buf = new Encoder().encode(binarized);
  const elms = new Decoder().decode(buf);
  elms.forEach((elm, i)=>{
    const origin = tagStream[i];
    assert.ok(elm.name === origin.name, "compare tag name");
    assert.ok(elm.type === origin.type, "compare tag type");
    if(elm.type === "m" || origin.type === "m"){ return; }
    if(elm.type === "b" || origin.type === "b"){
      assert.ok(elm.value["length"] === origin.value["length"], "compare tag value");
      return;
    }
    assert.ok(elm.value === origin.value, "compare tag value");
  });
});


QUnit.test("convert_to_seekable_from_media_recorder", async (assert: Assert)=>{
  const decoder = new Decoder();
  const reader = new EBMLReader();
  reader.logging = true;

  console.info("unseekable original")

  let tasks = Promise.resolve(void 0);
  let metadataBuf: ArrayBuffer = new ArrayBuffer(0);
  let webM = new Blob([], {type: "video/webm"});
  let last_duration = 0;
  const clusterPtrs: number[] = [];

  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  const rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });  

  reader.addListener("metadata", ({data})=>{
    metadataBuf = new Encoder().encode(data);
  });

  reader.addListener("duration", ({timecodeScale, duration})=>{
    last_duration = duration;
  });

  reader.addListener("cluster_ptr", (ptr)=>{
    clusterPtrs.push(ptr);
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
  
  const metadataElms = new Decoder().decode(metadataBuf);
  const refinedElms = tools.putRefinedMetaData(metadataElms, clusterPtrs, last_duration);
  const refinedMetadataBuf = new Encoder().encode(refinedElms);
  const webMBuf = await readAsArrayBuffer(webM);
  const body = webMBuf.slice(metadataBuf.byteLength);
  const refinedWebM = new Blob([refinedMetadataBuf, body], {type: webM.type});

  console.info("seekable webm");

  const refinedWebMBuf = await readAsArrayBuffer(refinedWebM);
  const elms = new Decoder().decode(refinedWebMBuf)
  const _reader = new EBMLReader();
  _reader.logging = true;
  elms.forEach((elm)=> _reader.read(elm) );
  _reader.stop();

  const raw_video = await fetchVideo(URL.createObjectURL(webM));
  put(raw_video, "media-recorder-original(not seekable)");

  const refined_video = await fetchVideo(URL.createObjectURL(refinedWebM));
  put(refined_video, "add-seekhead-and-duration(seekable)");

  assert.ok(! Number.isFinite(raw_video.duration), "media recorder webm duration is not finite");
  assert.ok(  Number.isFinite(refined_video.duration), "refined webm duration is finite");

});

QUnit.test("convert_to_seekable_from_moz_file", async (assert: Assert)=>{
  const res = await fetch("../ok.webm");
  const buf = await res.arrayBuffer();
  const elms = new Decoder().decode(buf);
  const reader = new EBMLReader();
  reader.logging = true;

  let metadataBuf: ArrayBuffer = new ArrayBuffer(0);
  let last_duration = 0;

  const clusterPtrs: number[] = [];

  reader.addListener("metadata", ({data})=>{
    metadataBuf = new Encoder().encode(data);
  });

  reader.addListener("duration", ({timecodeScale, duration})=>{
    last_duration = duration;
  });

  reader.addListener("cluster_ptr", (ptr)=>{
    clusterPtrs.push(ptr);
  });

  elms.forEach((elm)=> reader.read(elm) );

  reader.stop();

  const metadataElms = new Decoder().decode(metadataBuf);
  const refinedElms = tools.putRefinedMetaData(metadataElms, clusterPtrs, last_duration);
  const _reader = new EBMLReader();
  _reader.logging = true;
  refinedElms.forEach((elm)=> _reader.read(<any>elm));

  assert.ok(true);
});



QUnit.test("webp", async (assert: Assert)=> {
  const reader = new EBMLReader();
  const decoder = new Decoder();
  reader.use_webp = true;

  let tasks = Promise.resolve(void 0);
  let metadataBuf: ArrayBuffer = new ArrayBuffer(0);
  let webM = new Blob([], {type: "video/webm"});

  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  const rec = new MediaRecorder(stream, {mimeType: 'video/webm; codecs="opus,vp8"'});

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

  reader.addListener("metadata", (ev)=>{
    const {data} = ev;
    assert.ok(data.length > 0, "metadata.length:"+data.length);
    assert.ok(data[0].name === "EBML");
  });

  reader.addListener("cluster", (ev)=>{
    const {data, timecode} = ev;
    assert.ok(Number.isFinite(timecode), "cluster.timecode:"+timecode);
    assert.ok(data.length > 0, "cluster.length:"+data.length);
    const assertion = data.every((elm)=> elm.name === "Cluster" || elm.name === "Timecode" || elm.name === "SimpleBlock");
    assert.ok(assertion, "element check");
  });

  reader.addListener("duration", (ev)=>{
    const {duration, timecodeScale} = ev;
    const d = duration * timecodeScale / 1000 / 1000 / 1000;
    assert.ok(Number.isFinite(d), "duration:"+d);
  });

  reader.addListener("webp", async (ev)=>{
    const {webp, currentTime} = ev;
    assert.ok(Number.isFinite(currentTime), "webp.currentTime:"+currentTime);
    const src = URL.createObjectURL(webp);
    try{
      const img = await fetchImage(src)
      assert.ok(img.width > 0, "webp.width:"+img.width);
      put(img, "time: "+currentTime);
    }catch(err){
      assert.ok(false, "webp load failre");
    }
    URL.revokeObjectURL(src);
  });

  assert.ok(true, "wait a minute");

  rec.start(100);

  await sleep(10 * 1000);

  rec.stop();
  rec.stream.getTracks().map((track)=>{ track.stop(); });
  reader.stop();

  assert.ok(true, "stop");
});




function sleep(ms: number): Promise<any>{
  return new Promise((resolve)=> setTimeout(resolve, ms) );
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

function put(elm: HTMLElement, title: string): void {
  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode(title));
  document.body.appendChild(h1);
  document.body.appendChild(elm);
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





