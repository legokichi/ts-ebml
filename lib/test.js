'use strict';
var _PowerAssertRecorder1 = function () {
    function PowerAssertRecorder() {
        this.captured = [];
    }
    PowerAssertRecorder.prototype._capt = function _capt(value, espath) {
        this.captured.push({
            value: value,
            espath: espath
        });
        return value;
    };
    PowerAssertRecorder.prototype._expr = function _expr(value, source) {
        var capturedValues = this.captured;
        this.captured = [];
        return {
            powerAssertContext: {
                value: value,
                events: capturedValues
            },
            source: source
        };
    };
    return PowerAssertRecorder;
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = {
            label: 0,
            sent: function () {
                if (t[0] & 1)
                    throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
    return g = {
        next: verb(0),
        'throw': verb(1),
        'return': verb(2)
    }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f)
            throw new TypeError('Generator is already executing.');
        while (_)
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? 'return' : op[0] ? 'throw' : 'next']) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [
                        0,
                        t.value
                    ];
                switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2])
                        _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [
                    6,
                    e
                ];
                y = 0;
            } finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var _this = this;
Object.defineProperty(exports, '__esModule', { value: true });
var _1 = require('./');
var _2 = require('./');
var EBMLReader_1 = require('./EBMLReader');
var Buffer = require('buffer/').Buffer;
var QUnit = require('qunitjs');
var empower = require('empower');
var formatter = require('power-assert-formatter');
var qunitTap = require('qunit-tap');
QUnit.config.autostart = true;
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function () {
    console.log.apply(console, arguments);
}, { showSourceOnFailure: false });
QUnit.module('ts-EBML');
QUnit.test('encoder-decoder', function (assert) {
    return __awaiter(_this, void 0, void 0, function () {
        var decoder, encoder, res, buf, elms, buf2, elms2;
        return __generator(this, function (_a) {
            var _rec1 = new _PowerAssertRecorder1();
            var _rec2 = new _PowerAssertRecorder1();
            switch (_a.label) {
            case 0:
                decoder = new _1.Decoder();
                encoder = new _1.Encoder();
                return [
                    4,
                    fetch('../ok.webm')
                ];
            case 1:
                res = _a.sent();
                return [
                    4,
                    res.arrayBuffer()
                ];
            case 2:
                buf = _a.sent();
                elms = new _1.Decoder().decode(buf);
                buf2 = new _1.Encoder().encode(elms);
                elms2 = new _1.Decoder().decode(buf2);
                assert.ok(_rec1._expr(_rec1._capt(_rec1._capt(_rec1._capt(buf, 'arguments/0/left/object').byteLength, 'arguments/0/left') === _rec1._capt(_rec1._capt(buf2, 'arguments/0/right/object').byteLength, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(buf.byteLength === buf2.byteLength, "This problem is due to not implementing the variable int writing tools.putRefinedMetaData function")',
                    filepath: 'lib/test.js',
                    line: 67
                }), 'This problem is due to not implementing the variable int writing tools.putRefinedMetaData function');
                assert.ok(_rec2._expr(_rec2._capt(_rec2._capt(_rec2._capt(elms, 'arguments/0/left/object').length, 'arguments/0/left') === _rec2._capt(_rec2._capt(elms2, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elms.length === elms2.length)',
                    filepath: 'lib/test.js',
                    line: 68
                }));
                return [2];
            }
        });
    });
});
QUnit.test('handwrite-encoder', function (assert) {
    return __awaiter(_this, void 0, void 0, function () {
        var tagStream, binarized, buf, elms;
        return __generator(this, function (_a) {
            tagStream = [
                {
                    name: 'EBML',
                    type: 'm'
                },
                {
                    name: 'EBMLVersion',
                    type: 'u',
                    value: 1
                },
                {
                    name: 'EBMLReadVersion',
                    type: 'u',
                    value: 1
                },
                {
                    name: 'EBMLMaxIDLength',
                    type: 'u',
                    value: 4
                },
                {
                    name: 'EBMLMaxSizeLength',
                    type: 'u',
                    value: 8
                },
                {
                    name: 'DocType',
                    type: 's',
                    value: 'webm'
                },
                {
                    name: 'DocTypeVersion',
                    type: 'u',
                    value: 4
                },
                {
                    name: 'DocTypeReadVersion',
                    type: 'u',
                    value: 2
                },
                {
                    name: 'EBML',
                    type: 'm',
                    isEnd: true
                },
                {
                    name: 'Segment',
                    type: 'm',
                    unknownSize: true
                },
                {
                    name: 'SeekHead',
                    type: 'm'
                },
                {
                    name: 'SeekHead',
                    type: 'm',
                    isEnd: true
                },
                {
                    name: 'Info',
                    type: 'm'
                },
                {
                    name: 'TimecodeScale',
                    type: 'u',
                    value: 1000000
                },
                {
                    name: 'Info',
                    type: 'm',
                    isEnd: true
                },
                {
                    name: 'Cluster',
                    type: 'm',
                    unknownSize: true
                },
                {
                    name: 'Timecode',
                    type: 'u',
                    value: 1
                },
                {
                    name: 'SimpleBlock',
                    type: 'b',
                    value: new Buffer(1024)
                }
            ];
            binarized = tagStream.map(_2.tools.encodeValueToBuffer);
            buf = new _1.Encoder().encode(binarized);
            elms = new _1.Decoder().decode(buf);
            elms.forEach(function (elm, i) {
                var _rec3 = new _PowerAssertRecorder1();
                var _rec4 = new _PowerAssertRecorder1();
                var _rec5 = new _PowerAssertRecorder1();
                var _rec6 = new _PowerAssertRecorder1();
                var origin = tagStream[i];
                assert.ok(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec3._capt(_rec3._capt(origin, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === origin.name, "compare tag name")',
                    filepath: 'lib/test.js',
                    line: 101
                }), 'compare tag name');
                assert.ok(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec4._capt(_rec4._capt(origin, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.type === origin.type, "compare tag type")',
                    filepath: 'lib/test.js',
                    line: 102
                }), 'compare tag type');
                if (elm.type === 'm' || origin.type === 'm') {
                    return;
                }
                if (elm.type === 'b' || origin.type === 'b') {
                    assert.ok(_rec5._expr(_rec5._capt(_rec5._capt(_rec5._capt(_rec5._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object')['length'], 'arguments/0/left') === _rec5._capt(_rec5._capt(_rec5._capt(origin, 'arguments/0/right/object/object').value, 'arguments/0/right/object')['length'], 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.value["length"] === origin.value["length"], "compare tag value")',
                        filepath: 'lib/test.js',
                        line: 107
                    }), 'compare tag value');
                    return;
                }
                assert.ok(_rec6._expr(_rec6._capt(_rec6._capt(_rec6._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec6._capt(_rec6._capt(origin, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.value === origin.value, "compare tag value")',
                    filepath: 'lib/test.js',
                    line: 110
                }), 'compare tag value');
            });
            return [2];
        });
    });
});
QUnit.test('convert_to_seekable_from_media_recorder', function (assert) {
    return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var decoder, reader, tasks, metadataBuf, webM, last_duration, clusterPtrs, stream, rec, metadataElms, refinedElms, refinedMetadataBuf, webMBuf, body, refinedWebM, refinedWebMBuf, elms, _reader, raw_video, refined_video;
        return __generator(this, function (_a) {
            var _rec7 = new _PowerAssertRecorder1();
            var _rec8 = new _PowerAssertRecorder1();
            switch (_a.label) {
            case 0:
                decoder = new _1.Decoder();
                reader = new EBMLReader_1.default();
                reader.logging = true;
                console.info('unseekable original');
                tasks = Promise.resolve(void 0);
                metadataBuf = new ArrayBuffer(0);
                webM = new Blob([], { type: 'video/webm' });
                last_duration = 0;
                clusterPtrs = [];
                return [
                    4,
                    navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true
                    })
                ];
            case 1:
                stream = _a.sent();
                rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8, opus"' });
                reader.addListener('metadata', function (_a) {
                    var data = _a.data;
                    metadataBuf = new _1.Encoder().encode(data);
                });
                reader.addListener('duration', function (_a) {
                    var timecodeScale = _a.timecodeScale, duration = _a.duration;
                    last_duration = duration;
                });
                reader.addListener('cluster_ptr', function (ptr) {
                    clusterPtrs.push(ptr);
                });
                rec.ondataavailable = function (ev) {
                    var chunk = ev.data;
                    webM = new Blob([
                        webM,
                        chunk
                    ], { type: chunk.type });
                    var task = function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            var buf, elms;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                case 0:
                                    return [
                                        4,
                                        readAsArrayBuffer(chunk)
                                    ];
                                case 1:
                                    buf = _a.sent();
                                    elms = decoder.decode(buf);
                                    elms.forEach(function (elm) {
                                        reader.read(elm);
                                    });
                                    return [2];
                                }
                            });
                        });
                    };
                    tasks = tasks.then(function () {
                        return task();
                    });
                };
                rec.start(100);
                return [
                    4,
                    sleep(10 * 1000)
                ];
            case 2:
                _a.sent();
                rec.stop();
                rec.ondataavailable = undefined;
                rec.stream.getTracks().map(function (track) {
                    track.stop();
                });
                reader.stop();
                metadataElms = new _1.Decoder().decode(metadataBuf);
                refinedElms = _2.tools.putRefinedMetaData(metadataElms, clusterPtrs, last_duration);
                refinedMetadataBuf = new _1.Encoder().encode(refinedElms);
                return [
                    4,
                    readAsArrayBuffer(webM)
                ];
            case 3:
                webMBuf = _a.sent();
                body = webMBuf.slice(metadataBuf.byteLength);
                refinedWebM = new Blob([
                    refinedMetadataBuf,
                    body
                ], { type: webM.type });
                console.info('seekable webm');
                return [
                    4,
                    readAsArrayBuffer(refinedWebM)
                ];
            case 4:
                refinedWebMBuf = _a.sent();
                elms = new _1.Decoder().decode(refinedWebMBuf);
                _reader = new EBMLReader_1.default();
                _reader.logging = true;
                elms.forEach(function (elm) {
                    return _reader.read(elm);
                });
                _reader.stop();
                return [
                    4,
                    fetchVideo(URL.createObjectURL(webM))
                ];
            case 5:
                raw_video = _a.sent();
                put(raw_video, 'media-recorder-original(not seekable)');
                return [
                    4,
                    fetchVideo(URL.createObjectURL(refinedWebM))
                ];
            case 6:
                refined_video = _a.sent();
                put(refined_video, 'add-seekhead-and-duration(seekable)');
                assert.ok(_rec7._expr(_rec7._capt(!_rec7._capt(_rec7._capt(Number, 'arguments/0/argument/callee/object').isFinite(_rec7._capt(_rec7._capt(raw_video, 'arguments/0/argument/arguments/0/object').duration, 'arguments/0/argument/arguments/0')), 'arguments/0/argument'), 'arguments/0'), {
                    content: 'assert.ok(!Number.isFinite(raw_video.duration), "media recorder webm duration is not finite")',
                    filepath: 'lib/test.js',
                    line: 196
                }), 'media recorder webm duration is not finite');
                assert.ok(_rec8._expr(_rec8._capt(_rec8._capt(Number, 'arguments/0/callee/object').isFinite(_rec8._capt(_rec8._capt(refined_video, 'arguments/0/arguments/0/object').duration, 'arguments/0/arguments/0')), 'arguments/0'), {
                    content: 'assert.ok(Number.isFinite(refined_video.duration), "refined webm duration is finite")',
                    filepath: 'lib/test.js',
                    line: 197
                }), 'refined webm duration is finite');
                return [2];
            }
        });
    });
});
QUnit.test('convert_to_seekable_from_moz_file', function (assert) {
    return __awaiter(_this, void 0, void 0, function () {
        var res, buf, elms, reader, metadataBuf, last_duration, clusterPtrs, metadataElms, refinedElms, _reader;
        return __generator(this, function (_a) {
            switch (_a.label) {
            case 0:
                return [
                    4,
                    fetch('../ok.webm')
                ];
            case 1:
                res = _a.sent();
                return [
                    4,
                    res.arrayBuffer()
                ];
            case 2:
                buf = _a.sent();
                elms = new _1.Decoder().decode(buf);
                reader = new EBMLReader_1.default();
                reader.logging = true;
                metadataBuf = new ArrayBuffer(0);
                last_duration = 0;
                clusterPtrs = [];
                reader.addListener('metadata', function (_a) {
                    var data = _a.data;
                    metadataBuf = new _1.Encoder().encode(data);
                });
                reader.addListener('duration', function (_a) {
                    var timecodeScale = _a.timecodeScale, duration = _a.duration;
                    last_duration = duration;
                });
                reader.addListener('cluster_ptr', function (ptr) {
                    clusterPtrs.push(ptr);
                });
                elms.forEach(function (elm) {
                    return reader.read(elm);
                });
                reader.stop();
                metadataElms = new _1.Decoder().decode(metadataBuf);
                refinedElms = _2.tools.putRefinedMetaData(metadataElms, clusterPtrs, last_duration);
                _reader = new EBMLReader_1.default();
                _reader.logging = true;
                refinedElms.forEach(function (elm) {
                    return _reader.read(elm);
                });
                assert.ok(true);
                return [2];
            }
        });
    });
});
QUnit.test('webp', function (assert) {
    return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var reader, decoder, tasks, metadataBuf, webM, stream, rec;
        return __generator(this, function (_a) {
            switch (_a.label) {
            case 0:
                reader = new EBMLReader_1.default();
                decoder = new _1.Decoder();
                tasks = Promise.resolve(void 0);
                metadataBuf = new ArrayBuffer(0);
                webM = new Blob([], { type: 'video/webm' });
                return [
                    4,
                    navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true
                    })
                ];
            case 1:
                stream = _a.sent();
                rec = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="opus,vp8"' });
                rec.ondataavailable = function (ev) {
                    var chunk = ev.data;
                    webM = new Blob([
                        webM,
                        chunk
                    ], { type: chunk.type });
                    var task = function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            var buf, elms;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                case 0:
                                    return [
                                        4,
                                        readAsArrayBuffer(chunk)
                                    ];
                                case 1:
                                    buf = _a.sent();
                                    elms = decoder.decode(buf);
                                    elms.forEach(function (elm) {
                                        reader.read(elm);
                                    });
                                    return [2];
                                }
                            });
                        });
                    };
                    tasks = tasks.then(function () {
                        return task();
                    });
                };
                reader.addListener('metadata', function (ev) {
                    var _rec9 = new _PowerAssertRecorder1();
                    var _rec10 = new _PowerAssertRecorder1();
                    var data = ev.data;
                    assert.ok(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(data.length > 0, "metadata.length:" + data.length)',
                        filepath: 'lib/test.js',
                        line: 276
                    }), 'metadata.length:' + data.length);
                    assert.ok(_rec10._expr(_rec10._capt(_rec10._capt(_rec10._capt(_rec10._capt(data, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
                        content: 'assert.ok(data[0].name === "EBML")',
                        filepath: 'lib/test.js',
                        line: 277
                    }));
                });
                reader.addListener('cluster', function (ev) {
                    var _rec11 = new _PowerAssertRecorder1();
                    var _rec12 = new _PowerAssertRecorder1();
                    var _rec13 = new _PowerAssertRecorder1();
                    var data = ev.data, timecode = ev.timecode;
                    assert.ok(_rec11._expr(_rec11._capt(_rec11._capt(Number, 'arguments/0/callee/object').isFinite(_rec11._capt(timecode, 'arguments/0/arguments/0')), 'arguments/0'), {
                        content: 'assert.ok(Number.isFinite(timecode), "cluster.timecode:" + timecode)',
                        filepath: 'lib/test.js',
                        line: 281
                    }), 'cluster.timecode:' + timecode);
                    assert.ok(_rec12._expr(_rec12._capt(_rec12._capt(_rec12._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(data.length > 0, "cluster.length:" + data.length)',
                        filepath: 'lib/test.js',
                        line: 282
                    }), 'cluster.length:' + data.length);
                    var assertion = data.every(function (elm) {
                        return elm.name === 'Cluster' || elm.name === 'Timecode' || elm.name === 'SimpleBlock';
                    });
                    assert.ok(_rec13._expr(_rec13._capt(assertion, 'arguments/0'), {
                        content: 'assert.ok(assertion, "element check")',
                        filepath: 'lib/test.js',
                        line: 284
                    }), 'element check');
                });
                reader.addListener('duration', function (ev) {
                    var _rec14 = new _PowerAssertRecorder1();
                    var duration = ev.duration, timecodeScale = ev.timecodeScale;
                    var d = duration * timecodeScale / 1000 / 1000 / 1000;
                    assert.ok(_rec14._expr(_rec14._capt(_rec14._capt(Number, 'arguments/0/callee/object').isFinite(_rec14._capt(d, 'arguments/0/arguments/0')), 'arguments/0'), {
                        content: 'assert.ok(Number.isFinite(d), "duration:" + d)',
                        filepath: 'lib/test.js',
                        line: 289
                    }), 'duration:' + d);
                });
                reader.addListener('webp', function (ev) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var webp, currentTime, src, img, err_1;
                        return __generator(this, function (_a) {
                            var _rec15 = new _PowerAssertRecorder1();
                            var _rec16 = new _PowerAssertRecorder1();
                            switch (_a.label) {
                            case 0:
                                webp = ev.webp, currentTime = ev.currentTime;
                                assert.ok(_rec15._expr(_rec15._capt(_rec15._capt(Number, 'arguments/0/callee/object').isFinite(_rec15._capt(currentTime, 'arguments/0/arguments/0')), 'arguments/0'), {
                                    content: 'assert.ok(Number.isFinite(currentTime), "webp.currentTime:" + currentTime)',
                                    filepath: 'lib/test.js',
                                    line: 297
                                }), 'webp.currentTime:' + currentTime);
                                src = URL.createObjectURL(webp);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    fetchImage(src)
                                ];
                            case 2:
                                img = _a.sent();
                                assert.ok(_rec16._expr(_rec16._capt(_rec16._capt(_rec16._capt(img, 'arguments/0/left/object').width, 'arguments/0/left') > 0, 'arguments/0'), {
                                    content: 'assert.ok(img.width > 0, "webp.width:" + img.width)',
                                    filepath: 'lib/test.js',
                                    line: 305
                                }), 'webp.width:' + img.width);
                                put(img, 'time: ' + currentTime);
                                return [
                                    3,
                                    4
                                ];
                            case 3:
                                err_1 = _a.sent();
                                assert.ok(false, 'webp load failre');
                                return [
                                    3,
                                    4
                                ];
                            case 4:
                                URL.revokeObjectURL(src);
                                return [2];
                            }
                        });
                    });
                });
                assert.ok(true, 'wait a minute');
                rec.start(100);
                return [
                    4,
                    sleep(10 * 1000)
                ];
            case 2:
                _a.sent();
                rec.stop();
                rec.stream.getTracks().map(function (track) {
                    track.stop();
                });
                reader.stop();
                assert.ok(true, 'stop');
                return [2];
            }
        });
    });
});
function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}
function fetchVideo(src) {
    return new Promise(function (resolve, reject) {
        var video = document.createElement('video');
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
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function (err) {
            reject(err.error);
        };
    });
}
function readAsArrayBuffer(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function () {
            resolve(reader.result);
        };
        reader.onerror = function (ev) {
            reject(ev.error);
        };
    });
}
function put(elm, title) {
    var h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(title));
    document.body.appendChild(h1);
    document.body.appendChild(elm);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiX19nZW5lcmF0b3IiLCJib2R5IiwiXyIsImxhYmVsIiwic2VudCIsInQiLCJ0cnlzIiwib3BzIiwiZiIsInkiLCJnIiwidmVyYiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibiIsInYiLCJvcCIsIlR5cGVFcnJvciIsImNhbGwiLCJwb3AiLCJsZW5ndGgiLCJfdGhpcyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsIl8xIiwicmVxdWlyZSIsIl8yIiwiRUJNTFJlYWRlcl8xIiwiQnVmZmVyIiwiUVVuaXQiLCJlbXBvd2VyIiwiZm9ybWF0dGVyIiwicXVuaXRUYXAiLCJjb25maWciLCJhdXRvc3RhcnQiLCJhc3NlcnQiLCJkZXN0cnVjdGl2ZSIsImNvbnNvbGUiLCJsb2ciLCJhcmd1bWVudHMiLCJzaG93U291cmNlT25GYWlsdXJlIiwibW9kdWxlIiwidGVzdCIsImRlY29kZXIiLCJlbmNvZGVyIiwicmVzIiwiYnVmIiwiZWxtcyIsImJ1ZjIiLCJlbG1zMiIsIl9hIiwiX3JlYzEiLCJfcmVjMiIsIkRlY29kZXIiLCJFbmNvZGVyIiwiZmV0Y2giLCJhcnJheUJ1ZmZlciIsImRlY29kZSIsImVuY29kZSIsIm9rIiwiYnl0ZUxlbmd0aCIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJ0YWdTdHJlYW0iLCJiaW5hcml6ZWQiLCJuYW1lIiwidHlwZSIsImlzRW5kIiwidW5rbm93blNpemUiLCJtYXAiLCJ0b29scyIsImVuY29kZVZhbHVlVG9CdWZmZXIiLCJmb3JFYWNoIiwiZWxtIiwiaSIsIl9yZWMzIiwiX3JlYzQiLCJfcmVjNSIsIl9yZWM2Iiwib3JpZ2luIiwicmVhZGVyIiwidGFza3MiLCJtZXRhZGF0YUJ1ZiIsIndlYk0iLCJsYXN0X2R1cmF0aW9uIiwiY2x1c3RlclB0cnMiLCJzdHJlYW0iLCJyZWMiLCJtZXRhZGF0YUVsbXMiLCJyZWZpbmVkRWxtcyIsInJlZmluZWRNZXRhZGF0YUJ1ZiIsIndlYk1CdWYiLCJyZWZpbmVkV2ViTSIsInJlZmluZWRXZWJNQnVmIiwiX3JlYWRlciIsInJhd192aWRlbyIsInJlZmluZWRfdmlkZW8iLCJfcmVjNyIsIl9yZWM4IiwiZGVmYXVsdCIsImxvZ2dpbmciLCJpbmZvIiwiQXJyYXlCdWZmZXIiLCJCbG9iIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZ2V0VXNlck1lZGlhIiwidmlkZW8iLCJhdWRpbyIsIk1lZGlhUmVjb3JkZXIiLCJtaW1lVHlwZSIsImFkZExpc3RlbmVyIiwiZGF0YSIsInRpbWVjb2RlU2NhbGUiLCJkdXJhdGlvbiIsInB0ciIsIm9uZGF0YWF2YWlsYWJsZSIsImV2IiwiY2h1bmsiLCJ0YXNrIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJyZWFkIiwic3RhcnQiLCJzbGVlcCIsInN0b3AiLCJ1bmRlZmluZWQiLCJnZXRUcmFja3MiLCJ0cmFjayIsInB1dFJlZmluZWRNZXRhRGF0YSIsInNsaWNlIiwiZmV0Y2hWaWRlbyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInB1dCIsIk51bWJlciIsImlzRmluaXRlIiwiX3JlYzkiLCJfcmVjMTAiLCJfcmVjMTEiLCJfcmVjMTIiLCJfcmVjMTMiLCJ0aW1lY29kZSIsImFzc2VydGlvbiIsImV2ZXJ5IiwiX3JlYzE0IiwiZCIsIndlYnAiLCJjdXJyZW50VGltZSIsInNyYyIsImltZyIsImVycl8xIiwiX3JlYzE1IiwiX3JlYzE2IiwiZmV0Y2hJbWFnZSIsIndpZHRoIiwicmV2b2tlT2JqZWN0VVJMIiwibXMiLCJzZXRUaW1lb3V0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udHJvbHMiLCJvbmxvYWRlZGRhdGEiLCJvbmVycm9yIiwiZXJyIiwiSW1hZ2UiLCJvbmxvYWQiLCJlcnJvciIsImJsb2IiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwidGl0bGUiLCJoMSIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsSUFBQUEscUJBQUE7QUFBQSxhQUFBQyxtQkFBQTtBQUFBLGFBQUFDLFFBQUE7QUFBQTtBQUFBLElBQUFELG1CQUFBLENBQUFFLFNBQUEsQ0FBQUMsS0FBQSxZQUFBQSxLQUFBLENBQUFDLEtBQUEsRUFBQUMsTUFBQTtBQUFBLGFBQUFKLFFBQUEsQ0FBQUssSUFBQTtBQUFBLFlBQUFGLEtBQUEsRUFBQUEsS0FBQTtBQUFBLFlBQUFDLE1BQUEsRUFBQUEsTUFBQTtBQUFBO0FBQUEsZUFBQUQsS0FBQTtBQUFBO0FBQUEsSUFBQUosbUJBQUEsQ0FBQUUsU0FBQSxDQUFBSyxLQUFBLFlBQUFBLEtBQUEsQ0FBQUgsS0FBQSxFQUFBSSxNQUFBO0FBQUEsWUFBQUMsY0FBQSxRQUFBUixRQUFBO0FBQUEsYUFBQUEsUUFBQTtBQUFBO0FBQUEsWUFBQVMsa0JBQUE7QUFBQSxnQkFBQU4sS0FBQSxFQUFBQSxLQUFBO0FBQUEsZ0JBQUFPLE1BQUEsRUFBQUYsY0FBQTtBQUFBO0FBQUEsWUFBQUQsTUFBQSxFQUFBQSxNQUFBO0FBQUE7QUFBQTtBQUFBLFdBQUFSLG1CQUFBO0FBQUE7QUFDQSxJQUFJWSxTQUFBLEdBQWEsUUFBUSxLQUFLQSxTQUFkLElBQTRCLFVBQVVDLE9BQVYsRUFBbUJDLFVBQW5CLEVBQStCQyxDQUEvQixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFBQSxJ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QUFBLENBQU9rRixPQUFQLEdBQWlCLFVBQVU3QyxFQUFWLEVBQWM7QUFBQSxZQUFFakksTUFBQSxDQUFPaUksRUFBQSxDQUFHaUQsS0FBVixFQUFGO0FBQUEsU0FBL0IsQ0FKMEM7QUFBQSxLQUF2QyxDQUFQLENBRDZCO0FBQUEsQ0FwV2pDO0FBNFdBLFNBQVNqQyxHQUFULENBQWE1RCxHQUFiLEVBQWtCaUcsS0FBbEIsRUFBeUI7QUFBQSxJQUNyQixJQUFJQyxFQUFBLEdBQUtiLFFBQUEsQ0FBU0MsYUFBVCxDQUF1QixJQUF2QixDQUFULENBRHFCO0FBQUEsSUFFckJZLEVBQUEsQ0FBR0MsV0FBSCxDQUFlZCxRQUFBLENBQVNlLGNBQVQsQ0FBd0JILEtBQXhCLENBQWYsRUFGcUI7QUFBQSxJQUdyQlosUUFBQSxDQUFTL0osSUFBVCxDQUFjNkssV0FBZCxDQUEwQkQsRUFBMUIsRUFIcUI7QUFBQSxJQUlyQmIsUUFBQSxDQUFTL0osSUFBVCxDQUFjNkssV0FBZCxDQUEwQm5HLEdBQTFCLEVBSnFCO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF90aGlzID0gdGhpcztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBfMiA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBFQk1MUmVhZGVyXzEgPSByZXF1aXJlKFwiLi9FQk1MUmVhZGVyXCIpO1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoXCJidWZmZXIvXCIpLkJ1ZmZlcjtcbnZhciBRVW5pdCA9IHJlcXVpcmUoJ3F1bml0anMnKTtcbnZhciBlbXBvd2VyID0gcmVxdWlyZSgnZW1wb3dlcicpO1xudmFyIGZvcm1hdHRlciA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydC1mb3JtYXR0ZXInKTtcbnZhciBxdW5pdFRhcCA9IHJlcXVpcmUoXCJxdW5pdC10YXBcIik7XG5RVW5pdC5jb25maWcuYXV0b3N0YXJ0ID0gdHJ1ZTtcbmVtcG93ZXIoUVVuaXQuYXNzZXJ0LCBmb3JtYXR0ZXIoKSwgeyBkZXN0cnVjdGl2ZTogdHJ1ZSB9KTtcbnF1bml0VGFwKFFVbml0LCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7IH0sIHsgc2hvd1NvdXJjZU9uRmFpbHVyZTogZmFsc2UgfSk7XG5RVW5pdC5tb2R1bGUoXCJ0cy1FQk1MXCIpO1xuUVVuaXQudGVzdChcImVuY29kZXItZGVjb2RlclwiLCBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRlY29kZXIsIGVuY29kZXIsIHJlcywgYnVmLCBlbG1zLCBidWYyLCBlbG1zMjtcbiAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBkZWNvZGVyID0gbmV3IF8xLkRlY29kZXIoKTtcbiAgICAgICAgICAgICAgICBlbmNvZGVyID0gbmV3IF8xLkVuY29kZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcIi4uL29rLndlYm1cIildO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYpO1xuICAgICAgICAgICAgICAgIGJ1ZjIgPSBuZXcgXzEuRW5jb2RlcigpLmVuY29kZShlbG1zKTtcbiAgICAgICAgICAgICAgICBlbG1zMiA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1ZjIpO1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhidWYuYnl0ZUxlbmd0aCA9PT0gYnVmMi5ieXRlTGVuZ3RoLCBcIlRoaXMgcHJvYmxlbSBpcyBkdWUgdG8gbm90IGltcGxlbWVudGluZyB0aGUgdmFyaWFibGUgaW50IHdyaXRpbmcgdG9vbHMucHV0UmVmaW5lZE1ldGFEYXRhIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG1zLmxlbmd0aCA9PT0gZWxtczIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyB9KTtcblFVbml0LnRlc3QoXCJoYW5kd3JpdGUtZW5jb2RlclwiLCBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRhZ1N0cmVhbSwgYmluYXJpemVkLCBidWYsIGVsbXM7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB0YWdTdHJlYW0gPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFwiLCB0eXBlOiBcIm1cIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxSZWFkVmVyc2lvblwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MTWF4SURMZW5ndGhcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTE1heFNpemVMZW5ndGhcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA4IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVwiLCB0eXBlOiBcInNcIiwgdmFsdWU6IFwid2VibVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVJlYWRWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2VnbWVudFwiLCB0eXBlOiBcIm1cIiwgdW5rbm93blNpemU6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTZWVrSGVhZFwiLCB0eXBlOiBcIm1cIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlNlZWtIZWFkXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkluZm9cIiwgdHlwZTogXCJtXCIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUaW1lY29kZVNjYWxlXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMTAwMDAwMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkluZm9cIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiQ2x1c3RlclwiLCB0eXBlOiBcIm1cIiwgdW5rbm93blNpemU6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUaW1lY29kZVwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTaW1wbGVCbG9ja1wiLCB0eXBlOiBcImJcIiwgdmFsdWU6IG5ldyBCdWZmZXIoMTAyNCkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgYmluYXJpemVkID0gdGFnU3RyZWFtLm1hcChfMi50b29scy5lbmNvZGVWYWx1ZVRvQnVmZmVyKTtcbiAgICAgICAgYnVmID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoYmluYXJpemVkKTtcbiAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtLCBpKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luID0gdGFnU3RyZWFtW2ldO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBvcmlnaW4ubmFtZSwgXCJjb21wYXJlIHRhZyBuYW1lXCIpO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS50eXBlID09PSBvcmlnaW4udHlwZSwgXCJjb21wYXJlIHRhZyB0eXBlXCIpO1xuICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcIm1cIiB8fCBvcmlnaW4udHlwZSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiIHx8IG9yaWdpbi50eXBlID09PSBcImJcIikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWVbXCJsZW5ndGhcIl0gPT09IG9yaWdpbi52YWx1ZVtcImxlbmd0aFwiXSwgXCJjb21wYXJlIHRhZyB2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlID09PSBvcmlnaW4udmFsdWUsIFwiY29tcGFyZSB0YWcgdmFsdWVcIik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgfSk7XG59KTsgfSk7XG5RVW5pdC50ZXN0KFwiY29udmVydF90b19zZWVrYWJsZV9mcm9tX21lZGlhX3JlY29yZGVyXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBkZWNvZGVyLCByZWFkZXIsIHRhc2tzLCBtZXRhZGF0YUJ1Ziwgd2ViTSwgbGFzdF9kdXJhdGlvbiwgY2x1c3RlclB0cnMsIHN0cmVhbSwgcmVjLCBtZXRhZGF0YUVsbXMsIHJlZmluZWRFbG1zLCByZWZpbmVkTWV0YWRhdGFCdWYsIHdlYk1CdWYsIGJvZHksIHJlZmluZWRXZWJNLCByZWZpbmVkV2ViTUJ1ZiwgZWxtcywgX3JlYWRlciwgcmF3X3ZpZGVvLCByZWZpbmVkX3ZpZGVvO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGRlY29kZXIgPSBuZXcgXzEuRGVjb2RlcigpO1xuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyBFQk1MUmVhZGVyXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5sb2dnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJ1bnNlZWthYmxlIG9yaWdpbmFsXCIpO1xuICAgICAgICAgICAgICAgIHRhc2tzID0gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGFCdWYgPSBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gICAgICAgICAgICAgICAgd2ViTSA9IG5ldyBCbG9iKFtdLCB7IHR5cGU6IFwidmlkZW8vd2VibVwiIH0pO1xuICAgICAgICAgICAgICAgIGxhc3RfZHVyYXRpb24gPSAwO1xuICAgICAgICAgICAgICAgIGNsdXN0ZXJQdHJzID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyB2aWRlbzogdHJ1ZSwgYXVkaW86IHRydWUgfSldO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHN0cmVhbSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZWMgPSBuZXcgTWVkaWFSZWNvcmRlcihzdHJlYW0sIHsgbWltZVR5cGU6ICd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIG9wdXNcIicgfSk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwibWV0YWRhdGFcIiwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gX2EuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFCdWYgPSBuZXcgXzEuRW5jb2RlcigpLmVuY29kZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWFkZXIuYWRkTGlzdGVuZXIoXCJkdXJhdGlvblwiLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVjb2RlU2NhbGUgPSBfYS50aW1lY29kZVNjYWxlLCBkdXJhdGlvbiA9IF9hLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBsYXN0X2R1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiY2x1c3Rlcl9wdHJcIiwgZnVuY3Rpb24gKHB0cikge1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyUHRycy5wdXNoKHB0cik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVjLm9uZGF0YWF2YWlsYWJsZSA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2h1bmsgPSBldi5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB3ZWJNID0gbmV3IEJsb2IoW3dlYk0sIGNodW5rXSwgeyB0eXBlOiBjaHVuay50eXBlIH0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFzayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWYsIGVsbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHJlYWRBc0FycmF5QnVmZmVyKGNodW5rKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXMgPSBkZWNvZGVyLmRlY29kZShidWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmVhZGVyLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9O1xuICAgICAgICAgICAgICAgICAgICB0YXNrcyA9IHRhc2tzLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFzaygpOyB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlYy5zdGFydCgxMDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHNsZWVwKDEwICogMTAwMCldO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZWMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHJlYy5vbmRhdGFhdmFpbGFibGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmVjLnN0cmVhbS5nZXRUcmFja3MoKS5tYXAoZnVuY3Rpb24gKHRyYWNrKSB7IHRyYWNrLnN0b3AoKTsgfSk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YUVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShtZXRhZGF0YUJ1Zik7XG4gICAgICAgICAgICAgICAgcmVmaW5lZEVsbXMgPSBfMi50b29scy5wdXRSZWZpbmVkTWV0YURhdGEobWV0YWRhdGFFbG1zLCBjbHVzdGVyUHRycywgbGFzdF9kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgcmVmaW5lZE1ldGFkYXRhQnVmID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUocmVmaW5lZEVsbXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlYWRBc0FycmF5QnVmZmVyKHdlYk0pXTtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB3ZWJNQnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIGJvZHkgPSB3ZWJNQnVmLnNsaWNlKG1ldGFkYXRhQnVmLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgICAgIHJlZmluZWRXZWJNID0gbmV3IEJsb2IoW3JlZmluZWRNZXRhZGF0YUJ1ZiwgYm9keV0sIHsgdHlwZTogd2ViTS50eXBlIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcInNlZWthYmxlIHdlYm1cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVhZEFzQXJyYXlCdWZmZXIocmVmaW5lZFdlYk0pXTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZWZpbmVkV2ViTUJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUocmVmaW5lZFdlYk1CdWYpO1xuICAgICAgICAgICAgICAgIF9yZWFkZXIgPSBuZXcgRUJNTFJlYWRlcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBfcmVhZGVyLmxvZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7IHJldHVybiBfcmVhZGVyLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgX3JlYWRlci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hWaWRlbyhVUkwuY3JlYXRlT2JqZWN0VVJMKHdlYk0pKV07XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmF3X3ZpZGVvID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHB1dChyYXdfdmlkZW8sIFwibWVkaWEtcmVjb3JkZXItb3JpZ2luYWwobm90IHNlZWthYmxlKVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaFZpZGVvKFVSTC5jcmVhdGVPYmplY3RVUkwocmVmaW5lZFdlYk0pKV07XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgcmVmaW5lZF92aWRlbyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBwdXQocmVmaW5lZF92aWRlbywgXCJhZGQtc2Vla2hlYWQtYW5kLWR1cmF0aW9uKHNlZWthYmxlKVwiKTtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soIU51bWJlci5pc0Zpbml0ZShyYXdfdmlkZW8uZHVyYXRpb24pLCBcIm1lZGlhIHJlY29yZGVyIHdlYm0gZHVyYXRpb24gaXMgbm90IGZpbml0ZVwiKTtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKHJlZmluZWRfdmlkZW8uZHVyYXRpb24pLCBcInJlZmluZWQgd2VibSBkdXJhdGlvbiBpcyBmaW5pdGVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfSk7XG5RVW5pdC50ZXN0KFwiY29udmVydF90b19zZWVrYWJsZV9mcm9tX21vel9maWxlXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzLCBidWYsIGVsbXMsIHJlYWRlciwgbWV0YWRhdGFCdWYsIGxhc3RfZHVyYXRpb24sIGNsdXN0ZXJQdHJzLCBtZXRhZGF0YUVsbXMsIHJlZmluZWRFbG1zLCBfcmVhZGVyO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcIi4uL29rLndlYm1cIildO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYpO1xuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyBFQk1MUmVhZGVyXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5sb2dnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YUJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICAgICAgICAgICAgICBsYXN0X2R1cmF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBjbHVzdGVyUHRycyA9IFtdO1xuICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcIm1ldGFkYXRhXCIsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IF9hLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhQnVmID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiZHVyYXRpb25cIiwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aW1lY29kZVNjYWxlID0gX2EudGltZWNvZGVTY2FsZSwgZHVyYXRpb24gPSBfYS5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcImNsdXN0ZXJfcHRyXCIsIGZ1bmN0aW9uIChwdHIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlclB0cnMucHVzaChwdHIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7IHJldHVybiByZWFkZXIucmVhZChlbG0pOyB9KTtcbiAgICAgICAgICAgICAgICByZWFkZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhRWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKG1ldGFkYXRhQnVmKTtcbiAgICAgICAgICAgICAgICByZWZpbmVkRWxtcyA9IF8yLnRvb2xzLnB1dFJlZmluZWRNZXRhRGF0YShtZXRhZGF0YUVsbXMsIGNsdXN0ZXJQdHJzLCBsYXN0X2R1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICBfcmVhZGVyID0gbmV3IEVCTUxSZWFkZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgX3JlYWRlci5sb2dnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWZpbmVkRWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmV0dXJuIF9yZWFkZXIucmVhZChlbG0pOyB9KTtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfSk7XG5RVW5pdC50ZXN0KFwid2VicFwiLCBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgcmVhZGVyLCBkZWNvZGVyLCB0YXNrcywgbWV0YWRhdGFCdWYsIHdlYk0sIHN0cmVhbSwgcmVjO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyBFQk1MUmVhZGVyXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGRlY29kZXIgPSBuZXcgXzEuRGVjb2RlcigpO1xuICAgICAgICAgICAgICAgIHRhc2tzID0gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGFCdWYgPSBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gICAgICAgICAgICAgICAgd2ViTSA9IG5ldyBCbG9iKFtdLCB7IHR5cGU6IFwidmlkZW8vd2VibVwiIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgdmlkZW86IHRydWUsIGF1ZGlvOiB0cnVlIH0pXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBzdHJlYW0gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgcmVjID0gbmV3IE1lZGlhUmVjb3JkZXIoc3RyZWFtLCB7IG1pbWVUeXBlOiAndmlkZW8vd2VibTsgY29kZWNzPVwib3B1cyx2cDhcIicgfSk7XG4gICAgICAgICAgICAgICAgcmVjLm9uZGF0YWF2YWlsYWJsZSA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2h1bmsgPSBldi5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB3ZWJNID0gbmV3IEJsb2IoW3dlYk0sIGNodW5rXSwgeyB0eXBlOiBjaHVuay50eXBlIH0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFzayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWYsIGVsbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHJlYWRBc0FycmF5QnVmZmVyKGNodW5rKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsbXMgPSBkZWNvZGVyLmRlY29kZShidWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmVhZGVyLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9O1xuICAgICAgICAgICAgICAgICAgICB0YXNrcyA9IHRhc2tzLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFzaygpOyB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcIm1ldGFkYXRhXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGV2LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhkYXRhLmxlbmd0aCA+IDAsIFwibWV0YWRhdGEubGVuZ3RoOlwiICsgZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZGF0YVswXS5uYW1lID09PSBcIkVCTUxcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiY2x1c3RlclwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBldi5kYXRhLCB0aW1lY29kZSA9IGV2LnRpbWVjb2RlO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKHRpbWVjb2RlKSwgXCJjbHVzdGVyLnRpbWVjb2RlOlwiICsgdGltZWNvZGUpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZGF0YS5sZW5ndGggPiAwLCBcImNsdXN0ZXIubGVuZ3RoOlwiICsgZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXNzZXJ0aW9uID0gZGF0YS5ldmVyeShmdW5jdGlvbiAoZWxtKSB7IHJldHVybiBlbG0ubmFtZSA9PT0gXCJDbHVzdGVyXCIgfHwgZWxtLm5hbWUgPT09IFwiVGltZWNvZGVcIiB8fCBlbG0ubmFtZSA9PT0gXCJTaW1wbGVCbG9ja1wiOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGFzc2VydGlvbiwgXCJlbGVtZW50IGNoZWNrXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcImR1cmF0aW9uXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBldi5kdXJhdGlvbiwgdGltZWNvZGVTY2FsZSA9IGV2LnRpbWVjb2RlU2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gZHVyYXRpb24gKiB0aW1lY29kZVNjYWxlIC8gMTAwMCAvIDEwMDAgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKGQpLCBcImR1cmF0aW9uOlwiICsgZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwid2VicFwiLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdlYnAsIGN1cnJlbnRUaW1lLCBzcmMsIGltZywgZXJyXzE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnAgPSBldi53ZWJwLCBjdXJyZW50VGltZSA9IGV2LmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKGN1cnJlbnRUaW1lKSwgXCJ3ZWJwLmN1cnJlbnRUaW1lOlwiICsgY3VycmVudFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHdlYnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaEltYWdlKHNyYyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soaW1nLndpZHRoID4gMCwgXCJ3ZWJwLndpZHRoOlwiICsgaW1nLndpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHV0KGltZywgXCJ0aW1lOiBcIiArIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGZhbHNlLCBcIndlYnAgbG9hZCBmYWlscmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2sodHJ1ZSwgXCJ3YWl0IGEgbWludXRlXCIpO1xuICAgICAgICAgICAgICAgIHJlYy5zdGFydCgxMDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHNsZWVwKDEwICogMTAwMCldO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZWMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHJlYy5zdHJlYW0uZ2V0VHJhY2tzKCkubWFwKGZ1bmN0aW9uICh0cmFjaykgeyB0cmFjay5zdG9wKCk7IH0pO1xuICAgICAgICAgICAgICAgIHJlYWRlci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHRydWUsIFwic3RvcFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyB9KTtcbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTsgfSk7XG59XG5mdW5jdGlvbiBmZXRjaFZpZGVvKHNyYykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcbiAgICAgICAgdmlkZW8uc3JjID0gc3JjO1xuICAgICAgICB2aWRlby5jb250cm9scyA9IHRydWU7XG4gICAgICAgIHZpZGVvLm9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZpZGVvLm9ubG9hZGVkZGF0YSA9IG51bGw7XG4gICAgICAgICAgICByZXNvbHZlKHZpZGVvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmlkZW8ub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHZpZGVvLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaEltYWdlKHNyYykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgcmVzb2x2ZShpbWcpOyB9O1xuICAgICAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHsgcmVqZWN0KGVyci5lcnJvcik7IH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZWFkQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHsgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTsgfTtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXYpIHsgcmVqZWN0KGV2LmVycm9yKTsgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHB1dChlbG0sIHRpdGxlKSB7XG4gICAgdmFyIGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGgxLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRpdGxlKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoMSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbG0pO1xufVxuIl19

