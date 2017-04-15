import EBML, {Decoder, Encoder} from "./";
import {tools} from "./";
import EBMLReader, {CueInfo} from './EBMLReader';

const Buffer: typeof global.Buffer = require("buffer/").Buffer;
const QUnit     = <QUnit>require('qunitjs');
const empower   = <Function>require('empower');
const formatter = <Function>require('power-assert-formatter');
const qunitTap  = <Function>require("qunit-tap");

QUnit.config.autostart = true;
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function() { console.log.apply(console, arguments); }, {showSourceOnFailure: false});

const WEBM_FILE_LIST = [
  "./chrome57.webm",
  "./firefox55nightly.webm",
];

QUnit.module("ts-EBML");

WEBM_FILE_LIST.forEach((file)=>{
  QUnit.test("encoder-decoder"+file, encoder_decoder_test(file));
});

function encoder_decoder_test(file: string){
  return async (assert: Assert)=>{
    const decoder = new Decoder();
    const encoder = new Encoder();
    const res = await fetch(file);
    const buf = await res.arrayBuffer();
    const elms = new Decoder().decode(buf);
    const buf2 = new Encoder().encode(elms);
    const elms2 = new Decoder().decode(buf2);
    assert.ok(buf.byteLength !== buf2.byteLength, "This problem is caused by JS being unable to handle Int64.");
    assert.ok(elms.length === elms2.length);
    for(let i=0; i<elms.length; i++){
      const elm = elms[i];
      const elm2 = elms2[i];
      assert.ok(elm.name === elm2.name);
      assert.ok(elm.type === elm2.type);
      if(elm.type === "m" || elm2.type === "m"){ return; }
      if(elm.type === "b" && elm2.type === "b"){
        assert.ok(elm.value.length === elm2.value.length);
        return;
      }
      assert.ok(elm.value === elm2.value);
      await sleep(1);
    }
  };
}

QUnit.test("handwrite-encoder", async (assert: Assert)=>{
  const tagStream: EBML.EBMLElementValue[] = [
    {name: "EBML", type: "m", isEnd: false},
      {name: "EBMLVersion", type: "u", value: 1},
      {name: "EBMLReadVersion", type: "u", value: 1},
      {name: "EBMLMaxIDLength", type: "u", value: 4},
      {name: "EBMLMaxSizeLength", type: "u", value: 8},
      {name: "DocType", type: "s", value: "webm"},
      {name: "DocTypeVersion", type: "u", value: 4},
      {name: "DocTypeReadVersion", type: "u", value: 2},
    {name: "EBML", type: "m", isEnd: true},
    {name: "Segment", type: "m", unknownSize: true, isEnd: false},
      {name: "SeekHead", type: "m", isEnd: false},
      {name: "SeekHead", type: "m", isEnd: true},
      {name: "Info", type: "m", isEnd: false},
        {name: "TimecodeScale", type: "u", value: 1000000},
      {name: "Info", type: "m", isEnd: true},
      {name: "Cluster", type: "m", unknownSize: true, isEnd: false},
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
    if(elm.type === "b" && origin.type === "b"){
      assert.ok(elm.value.length === origin.value.length, "compare tag value");
      return;
    }
    assert.ok(elm.value === origin.value, "compare tag value");
  });
});


QUnit.module("EBMLReader");

WEBM_FILE_LIST.forEach((file)=>{
  QUnit.test("convert_to_seekable_from_media_recorder_webm"+file, convert_to_seekable_test(file));
});

