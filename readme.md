
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

const decoder = new Decoder();
const encoder = new Encoder();

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


# license

MIT


# related works

* https://github.com/antimatter15/js-ebml
* https://github.com/themasch/node-ebml
* https://github.com/oeuillot/node-matroska
* https://github.com/Matroska-Org/libebml/
* https://chromium.googlesource.com/webm/libvpx/+/master/third_party/libwebm
* https://github.com/mozilla/gecko-dev/tree/master/dom/media/webm
