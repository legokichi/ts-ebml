#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const version = require("../package.json").version;
commander_1.program
    .version(version)
    .usage("[options] <*.webm>")
    .option("-s, --seekable", "try convert MediaRecorder WebM to seekable WebM and write buffer stdout, like `ts-ebml -s not_seekable.webm | cat > seekable.webm`")
    .option("-k, --keyframe", "TimestampScale & Timestamp & SimpleBlock(VideoTrack && keyframe) ebml elements pass filter for thumbnails(Random Access Points)")
    //.option('-b, --bbq-sauce', 'Add bbq sauce')
    //.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .arguments("<*.webm>")
    .parse(process.argv);
const { args } = commander_1.program;
if (args.length < 1) {
    process.exit();
}
const opts = commander_1.program.opts();
if (opts["seekable"]) {
    const decoder = new _1.Decoder();
    const reader = new _1.Reader();
    reader.logging = false;
    reader.drop_default_duration = false;
    const buf = fs_1.default.readFileSync(args[0]);
    const elms = decoder.decode(buf);
    for (const elm of elms) {
        reader.read(elm);
    }
    reader.stop();
    const refinedMetadataBuf = _1.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
    const body = buf.subarray(reader.metadataSize);
    const refined = Buffer.from(_1.tools.concat([Buffer.from(refinedMetadataBuf), body]).buffer);
    process.stdout.write(refined);
}
else if (opts["keyframe"]) {
    const decoder = new _1.Decoder();
    let TrackType = -1;
    let TrackNumber = -1;
    let CodecID = "";
    const trackTypes = {};
    fs_1.default.createReadStream(args[0]).on("data", (buf) => {
        const ebmlElms = decoder.decode(buf);
        for (const elm of ebmlElms) {
            if (elm.type === "m" && elm.name === "TrackEntry" && elm.isEnd) {
                trackTypes[TrackNumber] = { TrackType, CodecID };
                TrackType = -1;
                TrackNumber = -1;
                CodecID = "";
            }
            else if (elm.type === "u" && elm.name === "TrackType") {
                TrackType = elm.value;
            }
            else if (elm.type === "u" && elm.name === "TrackNumber") {
                TrackNumber = elm.value;
            }
            else if (elm.type === "s" && elm.name === "CodecID") {
                CodecID = elm.value;
            }
            else if (elm.type === "u" && elm.name === "TimestampScale") {
                process.stdout.write(Buffer.from(new _1.Encoder().encode([elm])));
            }
            else if (elm.type === "u" && elm.name === "Timestamp") {
                process.stdout.write(Buffer.from(new _1.Encoder().encode([elm])));
            }
            else if (elm.type === "b" && elm.name === "SimpleBlock") {
                const o = _1.tools.ebmlBlock(elm.data);
                const { TrackType: type, CodecID: id } = trackTypes[o.trackNumber];
                // type == 1 means video
                // see https://www.matroska.org/technical/elements.html
                if (type === 1 && o.keyframe && (id === "V_VP9" || id === "V_VP8")) {
                    process.stdout.write(Buffer.from(new _1.Encoder().encode([elm])));
                }
            }
        }
    });
}
else {
    const decoder = new _1.Decoder();
    fs_1.default.createReadStream(args[0]).on("data", (buf) => {
        const ebmlElms = decoder.decode(buf);
        // put ebml info
        for (const elm of ebmlElms) {
            const { name, type, tagStart, level } = elm;
            if (elm.type === "m") {
                if (!elm.isEnd) {
                    console.log(`${tagStart}\t${type}\t${level}\t${name}`);
                }
            }
            else {
                if (elm.type === "b") {
                    if (elm.name === "SimpleBlock") {
                        const { discardable, frames, invisible, keyframe, timecode: timestamp, trackNumber } = _1.tools.ebmlBlock(elm.value);
                        console.log(`${tagStart}\t${type}\t${level}\t${name}`, `track:${trackNumber} timestamp:${timestamp}\tkeyframe:${keyframe}\tinvisible:${invisible}\tdiscardable:${discardable}\tlacying:${frames.length}`);
                    }
                    else {
                        console.log(`${tagStart}\t${type}\t${level}\t${name}`, `<Buffer ${elm.value.byteLength}>`);
                    }
                }
                else if (elm.type === "d") {
                    console.log(`${tagStart}\t${type}\t${level}\t${name}`, _1.tools.convertEBMLDateToJSDate(elm.value));
                }
                else {
                    console.log(`${tagStart}\t${type}\t${level}\t${name}`, elm.value);
                }
            }
        }
    });
}
