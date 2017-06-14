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
  //.option('-P, --pineapple', 'Add pineapple')
  //.option('-b, --bbq-sauce', 'Add bbq sauce')
  //.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .arguments('<*.webm>')
  .parse(process.argv);

const {args} = com;

if(args.length < 1){ process.exit(); }

console.log(com)
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
