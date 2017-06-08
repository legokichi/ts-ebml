#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var com = require("commander");
var fs = require("fs");
var version = require("../package.json").version;
com
    .version(version)
    .arguments('<*.webm>')
    .parse(process.argv);
var args = com.args;
if (args.length < 1) {
    process.exit();
}
var decoder = new _1.Decoder();
fs.createReadStream(args[0]).on('data', function (buf) {
    var ebmlElms = decoder.decode(buf);
    ebmlElms.forEach(function (elm) {
        var name = elm.name, type = elm.type, tagStart = elm.tagStart;
        if (elm.type === "m") {
            if (!elm.isEnd) {
                console.log(tagStart + "\t" + type + "\t" + name);
            }
        }
        else {
            if (elm.type === "b") {
                if (elm.name === "SimpleBlock") {
                    var _a = _1.tools.ebmlBlock(elm.value), discardable = _a.discardable, frames_1 = _a.frames, invisible = _a.invisible, keyframe = _a.keyframe, timecode = _a.timecode, trackNumber = _a.trackNumber;
                    console.log(tagStart + "\t" + type + "\t" + name, "track:" + trackNumber + " timecode:" + timecode + "\tkeyframe:" + keyframe + "\tinvisible:" + invisible + "\tdiscardable:" + discardable + "\tlacying:" + frames_1.length);
                }
                else {
                    console.log(tagStart + "\t" + type + "\t" + name, "<Buffer " + elm.value.byteLength + ">");
                }
            }
            else if (elm.type === "d") {
                console.log(tagStart + "\t" + type + "\t" + name, _1.tools.convertEBMLDateToJSDate(elm.value));
            }
            else {
                console.log(tagStart + "\t" + type + "\t" + name, elm.value);
            }
        }
    });
});
