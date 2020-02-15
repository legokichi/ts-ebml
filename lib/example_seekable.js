"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var params, recorder, duration, codec, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = new URLSearchParams(location.search);
                    recorder = false;
                    duration = 60;
                    codec = "vp8";
                    if (params.has("type") && params.get("type") == "recorder") {
                        recorder = true;
                    }
                    if (params.has("duration")) {
                        duration = parseInt(params.get("duration") || "60");
                    }
                    if (params.has("codec")) {
                        codec = params.get("codec") || "vp8";
                    }
                    if (!recorder) return [3 /*break*/, 2];
                    return [4 /*yield*/, main_from_recorder(duration, codec)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    file = params.has("file") ? params.get("file") : "./chrome57.webm";
                    return [4 /*yield*/, main_from_file(file)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main_from_file(file) {
    return __awaiter(this, void 0, void 0, function () {
        var decoder, reader, webMBuf, elms, refinedMetadataBuf, body, refinedWebM, refined_video, refinedDecoder, refinedReader, refinedBuf, refinedElms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new _1.Reader();
                    reader.logging = true;
                    reader.logGroup = "Raw WebM file";
                    reader.drop_default_duration = false;
                    return [4 /*yield*/, fetch(file).then(function (res) { return res.arrayBuffer(); })];
                case 1:
                    webMBuf = _a.sent();
                    elms = decoder.decode(webMBuf);
                    elms.forEach(function (elm) { reader.read(elm); });
                    reader.stop();
                    refinedMetadataBuf = _1.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
                    body = webMBuf.slice(reader.metadataSize);
                    refinedWebM = new Blob([refinedMetadataBuf, body], { type: "video/webm" });
                    refined_video = document.createElement("video");
                    refined_video.src = URL.createObjectURL(refinedWebM);
                    refined_video.controls = true;
                    document.body.appendChild(refined_video);
                    refinedDecoder = new _1.Decoder();
                    refinedReader = new _1.Reader();
                    refinedReader.logging = true;
                    refinedReader.logGroup = "Refined WebM file";
                    return [4 /*yield*/, readAsArrayBuffer(refinedWebM)];
                case 2:
                    refinedBuf = _a.sent();
                    refinedElms = refinedDecoder.decode(refinedBuf);
                    refinedElms.forEach(function (elm) { refinedReader.read(elm); });
                    refinedReader.stop();
                    return [2 /*return*/];
            }
        });
    });
}
function main_from_recorder(duration, codec) {
    return __awaiter(this, void 0, void 0, function () {
        var decoder, reader, tasks, webM, devices, stream, rec, ondataavailable, count, raw_video, rawVideoButton, infos, _loop_1, _i, infos_1, info;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new _1.Reader();
                    reader.logging = true;
                    reader.logGroup = "Raw WebM Stream (not seekable)";
                    tasks = Promise.resolve(void 0);
                    webM = new Blob([], { type: "video/webm" });
                    return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
                case 1:
                    devices = _a.sent();
                    console.table(devices);
                    return [4 /*yield*/, (navigator.mediaDevices.getUserMedia instanceof Function
                            ? navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                            : navigator.getUserMedia instanceof Function
                                ? new Promise(function (resolve, reject) { return navigator.getUserMedia({ video: true, audio: true }, resolve, reject); })
                                : navigator["webkitGetUserMedia"] instanceof Function
                                    ? new Promise(function (resolve, reject) { return navigator["webkitGetUserMedia"]({ video: true, audio: true }, resolve, reject); })
                                    : Promise.reject(new Error("cannot use usermedia")))];
                case 2:
                    stream = _a.sent();
                    rec = new MediaRecorder(stream, { mimeType: "video/webm; codecs=\"" + codec + ", opus\"" });
                    ondataavailable = function (ev) {
                        var chunk = ev.data;
                        webM = new Blob([webM, chunk], { type: chunk.type });
                        var task = function () { return __awaiter(_this, void 0, void 0, function () {
                            var buf, elms;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, readAsArrayBuffer(chunk)];
                                    case 1:
                                        buf = _a.sent();
                                        elms = decoder.decode(buf);
                                        elms.forEach(function (elm) { reader.read(elm); });
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        tasks = tasks.then(function () { return task(); });
                    };
                    rec.addEventListener("dataavailable", ondataavailable);
                    // if set timeslice, bug occur on firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1272371
                    // rec.start(100);
                    rec.start();
                    return [4 /*yield*/, sleep(duration * 1000)];
                case 3:
                    _a.sent();
                    rec.stop();
                    count = 0;
                    _a.label = 4;
                case 4:
                    if (!(webM.size === 0)) return [3 /*break*/, 6];
                    if (count > 10) {
                        alert("MediaRecorder did not record anything");
                        throw new Error("MediaRecorder did not record anything");
                    }
                    return [4 /*yield*/, sleep(1 * 1000)];
                case 5:
                    _a.sent(); // wait dataavailable event
                    count++;
                    return [3 /*break*/, 4];
                case 6:
                    rec.removeEventListener("dataavailable", ondataavailable);
                    rec.stream.getTracks().map(function (track) { track.stop(); });
                    return [4 /*yield*/, tasks];
                case 7:
                    _a.sent(); // wait data processing
                    reader.stop();
                    raw_video = document.createElement("video");
                    raw_video.src = URL.createObjectURL(webM);
                    raw_video.controls = true;
                    rawVideoButton = document.createElement("button");
                    rawVideoButton.textContent = "Download Raw Video";
                    rawVideoButton.addEventListener("click", function () { saveData(webM, "raw.webm"); });
                    put(raw_video, "Raw WebM Stream (not seekable)");
                    document.body.appendChild(document.createElement("br"));
                    document.body.appendChild(rawVideoButton);
                    infos = [
                        //{duration: reader.duration, title: "add duration only (seekable but slow)"},
                        //{cues: reader.cues, title: "add cues only (seekable file)"},
                        { duration: reader.duration, cues: reader.cues, title: "Refined WebM stream (seekable)" },
                    ];
                    _loop_1 = function (info) {
                        var refinedMetadataBuf, webMBuf, body, refinedWebM, refinedBuf, _reader, refined_video, refinedVideoButton;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    refinedMetadataBuf = _1.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
                                    return [4 /*yield*/, readAsArrayBuffer(webM)];
                                case 1:
                                    webMBuf = _a.sent();
                                    body = webMBuf.slice(reader.metadataSize);
                                    refinedWebM = new Blob([refinedMetadataBuf, body], { type: webM.type });
                                    return [4 /*yield*/, readAsArrayBuffer(refinedWebM)];
                                case 2:
                                    refinedBuf = _a.sent();
                                    _reader = new _1.Reader();
                                    _reader.logging = true;
                                    _reader.logGroup = info.title;
                                    new _1.Decoder().decode(refinedBuf).forEach(function (elm) { return _reader.read(elm); });
                                    _reader.stop();
                                    refined_video = document.createElement("video");
                                    refined_video.src = URL.createObjectURL(refinedWebM);
                                    refined_video.controls = true;
                                    refinedVideoButton = document.createElement("button");
                                    refinedVideoButton.textContent = "Download Refined Video";
                                    refinedVideoButton.addEventListener("click", function () { saveData(refinedWebM, "refined.webm"); });
                                    put(refined_video, info.title);
                                    document.body.appendChild(document.createElement("br"));
                                    document.body.appendChild(refinedVideoButton);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, infos_1 = infos;
                    _a.label = 8;
                case 8:
                    if (!(_i < infos_1.length)) return [3 /*break*/, 11];
                    info = infos_1[_i];
                    return [5 /*yield**/, _loop_1(info)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function put(elm, title) {
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(title));
    document.body.appendChild(h1);
    document.body.appendChild(elm);
}
function readAsArrayBuffer(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function () { resolve(reader.result); };
        reader.onerror = function (ev) { reject(ev); };
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
main();
