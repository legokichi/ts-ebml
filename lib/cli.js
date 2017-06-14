#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var EBMLReader_1 = require("./EBMLReader");
var com = require("commander");
var fs = require("fs");
var version = require("../package.json").version;
com
    .version(version)
    .usage("[options] <*.webm>")
    .option('-s, --seekable', 'try convert MediaRecorder WebM to seekable WebM and write buffer stdout, like `ts-ebml -s not_seekable.webm | cat > seekable.webm`')
    .arguments('<*.webm>')
    .parse(process.argv);
var args = com.args;
if (args.length < 1) {
    process.exit();
}
console.log(com);
if (com.seekable) {
    var decoder = new _1.Decoder();
    var reader_1 = new EBMLReader_1.default();
    reader_1.logging = false;
    reader_1.drop_default_duration = false;
    var buf = fs.readFileSync(args[0]);
    var elms = decoder.decode(buf);
    elms.forEach(function (elm) { reader_1.read(elm); });
    reader_1.stop();
    var refinedMetadataBuf = _1.tools.putRefinedMetaData(reader_1.metadatas, reader_1);
    var body = buf.slice(reader_1.metadataSize);
    var refined = new Buffer(_1.tools.concat([new Buffer(refinedMetadataBuf), body]).buffer);
    process.stdout.write(refined);
}
else {
    var decoder_1 = new _1.Decoder();
    fs.createReadStream(args[0]).on('data', function (buf) {
        // put ebml info
        var ebmlElms = decoder_1.decode(buf);
        ebmlElms.forEach(function (elm) {
            var name = elm.name, type = elm.type, tagStart = elm.tagStart, level = elm.level;
            if (elm.type === "m") {
                if (!elm.isEnd) {
                    console.log(tagStart + "\t" + type + "\t" + level + "\t" + name);
                }
            }
            else {
                if (elm.type === "b") {
                    if (elm.name === "SimpleBlock") {
                        var _a = _1.tools.ebmlBlock(elm.value), discardable = _a.discardable, frames_1 = _a.frames, invisible = _a.invisible, keyframe = _a.keyframe, timecode = _a.timecode, trackNumber = _a.trackNumber;
                        console.log(tagStart + "\t" + type + "\t" + level + "\t" + name, "track:" + trackNumber + " timecode:" + timecode + "\tkeyframe:" + keyframe + "\tinvisible:" + invisible + "\tdiscardable:" + discardable + "\tlacying:" + frames_1.length);
                    }
                    else {
                        console.log(tagStart + "\t" + type + "\t" + level + "\t" + name, "<Buffer " + elm.value.byteLength + ">");
                    }
                }
                else if (elm.type === "d") {
                    console.log(tagStart + "\t" + type + "\t" + level + "\t" + name, _1.tools.convertEBMLDateToJSDate(elm.value));
                }
                else {
                    console.log(tagStart + "\t" + type + "\t" + level + "\t" + name, elm.value);
                }
            }
        });
    });
}
