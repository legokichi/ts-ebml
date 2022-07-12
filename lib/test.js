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
/// <reference types="qunit"/>
var _1 = require("./");
var _2 = require("./");
var Buffer = _2.tools.Buffer;
var QUnit = require("qunitjs");
var empower = require("empower");
var formatter = require("power-assert-formatter");
var qunitTap = require("qunit-tap");
QUnit.config.autostart = true;
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function () { console.log.apply(console, arguments); }, { showSourceOnFailure: false });
var WEBM_FILE_LIST = [
    "../matroska-test-files/test_files/test1.mkv",
    "../matroska-test-files/test_files/test2.mkv",
    "../matroska-test-files/test_files/test3.mkv",
    // "../matroska-test-files/test_files/test4.mkv", this file is broken so not pass encoder_decoder_test 
    "../matroska-test-files/test_files/test5.mkv",
    "../matroska-test-files/test_files/test6.mkv",
    // "../matroska-test-files/test_files/test7.mkv", this file has unknown tag so cannot write file
    "../matroska-test-files/test_files/test8.mkv",
];
QUnit.module("ts-EBML");
QUnit.test("encoder-decoder", function (assert) { return __awaiter(void 0, void 0, void 0, function () {
    var file, res, buf, elms, buf2, elms2, tests, _i, tests_1, test;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = "../matroska-test-files/test_files/test1.mkv";
                return [4 /*yield*/, fetch(file)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.arrayBuffer()];
            case 2:
                buf = _a.sent();
                elms = new _1.Decoder().decode(buf);
                buf2 = new _1.Encoder().encode(elms);
                elms2 = new _1.Decoder().decode(buf2);
                tests = [
                    { index: 0, test: function (elm) { assert.ok(elm.name === "EBML" && elm.type === "m" && elm.isEnd === false); } },
                    { index: 4, test: function (elm) { assert.ok(elm.name === "EBML" && elm.type === "m" && elm.isEnd === true); } },
                    { index: 5, test: function (elm) { assert.ok(elm.name === "Segment" && elm.type === "m" && elm.isEnd === false); } },
                    { index: 24, test: function (elm) { assert.ok(elm.name === "Info" && elm.type === "m" && elm.isEnd === false); } },
                    { index: 25, test: function (elm) { assert.ok(elm.name === "Duration" && elm.type === "f" && elm.value === 87336); } },
                    { index: 26, test: function (elm) { assert.ok(elm.name === "MuxingApp" && elm.type === "8" && elm.value === "libebml2 v0.10.0 + libmatroska2 v0.10.1"); } },
                    { index: 28, test: function (elm) {
                            assert.ok(elm.name === "DateUTC" && elm.type === "d" && elm.value instanceof Date);
                            assert.ok(elm.type === "d" &&
                                _2.tools.convertEBMLDateToJSDate(elm.value).getTime() === new Date("2010-08-21T07:23:03.000Z").getTime()); // toISOString
                        } },
                    { index: 29, test: function (elm) {
                            assert.ok(elm.name === "SegmentUID" && elm.type === "b");
                            if (elm.type === "b") {
                                var buf_1 = new Uint8Array(new Buffer([
                                    0x92, 0x2d, 0x19, 0x32, 0x0f, 0x1e, 0x13, 0xc5, 0xb5, 0x05, 0x63, 0x0a, 0xaf, 0xd8, 0x53, 0x36
                                ]));
                                var buf2_1 = new Uint8Array(elm.value);
                                assert.ok(buf_1.every(function (val, i) { return buf2_1[i] === val; }));
                            }
                        } },
                ];
                for (_i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
                    test = tests_1[_i];
                    test.test(elms2[test.index]);
                }
                return [2 /*return*/];
        }
    });
}); });
WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test("encoder-decoder:" + file, create_encoder_decoder_test(file));
});
function create_encoder_decoder_test(file) {
    var _this = this;
    return function (assert) { return __awaiter(_this, void 0, void 0, function () {
        var res, buf, elms, buf2, elms2, i, elm, elm2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(file)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.arrayBuffer()];
                case 2:
                    buf = _a.sent();
                    elms = new _1.Decoder().decode(buf);
                    buf2 = new _1.Encoder().encode(elms);
                    elms2 = new _1.Decoder().decode(buf2);
                    //assert.ok(buf.byteLength === buf2.byteLength, "This problem is caused by JS being unable to handle Int64.");
                    assert.ok(elms.length === elms2.length);
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < elms.length)) return [3 /*break*/, 6];
                    elm = elms[i];
                    elm2 = elms2[i];
                    assert.ok(elm.name === elm2.name);
                    assert.ok(elm.type === elm2.type);
                    if (elm.type === "m" || elm2.type === "m") {
                        return [2 /*return*/];
                    }
                    if (elm.type === "b" && elm2.type === "b") {
                        assert.ok(elm.value.length === elm2.value.length);
                        return [2 /*return*/];
                    }
                    assert.ok(elm.value === elm2.value);
                    return [4 /*yield*/, sleep(1)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    }); };
}
QUnit.test("handwrite-encoder", function (assert) { return __awaiter(void 0, void 0, void 0, function () {
    var tagStream, binarized, buf, elms;
    return __generator(this, function (_a) {
        tagStream = [
            { name: "EBML", type: "m", isEnd: false },
            { name: "EBMLVersion", type: "u", value: 1 },
            { name: "EBMLReadVersion", type: "u", value: 1 },
            { name: "EBMLMaxIDLength", type: "u", value: 4 },
            { name: "EBMLMaxSizeLength", type: "u", value: 8 },
            { name: "DocType", type: "s", value: "webm" },
            { name: "DocTypeVersion", type: "u", value: 4 },
            { name: "DocTypeReadVersion", type: "u", value: 2 },
            { name: "EBML", type: "m", isEnd: true },
            { name: "Segment", type: "m", unknownSize: true, isEnd: false },
            { name: "SeekHead", type: "m", isEnd: false },
            { name: "SeekHead", type: "m", isEnd: true },
            { name: "Info", type: "m", isEnd: false },
            { name: "TimestampScale", type: "u", value: 1000000 },
            { name: "Info", type: "m", isEnd: true },
            { name: "Duration", type: "f", value: 0.0 },
            { name: "Cluster", type: "m", unknownSize: true, isEnd: false },
            { name: "Timestamp", type: "u", value: 1 },
            { name: "SimpleBlock", type: "b", value: new Buffer(1024) },
        ];
        binarized = tagStream.map(_2.tools.encodeValueToBuffer);
        buf = new _1.Encoder().encode(binarized);
        elms = new _1.Decoder().decode(buf);
        elms.forEach(function (elm, i) {
            var origin = tagStream[i];
            assert.ok(elm.name === origin.name, "compare tag name");
            assert.ok(elm.type === origin.type, "compare tag type");
            if (elm.type === "m" || origin.type === "m") {
                return;
            }
            if (elm.type === "b" && origin.type === "b") {
                assert.ok(elm.value.length === origin.value.length, "compare tag value");
                return;
            }
            assert.ok(elm.value === origin.value, "compare tag value");
        });
        return [2 /*return*/];
    });
}); });
QUnit.module("Reader");
var MEDIA_RECORDER_WEBM_FILE_LIST = [
    "./chrome57.webm",
    // last2timestamp(video, audio): ((7.493s, 7.552s), (7.493s, 7.552s))
    // Chrome57: 7.612s ~= 7.611s = 7.552s + (7.552s - 7.493s) // ???
    // Firefox53: 7.552s = 7.552s + (7.552s - 7.552s) // shit!
    // Reader: 7.611s = 7.552s + (7.552s - 7.493s)
    "./firefox55nightly.webm",
    // last2timestamp(video, audio): ((8.567s, 8.590s), (8.626s, 8.646s)), CodecDelay(audio): 6.500ms
    // Chrome57: 8.659s ~= 8.6595s = 8.646s + (8.646s - 8.626s) - 6.500ms
    // Firefox53: 8.666s = 8.646s + (8.646s - 8.626s)
    // Reader: 8.6595s = 8.646s + (8.646s - 8.626s) - 6.500ms
    "./firefox53.webm",
    // Chrome57: 10.019s, Firefox53: 10.026s, Reader: 9.967s
    // last2timestamp(video, audio): ((9.932s, 9.967s), (9.986s, 10.006s)), CodecDelay(audio): 6.500ms
    // Chrome57: 10.019s ~= 10.0195s = 10.006s + (10.006s - 9.986s) - 6.500ms
    // Firefox53: 10.026s = 10.006s + (10.006s - 9.986s)
    // Reader: 10.0195s = 10.006s + (10.006s - 9.986s) - 6.500ms
];
MEDIA_RECORDER_WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test("create_webp_test:" + file, create_webp_test(file));
});
function create_webp_test(file) {
    var _this = this;
    return function (assert) { return __awaiter(_this, void 0, void 0, function () {
        var res, webm_buf, elms, WebPs, _i, WebPs_1, WebP, src, img, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(file)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.arrayBuffer()];
                case 2:
                    webm_buf = _a.sent();
                    elms = new _1.Decoder().decode(webm_buf);
                    WebPs = _2.tools.WebPFrameFilter(elms);
                    _i = 0, WebPs_1 = WebPs;
                    _a.label = 3;
                case 3:
                    if (!(_i < WebPs_1.length)) return [3 /*break*/, 9];
                    WebP = WebPs_1[_i];
                    src = URL.createObjectURL(WebP);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, fetchImage(src)];
                case 5:
                    img = _a.sent();
                    assert.ok(img.width > 0 && img.height > 0, "size:" + img.width + "x" + img.height);
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    assert.notOk(err_1, "webp load failre");
                    return [3 /*break*/, 7];
                case 7:
                    URL.revokeObjectURL(src);
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/];
            }
        });
    }); };
}
MEDIA_RECORDER_WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test("create_convert_to_seekable_test:" + file, create_convert_to_seekable_test(file));
});
function create_convert_to_seekable_test(file) {
    var _this = this;
    return function (assert) { return __awaiter(_this, void 0, void 0, function () {
        var decoder, reader, res, webm_buf, elms, sec, refinedMetadataBuf, body, raw_webM, refinedWebM, raw_video_1, refined_video, wait, err_2, refinedBuf, refinedElms, _reader_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new _1.Reader();
                    return [4 /*yield*/, fetch(file)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.arrayBuffer()];
                case 2:
                    webm_buf = _a.sent();
                    console.info("analasis unseekable original ebml tree");
                    elms = decoder.decode(webm_buf);
                    elms.forEach(function (elm) { reader.read(elm); });
                    reader.stop();
                    console.info("convert to seekable file");
                    assert.ok(reader.metadatas[0].name === "EBML");
                    assert.ok(reader.metadatas.length > 0);
                    sec = reader.duration * reader.timestampScale / 1000 / 1000 / 1000;
                    assert.ok(7 < sec && sec < 11);
                    refinedMetadataBuf = _2.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
                    body = webm_buf.slice(reader.metadataSize);
                    assert.ok(refinedMetadataBuf.byteLength - reader.metadataSize > 0);
                    assert.ok(webm_buf.byteLength === (reader.metadataSize + body.byteLength));
                    console.info("check duration");
                    raw_webM = new Blob([webm_buf], { type: "video/webm" });
                    refinedWebM = new Blob([refinedMetadataBuf, body], { type: "video/webm" });
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    return [4 /*yield*/, fetchVideo(URL.createObjectURL(raw_webM))];
                case 4:
                    raw_video_1 = _a.sent();
                    return [4 /*yield*/, fetchVideo(URL.createObjectURL(refinedWebM))];
                case 5:
                    refined_video = _a.sent();
                    if (!/Firefox/.test(navigator.userAgent)) {
                        assert.ok(!Number.isFinite(raw_video_1.duration), "media recorder webm duration is not finite");
                    }
                    assert.ok(Number.isFinite(refined_video.duration), "refined webm duration is finite");
                    return [4 /*yield*/, sleep(100)];
                case 6:
                    _a.sent();
                    wait = new Promise(function (resolve, reject) { raw_video_1.onseeked = resolve; raw_video_1.onerror = reject; });
                    raw_video_1.currentTime = 7 * 24 * 60 * 60;
                    return [4 /*yield*/, wait];
                case 7:
                    _a.sent();
                    // duration sec is different each browsers
                    assert.ok(Math.abs(raw_video_1.duration - refined_video.duration) < 0.1);
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _a.sent();
                    assert.notOk(err_2);
                    return [3 /*break*/, 9];
                case 9:
                    if (!reader.logging) return [3 /*break*/, 11];
                    // for debug
                    console.info("put seekable ebml tree");
                    return [4 /*yield*/, readAsArrayBuffer(refinedWebM)];
                case 10:
                    refinedBuf = _a.sent();
                    refinedElms = new _1.Decoder().decode(refinedBuf);
                    _reader_1 = new _1.Reader();
                    _reader_1.logging = true;
                    refinedElms.forEach(function (elm) { return _reader_1.read(elm); });
                    _reader_1.stop();
                    _a.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    }); };
}
MEDIA_RECORDER_WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test("create_recorder_helper_test:" + file, create_recorder_helper_test(file));
});
function create_recorder_helper_test(file) {
    var _this = this;
    return function (assert) { return __awaiter(_this, void 0, void 0, function () {
        var decoder, reader, last_sec, metadata_loaded, cluster_num, last_timestamp, res, webm_buf, elms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new _1.Reader();
                    last_sec = 0;
                    reader.addListener("duration", function (_a) {
                        var timestampScale = _a.timestampScale, duration = _a.duration;
                        var sec = duration * timestampScale / 1000 / 1000 / 1000;
                        assert.ok(Number.isFinite(sec), "duration:" + sec + "sec");
                        assert.ok(sec > last_sec);
                        last_sec = sec;
                    });
                    metadata_loaded = false;
                    reader.addListener("metadata", function (_a) {
                        var metadataSize = _a.metadataSize, data = _a.data;
                        assert.ok(metadataSize > 0);
                        assert.ok(data.length > 0);
                        assert.ok(data[0].name === "EBML");
                        metadata_loaded = true;
                    });
                    cluster_num = 0;
                    last_timestamp = -1;
                    reader.addListener("cluster", function (ev) {
                        // cluster chunk test
                        var data = ev.data, timestamp = ev.timestamp;
                        assert.ok(Number.isFinite(timestamp), "cluster.timestamp:" + timestamp);
                        assert.ok(data.length > 0, "cluster.length:" + data.length);
                        var assertion = data.every(function (elm) { return elm.name === "Cluster" || elm.name === "Timestamp" || elm.name === "SimpleBlock"; });
                        assert.ok(assertion, "element check");
                        assert.ok(timestamp > last_timestamp);
                        cluster_num += 1;
                        last_timestamp = timestamp;
                    });
                    return [4 /*yield*/, fetch(file)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.arrayBuffer()];
                case 2:
                    webm_buf = _a.sent();
                    elms = decoder.decode(webm_buf);
                    elms.forEach(function (elm) { reader.read(elm); });
                    reader.stop();
                    assert.ok(last_sec > 0);
                    assert.ok(metadata_loaded);
                    assert.ok(cluster_num > 0);
                    assert.ok(last_timestamp > 0);
                    return [2 /*return*/];
            }
        });
    }); };
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function fetchVideo(src) {
    return new Promise(function (resolve, reject) {
        var video = document.createElement("video");
        video.src = src;
        video.controls = true;
        video.onloadeddata = function () {
            video.onloadeddata = null;
            resolve(video);
        };
        video.onerror = function (err) {
            video.onerror = null;
            reject(err);
        };
    });
}
function fetchImage(src) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;
        img.onload = function () { resolve(img); };
        img.onerror = function (err) { reject(err); };
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
function waitEvent(target, ev, err) {
    if (err === void 0) { err = "error"; }
    return new Promise(function (resolve, reject) {
        target.addEventListener(ev, succ);
        target.addEventListener(err, fail);
        function succ(ev) { clean(); resolve(ev); }
        function fail(ev) { clean(); reject(ev); }
        function clean() {
            target.removeEventListener(ev, succ);
            target.removeEventListener(err, fail);
        }
    });
}
QUnit.on('runEnd', function (runEnd) { return global.runEnd = runEnd; });
