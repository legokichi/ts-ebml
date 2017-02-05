"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _1 = require("./");
var Buffer = require("buffer/").Buffer;
var decoder = new _1.Decoder();
var encoder = new _1.Encoder();
var refiner = new _1.Refiner();
function recorder_main() {
    return __awaiter(this, void 0, void 0, function () {
        function putVideo(blob, title) {
            var url = URL.createObjectURL(blob);
            console.log(url);
            var video = document.createElement("video");
            video.src = url;
            video.controls = true;
            var h1 = document.createElement("h1");
            h1.appendChild(document.createTextNode(title));
            document.body.appendChild(h1);
            document.body.appendChild(video);
        }
        var stream, rec, tasks, blob, elms, metadataElms, casted, refinedElms, i, elm, tail, refinedBuf, refined;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true, audio: true })];
                case 1:
                    stream = _a.sent();
                    rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });
                    tasks = [];
                    blob = new Blob([], { type: "video/webm" });
                    elms = [];
                    rec.ondataavailable = function (ev) {
                        var chunk = ev.data;
                        blob = new Blob([blob, chunk], { type: chunk.type });
                        var reader = new FileReader();
                        reader.readAsArrayBuffer(chunk);
                        var task = new Promise(function (resolve) {
                            reader.onloadend = function () {
                                var buf = reader.result;
                                var chunks = decoder.decode(buf);
                                elms = elms.concat(chunks);
                                refiner.read(chunks);
                                resolve();
                            };
                        });
                        tasks.push(task);
                    };
                    rec.start(500);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10 * 1000); })];
                case 2:
                    _a.sent();
                    rec.ondataavailable = undefined;
                    rec.stream.getTracks().map(function (track) { track.stop(); });
                    console.log("waiting task finish");
                    return [4 /*yield*/, tasks.reduce(function (o, prm) { return o.then(function () { return prm; }); }, Promise.resolve(void 0))];
                case 3:
                    _a.sent();
                    metadataElms = refiner.putRefinedMetaData();
                    casted = elms.slice(0);
                    refinedElms = [];
                    // insert new header
                    for (i = 0; i < casted.length; i++) {
                        elm = casted[i];
                        if (elm.type === "m" && elm.name === "Cluster") {
                            tail = casted.splice(i);
                            refinedElms = metadataElms.concat(tail);
                            break;
                        }
                    }
                    refinedBuf = new _1.Encoder().encode(refinedElms);
                    refined = new Blob([refinedBuf], { type: "video/webm" });
                    putVideo(blob, "plain recorded webm");
                    putVideo(refined, "refined webm");
                    return [2 /*return*/];
            }
        });
    });
}
function node_main() {
    var fs = require('fs');
    fs.readFile('moz.webm', function (err, data) {
        if (err)
            throw err;
        console.log("show", decoder.decode(data));
    });
}
function serv_main() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, elms, metadata, casted, converted, i, elm, tail, buf, url, video;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('chrome.webm')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.arrayBuffer()];
                case 2:
                    data = _a.sent();
                    elms = decoder.decode(data);
                    refiner.read(elms);
                    metadata = refiner.putRefinedMetaData();
                    casted = elms.slice(0);
                    converted = [];
                    // insert new header
                    for (i = 0; i < casted.length; i++) {
                        elm = casted[i];
                        if (elm.type === "m" && elm.name === "Cluster") {
                            tail = casted.splice(i);
                            converted = metadata.concat(tail);
                            break;
                        }
                    }
                    buf = encoder.encode(converted);
                    url = URL.createObjectURL(new Blob([buf], { type: "video/webm" }));
                    video = document.createElement("video");
                    video.src = url;
                    video.controls = true;
                    document.body.appendChild(video);
                    return [2 /*return*/];
            }
        });
    });
}
function writer_main() {
    var tagStream = [
        { name: "EBML", type: "m" },
        { name: "EBMLVersion", type: "u", value: 1 },
        { name: "EBMLReadVersion", type: "u", value: 1 },
        { name: "EBMLMaxIDLength", type: "u", value: 4 },
        { name: "EBMLMaxSizeLength", type: "u", value: 8 },
        { name: "DocType", type: "s", value: "webm" },
        { name: "DocTypeVersion", type: "u", value: 4 },
        { name: "DocTypeReadVersion", type: "u", value: 2 },
        { name: "EBML", type: "m", isEnd: true },
        { name: "Segment", type: "m", unknownSize: true },
        { name: "SeekHead", type: "m" },
        { name: "SeekHead", type: "m", isEnd: true },
        { name: "Info", type: "m" },
        { name: "TimecodeScale", type: "u", value: 1000000 },
        { name: "Info", type: "m", isEnd: true },
        { name: "Cluster", type: "m", unknownSize: true },
        { name: "Timecode", type: "u", value: 1 },
        { name: "SimpleBlock", type: "b", value: new Buffer(1024) },
    ];
    var binarized = tagStream.map(_1.Encoder.encodeValueToBuffer);
    var abuf = encoder.encode(binarized);
    var elms = decoder.decode(abuf);
    elms.forEach(function (elm, i) {
        var origin = tagStream[i];
        console.assert(elm.name === origin.name);
        console.assert(elm.type === origin.type);
        if (elm.type === "m" || origin.type === "m") {
            return;
        }
        console.assert(elm.value === origin.value);
    });
}
//console.clear();
//node_main();
//serv_main();
//writer_main();
recorder_main().catch(console.error);