function convert_to_seekable_test(file: string){
  return async (assert: Assert)=>{
    const decoder = new Decoder();
    const reader = new EBMLReader();
    reader.logging = true;

    let metadataElms: EBML.EBMLElementDetail[] = [];
    let metadataSize = 0;
    let last_duration = 0;
    const cluster_ptrs: number[] = [];

    reader.addListener("metadata", ({data, metadataSize: size})=>{
      assert.ok(data.length > 0, "metadata.length:"+data.length);
      assert.ok(data[0].name === "EBML");

      metadataElms = data;
      metadataSize = size;
    });

    reader.addListener("duration", ({timecodeScale, duration})=>{
      const d = duration * timecodeScale / 1000 / 1000 / 1000;
      assert.ok(Number.isFinite(d), "duration:"+d);

      last_duration = duration;
    });

    reader.addListener("cluster_ptr", (ptr)=>{
      cluster_ptrs.push(ptr);
    });
    
    const res = await fetch(file);
    const webm_buf = await res.arrayBuffer();

    console.info("put unseekable original ebml tree");
    const elms = decoder.decode(webm_buf);
    elms.forEach((elm)=>{ reader.read(elm); });
    reader.stop();

    console.info("convert to seekable file");

    const refinedMetadataElms = tools.putRefinedMetaData(metadataElms, cluster_ptrs, last_duration);
    const refinedMetadataBuf = new Encoder().encode(refinedMetadataElms);
    const body = webm_buf.slice(metadataSize);

    assert.ok(webm_buf.byteLength === (metadataSize + body.byteLength));

    console.info("check duration");

    const raw_webM = new Blob([webm_buf], {type: "video/webm"});
    const refinedWebM = new Blob([refinedMetadataBuf, body], {type: "video/webm"});

    assert.ok(refinedMetadataBuf.byteLength - metadataSize > 0);

    try{
      const raw_video = await fetchVideo(URL.createObjectURL(raw_webM));
      const refined_video = await fetchVideo(URL.createObjectURL(refinedWebM));

      assert.ok(! Number.isFinite(raw_video.duration), "media recorder webm duration is not finite");
      assert.ok(  Number.isFinite(refined_video.duration), "refined webm duration is finite");
    }catch(err){
      assert.notOk(err);
    }


    console.info("put seekable ebml tree");
    const refinedBuf = await readAsArrayBuffer(refinedWebM);
    const refinedElms = new Decoder().decode(refinedBuf);
    const _reader = new EBMLReader();
    _reader.logging = true;
    refinedElms.forEach((elm)=> _reader.read(elm) );
    _reader.stop();

  };
}


WEBM_FILE_LIST.forEach((file)=>{
  QUnit.test("create_webp"+file, create_webp_test(file));
});

function create_webp_test(file: string){
  return async (assert: Assert)=>{
    const reader = new EBMLReader();
    const decoder = new Decoder();
    reader.use_webp = true;

    const res = await fetch(file);
    const webm_buf = await res.arrayBuffer();

    reader.addListener("cluster", (ev)=>{
      // cluster chunk test
      const {data, timecode} = ev;
      assert.ok(Number.isFinite(timecode), "cluster.timecode:"+timecode);
      assert.ok(data.length > 0, "cluster.length:"+data.length);
      const assertion = data.every((elm)=> elm.name === "Cluster" || elm.name === "Timecode" || elm.name === "SimpleBlock");
      assert.ok(assertion, "element check");
    });

    let tasks = Promise.resolve(void 0);

    reader.addListener("webp", (ev)=>{
      const task = async ()=>{
        const {webp, currentTime} = ev;
        assert.ok(Number.isFinite(currentTime), "webp.currentTime:"+currentTime);
        const src = URL.createObjectURL(webp);
        try{
          const img = await fetchImage(src);
          assert.ok(img.width > 0, "webp.width:"+img.width);
        }catch(err){
          assert.notOk(err, "webp load failre");
        }
        URL.revokeObjectURL(src);
      };
      tasks = tasks.then(()=> task() );
    });

    const elms = new Decoder().decode(webm_buf);
    elms.forEach((elm)=> reader.read(elm) );
    reader.stop();
    
    await tasks;
  };
}




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

function waitEvent<E extends Event>(target: EventTarget, ev: string, err="error"): Promise<E>{
  return new Promise((resolve, reject)=>{
    target.addEventListener(ev, succ);
    target.addEventListener(err, fail);
    function succ(ev){ clean(); resolve(ev); }
    function fail(ev){ clean(); reject(ev); }
    function clean(){
      target.removeEventListener(ev, succ);
      target.removeEventListener(err, fail);
    }
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



