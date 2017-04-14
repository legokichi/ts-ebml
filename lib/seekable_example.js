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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var EBML = require("./");
var EBMLReader_1 = require("./EBMLReader");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var decoder, encoder, reader, tasks, metadataBuf, webM, last_timecodeScale, last_duration, clusterPtrs, stream, rec, metadataElms, refinedElms, refinedMetadataBuf, webMBuf, body, refinedWebM, raw_video, refined_video;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decoder = new EBML.Decoder();
                    encoder = new EBML.Encoder();
                    reader = new EBMLReader_1.default();
                    tasks = Promise.resolve(void 0);
                    metadataBuf = new ArrayBuffer(0);
                    webM = new Blob([], { type: "video/webm" });
                    last_timecodeScale = 0;
                    last_duration = 0;
                    clusterPtrs = [];
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true, audio: true })];
                case 1:
                    stream = _a.sent();
                    rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });
                    reader.addListener("metadata", function (_a) {
                        var data = _a.data;
                        metadataBuf = new EBML.Encoder().encode(data);
                    });
                    reader.addListener("duration", function (_a) {
                        var timecodeScale = _a.timecodeScale, duration = _a.duration;
                        last_timecodeScale = timecodeScale;
                        last_duration = duration;
                    });
                    reader.addListener("cluster_ptr", function (ptr) {
                        clusterPtrs.push(ptr);
                    });
                    rec.ondataavailable = function (ev) {
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
                    rec.start(100);
                    return [4 /*yield*/, wait(10 * 1000)];
                case 2:
                    _a.sent();
                    rec.stop();
                    rec.ondataavailable = undefined;
                    rec.stream.getTracks().map(function (track) { track.stop(); });
                    if (metadataBuf.byteLength === 0) {
                        throw new Error("cluster element not found.");
                    }
                    metadataElms = new EBML.Decoder().decode(metadataBuf);
                    refinedElms = EBML.tools.putRefinedMetaData(metadataElms, clusterPtrs, last_duration);
                    refinedMetadataBuf = new EBML.Encoder().encode(refinedElms);
                    return [4 /*yield*/, readAsArrayBuffer(webM)];
                case 3:
                    webMBuf = _a.sent();
                    body = webMBuf.slice(metadataBuf.byteLength);
                    refinedWebM = new Blob([refinedMetadataBuf, body], { type: webM.type });
                    raw_video = document.createElement("video");
                    raw_video.src = URL.createObjectURL(webM);
                    document.body.appendChild(raw_video);
                    refined_video = document.createElement("video");
                    refined_video.src = URL.createObjectURL(refinedWebM);
                    document.body.appendChild(refined_video);
                    return [2 /*return*/];
            }
        });
    });
}
function readAsArrayBuffer(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function () { resolve(reader.result); };
        reader.onerror = function (ev) { reject(ev.error); };
    });
}
function wait(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
main();
