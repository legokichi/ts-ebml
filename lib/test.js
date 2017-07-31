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
var WEBM_FILE_LIST = [
    '../matroska-test-files/test_files/test1.mkv',
    '../matroska-test-files/test_files/test2.mkv',
    '../matroska-test-files/test_files/test3.mkv',
    '../matroska-test-files/test_files/test5.mkv',
    '../matroska-test-files/test_files/test6.mkv',
    '../matroska-test-files/test_files/test8.mkv'
];
QUnit.module('ts-EBML');
QUnit.test('encoder-decoder', function (assert) {
    return __awaiter(_this, void 0, void 0, function () {
        var file, res, buf, elms, buf2, elms2, tests, _i, tests_1, test;
        return __generator(this, function (_a) {
            switch (_a.label) {
            case 0:
                file = '../matroska-test-files/test_files/test1.mkv';
                return [
                    4,
                    fetch(file)
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
                tests = [
                    {
                        index: 0,
                        test: function (elm) {
                            var _rec1 = new _PowerAssertRecorder1();
                            assert.ok(_rec1._expr(_rec1._capt(_rec1._capt(_rec1._capt(_rec1._capt(_rec1._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'EBML', 'arguments/0/left/left') && _rec1._capt(_rec1._capt(_rec1._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec1._capt(_rec1._capt(_rec1._capt(elm, 'arguments/0/right/left/object').isEnd, 'arguments/0/right/left') === false, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "EBML" && elm.type === "m" && elm.isEnd === false)',
                                filepath: 'lib/test.js',
                                line: 77
                            }));
                        }
                    },
                    {
                        index: 4,
                        test: function (elm) {
                            var _rec2 = new _PowerAssertRecorder1();
                            assert.ok(_rec2._expr(_rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'EBML', 'arguments/0/left/left') && _rec2._capt(_rec2._capt(_rec2._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec2._capt(_rec2._capt(_rec2._capt(elm, 'arguments/0/right/left/object').isEnd, 'arguments/0/right/left') === true, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "EBML" && elm.type === "m" && elm.isEnd === true)',
                                filepath: 'lib/test.js',
                                line: 78
                            }));
                        }
                    },
                    {
                        index: 5,
                        test: function (elm) {
                            var _rec3 = new _PowerAssertRecorder1();
                            assert.ok(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'Segment', 'arguments/0/left/left') && _rec3._capt(_rec3._capt(_rec3._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec3._capt(_rec3._capt(_rec3._capt(elm, 'arguments/0/right/left/object').isEnd, 'arguments/0/right/left') === false, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "Segment" && elm.type === "m" && elm.isEnd === false)',
                                filepath: 'lib/test.js',
                                line: 79
                            }));
                        }
                    },
                    {
                        index: 24,
                        test: function (elm) {
                            var _rec4 = new _PowerAssertRecorder1();
                            assert.ok(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'Info', 'arguments/0/left/left') && _rec4._capt(_rec4._capt(_rec4._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec4._capt(_rec4._capt(_rec4._capt(elm, 'arguments/0/right/left/object').isEnd, 'arguments/0/right/left') === false, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "Info" && elm.type === "m" && elm.isEnd === false)',
                                filepath: 'lib/test.js',
                                line: 80
                            }));
                        }
                    },
                    {
                        index: 25,
                        test: function (elm) {
                            var _rec5 = new _PowerAssertRecorder1();
                            assert.ok(_rec5._expr(_rec5._capt(_rec5._capt(_rec5._capt(_rec5._capt(_rec5._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'Duration', 'arguments/0/left/left') && _rec5._capt(_rec5._capt(_rec5._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'f', 'arguments/0/left/right'), 'arguments/0/left') && _rec5._capt(_rec5._capt(_rec5._capt(elm, 'arguments/0/right/left/object').value, 'arguments/0/right/left') === 87336, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "Duration" && elm.type === "f" && elm.value === 87336)',
                                filepath: 'lib/test.js',
                                line: 81
                            }));
                        }
                    },
                    {
                        index: 26,
                        test: function (elm) {
                            var _rec6 = new _PowerAssertRecorder1();
                            assert.ok(_rec6._expr(_rec6._capt(_rec6._capt(_rec6._capt(_rec6._capt(_rec6._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'MuxingApp', 'arguments/0/left/left') && _rec6._capt(_rec6._capt(_rec6._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === '8', 'arguments/0/left/right'), 'arguments/0/left') && _rec6._capt(_rec6._capt(_rec6._capt(elm, 'arguments/0/right/left/object').value, 'arguments/0/right/left') === 'libebml2 v0.10.0 + libmatroska2 v0.10.1', 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "MuxingApp" && elm.type === "8" && elm.value === "libebml2 v0.10.0 + libmatroska2 v0.10.1")',
                                filepath: 'lib/test.js',
                                line: 82
                            }));
                        }
                    },
                    {
                        index: 28,
                        test: function (elm) {
                            var _rec7 = new _PowerAssertRecorder1();
                            var _rec8 = new _PowerAssertRecorder1();
                            var _rec9 = new _PowerAssertRecorder1();
                            assert.ok(_rec7._expr(_rec7._capt(_rec7._capt(_rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'DateUTC', 'arguments/0/left/left') && _rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'd', 'arguments/0/left/right'), 'arguments/0/left') && _rec7._capt(_rec7._capt(typeof _rec7._capt(_rec7._capt(elm, 'arguments/0/right/left/argument/object').value, 'arguments/0/right/left/argument'), 'arguments/0/right/left') === 'string', 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "DateUTC" && elm.type === "d" && typeof elm.value === "string")',
                                filepath: 'lib/test.js',
                                line: 84
                            }));
                            assert.ok(_rec8._expr(_rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(elm, 'arguments/0/left/left/object').type, 'arguments/0/left/left') === 'd', 'arguments/0/left') && _rec8._capt(_rec8._capt(_rec8._capt(new Date(_rec8._capt(_rec8._capt(_rec8._capt(new Date('2001-01-01T00:00:00.000Z'), 'arguments/0/right/left/callee/object/arguments/0/left/callee/object').getTime(), 'arguments/0/right/left/callee/object/arguments/0/left') + _rec8._capt(_rec8._capt(_rec8._capt(Number(_rec8._capt(_rec8._capt(elm, 'arguments/0/right/left/callee/object/arguments/0/right/left/left/arguments/0/object').value, 'arguments/0/right/left/callee/object/arguments/0/right/left/left/arguments/0')), 'arguments/0/right/left/callee/object/arguments/0/right/left/left') / 1000, 'arguments/0/right/left/callee/object/arguments/0/right/left') / 1000, 'arguments/0/right/left/callee/object/arguments/0/right'), 'arguments/0/right/left/callee/object/arguments/0')), 'arguments/0/right/left/callee/object').getTime(), 'arguments/0/right/left') === _rec8._capt(_rec8._capt(new Date('2010-08-21T07:23:03.000Z'), 'arguments/0/right/right/callee/object').getTime(), 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.type === "d" && new Date(new Date("2001-01-01T00:00:00.000Z").getTime() + Number(elm.value) / 1000 / 1000).getTime() === new Date("2010-08-21T07:23:03.000Z").getTime())',
                                filepath: 'lib/test.js',
                                line: 85
                            }));
                            assert.ok(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt(_rec9._capt(elm, 'arguments/0/left/left/object').type, 'arguments/0/left/left') === 'd', 'arguments/0/left') && _rec9._capt(_rec9._capt(_rec9._capt(_rec9._capt(_rec9._capt(_2, 'arguments/0/right/left/callee/object/callee/object/object').tools, 'arguments/0/right/left/callee/object/callee/object').convertEBMLDateToJSDate(_rec9._capt(_rec9._capt(elm, 'arguments/0/right/left/callee/object/arguments/0/object').value, 'arguments/0/right/left/callee/object/arguments/0')), 'arguments/0/right/left/callee/object').getTime(), 'arguments/0/right/left') === _rec9._capt(_rec9._capt(new Date('2010-08-21T07:23:03.000Z'), 'arguments/0/right/right/callee/object').getTime(), 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.type === "d" && _2.tools.convertEBMLDateToJSDate(elm.value).getTime() === new Date("2010-08-21T07:23:03.000Z").getTime())',
                                filepath: 'lib/test.js',
                                line: 86
                            }));
                        }
                    },
                    {
                        index: 29,
                        test: function (elm) {
                            var _rec10 = new _PowerAssertRecorder1();
                            var _rec11 = new _PowerAssertRecorder1();
                            assert.ok(_rec10._expr(_rec10._capt(_rec10._capt(_rec10._capt(_rec10._capt(elm, 'arguments/0/left/left/object').name, 'arguments/0/left/left') === 'SegmentUID', 'arguments/0/left') && _rec10._capt(_rec10._capt(_rec10._capt(elm, 'arguments/0/right/left/object').type, 'arguments/0/right/left') === 'b', 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "SegmentUID" && elm.type === "b")',
                                filepath: 'lib/test.js',
                                line: 89
                            }));
                            if (elm.type === 'b') {
                                var buf_1 = new Uint8Array(new Buffer([
                                    146,
                                    45,
                                    25,
                                    50,
                                    15,
                                    30,
                                    19,
                                    197,
                                    181,
                                    5,
                                    99,
                                    10,
                                    175,
                                    216,
                                    83,
                                    54
                                ]));
                                var buf2_1 = new Uint8Array(elm.value);
                                assert.ok(_rec11._expr(_rec11._capt(_rec11._capt(buf_1, 'arguments/0/callee/object').every(function (val, i) {
                                    return buf2_1[i] === val;
                                }), 'arguments/0'), {
                                    content: 'assert.ok(buf_1.every(function (val, i) {return buf2_1[i] === val;}))',
                                    filepath: 'lib/test.js',
                                    line: 93
                                }));
                            }
                        }
                    }
                ];
                for (_i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
                    test = tests_1[_i];
                    test.test(elms2[test.index]);
                }
                return [2];
            }
        });
    });
});
WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test('encoder-decoder:' + file, create_encoder_decoder_test(file));
});
function create_encoder_decoder_test(file) {
    var _this = this;
    return function (assert) {
        return __awaiter(_this, void 0, void 0, function () {
            var res, buf, elms, buf2, elms2, i, elm, elm2;
            return __generator(this, function (_a) {
                var _rec12 = new _PowerAssertRecorder1();
                var _rec13 = new _PowerAssertRecorder1();
                var _rec14 = new _PowerAssertRecorder1();
                var _rec15 = new _PowerAssertRecorder1();
                var _rec16 = new _PowerAssertRecorder1();
                switch (_a.label) {
                case 0:
                    return [
                        4,
                        fetch(file)
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
                    assert.ok(_rec12._expr(_rec12._capt(_rec12._capt(_rec12._capt(elms, 'arguments/0/left/object').length, 'arguments/0/left') === _rec12._capt(_rec12._capt(elms2, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elms.length === elms2.length)',
                        filepath: 'lib/test.js',
                        line: 124
                    }));
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < elms.length))
                        return [
                            3,
                            6
                        ];
                    elm = elms[i];
                    elm2 = elms2[i];
                    assert.ok(_rec13._expr(_rec13._capt(_rec13._capt(_rec13._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec13._capt(_rec13._capt(elm2, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.name === elm2.name)',
                        filepath: 'lib/test.js',
                        line: 131
                    }));
                    assert.ok(_rec14._expr(_rec14._capt(_rec14._capt(_rec14._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec14._capt(_rec14._capt(elm2, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.type === elm2.type)',
                        filepath: 'lib/test.js',
                        line: 132
                    }));
                    if (elm.type === 'm' || elm2.type === 'm') {
                        return [2];
                    }
                    if (elm.type === 'b' && elm2.type === 'b') {
                        assert.ok(_rec15._expr(_rec15._capt(_rec15._capt(_rec15._capt(_rec15._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec15._capt(_rec15._capt(_rec15._capt(elm2, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(elm.value.length === elm2.value.length)',
                            filepath: 'lib/test.js',
                            line: 137
                        }));
                        return [2];
                    }
                    assert.ok(_rec16._expr(_rec16._capt(_rec16._capt(_rec16._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec16._capt(_rec16._capt(elm2, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.value === elm2.value)',
                        filepath: 'lib/test.js',
                        line: 140
                    }));
                    return [
                        4,
                        sleep(1)
                    ];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [
                        3,
                        3
                    ];
                case 6:
                    return [2];
                }
            });
        });
    };
}
QUnit.test('handwrite-encoder', function (assert) {
    return __awaiter(_this, void 0, void 0, function () {
        var tagStream, binarized, buf, elms;
        return __generator(this, function (_a) {
            tagStream = [
                {
                    name: 'EBML',
                    type: 'm',
                    isEnd: false
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
                    unknownSize: true,
                    isEnd: false
                },
                {
                    name: 'SeekHead',
                    type: 'm',
                    isEnd: false
                },
                {
                    name: 'SeekHead',
                    type: 'm',
                    isEnd: true
                },
                {
                    name: 'Info',
                    type: 'm',
                    isEnd: false
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
                    name: 'Duration',
                    type: 'f',
                    value: 0
                },
                {
                    name: 'Cluster',
                    type: 'm',
                    unknownSize: true,
                    isEnd: false
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
                var _rec17 = new _PowerAssertRecorder1();
                var _rec18 = new _PowerAssertRecorder1();
                var _rec19 = new _PowerAssertRecorder1();
                var _rec20 = new _PowerAssertRecorder1();
                var origin = tagStream[i];
                assert.ok(_rec17._expr(_rec17._capt(_rec17._capt(_rec17._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec17._capt(_rec17._capt(origin, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === origin.name, "compare tag name")',
                    filepath: 'lib/test.js',
                    line: 182
                }), 'compare tag name');
                assert.ok(_rec18._expr(_rec18._capt(_rec18._capt(_rec18._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec18._capt(_rec18._capt(origin, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.type === origin.type, "compare tag type")',
                    filepath: 'lib/test.js',
                    line: 183
                }), 'compare tag type');
                if (elm.type === 'm' || origin.type === 'm') {
                    return;
                }
                if (elm.type === 'b' && origin.type === 'b') {
                    assert.ok(_rec19._expr(_rec19._capt(_rec19._capt(_rec19._capt(_rec19._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec19._capt(_rec19._capt(_rec19._capt(origin, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.value.length === origin.value.length, "compare tag value")',
                        filepath: 'lib/test.js',
                        line: 188
                    }), 'compare tag value');
                    return;
                }
                assert.ok(_rec20._expr(_rec20._capt(_rec20._capt(_rec20._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec20._capt(_rec20._capt(origin, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.value === origin.value, "compare tag value")',
                    filepath: 'lib/test.js',
                    line: 191
                }), 'compare tag value');
            });
            return [2];
        });
    });
});
QUnit.module('EBMLReader');
var MEDIA_RECORDER_WEBM_FILE_LIST = [
    './chrome57.webm',
    './firefox55nightly.webm',
    './firefox53.webm'
];
MEDIA_RECORDER_WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test('create_webp_test:' + file, create_webp_test(file));
});
function create_webp_test(file) {
    var _this = this;
    return function (assert) {
        return __awaiter(_this, void 0, void 0, function () {
            var res, webm_buf, elms, WebPs, _i, WebPs_1, WebP, src, img, err_1;
            return __generator(this, function (_a) {
                var _rec21 = new _PowerAssertRecorder1();
                switch (_a.label) {
                case 0:
                    return [
                        4,
                        fetch(file)
                    ];
                case 1:
                    res = _a.sent();
                    return [
                        4,
                        res.arrayBuffer()
                    ];
                case 2:
                    webm_buf = _a.sent();
                    elms = new _1.Decoder().decode(webm_buf);
                    WebPs = _2.tools.WebPFrameFilter(elms);
                    _i = 0, WebPs_1 = WebPs;
                    _a.label = 3;
                case 3:
                    if (!(_i < WebPs_1.length))
                        return [
                            3,
                            9
                        ];
                    WebP = WebPs_1[_i];
                    src = URL.createObjectURL(WebP);
                    _a.label = 4;
                case 4:
                    _a.trys.push([
                        4,
                        6,
                        ,
                        7
                    ]);
                    return [
                        4,
                        fetchImage(src)
                    ];
                case 5:
                    img = _a.sent();
                    assert.ok(_rec21._expr(_rec21._capt(_rec21._capt(_rec21._capt(_rec21._capt(img, 'arguments/0/left/left/object').width, 'arguments/0/left/left') > 0, 'arguments/0/left') && _rec21._capt(_rec21._capt(_rec21._capt(img, 'arguments/0/right/left/object').height, 'arguments/0/right/left') > 0, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(img.width > 0 && img.height > 0, "size:" + img.width + "x" + img.height)',
                        filepath: 'lib/test.js',
                        line: 239
                    }), 'size:' + img.width + 'x' + img.height);
                    return [
                        3,
                        7
                    ];
                case 6:
                    err_1 = _a.sent();
                    assert.notOk(err_1, 'webp load failre');
                    return [
                        3,
                        7
                    ];
                case 7:
                    URL.revokeObjectURL(src);
                    _a.label = 8;
                case 8:
                    _i++;
                    return [
                        3,
                        3
                    ];
                case 9:
                    return [2];
                }
            });
        });
    };
}
MEDIA_RECORDER_WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test('create_convert_to_seekable_test:' + file, create_convert_to_seekable_test(file));
});
function create_convert_to_seekable_test(file) {
    var _this = this;
    return function (assert) {
        return __awaiter(_this, void 0, void 0, function () {
            var decoder, reader, res, webm_buf, elms, sec, refinedMetadataBuf, body, raw_webM, refinedWebM, raw_video_1, refined_video, wait, err_2, refinedBuf, refinedElms, _reader_1;
            return __generator(this, function (_a) {
                var _rec22 = new _PowerAssertRecorder1();
                var _rec23 = new _PowerAssertRecorder1();
                var _rec24 = new _PowerAssertRecorder1();
                var _rec25 = new _PowerAssertRecorder1();
                var _rec26 = new _PowerAssertRecorder1();
                var _rec27 = new _PowerAssertRecorder1();
                var _rec28 = new _PowerAssertRecorder1();
                var _rec29 = new _PowerAssertRecorder1();
                switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new EBMLReader_1.default();
                    return [
                        4,
                        fetch(file)
                    ];
                case 1:
                    res = _a.sent();
                    return [
                        4,
                        res.arrayBuffer()
                    ];
                case 2:
                    webm_buf = _a.sent();
                    console.info('analasis unseekable original ebml tree');
                    elms = decoder.decode(webm_buf);
                    elms.forEach(function (elm) {
                        reader.read(elm);
                    });
                    reader.stop();
                    console.info('convert to seekable file');
                    assert.ok(_rec22._expr(_rec22._capt(_rec22._capt(_rec22._capt(_rec22._capt(_rec22._capt(reader, 'arguments/0/left/object/object/object').metadatas, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
                        content: 'assert.ok(reader.metadatas[0].name === "EBML")',
                        filepath: 'lib/test.js',
                        line: 279
                    }));
                    assert.ok(_rec23._expr(_rec23._capt(_rec23._capt(_rec23._capt(_rec23._capt(reader, 'arguments/0/left/object/object').metadatas, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(reader.metadatas.length > 0)',
                        filepath: 'lib/test.js',
                        line: 280
                    }));
                    sec = reader.duration * reader.timecodeScale / 1000 / 1000 / 1000;
                    assert.ok(_rec24._expr(_rec24._capt(_rec24._capt(7 < _rec24._capt(sec, 'arguments/0/left/right'), 'arguments/0/left') && _rec24._capt(_rec24._capt(sec, 'arguments/0/right/left') < 11, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(7 < sec && sec < 11)',
                        filepath: 'lib/test.js',
                        line: 282
                    }));
                    refinedMetadataBuf = _2.tools.putRefinedMetaData(reader.metadatas, reader);
                    body = webm_buf.slice(reader.metadataSize);
                    assert.ok(_rec25._expr(_rec25._capt(_rec25._capt(_rec25._capt(_rec25._capt(refinedMetadataBuf, 'arguments/0/left/left/object').byteLength, 'arguments/0/left/left') - _rec25._capt(_rec25._capt(reader, 'arguments/0/left/right/object').metadataSize, 'arguments/0/left/right'), 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(refinedMetadataBuf.byteLength - reader.metadataSize > 0)',
                        filepath: 'lib/test.js',
                        line: 285
                    }));
                    assert.ok(_rec26._expr(_rec26._capt(_rec26._capt(_rec26._capt(webm_buf, 'arguments/0/left/object').byteLength, 'arguments/0/left') === _rec26._capt(_rec26._capt(_rec26._capt(reader, 'arguments/0/right/left/object').metadataSize, 'arguments/0/right/left') + _rec26._capt(_rec26._capt(body, 'arguments/0/right/right/object').byteLength, 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(webm_buf.byteLength === reader.metadataSize + body.byteLength)',
                        filepath: 'lib/test.js',
                        line: 286
                    }));
                    console.info('check duration');
                    raw_webM = new Blob([webm_buf], { type: 'video/webm' });
                    refinedWebM = new Blob([
                        refinedMetadataBuf,
                        body
                    ], { type: 'video/webm' });
                    _a.label = 3;
                case 3:
                    _a.trys.push([
                        3,
                        8,
                        ,
                        9
                    ]);
                    return [
                        4,
                        fetchVideo(URL.createObjectURL(raw_webM))
                    ];
                case 4:
                    raw_video_1 = _a.sent();
                    return [
                        4,
                        fetchVideo(URL.createObjectURL(refinedWebM))
                    ];
                case 5:
                    refined_video = _a.sent();
                    if (!/Firefox/.test(navigator.userAgent)) {
                        assert.ok(_rec27._expr(_rec27._capt(!_rec27._capt(_rec27._capt(Number, 'arguments/0/argument/callee/object').isFinite(_rec27._capt(_rec27._capt(raw_video_1, 'arguments/0/argument/arguments/0/object').duration, 'arguments/0/argument/arguments/0')), 'arguments/0/argument'), 'arguments/0'), {
                            content: 'assert.ok(!Number.isFinite(raw_video_1.duration), "media recorder webm duration is not finite")',
                            filepath: 'lib/test.js',
                            line: 300
                        }), 'media recorder webm duration is not finite');
                    }
                    assert.ok(_rec28._expr(_rec28._capt(_rec28._capt(Number, 'arguments/0/callee/object').isFinite(_rec28._capt(_rec28._capt(refined_video, 'arguments/0/arguments/0/object').duration, 'arguments/0/arguments/0')), 'arguments/0'), {
                        content: 'assert.ok(Number.isFinite(refined_video.duration), "refined webm duration is finite")',
                        filepath: 'lib/test.js',
                        line: 302
                    }), 'refined webm duration is finite');
                    return [
                        4,
                        sleep(100)
                    ];
                case 6:
                    _a.sent();
                    wait = new Promise(function (resolve, reject) {
                        raw_video_1.onseeked = resolve;
                        raw_video_1.onerror = reject;
                    });
                    raw_video_1.currentTime = 7 * 24 * 60 * 60;
                    return [
                        4,
                        wait
                    ];
                case 7:
                    _a.sent();
                    assert.ok(_rec29._expr(_rec29._capt(_rec29._capt(_rec29._capt(Math, 'arguments/0/left/callee/object').abs(_rec29._capt(_rec29._capt(_rec29._capt(raw_video_1, 'arguments/0/left/arguments/0/left/object').duration, 'arguments/0/left/arguments/0/left') - _rec29._capt(_rec29._capt(refined_video, 'arguments/0/left/arguments/0/right/object').duration, 'arguments/0/left/arguments/0/right'), 'arguments/0/left/arguments/0')), 'arguments/0/left') < 0.1, 'arguments/0'), {
                        content: 'assert.ok(Math.abs(raw_video_1.duration - refined_video.duration) < 0.1)',
                        filepath: 'lib/test.js',
                        line: 312
                    }));
                    return [
                        3,
                        9
                    ];
                case 8:
                    err_2 = _a.sent();
                    assert.notOk(err_2);
                    return [
                        3,
                        9
                    ];
                case 9:
                    if (!reader.logging)
                        return [
                            3,
                            11
                        ];
                    console.info('put seekable ebml tree');
                    return [
                        4,
                        readAsArrayBuffer(refinedWebM)
                    ];
                case 10:
                    refinedBuf = _a.sent();
                    refinedElms = new _1.Decoder().decode(refinedBuf);
                    _reader_1 = new EBMLReader_1.default();
                    _reader_1.logging = true;
                    refinedElms.forEach(function (elm) {
                        return _reader_1.read(elm);
                    });
                    _reader_1.stop();
                    _a.label = 11;
                case 11:
                    return [2];
                }
            });
        });
    };
}
MEDIA_RECORDER_WEBM_FILE_LIST.forEach(function (file) {
    QUnit.test('create_recorder_helper_test:' + file, create_recorder_helper_test(file));
});
function create_recorder_helper_test(file) {
    var _this = this;
    return function (assert) {
        return __awaiter(_this, void 0, void 0, function () {
            var decoder, reader, last_sec, metadata_loaded, cluster_num, last_timecode, res, webm_buf, elms;
            return __generator(this, function (_a) {
                var _rec39 = new _PowerAssertRecorder1();
                var _rec40 = new _PowerAssertRecorder1();
                var _rec41 = new _PowerAssertRecorder1();
                var _rec42 = new _PowerAssertRecorder1();
                switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new EBMLReader_1.default();
                    last_sec = 0;
                    reader.addListener('duration', function (_a) {
                        var _rec30 = new _PowerAssertRecorder1();
                        var _rec31 = new _PowerAssertRecorder1();
                        var timecodeScale = _a.timecodeScale, duration = _a.duration;
                        var sec = duration * timecodeScale / 1000 / 1000 / 1000;
                        assert.ok(_rec30._expr(_rec30._capt(_rec30._capt(Number, 'arguments/0/callee/object').isFinite(_rec30._capt(sec, 'arguments/0/arguments/0')), 'arguments/0'), {
                            content: 'assert.ok(Number.isFinite(sec), "duration:" + sec + "sec")',
                            filepath: 'lib/test.js',
                            line: 352
                        }), 'duration:' + sec + 'sec');
                        assert.ok(_rec31._expr(_rec31._capt(_rec31._capt(sec, 'arguments/0/left') > _rec31._capt(last_sec, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(sec > last_sec)',
                            filepath: 'lib/test.js',
                            line: 353
                        }));
                        last_sec = sec;
                    });
                    metadata_loaded = false;
                    reader.addListener('metadata', function (_a) {
                        var _rec32 = new _PowerAssertRecorder1();
                        var _rec33 = new _PowerAssertRecorder1();
                        var _rec34 = new _PowerAssertRecorder1();
                        var metadataSize = _a.metadataSize, data = _a.data;
                        assert.ok(_rec32._expr(_rec32._capt(_rec32._capt(metadataSize, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(metadataSize > 0)',
                            filepath: 'lib/test.js',
                            line: 359
                        }));
                        assert.ok(_rec33._expr(_rec33._capt(_rec33._capt(_rec33._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(data.length > 0)',
                            filepath: 'lib/test.js',
                            line: 360
                        }));
                        assert.ok(_rec34._expr(_rec34._capt(_rec34._capt(_rec34._capt(_rec34._capt(data, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
                            content: 'assert.ok(data[0].name === "EBML")',
                            filepath: 'lib/test.js',
                            line: 361
                        }));
                        metadata_loaded = true;
                    });
                    cluster_num = 0;
                    last_timecode = -1;
                    reader.addListener('cluster', function (ev) {
                        var _rec35 = new _PowerAssertRecorder1();
                        var _rec36 = new _PowerAssertRecorder1();
                        var _rec37 = new _PowerAssertRecorder1();
                        var _rec38 = new _PowerAssertRecorder1();
                        var data = ev.data, timecode = ev.timecode;
                        assert.ok(_rec35._expr(_rec35._capt(_rec35._capt(Number, 'arguments/0/callee/object').isFinite(_rec35._capt(timecode, 'arguments/0/arguments/0')), 'arguments/0'), {
                            content: 'assert.ok(Number.isFinite(timecode), "cluster.timecode:" + timecode)',
                            filepath: 'lib/test.js',
                            line: 369
                        }), 'cluster.timecode:' + timecode);
                        assert.ok(_rec36._expr(_rec36._capt(_rec36._capt(_rec36._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(data.length > 0, "cluster.length:" + data.length)',
                            filepath: 'lib/test.js',
                            line: 370
                        }), 'cluster.length:' + data.length);
                        var assertion = data.every(function (elm) {
                            return elm.name === 'Cluster' || elm.name === 'Timecode' || elm.name === 'SimpleBlock';
                        });
                        assert.ok(_rec37._expr(_rec37._capt(assertion, 'arguments/0'), {
                            content: 'assert.ok(assertion, "element check")',
                            filepath: 'lib/test.js',
                            line: 372
                        }), 'element check');
                        assert.ok(_rec38._expr(_rec38._capt(_rec38._capt(timecode, 'arguments/0/left') > _rec38._capt(last_timecode, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(timecode > last_timecode)',
                            filepath: 'lib/test.js',
                            line: 373
                        }));
                        cluster_num += 1;
                        last_timecode = timecode;
                    });
                    return [
                        4,
                        fetch(file)
                    ];
                case 1:
                    res = _a.sent();
                    return [
                        4,
                        res.arrayBuffer()
                    ];
                case 2:
                    webm_buf = _a.sent();
                    elms = decoder.decode(webm_buf);
                    elms.forEach(function (elm) {
                        reader.read(elm);
                    });
                    reader.stop();
                    assert.ok(_rec39._expr(_rec39._capt(_rec39._capt(last_sec, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(last_sec > 0)',
                        filepath: 'lib/test.js',
                        line: 386
                    }));
                    assert.ok(_rec40._expr(_rec40._capt(metadata_loaded, 'arguments/0'), {
                        content: 'assert.ok(metadata_loaded)',
                        filepath: 'lib/test.js',
                        line: 387
                    }));
                    assert.ok(_rec41._expr(_rec41._capt(_rec41._capt(cluster_num, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(cluster_num > 0)',
                        filepath: 'lib/test.js',
                        line: 388
                    }));
                    assert.ok(_rec42._expr(_rec42._capt(_rec42._capt(last_timecode, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(last_timecode > 0)',
                        filepath: 'lib/test.js',
                        line: 389
                    }));
                    return [2];
                }
            });
        });
    };
}
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
function waitEvent(target, ev, err) {
    if (err === void 0) {
        err = 'error';
    }
    return new Promise(function (resolve, reject) {
        target.addEventListener(ev, succ);
        target.addEventListener(err, fail);
        function succ(ev) {
            clean();
            resolve(ev);
        }
        function fail(ev) {
            clean();
            reject(ev);
        }
        function clean() {
            target.removeEventListener(ev, succ);
            target.removeEventListener(err, fail);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiX19nZW5lcmF0b3IiLCJib2R5IiwiXyIsImxhYmVsIiwic2VudCIsInQiLCJ0cnlzIiwib3BzIiwiZiIsInkiLCJnIiwidmVyYiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibiIsInYiLCJvcCIsIlR5cGVFcnJvciIsImNhbGwiLCJwb3AiLCJsZW5ndGgiLCJfdGhpcyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsIl8xIiwicmVxdWlyZSIsIl8yIiwiRUJNTFJlYWRlcl8xIiwiQnVmZmVyIiwiUVVuaXQiLCJlbXBvd2VyIiwiZm9ybWF0dGVyIiwicXVuaXRUYXAiLCJjb25maWciLCJhdXRvc3RhcnQiLCJhc3NlcnQiLCJkZXN0cnVjdGl2ZSIsImNvbnNvbGUiLCJsb2ciLCJhcmd1bWVudHMiLCJzaG93U291cmNlT25GYWlsdXJlIiwiV0VCTV9GSUxFX0xJU1QiLCJtb2R1bGUiLCJ0ZXN0IiwiZmlsZSIsInJlcyIsImJ1ZiIsImVsbXMiLCJidWYyIiwiZWxtczIiLCJ0ZXN0cyIsIl9pIiwidGVzdHNfMSIsIl9hIiwiZmV0Y2giLCJhcnJheUJ1ZmZlciIsIkRlY29kZXIiLCJkZWNvZGUiLCJFbmNvZGVyIiwiZW5jb2RlIiwiaW5kZXgiLCJlbG0iLCJfcmVjMSIsIm9rIiwibmFtZSIsInR5cGUiLCJpc0VuZCIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJfcmVjMiIsIl9yZWMzIiwiX3JlYzQiLCJfcmVjNSIsIl9yZWM2IiwiX3JlYzciLCJfcmVjOCIsIl9yZWM5IiwiRGF0ZSIsImdldFRpbWUiLCJOdW1iZXIiLCJ0b29scyIsImNvbnZlcnRFQk1MRGF0ZVRvSlNEYXRlIiwiX3JlYzEwIiwiX3JlYzExIiwiYnVmXzEiLCJVaW50OEFycmF5IiwiYnVmMl8xIiwiZXZlcnkiLCJ2YWwiLCJpIiwiZm9yRWFjaCIsImNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdCIsImVsbTIiLCJfcmVjMTIiLCJfcmVjMTMiLCJfcmVjMTQiLCJfcmVjMTUiLCJfcmVjMTYiLCJzbGVlcCIsInRhZ1N0cmVhbSIsImJpbmFyaXplZCIsInVua25vd25TaXplIiwibWFwIiwiZW5jb2RlVmFsdWVUb0J1ZmZlciIsIl9yZWMxNyIsIl9yZWMxOCIsIl9yZWMxOSIsIl9yZWMyMCIsIm9yaWdpbiIsIk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNUIiwiY3JlYXRlX3dlYnBfdGVzdCIsIndlYm1fYnVmIiwiV2ViUHMiLCJXZWJQc18xIiwiV2ViUCIsInNyYyIsImltZyIsImVycl8xIiwiX3JlYzIxIiwiV2ViUEZyYW1lRmlsdGVyIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmV0Y2hJbWFnZSIsIndpZHRoIiwiaGVpZ2h0Iiwibm90T2siLCJyZXZva2VPYmplY3RVUkwiLCJjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0IiwiZGVjb2RlciIsInJlYWRlciIsInNlYyIsInJlZmluZWRNZXRhZGF0YUJ1ZiIsInJhd193ZWJNIiwicmVmaW5lZFdlYk0iLCJyYXdfdmlkZW9fMSIsInJlZmluZWRfdmlkZW8iLCJ3YWl0IiwiZXJyXzIiLCJyZWZpbmVkQnVmIiwicmVmaW5lZEVsbXMiLCJfcmVhZGVyXzEiLCJfcmVjMjIiLCJfcmVjMjMiLCJfcmVjMjQiLCJfcmVjMjUiLCJfcmVjMjYiLCJfcmVjMjciLCJfcmVjMjgiLCJfcmVjMjkiLCJkZWZhdWx0IiwiaW5mbyIsInJlYWQiLCJzdG9wIiwibWV0YWRhdGFzIiwiZHVyYXRpb24iLCJ0aW1lY29kZVNjYWxlIiwicHV0UmVmaW5lZE1ldGFEYXRhIiwic2xpY2UiLCJtZXRhZGF0YVNpemUiLCJieXRlTGVuZ3RoIiwiQmxvYiIsImZldGNoVmlkZW8iLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpc0Zpbml0ZSIsIm9uc2Vla2VkIiwib25lcnJvciIsImN1cnJlbnRUaW1lIiwiTWF0aCIsImFicyIsImxvZ2dpbmciLCJyZWFkQXNBcnJheUJ1ZmZlciIsImNyZWF0ZV9yZWNvcmRlcl9oZWxwZXJfdGVzdCIsImxhc3Rfc2VjIiwibWV0YWRhdGFfbG9hZGVkIiwiY2x1c3Rlcl9udW0iLCJsYXN0X3RpbWVjb2RlIiwiX3JlYzM5IiwiX3JlYzQwIiwiX3JlYzQxIiwiX3JlYzQyIiwiYWRkTGlzdGVuZXIiLCJfcmVjMzAiLCJfcmVjMzEiLCJfcmVjMzIiLCJfcmVjMzMiLCJfcmVjMzQiLCJkYXRhIiwiZXYiLCJfcmVjMzUiLCJfcmVjMzYiLCJfcmVjMzciLCJfcmVjMzgiLCJ0aW1lY29kZSIsImFzc2VydGlvbiIsIm1zIiwic2V0VGltZW91dCIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udHJvbHMiLCJvbmxvYWRlZGRhdGEiLCJlcnIiLCJJbWFnZSIsIm9ubG9hZCIsImVycm9yIiwiYmxvYiIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJ3YWl0RXZlbnQiLCJ0YXJnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3VjYyIsImZhaWwiLCJjbGVhbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsSUFBQUEscUJBQUE7QUFBQSxhQUFBQyxtQkFBQTtBQUFBLGFBQUFDLFFBQUE7QUFBQTtBQUFBLElBQUFELG1CQUFBLENBQUFFLFNBQUEsQ0FBQUMsS0FBQSxZ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RmE7QUFBQSxTQUx5QjtBQUFBLEtBQXZDLENBQVAsQ0FGZ0M7QUFBQSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvd2lsbGVta29ra2UvRGV2ZWxvcG1lbnQvdHMtZWJtbCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX3RoaXMgPSB0aGlzO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF8xID0gcmVxdWlyZShcIi4vXCIpO1xudmFyIF8yID0gcmVxdWlyZShcIi4vXCIpO1xudmFyIEVCTUxSZWFkZXJfMSA9IHJlcXVpcmUoXCIuL0VCTUxSZWFkZXJcIik7XG52YXIgQnVmZmVyID0gcmVxdWlyZShcImJ1ZmZlci9cIikuQnVmZmVyO1xudmFyIFFVbml0ID0gcmVxdWlyZSgncXVuaXRqcycpO1xudmFyIGVtcG93ZXIgPSByZXF1aXJlKCdlbXBvd2VyJyk7XG52YXIgZm9ybWF0dGVyID0gcmVxdWlyZSgncG93ZXItYXNzZXJ0LWZvcm1hdHRlcicpO1xudmFyIHF1bml0VGFwID0gcmVxdWlyZShcInF1bml0LXRhcFwiKTtcblFVbml0LmNvbmZpZy5hdXRvc3RhcnQgPSB0cnVlO1xuZW1wb3dlcihRVW5pdC5hc3NlcnQsIGZvcm1hdHRlcigpLCB7IGRlc3RydWN0aXZlOiB0cnVlIH0pO1xucXVuaXRUYXAoUVVuaXQsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgfSwgeyBzaG93U291cmNlT25GYWlsdXJlOiBmYWxzZSB9KTtcbnZhciBXRUJNX0ZJTEVfTElTVCA9IFtcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Mi5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0My5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NC5ta3ZcIiwgdGhpcyBmaWxlIGlzIGJyb2tlbiBzbyBub3QgcGFzcyBlbmNvZGVyX2RlY29kZXJfdGVzdCBcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ni5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ny5ta3ZcIiwgdGhpcyBmaWxlIGhhcyB1bmtub3duIHRhZyBzbyBjYW5ub3Qgd3JpdGUgZmlsZVxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q4Lm1rdlwiLFxuXTtcblFVbml0Lm1vZHVsZShcInRzLUVCTUxcIik7XG5RVW5pdC50ZXN0KFwiZW5jb2Rlci1kZWNvZGVyXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlsZSwgcmVzLCBidWYsIGVsbXMsIGJ1ZjIsIGVsbXMyLCB0ZXN0cywgX2ksIHRlc3RzXzEsIHRlc3Q7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZmlsZSA9IFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3QxLm1rdlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmKTtcbiAgICAgICAgICAgICAgICBidWYyID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoZWxtcyk7XG4gICAgICAgICAgICAgICAgZWxtczIgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYyKTtcbiAgICAgICAgICAgICAgICB0ZXN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMCwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRUJNTFwiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IGZhbHNlKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiA0LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7IGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJFQk1MXCIgJiYgZWxtLnR5cGUgPT09IFwibVwiICYmIGVsbS5pc0VuZCA9PT0gdHJ1ZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogNSwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiU2VnbWVudFwiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IGZhbHNlKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiAyNCwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiSW5mb1wiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IGZhbHNlKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiAyNSwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRHVyYXRpb25cIiAmJiBlbG0udHlwZSA9PT0gXCJmXCIgJiYgZWxtLnZhbHVlID09PSA4NzMzNik7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjYsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIk11eGluZ0FwcFwiICYmIGVsbS50eXBlID09PSBcIjhcIiAmJiBlbG0udmFsdWUgPT09IFwibGliZWJtbDIgdjAuMTAuMCArIGxpYm1hdHJvc2thMiB2MC4xMC4xXCIpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDI4LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkRhdGVVVENcIiAmJiBlbG0udHlwZSA9PT0gXCJkXCIgJiYgdHlwZW9mIGVsbS52YWx1ZSA9PT0gXCJzdHJpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS50eXBlID09PSBcImRcIiAmJiBuZXcgRGF0ZShuZXcgRGF0ZShcIjIwMDEtMDEtMDFUMDA6MDA6MDAuMDAwWlwiKS5nZXRUaW1lKCkgKyAoTnVtYmVyKGVsbS52YWx1ZSkgLyAxMDAwIC8gMTAwMCkpLmdldFRpbWUoKSA9PT0gbmV3IERhdGUoXCIyMDEwLTA4LTIxVDA3OjIzOjAzLjAwMFpcIikuZ2V0VGltZSgpKTsgLy8gdG9JU09TdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnR5cGUgPT09IFwiZFwiICYmIF8yLnRvb2xzLmNvbnZlcnRFQk1MRGF0ZVRvSlNEYXRlKGVsbS52YWx1ZSkuZ2V0VGltZSgpID09PSBuZXcgRGF0ZShcIjIwMTAtMDgtMjFUMDc6MjM6MDMuMDAwWlwiKS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiAyOSwgdGVzdDogZnVuY3Rpb24gKGVsbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJTZWdtZW50VUlEXCIgJiYgZWxtLnR5cGUgPT09IFwiYlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZfMSA9IG5ldyBVaW50OEFycmF5KG5ldyBCdWZmZXIoWzB4OTIsIDB4MmQsIDB4MTksIDB4MzIsIDB4MGYsIDB4MWUsIDB4MTMsIDB4YzUsIDB4YjUsIDB4MDUsIDB4NjMsIDB4MGEsIDB4YWYsIDB4ZDgsIDB4NTMsIDB4MzZdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWYyXzEgPSBuZXcgVWludDhBcnJheShlbG0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soYnVmXzEuZXZlcnkoZnVuY3Rpb24gKHZhbCwgaSkgeyByZXR1cm4gYnVmMl8xW2ldID09PSB2YWw7IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBmb3IgKF9pID0gMCwgdGVzdHNfMSA9IHRlc3RzOyBfaSA8IHRlc3RzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QgPSB0ZXN0c18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdC50ZXN0KGVsbXMyW3Rlc3QuaW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfSk7XG5XRUJNX0ZJTEVfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgUVVuaXQudGVzdChcImVuY29kZXItZGVjb2RlcjpcIiArIGZpbGUsIGNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdChmaWxlKSk7XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdChmaWxlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzLCBidWYsIGVsbXMsIGJ1ZjIsIGVsbXMyLCBpLCBlbG0sIGVsbTI7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmMiA9IG5ldyBfMS5FbmNvZGVyKCkuZW5jb2RlKGVsbXMpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zMiA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1ZjIpO1xuICAgICAgICAgICAgICAgICAgICAvL2Fzc2VydC5vayhidWYuYnl0ZUxlbmd0aCA9PT0gYnVmMi5ieXRlTGVuZ3RoLCBcIlRoaXMgcHJvYmxlbSBpcyBjYXVzZWQgYnkgSlMgYmVpbmcgdW5hYmxlIHRvIGhhbmRsZSBJbnQ2NC5cIik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG1zLmxlbmd0aCA9PT0gZWxtczIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBlbG1zLmxlbmd0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBlbG0gPSBlbG1zW2ldO1xuICAgICAgICAgICAgICAgICAgICBlbG0yID0gZWxtczJbaV07XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gZWxtMi5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS50eXBlID09PSBlbG0yLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwibVwiIHx8IGVsbTIudHlwZSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiICYmIGVsbTIudHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUubGVuZ3RoID09PSBlbG0yLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS52YWx1ZSA9PT0gZWxtMi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHNsZWVwKDEpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59XG5RVW5pdC50ZXN0KFwiaGFuZHdyaXRlLWVuY29kZXJcIiwgZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YWdTdHJlYW0sIGJpbmFyaXplZCwgYnVmLCBlbG1zO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdGFnU3RyZWFtID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxSZWFkVmVyc2lvblwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MTWF4SURMZW5ndGhcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTE1heFNpemVMZW5ndGhcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA4IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVwiLCB0eXBlOiBcInNcIiwgdmFsdWU6IFwid2VibVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVJlYWRWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2VnbWVudFwiLCB0eXBlOiBcIm1cIiwgdW5rbm93blNpemU6IHRydWUsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlNlZWtIZWFkXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTZWVrSGVhZFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJJbmZvXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUaW1lY29kZVNjYWxlXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMTAwMDAwMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkluZm9cIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRHVyYXRpb25cIiwgdHlwZTogXCJmXCIsIHZhbHVlOiAwLjAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJDbHVzdGVyXCIsIHR5cGU6IFwibVwiLCB1bmtub3duU2l6ZTogdHJ1ZSwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiVGltZWNvZGVcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2ltcGxlQmxvY2tcIiwgdHlwZTogXCJiXCIsIHZhbHVlOiBuZXcgQnVmZmVyKDEwMjQpIH0sXG4gICAgICAgIF07XG4gICAgICAgIGJpbmFyaXplZCA9IHRhZ1N0cmVhbS5tYXAoXzIudG9vbHMuZW5jb2RlVmFsdWVUb0J1ZmZlcik7XG4gICAgICAgIGJ1ZiA9IG5ldyBfMS5FbmNvZGVyKCkuZW5jb2RlKGJpbmFyaXplZCk7XG4gICAgICAgIGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYpO1xuICAgICAgICBlbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSwgaSkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbiA9IHRhZ1N0cmVhbVtpXTtcbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gb3JpZ2luLm5hbWUsIFwiY29tcGFyZSB0YWcgbmFtZVwiKTtcbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0udHlwZSA9PT0gb3JpZ2luLnR5cGUsIFwiY29tcGFyZSB0YWcgdHlwZVwiKTtcbiAgICAgICAgICAgIGlmIChlbG0udHlwZSA9PT0gXCJtXCIgfHwgb3JpZ2luLnR5cGUgPT09IFwibVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcImJcIiAmJiBvcmlnaW4udHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlLmxlbmd0aCA9PT0gb3JpZ2luLnZhbHVlLmxlbmd0aCwgXCJjb21wYXJlIHRhZyB2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlID09PSBvcmlnaW4udmFsdWUsIFwiY29tcGFyZSB0YWcgdmFsdWVcIik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgfSk7XG59KTsgfSk7XG5RVW5pdC5tb2R1bGUoXCJFQk1MUmVhZGVyXCIpO1xudmFyIE1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNUID0gW1xuICAgIFwiLi9jaHJvbWU1Ny53ZWJtXCIsXG4gICAgLy8gbGFzdDJ0aW1lY29kZSh2aWRlbywgYXVkaW8pOiAoKDcuNDkzcywgNy41NTJzKSwgKDcuNDkzcywgNy41NTJzKSlcbiAgICAvLyBDaHJvbWU1NzogNy42MTJzIH49IDcuNjExcyA9IDcuNTUycyArICg3LjU1MnMgLSA3LjQ5M3MpIC8vID8/P1xuICAgIC8vIEZpcmVmb3g1MzogNy41NTJzID0gNy41NTJzICsgKDcuNTUycyAtIDcuNTUycykgLy8gc2hpdCFcbiAgICAvLyBSZWFkZXI6IDcuNjExcyA9IDcuNTUycyArICg3LjU1MnMgLSA3LjQ5M3MpXG4gICAgXCIuL2ZpcmVmb3g1NW5pZ2h0bHkud2VibVwiLFxuICAgIC8vIGxhc3QydGltZWNvZGUodmlkZW8sIGF1ZGlvKTogKCg4LjU2N3MsIDguNTkwcyksICg4LjYyNnMsIDguNjQ2cykpLCBDb2RlY0RlbGF5KGF1ZGlvKTogNi41MDBtc1xuICAgIC8vIENocm9tZTU3OiA4LjY1OXMgfj0gOC42NTk1cyA9IDguNjQ2cyArICg4LjY0NnMgLSA4LjYyNnMpIC0gNi41MDBtc1xuICAgIC8vIEZpcmVmb3g1MzogOC42NjZzID0gOC42NDZzICsgKDguNjQ2cyAtIDguNjI2cylcbiAgICAvLyBSZWFkZXI6IDguNjU5NXMgPSA4LjY0NnMgKyAoOC42NDZzIC0gOC42MjZzKSAtIDYuNTAwbXNcbiAgICBcIi4vZmlyZWZveDUzLndlYm1cIixcbl07XG5NRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgUVVuaXQudGVzdChcImNyZWF0ZV93ZWJwX3Rlc3Q6XCIgKyBmaWxlLCBjcmVhdGVfd2VicF90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX3dlYnBfdGVzdChmaWxlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzLCB3ZWJtX2J1ZiwgZWxtcywgV2ViUHMsIF9pLCBXZWJQc18xLCBXZWJQLCBzcmMsIGltZywgZXJyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VibV9idWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZSh3ZWJtX2J1Zik7XG4gICAgICAgICAgICAgICAgICAgIFdlYlBzID0gXzIudG9vbHMuV2ViUEZyYW1lRmlsdGVyKGVsbXMpO1xuICAgICAgICAgICAgICAgICAgICBfaSA9IDAsIFdlYlBzXzEgPSBXZWJQcztcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoX2kgPCBXZWJQc18xLmxlbmd0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICBXZWJQID0gV2ViUHNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoV2ViUCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbNCwgNiwgLCA3XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoSW1hZ2Uoc3JjKV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBpbWcgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhpbWcud2lkdGggPiAwICYmIGltZy5oZWlnaHQgPiAwLCBcInNpemU6XCIgKyBpbWcud2lkdGggKyBcInhcIiArIGltZy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIGVycl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soZXJyXzEsIFwid2VicCBsb2FkIGZhaWxyZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNyYyk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgIF9pKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn1cbk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNULmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICBRVW5pdC50ZXN0KFwiY3JlYXRlX2NvbnZlcnRfdG9fc2Vla2FibGVfdGVzdDpcIiArIGZpbGUsIGNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3QoZmlsZSkpO1xufSk7XG5mdW5jdGlvbiBjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0KGZpbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWNvZGVyLCByZWFkZXIsIHJlcywgd2VibV9idWYsIGVsbXMsIHNlYywgcmVmaW5lZE1ldGFkYXRhQnVmLCBib2R5LCByYXdfd2ViTSwgcmVmaW5lZFdlYk0sIHJhd192aWRlb18xLCByZWZpbmVkX3ZpZGVvLCB3YWl0LCBlcnJfMiwgcmVmaW5lZEJ1ZiwgcmVmaW5lZEVsbXMsIF9yZWFkZXJfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlciA9IG5ldyBfMS5EZWNvZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyBFQk1MUmVhZGVyXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHdlYm1fYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJhbmFsYXNpcyB1bnNlZWthYmxlIG9yaWdpbmFsIGVibWwgdHJlZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcyA9IGRlY29kZXIuZGVjb2RlKHdlYm1fYnVmKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmVhZGVyLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImNvbnZlcnQgdG8gc2Vla2FibGUgZmlsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHJlYWRlci5tZXRhZGF0YXNbMF0ubmFtZSA9PT0gXCJFQk1MXCIpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2socmVhZGVyLm1ldGFkYXRhcy5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgc2VjID0gcmVhZGVyLmR1cmF0aW9uICogcmVhZGVyLnRpbWVjb2RlU2NhbGUgLyAxMDAwIC8gMTAwMCAvIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayg3IDwgc2VjICYmIHNlYyA8IDExKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZE1ldGFkYXRhQnVmID0gXzIudG9vbHMucHV0UmVmaW5lZE1ldGFEYXRhKHJlYWRlci5tZXRhZGF0YXMsIHJlYWRlcik7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSB3ZWJtX2J1Zi5zbGljZShyZWFkZXIubWV0YWRhdGFTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHJlZmluZWRNZXRhZGF0YUJ1Zi5ieXRlTGVuZ3RoIC0gcmVhZGVyLm1ldGFkYXRhU2l6ZSA+IDApO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sod2VibV9idWYuYnl0ZUxlbmd0aCA9PT0gKHJlYWRlci5tZXRhZGF0YVNpemUgKyBib2R5LmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiY2hlY2sgZHVyYXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIHJhd193ZWJNID0gbmV3IEJsb2IoW3dlYm1fYnVmXSwgeyB0eXBlOiBcInZpZGVvL3dlYm1cIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZFdlYk0gPSBuZXcgQmxvYihbcmVmaW5lZE1ldGFkYXRhQnVmLCBib2R5XSwgeyB0eXBlOiBcInZpZGVvL3dlYm1cIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFszLCA4LCAsIDldKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hWaWRlbyhVUkwuY3JlYXRlT2JqZWN0VVJMKHJhd193ZWJNKSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgcmF3X3ZpZGVvXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoVmlkZW8oVVJMLmNyZWF0ZU9iamVjdFVSTChyZWZpbmVkV2ViTSkpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRfdmlkZW8gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayghTnVtYmVyLmlzRmluaXRlKHJhd192aWRlb18xLmR1cmF0aW9uKSwgXCJtZWRpYSByZWNvcmRlciB3ZWJtIGR1cmF0aW9uIGlzIG5vdCBmaW5pdGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE51bWJlci5pc0Zpbml0ZShyZWZpbmVkX3ZpZGVvLmR1cmF0aW9uKSwgXCJyZWZpbmVkIHdlYm0gZHVyYXRpb24gaXMgZmluaXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBzbGVlcCgxMDApXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgd2FpdCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgcmF3X3ZpZGVvXzEub25zZWVrZWQgPSByZXNvbHZlOyByYXdfdmlkZW9fMS5vbmVycm9yID0gcmVqZWN0OyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmF3X3ZpZGVvXzEuY3VycmVudFRpbWUgPSA3ICogMjQgKiA2MCAqIDYwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB3YWl0XTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZHVyYXRpb24gc2VjIGlzIGRpZmZlcmVudCBlYWNoIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhNYXRoLmFicyhyYXdfdmlkZW9fMS5kdXJhdGlvbiAtIHJlZmluZWRfdmlkZW8uZHVyYXRpb24pIDwgMC4xKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICBlcnJfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKGVycl8yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlYWRlci5sb2dnaW5nKSByZXR1cm4gWzMgLypicmVhayovLCAxMV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBkZWJ1Z1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJwdXQgc2Vla2FibGUgZWJtbCB0cmVlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZWFkQXNBcnJheUJ1ZmZlcihyZWZpbmVkV2ViTSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRCdWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRFbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUocmVmaW5lZEJ1Zik7XG4gICAgICAgICAgICAgICAgICAgIF9yZWFkZXJfMSA9IG5ldyBFQk1MUmVhZGVyXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBfcmVhZGVyXzEubG9nZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRFbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSkgeyByZXR1cm4gX3JlYWRlcl8xLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIF9yZWFkZXJfMS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTE7XG4gICAgICAgICAgICAgICAgY2FzZSAxMTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn1cbk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNULmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICBRVW5pdC50ZXN0KFwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0KGZpbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWNvZGVyLCByZWFkZXIsIGxhc3Rfc2VjLCBtZXRhZGF0YV9sb2FkZWQsIGNsdXN0ZXJfbnVtLCBsYXN0X3RpbWVjb2RlLCByZXMsIHdlYm1fYnVmLCBlbG1zO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBkZWNvZGVyID0gbmV3IF8xLkRlY29kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3IEVCTUxSZWFkZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3Rfc2VjID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiZHVyYXRpb25cIiwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZWNvZGVTY2FsZSA9IF9hLnRpbWVjb2RlU2NhbGUsIGR1cmF0aW9uID0gX2EuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VjID0gZHVyYXRpb24gKiB0aW1lY29kZVNjYWxlIC8gMTAwMCAvIDEwMDAgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE51bWJlci5pc0Zpbml0ZShzZWMpLCBcImR1cmF0aW9uOlwiICsgc2VjICsgXCJzZWNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soc2VjID4gbGFzdF9zZWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9zZWMgPSBzZWM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YV9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwibWV0YWRhdGFcIiwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGFTaXplID0gX2EubWV0YWRhdGFTaXplLCBkYXRhID0gX2EuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhtZXRhZGF0YVNpemUgPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhkYXRhLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGRhdGFbMF0ubmFtZSA9PT0gXCJFQk1MXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFfbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJfbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGFzdF90aW1lY29kZSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIuYWRkTGlzdGVuZXIoXCJjbHVzdGVyXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2x1c3RlciBjaHVuayB0ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGV2LmRhdGEsIHRpbWVjb2RlID0gZXYudGltZWNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKHRpbWVjb2RlKSwgXCJjbHVzdGVyLnRpbWVjb2RlOlwiICsgdGltZWNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGRhdGEubGVuZ3RoID4gMCwgXCJjbHVzdGVyLmxlbmd0aDpcIiArIGRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NlcnRpb24gPSBkYXRhLmV2ZXJ5KGZ1bmN0aW9uIChlbG0pIHsgcmV0dXJuIGVsbS5uYW1lID09PSBcIkNsdXN0ZXJcIiB8fCBlbG0ubmFtZSA9PT0gXCJUaW1lY29kZVwiIHx8IGVsbS5uYW1lID09PSBcIlNpbXBsZUJsb2NrXCI7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGFzc2VydGlvbiwgXCJlbGVtZW50IGNoZWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHRpbWVjb2RlID4gbGFzdF90aW1lY29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyX251bSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF90aW1lY29kZSA9IHRpbWVjb2RlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goZmlsZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB3ZWJtX2J1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcyA9IGRlY29kZXIuZGVjb2RlKHdlYm1fYnVmKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmVhZGVyLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhsYXN0X3NlYyA+IDApO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobWV0YWRhdGFfbG9hZGVkKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGNsdXN0ZXJfbnVtID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhsYXN0X3RpbWVjb2RlID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59XG5mdW5jdGlvbiBzbGVlcChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gc2V0VGltZW91dChyZXNvbHZlLCBtcyk7IH0pO1xufVxuZnVuY3Rpb24gZmV0Y2hWaWRlbyhzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XG4gICAgICAgIHZpZGVvLnNyYyA9IHNyYztcbiAgICAgICAgdmlkZW8uY29udHJvbHMgPSB0cnVlO1xuICAgICAgICB2aWRlby5vbmxvYWRlZGRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2aWRlby5vbmxvYWRlZGRhdGEgPSBudWxsO1xuICAgICAgICAgICAgcmVzb2x2ZSh2aWRlbyk7XG4gICAgICAgIH07XG4gICAgICAgIHZpZGVvLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICB2aWRlby5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZmV0Y2hJbWFnZShzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7IHJlc29sdmUoaW1nKTsgfTtcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7IHJlamVjdChlcnIuZXJyb3IpOyB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVhZEFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7IHJlc29sdmUocmVhZGVyLnJlc3VsdCk7IH07XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2KSB7IHJlamVjdChldi5lcnJvcik7IH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiB3YWl0RXZlbnQodGFyZ2V0LCBldiwgZXJyKSB7XG4gICAgaWYgKGVyciA9PT0gdm9pZCAwKSB7IGVyciA9IFwiZXJyb3JcIjsgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2LCBzdWNjKTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXJyLCBmYWlsKTtcbiAgICAgICAgZnVuY3Rpb24gc3VjYyhldikgeyBjbGVhbigpOyByZXNvbHZlKGV2KTsgfVxuICAgICAgICBmdW5jdGlvbiBmYWlsKGV2KSB7IGNsZWFuKCk7IHJlamVjdChldik7IH1cbiAgICAgICAgZnVuY3Rpb24gY2xlYW4oKSB7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldiwgc3VjYyk7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlcnIsIGZhaWwpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iXX0=

