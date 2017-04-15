
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
import {Decoder, Encoder, tools} from "ts-ebml";
import * as EBML from "ts-ebml";

async function main() {
  const decoder = new Decoder();

	const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  const rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });

  let tasks = Promise.resolve(void 0);
  
  rec.ondataavailable = (ev: BlobEvent)=>{
    const chunk = ev.data;
    const task = async ()=>{
      const buf = await readAsArrayBuffer(chunk);
      const chunks = decoder.decode(buf);
      const WebPs = tools.WebPFrameFilter(chunks);
      WebPs.forEach((WebP)=>{
        const img = new Image();
        img.src = URL.createObjectURL(WebP);
        document.body.appendChild(img);
      });
    };
    tasks = tasks.then(()=> task() );
  };

  rec.start(100);

  await new Promise((resolve)=> setTimeout(resolve, 30 * 1000) ); // 30 sec

  rec.stop();
  rec.ondataavailable = <any>undefined;
  rec.stream.getTracks().map((track) => { track.stop(); });
  
  await tasks;
}
```

## get seekable webm from media-recoder

```ts
import EBMLReader from 'ts-ebml/lib/EBMLReader';
import {Decoder, Encoder, tools} from "ts-ebml";
import * as EBML from "ts-ebml";

const file = "media-recoder.webm";

async function main(){
  const res = await fetch(file);
  const webm_buf = await res.arrayBuffer();
  const elms = new Decoder().decode(webm_buf);
  
  let metadataElms: EBML.EBMLElementDetail[] = [];
  let metadataSize = 0;
  let last_duration = 0;
  const cluster_ptrs: number[] = [];
  const reader = new EBMLReader();
  reader.logging = true;

  reader.addListener("metadata", ({data, metadataSize: size})=>{
    metadataElms = data;
    metadataSize = size;
  });

  reader.addListener("cluster_ptr", (ptr)=>{
    cluster_ptrs.push(ptr);
  });

  reader.addListener("duration", ({timecodeScale, duration})=>{
    last_duration = duration;
  });
  
  elms.forEach((elm)=>{ reader.read(elm); });
  reader.stop();

  const refinedMetadataElms = tools.putRefinedMetaData(metadataElms, cluster_ptrs, last_duration);
  const refinedMetadataBuf = new Encoder().encode(refinedMetadataElms);
  const body = webm_buf.slice(metadataSize);

  const raw_webM = new Blob([webm_buf], {type: "video/webm"});
  const refinedWebM = new Blob([refinedMetadataBuf, body], {type: "video/webm"});

  const raw_video = await fetchVideo(URL.createObjectURL(raw_webM));
  const refined_video = await fetchVideo(URL.createObjectURL(refinedWebM));
  
  document.body.appendChild(raw_video);
  document.body.appendChild(refined_video);
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
```

# develop

```sh
npm run setup # install cli tools
npm run init  # install libraries
npm run build # build js code
npm run lint  # tslint
npm run doc   # typedoc
npm run check # type check
npm run test  # build test
npm run example # build example
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