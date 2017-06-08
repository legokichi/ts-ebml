#!/usr/bin/env node --harmony
import {Decoder, tools} from './';
import com = require('commander');
import fs = require('fs');
const version: string = require("../package.json").version;

com
  .version(version)
  //.option('-p, --peppers', 'Add peppers')
  //.option('-P, --pineapple', 'Add pineapple')
  //.option('-b, --bbq-sauce', 'Add bbq sauce')
  //.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .arguments('<*.webm>')
  .parse(process.argv);

const {args} = com;

if(args.length < 1){ process.exit(); }

const decoder = new Decoder();

fs.createReadStream(args[0]).on('data', (buf)=>{
  const ebmlElms = decoder.decode(buf);
  ebmlElms.forEach((elm)=>{
    const {name, type, tagStart} = elm;
    if(elm.type === "m"){
      if(!elm.isEnd){
        console.log(`${tagStart}\t${type}\t${name}`);
      }
    }else{
      if(elm.type === "b"){
        if(elm.name === "SimpleBlock"){
          const {discardable, frames, invisible, keyframe, timecode, trackNumber} = tools.ebmlBlock(elm.value);
          console.log(`${tagStart}\t${type}\t${name}`, `track:${trackNumber} timecode:${timecode}\tkeyframe:${keyframe}\tinvisible:${invisible}\tdiscardable:${discardable}\tlacying:${frames.length}`);
        }else{
          console.log(`${tagStart}\t${type}\t${name}`, `<Buffer ${elm.value.byteLength}>`);
        }
      }else if(elm.type === "d"){
        console.log(`${tagStart}\t${type}\t${name}`, tools.convertEBMLDateToJSDate(elm.value));
      }else{
        console.log(`${tagStart}\t${type}\t${name}`, elm.value);
      }
    }
  });
});