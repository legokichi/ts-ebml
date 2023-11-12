"use strict";
/**
 * https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
 * MediaStream -> MediaRecorder -> MediaSource -> HTMLVideoElement
 * remove DefaultDuration demo
 */
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function stop() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.info("stopping");
                            if (sb.updating) {
                                sb.abort();
                            }
                            if (ms.readyState === "open") {
                                ms.endOfStream();
                            }
                            rec.stop();
                            stream.getTracks().map(function (track) { track.stop(); });
                            return [4 /*yield*/, video.pause()];
                        case 1:
                            _a.sent();
                            console.info("end");
                            return [2 /*return*/];
                    }
                });
            });
        }
        function abort(err) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (aborted) {
                                return [2 /*return*/];
                            }
                            console.error(err);
                            return [4 /*yield*/, stop()];
                        case 1:
                            _a.sent();
                            aborted = true;
                            return [2 /*return*/, Promise.reject(err)];
                    }
                });
            });
        }
        function appendBuffer(buf) {
            return __awaiter(this, void 0, void 0, function () {
                var i, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sb.appendBuffer(buf);
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    sb.addEventListener('updateend', function () { return resolve(); }, { once: true });
                                    sb.addEventListener("error", function (ev) { return reject(ev); }, { once: true });
                                })];
                        case 1:
                            _a.sent();
                            if (logging) {
                                console.log("timestampOffset", sb.timestampOffset);
                                console.log("appendWindowStart", sb.appendWindowStart);
                                console.log("appendWindowEnd", sb.appendWindowEnd);
                                for (i = 0; i < sb.buffered.length; i++) {
                                    console.log("buffered", i, sb.buffered.start(i), sb.buffered.end(i));
                                }
                                for (i = 0; i < video.seekable.length; i++) {
                                    console.log("seekable", i, video.seekable.start(i), video.seekable.end(i));
                                }
                                console.log("webkitAudioDecodedByteCount", video["webkitAudioDecodedByteCount"]);
                                console.log("webkitVideoDecodedByteCount", video["webkitVideoDecodedByteCount"]);
                                console.log("webkitDecodedFrameCount", video["webkitDecodedFrameCount"]);
                                console.log("webkitDroppedFrameCount", video["webkitDroppedFrameCount"]);
                            }
                            if (video.buffered.length > 1) {
                                console.warn("MSE buffered has a gap!");
                                throw new Error("MSE buffered has a gap!");
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        var logging, tasks, devices, stream, rec, ms, video, sb, aborted, button, decoder, reader;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logging = true;
                    tasks = Promise.resolve(void 0);
                    return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
                case 1:
                    devices = _a.sent();
                    console.table(devices);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true, audio: true })];
                case 2:
                    stream = _a.sent();
                    if (logging) {
                        stream.addEventListener("active", function (ev) { console.log(ev.type); });
                        stream.addEventListener("inactive", function (ev) { console.log(ev.type); });
                        stream.addEventListener("addtrack", function (ev) { console.log(ev.type); });
                        stream.addEventListener("removetrack", function (ev) { console.log(ev.type); });
                    }
                    rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="opus,vp8"' });
                    if (logging) {
                        rec.addEventListener("dataavailable", function (ev) { console.log(ev.type); });
                        rec.addEventListener("pause", function (ev) { console.log(ev.type); });
                        rec.addEventListener("resume", function (ev) { console.log(ev.type); });
                        rec.addEventListener("start", function (ev) { console.log(ev.type); });
                        rec.addEventListener("stop", function (ev) { console.log(ev.type); });
                        rec.addEventListener("error", function (ev) { console.error(ev.type, ev); });
                    }
                    ms = new MediaSource();
                    if (logging) {
                        ms.addEventListener('sourceopen', function (ev) { console.log(ev.type); });
                        ms.addEventListener('sourceended', function (ev) { console.log(ev.type); });
                        ms.addEventListener('sourceclose', function (ev) { console.log(ev.type); });
                        ms.sourceBuffers.addEventListener('addsourcebuffer', function (ev) { console.log(ev.type); });
                        ms.sourceBuffers.addEventListener('removesourcebuffer', function (ev) { console.log(ev.type); });
                    }
                    video = document.createElement("video");
                    if (logging) {
                        video.addEventListener('loadstart', function (ev) { console.log(ev.type); });
                        video.addEventListener('progress', function (ev) { console.log(ev.type); });
                        video.addEventListener('loadedmetadata', function (ev) { console.log(ev.type); });
                        video.addEventListener('loadeddata', function (ev) { console.log(ev.type); });
                        video.addEventListener('canplay', function (ev) { console.log(ev.type); });
                        video.addEventListener('canplaythrough', function (ev) { console.log(ev.type); });
                        video.addEventListener('playing', function (ev) { console.log(ev.type); });
                        video.addEventListener('waiting', function (ev) { console.log(ev.type); });
                        video.addEventListener('seeking', function (ev) { console.log(ev.type); });
                        video.addEventListener('seeked', function (ev) { console.log(ev.type); });
                        video.addEventListener('ended', function (ev) { console.log(ev.type); });
                        video.addEventListener('emptied', function (ev) { console.log(ev.type); });
                        video.addEventListener('stalled', function (ev) { console.log(ev.type); });
                        video.addEventListener('timeupdate', function (ev) { console.log(ev.type); }); // annoying
                        video.addEventListener('durationchange', function (ev) { console.log(ev.type); });
                        video.addEventListener('ratechange', function (ev) { console.log(ev.type); });
                        video.addEventListener('play', function (ev) { console.log(ev.type); });
                        video.addEventListener('pause', function (ev) { console.log(ev.type); });
                        video.addEventListener('error', function (ev) { console.warn(ev.type, ev); });
                    }
                    //video.srcObject = ms;
                    video.src = URL.createObjectURL(ms);
                    video.volume = 0;
                    video.controls = true;
                    video.autoplay = true;
                    document.body.appendChild(video);
                    return [4 /*yield*/, new Promise(function (resolve) { ms.addEventListener('sourceopen', function () { return resolve(); }, { once: true }); })];
                case 3:
                    _a.sent();
                    sb = ms.addSourceBuffer(rec.mimeType);
                    if (logging) {
                        sb.addEventListener('updatestart', function (ev) { console.log(ev.type); }); // annoying
                        sb.addEventListener('update', function (ev) { console.log(ev.type); }); // annoying
                        sb.addEventListener('updateend', function (ev) { console.log(ev.type); }); // annoying
                        sb.addEventListener('error', function (ev) { console.error(ev.type, ev); });
                        sb.addEventListener('abort', function (ev) { console.log(ev.type); });
                    }
                    aborted = false;
                    button = document.createElement("button");
                    button.innerHTML = "stop";
                    button.addEventListener("click", function () {
                        document.body.removeChild(button);
                        tasks = tasks.then(stop);
                    }, { once: true });
                    document.body.appendChild(button);
                    decoder = new _1.Decoder();
                    reader = new _1.Reader();
                    reader.drop_default_duration = true;
                    reader.addListener("metadata", function (ev) {
                        tasks = tasks.then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var buf, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 4]);
                                        buf = new _1.Encoder().encode(ev.data);
                                        return [4 /*yield*/, appendBuffer(buf)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        err_1 = _a.sent();
                                        return [4 /*yield*/, abort(err_1)];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    reader.addListener("cluster", function (ev) {
                        tasks = tasks.then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var buf, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 4]);
                                        buf = new _1.Encoder().encode(ev.data);
                                        return [4 /*yield*/, appendBuffer(buf)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        err_2 = _a.sent();
                                        return [4 /*yield*/, abort(err_2)];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    rec.ondataavailable = function (_a) {
                        var data = _a.data;
                        tasks = tasks.then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var buf, elms, err_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 4]);
                                        if (logging) {
                                            console.log("dataavailable", "size:", data.size);
                                        }
                                        if (data.size === 0) {
                                            console.warn("empty recorder data");
                                            throw new Error("empty recorder data");
                                        }
                                        return [4 /*yield*/, readAsArrayBuffer(data)];
                                    case 1:
                                        buf = _a.sent();
                                        elms = decoder.decode(buf);
                                        elms.forEach(function (elm) { reader.read(elm); });
                                        return [3 /*break*/, 4];
                                    case 2:
                                        err_3 = _a.sent();
                                        return [4 /*yield*/, abort(err_3)];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    };
                    rec.start(1000);
                    console.info("start");
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
        reader.onerror = function (ev) { reject(ev); };
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
main();
