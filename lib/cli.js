#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="node"/>
/// <reference types="commander"/>
var _1 = require("./");
var commander_1 = require("commander");
var fs = require("fs");
var version = require("../package.json").version;
commander_1.program
    .version(version)
    .usage("[options] <*.webm>")
    .option('-s, --seekable', 'try convert MediaRecorder WebM to seekable WebM and write buffer stdout, like `ts-ebml -s not_seekable.webm | cat > seekable.webm`')
    .option('-k, --keyframe', 'TimestampScale & Timestamp & SimpleBlock(VideoTrack && keyframe) ebml elements pass filter for thumbnails(Random Access Points)')
    //.option('-b, --bbq-sauce', 'Add bbq sauce')
    //.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .arguments('<*.webm>')
    .parse(process.argv);
var args = commander_1.program.args;
if (args.length < 1) {
    process.exit();
}
var opts = commander_1.program.opts();
if (opts.seekable) {
    var decoder = new _1.Decoder();
    var reader_1 = new _1.Reader();
    reader_1.logging = false;
    reader_1.drop_default_duration = false;
    var buf = fs.readFileSync(args[0]);
    var elms = decoder.decode(buf);
    elms.forEach(function (elm) { reader_1.read(elm); });
    reader_1.stop();
    var refinedMetadataBuf = _1.tools.makeMetadataSeekable(reader_1.metadatas, reader_1.duration, reader_1.cues);
    var body = buf.slice(reader_1.metadataSize);
    var refined = new Buffer(_1.tools.concat([new Buffer(refinedMetadataBuf), body]).buffer);
    process.stdout.write(refined);
}
else if (opts.keyframe) {
    var decoder_1 = new _1.Decoder();
    var TrackType_1 = -1;
    var TrackNumber_1 = -1;
    var CodecID_1 = "";
    var trackTypes_1 = {};
    fs.createReadStream(args[0]).on('data', function (buf) {
        var ebmlElms = decoder_1.decode(buf);
        ebmlElms.forEach(function (elm) {
            if (elm.type === "m" && elm.name === "TrackEntry" && elm.isEnd) {
                trackTypes_1[TrackNumber_1] = { TrackType: TrackType_1, CodecID: CodecID_1 };
                TrackType_1 = -1;
                TrackNumber_1 = -1;
                CodecID_1 = "";
            }
            else if (elm.type === "u" && elm.name === "TrackType") {
                TrackType_1 = elm.value;
            }
            else if (elm.type === "u" && elm.name === "TrackNumber") {
                TrackNumber_1 = elm.value;
            }
            else if (elm.type === "s" && elm.name === "CodecID") {
                CodecID_1 = elm.value;
            }
            else if (elm.type === "u" && elm.name === "TimestampScale") {
                process.stdout.write(new Buffer(new _1.Encoder().encode([elm])));
            }
            else if (elm.type === "u" && elm.name === "Timestamp") {
                process.stdout.write(new Buffer(new _1.Encoder().encode([elm])));
            }
            else if (elm.type === "b" && elm.name === "SimpleBlock") {
                var o = _1.tools.ebmlBlock(elm.data);
                var _a = trackTypes_1[o.trackNumber], type = _a.TrackType, id = _a.CodecID;
                // 1 means video
                if (type === 1 && o.keyframe && (id === "V_VP9" || id === "V_VP8")) {
                    process.stdout.write(new Buffer(new _1.Encoder().encode([elm])));
                }
            }
        });
    });
}
else {
    var decoder_2 = new _1.Decoder();
    fs.createReadStream(args[0]).on('data', function (buf) {
        // put ebml info
        var ebmlElms = decoder_2.decode(buf);
        ebmlElms.forEach(function (elm) {
            var name = elm.name, type = elm.type, tagStart = elm.tagStart, level = elm.level;
            if (elm.type === "m") {
                if (!elm.isEnd) {
                    console.log("".concat(tagStart, "\t").concat(type, "\t").concat(level, "\t").concat(name));
                }
            }
            else {
                if (elm.type === "b") {
                    if (elm.name === "SimpleBlock") {
                        var _a = _1.tools.ebmlBlock(elm.value), discardable = _a.discardable, frames_1 = _a.frames, invisible = _a.invisible, keyframe = _a.keyframe, timestamp = _a.timecode, trackNumber = _a.trackNumber;
                        console.log("".concat(tagStart, "\t").concat(type, "\t").concat(level, "\t").concat(name), "track:".concat(trackNumber, " timestamp:").concat(timestamp, "\tkeyframe:").concat(keyframe, "\tinvisible:").concat(invisible, "\tdiscardable:").concat(discardable, "\tlacying:").concat(frames_1.length));
                    }
                    else {
                        console.log("".concat(tagStart, "\t").concat(type, "\t").concat(level, "\t").concat(name), "<Buffer ".concat(elm.value.byteLength, ">"));
                    }
                }
                else if (elm.type === "d") {
                    console.log("".concat(tagStart, "\t").concat(type, "\t").concat(level, "\t").concat(name), _1.tools.convertEBMLDateToJSDate(elm.value));
                }
                else {
                    console.log("".concat(tagStart, "\t").concat(type, "\t").concat(level, "\t").concat(name), elm.value);
                }
            }
        });
    });
}
