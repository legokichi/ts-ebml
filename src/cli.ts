#!/usr/bin/env node
import {Decoder, tools} from './';
import EBMLReader from "./EBMLReader";
import com = require('commander');
import fs = require('fs');
const version: string = require("../package.json").version;

com
  .version(version)
  .usage("[options] <*.webm>")
  .option('-s, --seekable', 'try convert MediaRecorder WebM to seekable WebM and write buffer stdout, like `ts-ebml -s not_seekable.webm | cat > seekable.webm`')
  .option('-k, --keyframe', 'put keyframe buffers in riff subchunk stream (4 byte "VPn " + 4byte little endian coded size (+ 1 byte when odd size))')
  //.option('-b, --bbq-sauce', 'Add bbq sauce')
  //.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .arguments('<*.webm>')
  .parse(process.argv);

const {args} = com;

if(args.length < 1){ process.exit(); }

if(com.seekable){
  const decoder = new Decoder();
  const reader = new EBMLReader();
  reader.logging = false;
  reader.drop_default_duration = false;
  const buf = fs.readFileSync(args[0]);
  const elms = decoder.decode(buf);
  elms.forEach((elm)=>{ reader.read(elm); });
  reader.stop();
  const refinedMetadataBuf = tools.putRefinedMetaData(reader.metadatas, reader);
  const body = buf.slice(reader.metadataSize);
  const refined = new Buffer(tools.concat([new Buffer(refinedMetadataBuf), body]).buffer);
  process.stdout.write(refined);
}else if(com.keyframe){
  const decoder = new Decoder();
  let TrackType = -1;
  let TrackNumber = -1;
  let CodecID = "";
  const trackTypes: {[TrackNumber: number]: {TrackType: number, CodecID: string }} = {};
  fs.createReadStream(args[0]).on('data', (buf)=>{
    const ebmlElms = decoder.decode(buf);
    ebmlElms.forEach((elm)=>{
      if(elm.type === "m" && elm.name === "TrackEntry" && elm.isEnd){
        trackTypes[TrackNumber] = {TrackType, CodecID};
        TrackType = -1;
        TrackNumber = -1;
        CodecID = "";
      }else if(elm.type === "u" && elm.name === "TrackType"){
        TrackType = elm.value;
      }else if(elm.type === "u" && elm.name === "TrackNumber"){
        TrackNumber = elm.value;
      }else if(elm.type === "s" && elm.name === "CodecID"){
        CodecID = elm.value;
      }
      if(elm.type !== "b" || elm.name !== "SimpleBlock"){ return; }
      const o = tools.ebmlBlock(elm.data);
      const {TrackType:type, CodecID:id} = trackTypes[o.trackNumber];
      if(type !== 1){ return; } // 1 means video
      if(!o.keyframe){ return; }
      if(!(id === "V_VP9" || id === "V_VP8")){ return; }
      const name = id.slice(2);
      o.frames.forEach((frame)=>{
        const buf = tools.createRIFFChunk(name, frame);
        process.stdout.write(new Buffer(buf.buffer));
      });
    });
  });
}else{
  const decoder = new Decoder();
  fs.createReadStream(args[0]).on('data', (buf)=>{
    // put ebml info
    const ebmlElms = decoder.decode(buf);
    ebmlElms.forEach((elm)=>{
      const {name, type, tagStart, level} = elm;
      if(elm.type === "m"){
        if(!elm.isEnd){
          console.log(`${tagStart}\t${type}\t${level}\t${name}`);
        }
      }else{
        if(elm.type === "b"){
          if(elm.name === "SimpleBlock"){
            const {discardable, frames, invisible, keyframe, timecode, trackNumber} = tools.ebmlBlock(elm.value);
            console.log(`${tagStart}\t${type}\t${level}\t${name}`, `track:${trackNumber} timecode:${timecode}\tkeyframe:${keyframe}\tinvisible:${invisible}\tdiscardable:${discardable}\tlacying:${frames.length}`);
          }else{
            console.log(`${tagStart}\t${type}\t${level}\t${name}`, `<Buffer ${elm.value.byteLength}>`);
          }
        }else if(elm.type === "d"){
          console.log(`${tagStart}\t${type}\t${level}\t${name}`, tools.convertEBMLDateToJSDate(elm.value));
        }else{
          console.log(`${tagStart}\t${type}\t${level}\t${name}`, elm.value);
        }
      }
    });
  });
}
