
# ts-ebml
ebml encoder and decoder written in TypeScript.

# Fork of node-ebml
It is a fork of https://github.com/themasch/node-ebml

# install

```
npm install ts-ebml --save
```

# example

## node

```ts
import * as ebml from 'ts-ebml';
const fs = require('fs');

const decoder = new ebml.Decoder();

fs.readFile('media/test.webm', (err, buf)=>{
  if (err){ throw err; }
  const ebmlElms = decoder.decode(buf);
  console.log(ebmlElms);
});
```

## browser

```ts
import * as ebml from 'ts-ebml';

const decoder = new ebml.Decoder();

fetch('media/test.webm')
  .then((res)=> res.arrayBuffer() )
  .then((buf)=>{
    const ebmlElms = decoder.decode(buf);
    console.log(ebmlElms);
  });
```

## get WebP frame from MediaRecorder WebM Stream

```ts
import EBML, {Decoder, Encoder, tools} from "./";

async function recorder_main() {
  const decoder = new Decoder();
  const encoder = new Encoder();
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
        WebPs.forEach((WebP)=>{
          const img = new Image();
          img.src = URL.createObjectURL(WebP);
          document.body.appendChild(img);
        })
      });

    tasks.push(task);
  };

  rec.start(100);

  await new Promise((resolve)=> setTimeout(resolve, 30 * 1000) ); // 30 sec

  rec.ondataavailable = undefined;
  rec.stream.getTracks().map((track) => { track.stop(); });
  
  await tasks.reduce((o, prm) => o.then(() => prm), Promise.resolve(void 0));
}
```

## get seekable webm from media-recoder

```ts
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
```


# license

MIT


# related works

* https://github.com/antimatter15/js-ebml
* https://github.com/themasch/node-ebml
* https://github.com/oeuillot/node-matroska
* https://github.com/Matroska-Org/libebml/
* https://chromium.googlesource.com/webm/libvpx/+/master/third_party/libwebm
* https://github.com/mozilla/gecko-dev/tree/master/dom/media/webm
* https://bitbucket.org/desmaj/libvpx.js/src/1ea3218282b6eb129061341831d23409dd539054/webm.js