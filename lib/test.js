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
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
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
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
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
                if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [
                        op[0] & 2,
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
Object.defineProperty(exports, '__esModule', { value: true });
var _1 = require('./');
var _2 = require('./');
var Buffer = _2.tools.Buffer;
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
    return __awaiter(void 0, void 0, void 0, function () {
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
                            assert.ok(_rec7._expr(_rec7._capt(_rec7._capt(_rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'DateUTC', 'arguments/0/left/left') && _rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'd', 'arguments/0/left/right'), 'arguments/0/left') && _rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/right/left/object').value, 'arguments/0/right/left') instanceof _rec7._capt(Date, 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "DateUTC" && elm.type === "d" && elm.value instanceof Date)',
                                filepath: 'lib/test.js',
                                line: 84
                            }));
                            assert.ok(_rec8._expr(_rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(elm, 'arguments/0/left/left/object').type, 'arguments/0/left/left') === 'd', 'arguments/0/left') && _rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(_2, 'arguments/0/right/left/callee/object/callee/object/object').tools, 'arguments/0/right/left/callee/object/callee/object').convertEBMLDateToJSDate(_rec8._capt(_rec8._capt(elm, 'arguments/0/right/left/callee/object/arguments/0/object').value, 'arguments/0/right/left/callee/object/arguments/0')), 'arguments/0/right/left/callee/object').getTime(), 'arguments/0/right/left') === _rec8._capt(_rec8._capt(new Date('2010-08-21T07:23:03.000Z'), 'arguments/0/right/right/callee/object').getTime(), 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.type === "d" && _2.tools.convertEBMLDateToJSDate(elm.value).getTime() === new Date("2010-08-21T07:23:03.000Z").getTime())',
                                filepath: 'lib/test.js',
                                line: 85
                            }));
                        }
                    },
                    {
                        index: 29,
                        test: function (elm) {
                            var _rec9 = new _PowerAssertRecorder1();
                            var _rec10 = new _PowerAssertRecorder1();
                            assert.ok(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt(_rec9._capt(elm, 'arguments/0/left/left/object').name, 'arguments/0/left/left') === 'SegmentUID', 'arguments/0/left') && _rec9._capt(_rec9._capt(_rec9._capt(elm, 'arguments/0/right/left/object').type, 'arguments/0/right/left') === 'b', 'arguments/0/right'), 'arguments/0'), {
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
                                assert.ok(_rec10._expr(_rec10._capt(_rec10._capt(buf_1, 'arguments/0/callee/object').every(function (val, i) {
                                    return buf2_1[i] === val;
                                }), 'arguments/0'), {
                                    content: 'assert.ok(buf_1.every(function (val, i) {return buf2_1[i] === val;}))',
                                    filepath: 'lib/test.js',
                                    line: 95
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
                var _rec11 = new _PowerAssertRecorder1();
                var _rec12 = new _PowerAssertRecorder1();
                var _rec13 = new _PowerAssertRecorder1();
                var _rec14 = new _PowerAssertRecorder1();
                var _rec15 = new _PowerAssertRecorder1();
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
                    assert.ok(_rec11._expr(_rec11._capt(_rec11._capt(_rec11._capt(elms, 'arguments/0/left/object').length, 'arguments/0/left') === _rec11._capt(_rec11._capt(elms2, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elms.length === elms2.length)',
                        filepath: 'lib/test.js',
                        line: 126
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
                    assert.ok(_rec12._expr(_rec12._capt(_rec12._capt(_rec12._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec12._capt(_rec12._capt(elm2, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.name === elm2.name)',
                        filepath: 'lib/test.js',
                        line: 133
                    }));
                    assert.ok(_rec13._expr(_rec13._capt(_rec13._capt(_rec13._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec13._capt(_rec13._capt(elm2, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.type === elm2.type)',
                        filepath: 'lib/test.js',
                        line: 134
                    }));
                    if (elm.type === 'm' || elm2.type === 'm') {
                        return [2];
                    }
                    if (elm.type === 'b' && elm2.type === 'b') {
                        assert.ok(_rec14._expr(_rec14._capt(_rec14._capt(_rec14._capt(_rec14._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec14._capt(_rec14._capt(_rec14._capt(elm2, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(elm.value.length === elm2.value.length)',
                            filepath: 'lib/test.js',
                            line: 139
                        }));
                        return [2];
                    }
                    assert.ok(_rec15._expr(_rec15._capt(_rec15._capt(_rec15._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec15._capt(_rec15._capt(elm2, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.value === elm2.value)',
                        filepath: 'lib/test.js',
                        line: 142
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
    return __awaiter(void 0, void 0, void 0, function () {
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
                    name: 'TimestampScale',
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
                    name: 'Timestamp',
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
                var _rec16 = new _PowerAssertRecorder1();
                var _rec17 = new _PowerAssertRecorder1();
                var _rec18 = new _PowerAssertRecorder1();
                var _rec19 = new _PowerAssertRecorder1();
                var origin = tagStream[i];
                assert.ok(_rec16._expr(_rec16._capt(_rec16._capt(_rec16._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec16._capt(_rec16._capt(origin, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === origin.name, "compare tag name")',
                    filepath: 'lib/test.js',
                    line: 184
                }), 'compare tag name');
                assert.ok(_rec17._expr(_rec17._capt(_rec17._capt(_rec17._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec17._capt(_rec17._capt(origin, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.type === origin.type, "compare tag type")',
                    filepath: 'lib/test.js',
                    line: 185
                }), 'compare tag type');
                if (elm.type === 'm' || origin.type === 'm') {
                    return;
                }
                if (elm.type === 'b' && origin.type === 'b') {
                    assert.ok(_rec18._expr(_rec18._capt(_rec18._capt(_rec18._capt(_rec18._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec18._capt(_rec18._capt(_rec18._capt(origin, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.value.length === origin.value.length, "compare tag value")',
                        filepath: 'lib/test.js',
                        line: 190
                    }), 'compare tag value');
                    return;
                }
                assert.ok(_rec19._expr(_rec19._capt(_rec19._capt(_rec19._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec19._capt(_rec19._capt(origin, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.value === origin.value, "compare tag value")',
                    filepath: 'lib/test.js',
                    line: 193
                }), 'compare tag value');
            });
            return [2];
        });
    });
});
QUnit.module('Reader');
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
                var _rec20 = new _PowerAssertRecorder1();
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
                    assert.ok(_rec20._expr(_rec20._capt(_rec20._capt(_rec20._capt(_rec20._capt(img, 'arguments/0/left/left/object').width, 'arguments/0/left/left') > 0, 'arguments/0/left') && _rec20._capt(_rec20._capt(_rec20._capt(img, 'arguments/0/right/left/object').height, 'arguments/0/right/left') > 0, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(img.width > 0 && img.height > 0, "size:" + img.width + "x" + img.height)',
                        filepath: 'lib/test.js',
                        line: 246
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
                var _rec21 = new _PowerAssertRecorder1();
                var _rec22 = new _PowerAssertRecorder1();
                var _rec23 = new _PowerAssertRecorder1();
                var _rec24 = new _PowerAssertRecorder1();
                var _rec25 = new _PowerAssertRecorder1();
                var _rec26 = new _PowerAssertRecorder1();
                var _rec27 = new _PowerAssertRecorder1();
                var _rec28 = new _PowerAssertRecorder1();
                switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new _1.Reader();
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
                    assert.ok(_rec21._expr(_rec21._capt(_rec21._capt(_rec21._capt(_rec21._capt(_rec21._capt(reader, 'arguments/0/left/object/object/object').metadatas, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
                        content: 'assert.ok(reader.metadatas[0].name === "EBML")',
                        filepath: 'lib/test.js',
                        line: 286
                    }));
                    assert.ok(_rec22._expr(_rec22._capt(_rec22._capt(_rec22._capt(_rec22._capt(reader, 'arguments/0/left/object/object').metadatas, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(reader.metadatas.length > 0)',
                        filepath: 'lib/test.js',
                        line: 287
                    }));
                    sec = reader.duration * reader.timestampScale / 1000 / 1000 / 1000;
                    assert.ok(_rec23._expr(_rec23._capt(_rec23._capt(7 < _rec23._capt(sec, 'arguments/0/left/right'), 'arguments/0/left') && _rec23._capt(_rec23._capt(sec, 'arguments/0/right/left') < 11, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(7 < sec && sec < 11)',
                        filepath: 'lib/test.js',
                        line: 289
                    }));
                    refinedMetadataBuf = _2.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
                    body = webm_buf.slice(reader.metadataSize);
                    assert.ok(_rec24._expr(_rec24._capt(_rec24._capt(_rec24._capt(_rec24._capt(refinedMetadataBuf, 'arguments/0/left/left/object').byteLength, 'arguments/0/left/left') - _rec24._capt(_rec24._capt(reader, 'arguments/0/left/right/object').metadataSize, 'arguments/0/left/right'), 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(refinedMetadataBuf.byteLength - reader.metadataSize > 0)',
                        filepath: 'lib/test.js',
                        line: 292
                    }));
                    assert.ok(_rec25._expr(_rec25._capt(_rec25._capt(_rec25._capt(webm_buf, 'arguments/0/left/object').byteLength, 'arguments/0/left') === _rec25._capt(_rec25._capt(_rec25._capt(reader, 'arguments/0/right/left/object').metadataSize, 'arguments/0/right/left') + _rec25._capt(_rec25._capt(body, 'arguments/0/right/right/object').byteLength, 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(webm_buf.byteLength === reader.metadataSize + body.byteLength)',
                        filepath: 'lib/test.js',
                        line: 293
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
                        assert.ok(_rec26._expr(_rec26._capt(!_rec26._capt(_rec26._capt(Number, 'arguments/0/argument/callee/object').isFinite(_rec26._capt(_rec26._capt(raw_video_1, 'arguments/0/argument/arguments/0/object').duration, 'arguments/0/argument/arguments/0')), 'arguments/0/argument'), 'arguments/0'), {
                            content: 'assert.ok(!Number.isFinite(raw_video_1.duration), "media recorder webm duration is not finite")',
                            filepath: 'lib/test.js',
                            line: 307
                        }), 'media recorder webm duration is not finite');
                    }
                    assert.ok(_rec27._expr(_rec27._capt(_rec27._capt(Number, 'arguments/0/callee/object').isFinite(_rec27._capt(_rec27._capt(refined_video, 'arguments/0/arguments/0/object').duration, 'arguments/0/arguments/0')), 'arguments/0'), {
                        content: 'assert.ok(Number.isFinite(refined_video.duration), "refined webm duration is finite")',
                        filepath: 'lib/test.js',
                        line: 309
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
                    assert.ok(_rec28._expr(_rec28._capt(_rec28._capt(_rec28._capt(Math, 'arguments/0/left/callee/object').abs(_rec28._capt(_rec28._capt(_rec28._capt(raw_video_1, 'arguments/0/left/arguments/0/left/object').duration, 'arguments/0/left/arguments/0/left') - _rec28._capt(_rec28._capt(refined_video, 'arguments/0/left/arguments/0/right/object').duration, 'arguments/0/left/arguments/0/right'), 'arguments/0/left/arguments/0')), 'arguments/0/left') < 0.1, 'arguments/0'), {
                        content: 'assert.ok(Math.abs(raw_video_1.duration - refined_video.duration) < 0.1)',
                        filepath: 'lib/test.js',
                        line: 319
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
                    _reader_1 = new _1.Reader();
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
            var decoder, reader, last_sec, metadata_loaded, cluster_num, last_timestamp, res, webm_buf, elms;
            return __generator(this, function (_a) {
                var _rec38 = new _PowerAssertRecorder1();
                var _rec39 = new _PowerAssertRecorder1();
                var _rec40 = new _PowerAssertRecorder1();
                var _rec41 = new _PowerAssertRecorder1();
                switch (_a.label) {
                case 0:
                    decoder = new _1.Decoder();
                    reader = new _1.Reader();
                    last_sec = 0;
                    reader.addListener('duration', function (_a) {
                        var _rec29 = new _PowerAssertRecorder1();
                        var _rec30 = new _PowerAssertRecorder1();
                        var timestampScale = _a.timestampScale, duration = _a.duration;
                        var sec = duration * timestampScale / 1000 / 1000 / 1000;
                        assert.ok(_rec29._expr(_rec29._capt(_rec29._capt(Number, 'arguments/0/callee/object').isFinite(_rec29._capt(sec, 'arguments/0/arguments/0')), 'arguments/0'), {
                            content: 'assert.ok(Number.isFinite(sec), "duration:" + sec + "sec")',
                            filepath: 'lib/test.js',
                            line: 359
                        }), 'duration:' + sec + 'sec');
                        assert.ok(_rec30._expr(_rec30._capt(_rec30._capt(sec, 'arguments/0/left') > _rec30._capt(last_sec, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(sec > last_sec)',
                            filepath: 'lib/test.js',
                            line: 360
                        }));
                        last_sec = sec;
                    });
                    metadata_loaded = false;
                    reader.addListener('metadata', function (_a) {
                        var _rec31 = new _PowerAssertRecorder1();
                        var _rec32 = new _PowerAssertRecorder1();
                        var _rec33 = new _PowerAssertRecorder1();
                        var metadataSize = _a.metadataSize, data = _a.data;
                        assert.ok(_rec31._expr(_rec31._capt(_rec31._capt(metadataSize, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(metadataSize > 0)',
                            filepath: 'lib/test.js',
                            line: 366
                        }));
                        assert.ok(_rec32._expr(_rec32._capt(_rec32._capt(_rec32._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(data.length > 0)',
                            filepath: 'lib/test.js',
                            line: 367
                        }));
                        assert.ok(_rec33._expr(_rec33._capt(_rec33._capt(_rec33._capt(_rec33._capt(data, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
                            content: 'assert.ok(data[0].name === "EBML")',
                            filepath: 'lib/test.js',
                            line: 368
                        }));
                        metadata_loaded = true;
                    });
                    cluster_num = 0;
                    last_timestamp = -1;
                    reader.addListener('cluster', function (ev) {
                        var _rec34 = new _PowerAssertRecorder1();
                        var _rec35 = new _PowerAssertRecorder1();
                        var _rec36 = new _PowerAssertRecorder1();
                        var _rec37 = new _PowerAssertRecorder1();
                        var data = ev.data, timestamp = ev.timestamp;
                        assert.ok(_rec34._expr(_rec34._capt(_rec34._capt(Number, 'arguments/0/callee/object').isFinite(_rec34._capt(timestamp, 'arguments/0/arguments/0')), 'arguments/0'), {
                            content: 'assert.ok(Number.isFinite(timestamp), "cluster.timestamp:" + timestamp)',
                            filepath: 'lib/test.js',
                            line: 376
                        }), 'cluster.timestamp:' + timestamp);
                        assert.ok(_rec35._expr(_rec35._capt(_rec35._capt(_rec35._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(data.length > 0, "cluster.length:" + data.length)',
                            filepath: 'lib/test.js',
                            line: 377
                        }), 'cluster.length:' + data.length);
                        var assertion = data.every(function (elm) {
                            return elm.name === 'Cluster' || elm.name === 'Timestamp' || elm.name === 'SimpleBlock';
                        });
                        assert.ok(_rec36._expr(_rec36._capt(assertion, 'arguments/0'), {
                            content: 'assert.ok(assertion, "element check")',
                            filepath: 'lib/test.js',
                            line: 379
                        }), 'element check');
                        assert.ok(_rec37._expr(_rec37._capt(_rec37._capt(timestamp, 'arguments/0/left') > _rec37._capt(last_timestamp, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(timestamp > last_timestamp)',
                            filepath: 'lib/test.js',
                            line: 380
                        }));
                        cluster_num += 1;
                        last_timestamp = timestamp;
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
                    assert.ok(_rec38._expr(_rec38._capt(_rec38._capt(last_sec, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(last_sec > 0)',
                        filepath: 'lib/test.js',
                        line: 393
                    }));
                    assert.ok(_rec39._expr(_rec39._capt(metadata_loaded, 'arguments/0'), {
                        content: 'assert.ok(metadata_loaded)',
                        filepath: 'lib/test.js',
                        line: 394
                    }));
                    assert.ok(_rec40._expr(_rec40._capt(_rec40._capt(cluster_num, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(cluster_num > 0)',
                        filepath: 'lib/test.js',
                        line: 395
                    }));
                    assert.ok(_rec41._expr(_rec41._capt(_rec41._capt(last_timestamp, 'arguments/0/left') > 0, 'arguments/0'), {
                        content: 'assert.ok(last_timestamp > 0)',
                        filepath: 'lib/test.js',
                        line: 396
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
            reject(err);
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
            reject(ev);
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
QUnit.on('runEnd', function (runEnd) {
    return global.runEnd = runEnd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsImFkb3B0IiwicmVzb2x2ZSIsIlByb21pc2UiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJfIiwibGFiZWwiLCJzZW50IiwidCIsInRyeXMiLCJvcHMiLCJmIiwieSIsImciLCJ2ZXJiIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJuIiwidiIsIm9wIiwiVHlwZUVycm9yIiwiY2FsbCIsInBvcCIsImxlbmd0aCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsIl8xIiwicmVxdWlyZSIsIl8yIiwiQnVmZmVyIiwidG9vbHMiLCJRVW5pdCIsImVtcG93ZXIiLCJmb3JtYXR0ZXIiLCJxdW5pdFRhcCIsImNvbmZpZyIsImF1dG9zdGFydCIsImFzc2VydCIsImRlc3RydWN0aXZlIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsInNob3dTb3VyY2VPbkZhaWx1cmUiLCJXRUJNX0ZJTEVfTElTVCIsIm1vZHVsZSIsInRlc3QiLCJmaWxlIiwicmVzIiwiYnVmIiwiZWxtcyIsImJ1ZjIiLCJlbG1zMiIsInRlc3RzIiwiX2kiLCJ0ZXN0c18xIiwiX2EiLCJmZXRjaCIsImFycmF5QnVmZmVyIiwiRGVjb2RlciIsImRlY29kZSIsIkVuY29kZXIiLCJlbmNvZGUiLCJpbmRleCIsImVsbSIsIl9yZWMxIiwib2siLCJuYW1lIiwidHlwZSIsImlzRW5kIiwiY29udGVudCIsImZpbGVwYXRoIiwibGluZSIsIl9yZWMyIiwiX3JlYzMiLCJfcmVjNCIsIl9yZWM1IiwiX3JlYzYiLCJfcmVjNyIsIl9yZWM4IiwiRGF0ZSIsImNvbnZlcnRFQk1MRGF0ZVRvSlNEYXRlIiwiZ2V0VGltZSIsIl9yZWM5IiwiX3JlYzEwIiwiYnVmXzEiLCJVaW50OEFycmF5IiwiYnVmMl8xIiwiZXZlcnkiLCJ2YWwiLCJpIiwiZm9yRWFjaCIsImNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdCIsIl90aGlzIiwiZWxtMiIsIl9yZWMxMSIsIl9yZWMxMiIsIl9yZWMxMyIsIl9yZWMxNCIsIl9yZWMxNSIsInNsZWVwIiwidGFnU3RyZWFtIiwiYmluYXJpemVkIiwidW5rbm93blNpemUiLCJtYXAiLCJlbmNvZGVWYWx1ZVRvQnVmZmVyIiwiX3JlYzE2IiwiX3JlYzE3IiwiX3JlYzE4IiwiX3JlYzE5Iiwib3JpZ2luIiwiTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QiLCJjcmVhdGVfd2VicF90ZXN0Iiwid2VibV9idWYiLCJXZWJQcyIsIldlYlBzXzEiLCJXZWJQIiwic3JjIiwiaW1nIiwiZXJyXzEiLCJfcmVjMjAiLCJXZWJQRnJhbWVGaWx0ZXIiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJmZXRjaEltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJub3RPayIsInJldm9rZU9iamVjdFVSTCIsImNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3QiLCJkZWNvZGVyIiwicmVhZGVyIiwic2VjIiwicmVmaW5lZE1ldGFkYXRhQnVmIiwicmF3X3dlYk0iLCJyZWZpbmVkV2ViTSIsInJhd192aWRlb18xIiwicmVmaW5lZF92aWRlbyIsIndhaXQiLCJlcnJfMiIsInJlZmluZWRCdWYiLCJyZWZpbmVkRWxtcyIsIl9yZWFkZXJfMSIsIl9yZWMyMSIsIl9yZWMyMiIsIl9yZWMyMyIsIl9yZWMyNCIsIl9yZWMyNSIsIl9yZWMyNiIsIl9yZWMyNyIsIl9yZWMyOCIsIlJlYWRlciIsImluZm8iLCJyZWFkIiwic3RvcCIsIm1ldGFkYXRhcyIsImR1cmF0aW9uIiwidGltZXN0YW1wU2NhbGUiLCJtYWtlTWV0YWRhdGFTZWVrYWJsZSIsImN1ZXMiLCJzbGljZSIsIm1ldGFkYXRhU2l6ZSIsImJ5dGVMZW5ndGgiLCJCbG9iIiwiZmV0Y2hWaWRlbyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIk51bWJlciIsImlzRmluaXRlIiwib25zZWVrZWQiLCJvbmVycm9yIiwiY3VycmVudFRpbWUiLCJNYXRoIiwiYWJzIiwibG9nZ2luZyIsInJlYWRBc0FycmF5QnVmZmVyIiwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0IiwibGFzdF9zZWMiLCJtZXRhZGF0YV9sb2FkZWQiLCJjbHVzdGVyX251bSIsImxhc3RfdGltZXN0YW1wIiwiX3JlYzM4IiwiX3JlYzM5IiwiX3JlYzQwIiwiX3JlYzQxIiwiYWRkTGlzdGVuZXIiLCJfcmVjMjkiLCJfcmVjMzAiLCJfcmVjMzEiLCJfcmVjMzIiLCJfcmVjMzMiLCJkYXRhIiwiZXYiLCJfcmVjMzQiLCJfcmVjMzUiLCJfcmVjMzYiLCJfcmVjMzciLCJ0aW1lc3RhbXAiLCJhc3NlcnRpb24iLCJtcyIsInNldFRpbWVvdXQiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRyb2xzIiwib25sb2FkZWRkYXRhIiwiZXJyIiwiSW1hZ2UiLCJvbmxvYWQiLCJibG9iIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsIndhaXRFdmVudCIsInRhcmdldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWNjIiwiZmFpbCIsImNsZWFuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uIiwicnVuRW5kIiwiZ2xvYmFsIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLElBQUFBLHFCQUFBO0FBQUEsYUFBQUMsbUJBQUE7QUFBQSxhQUFBQyxRQUFBO0FBQUE7QUFBQSxJQUFBRCxtQkFBQSxDQUFBRSxTQUFBLENB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LE9BQUEsQ0FBUXlNLEVBQVIsRUFBWDtBQUFBLFNBSHdCO0FBQUEsUUFJMUMsU0FBU3dCLElBQVQsQ0FBY3hCLEVBQWQsRUFBa0I7QUFBQSxZQUFFeUIsS0FBQSxHQUFGO0FBQUEsWUFBV2hPLE1BQUEsQ0FBT3VNLEVBQVAsRUFBWDtBQUFBLFNBSndCO0FBQUEsUUFLMUMsU0FBU3lCLEtBQVQsR0FBaUI7QUFBQSxZQUNiSixNQUFBLENBQU9LLG1CQUFQLENBQTJCMUIsRUFBM0IsRUFBK0J1QixJQUEvQixFQURhO0FBQUEsWUFFYkYsTUFBQSxDQUFPSyxtQkFBUCxDQUEyQlosR0FBM0IsRUFBZ0NVLElBQWhDLEVBRmE7QUFBQSxTQUx5QjtBQUFBLEtBQXZDLENBQVAsQ0FGZ0M7QUFBQSxDQW5icEM7QUFnY0F4TCxLQUFBLENBQU0yTCxFQUFOLENBQVMsUUFBVCxFQUFtQixVQUFVQyxNQUFWLEVBQWtCO0FBQUEsSUFBRSxPQUFPQyxNQUFBLENBQU9ELE1BQVAsR0FBZ0JBLE1BQXZCLENBQUY7QUFBQSxDQUFyQyIsInNvdXJjZVJvb3QiOiIvaG9tZS9kYXZpZC90cy1lYm1sIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJxdW5pdFwiLz5cbnZhciBfMSA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBfMiA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBCdWZmZXIgPSBfMi50b29scy5CdWZmZXI7XG52YXIgUVVuaXQgPSByZXF1aXJlKFwicXVuaXRqc1wiKTtcbnZhciBlbXBvd2VyID0gcmVxdWlyZShcImVtcG93ZXJcIik7XG52YXIgZm9ybWF0dGVyID0gcmVxdWlyZShcInBvd2VyLWFzc2VydC1mb3JtYXR0ZXJcIik7XG52YXIgcXVuaXRUYXAgPSByZXF1aXJlKFwicXVuaXQtdGFwXCIpO1xuUVVuaXQuY29uZmlnLmF1dG9zdGFydCA9IHRydWU7XG5lbXBvd2VyKFFVbml0LmFzc2VydCwgZm9ybWF0dGVyKCksIHsgZGVzdHJ1Y3RpdmU6IHRydWUgfSk7XG5xdW5pdFRhcChRVW5pdCwgZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpOyB9LCB7IHNob3dTb3VyY2VPbkZhaWx1cmU6IGZhbHNlIH0pO1xudmFyIFdFQk1fRklMRV9MSVNUID0gW1xuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3QxLm1rdlwiLFxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3QyLm1rdlwiLFxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3QzLm1rdlwiLFxuICAgIC8vIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q0Lm1rdlwiLCB0aGlzIGZpbGUgaXMgYnJva2VuIHNvIG5vdCBwYXNzIGVuY29kZXJfZGVjb2Rlcl90ZXN0IFxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q1Lm1rdlwiLFxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q2Lm1rdlwiLFxuICAgIC8vIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q3Lm1rdlwiLCB0aGlzIGZpbGUgaGFzIHVua25vd24gdGFnIHNvIGNhbm5vdCB3cml0ZSBmaWxlXG4gICAgXCIuLi9tYXRyb3NrYS10ZXN0LWZpbGVzL3Rlc3RfZmlsZXMvdGVzdDgubWt2XCIsXG5dO1xuUVVuaXQubW9kdWxlKFwidHMtRUJNTFwiKTtcblFVbml0LnRlc3QoXCJlbmNvZGVyLWRlY29kZXJcIiwgZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmlsZSwgcmVzLCBidWYsIGVsbXMsIGJ1ZjIsIGVsbXMyLCB0ZXN0cywgX2ksIHRlc3RzXzEsIHRlc3Q7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZmlsZSA9IFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3QxLm1rdlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmKTtcbiAgICAgICAgICAgICAgICBidWYyID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoZWxtcyk7XG4gICAgICAgICAgICAgICAgZWxtczIgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYyKTtcbiAgICAgICAgICAgICAgICB0ZXN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMCwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRUJNTFwiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IGZhbHNlKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiA0LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7IGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJFQk1MXCIgJiYgZWxtLnR5cGUgPT09IFwibVwiICYmIGVsbS5pc0VuZCA9PT0gdHJ1ZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogNSwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiU2VnbWVudFwiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IGZhbHNlKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiAyNCwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiSW5mb1wiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IGZhbHNlKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiAyNSwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRHVyYXRpb25cIiAmJiBlbG0udHlwZSA9PT0gXCJmXCIgJiYgZWxtLnZhbHVlID09PSA4NzMzNik7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjYsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIk11eGluZ0FwcFwiICYmIGVsbS50eXBlID09PSBcIjhcIiAmJiBlbG0udmFsdWUgPT09IFwibGliZWJtbDIgdjAuMTAuMCArIGxpYm1hdHJvc2thMiB2MC4xMC4xXCIpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDI4LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkRhdGVVVENcIiAmJiBlbG0udHlwZSA9PT0gXCJkXCIgJiYgZWxtLnZhbHVlIGluc3RhbmNlb2YgRGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS50eXBlID09PSBcImRcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfMi50b29scy5jb252ZXJ0RUJNTERhdGVUb0pTRGF0ZShlbG0udmFsdWUpLmdldFRpbWUoKSA9PT0gbmV3IERhdGUoXCIyMDEwLTA4LTIxVDA3OjIzOjAzLjAwMFpcIikuZ2V0VGltZSgpKTsgLy8gdG9JU09TdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjksIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiU2VnbWVudFVJRFwiICYmIGVsbS50eXBlID09PSBcImJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcImJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmXzEgPSBuZXcgVWludDhBcnJheShuZXcgQnVmZmVyKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4OTIsIDB4MmQsIDB4MTksIDB4MzIsIDB4MGYsIDB4MWUsIDB4MTMsIDB4YzUsIDB4YjUsIDB4MDUsIDB4NjMsIDB4MGEsIDB4YWYsIDB4ZDgsIDB4NTMsIDB4MzZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmMl8xID0gbmV3IFVpbnQ4QXJyYXkoZWxtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGJ1Zl8xLmV2ZXJ5KGZ1bmN0aW9uICh2YWwsIGkpIHsgcmV0dXJuIGJ1ZjJfMVtpXSA9PT0gdmFsOyB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgZm9yIChfaSA9IDAsIHRlc3RzXzEgPSB0ZXN0czsgX2kgPCB0ZXN0c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0ID0gdGVzdHNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgIHRlc3QudGVzdChlbG1zMlt0ZXN0LmluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH0pO1xuV0VCTV9GSUxFX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgIFFVbml0LnRlc3QoXCJlbmNvZGVyLWRlY29kZXI6XCIgKyBmaWxlLCBjcmVhdGVfZW5jb2Rlcl9kZWNvZGVyX3Rlc3QoZmlsZSkpO1xufSk7XG5mdW5jdGlvbiBjcmVhdGVfZW5jb2Rlcl9kZWNvZGVyX3Rlc3QoZmlsZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcywgYnVmLCBlbG1zLCBidWYyLCBlbG1zMiwgaSwgZWxtLCBlbG0yO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZjIgPSBuZXcgXzEuRW5jb2RlcigpLmVuY29kZShlbG1zKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtczIgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYyKTtcbiAgICAgICAgICAgICAgICAgICAgLy9hc3NlcnQub2soYnVmLmJ5dGVMZW5ndGggPT09IGJ1ZjIuYnl0ZUxlbmd0aCwgXCJUaGlzIHByb2JsZW0gaXMgY2F1c2VkIGJ5IEpTIGJlaW5nIHVuYWJsZSB0byBoYW5kbGUgSW50NjQuXCIpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtcy5sZW5ndGggPT09IGVsbXMyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShpIDwgZWxtcy5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA2XTtcbiAgICAgICAgICAgICAgICAgICAgZWxtID0gZWxtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgZWxtMiA9IGVsbXMyW2ldO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IGVsbTIubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udHlwZSA9PT0gZWxtMi50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcIm1cIiB8fCBlbG0yLnR5cGUgPT09IFwibVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcImJcIiAmJiBlbG0yLnR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlLmxlbmd0aCA9PT0gZWxtMi52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUgPT09IGVsbTIudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBzbGVlcCgxKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufVxuUVVuaXQudGVzdChcImhhbmR3cml0ZS1lbmNvZGVyXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRhZ1N0cmVhbSwgYmluYXJpemVkLCBidWYsIGVsbXM7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB0YWdTdHJlYW0gPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFJlYWRWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxNYXhJRExlbmd0aFwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MTWF4U2l6ZUxlbmd0aFwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDggfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEb2NUeXBlXCIsIHR5cGU6IFwic1wiLCB2YWx1ZTogXCJ3ZWJtXCIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEb2NUeXBlVmVyc2lvblwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEb2NUeXBlUmVhZFZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAyIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTZWdtZW50XCIsIHR5cGU6IFwibVwiLCB1bmtub3duU2l6ZTogdHJ1ZSwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2Vla0hlYWRcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlNlZWtIZWFkXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkluZm9cIiwgdHlwZTogXCJtXCIsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlRpbWVzdGFtcFNjYWxlXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMTAwMDAwMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkluZm9cIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRHVyYXRpb25cIiwgdHlwZTogXCJmXCIsIHZhbHVlOiAwLjAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJDbHVzdGVyXCIsIHR5cGU6IFwibVwiLCB1bmtub3duU2l6ZTogdHJ1ZSwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiVGltZXN0YW1wXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlNpbXBsZUJsb2NrXCIsIHR5cGU6IFwiYlwiLCB2YWx1ZTogbmV3IEJ1ZmZlcigxMDI0KSB9LFxuICAgICAgICBdO1xuICAgICAgICBiaW5hcml6ZWQgPSB0YWdTdHJlYW0ubWFwKF8yLnRvb2xzLmVuY29kZVZhbHVlVG9CdWZmZXIpO1xuICAgICAgICBidWYgPSBuZXcgXzEuRW5jb2RlcigpLmVuY29kZShiaW5hcml6ZWQpO1xuICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmKTtcbiAgICAgICAgZWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0sIGkpIHtcbiAgICAgICAgICAgIHZhciBvcmlnaW4gPSB0YWdTdHJlYW1baV07XG4gICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IG9yaWdpbi5uYW1lLCBcImNvbXBhcmUgdGFnIG5hbWVcIik7XG4gICAgICAgICAgICBhc3NlcnQub2soZWxtLnR5cGUgPT09IG9yaWdpbi50eXBlLCBcImNvbXBhcmUgdGFnIHR5cGVcIik7XG4gICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwibVwiIHx8IG9yaWdpbi50eXBlID09PSBcIm1cIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbG0udHlwZSA9PT0gXCJiXCIgJiYgb3JpZ2luLnR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS52YWx1ZS5sZW5ndGggPT09IG9yaWdpbi52YWx1ZS5sZW5ndGgsIFwiY29tcGFyZSB0YWcgdmFsdWVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS52YWx1ZSA9PT0gb3JpZ2luLnZhbHVlLCBcImNvbXBhcmUgdGFnIHZhbHVlXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgIH0pO1xufSk7IH0pO1xuUVVuaXQubW9kdWxlKFwiUmVhZGVyXCIpO1xudmFyIE1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNUID0gW1xuICAgIFwiLi9jaHJvbWU1Ny53ZWJtXCIsXG4gICAgLy8gbGFzdDJ0aW1lc3RhbXAodmlkZW8sIGF1ZGlvKTogKCg3LjQ5M3MsIDcuNTUycyksICg3LjQ5M3MsIDcuNTUycykpXG4gICAgLy8gQ2hyb21lNTc6IDcuNjEycyB+PSA3LjYxMXMgPSA3LjU1MnMgKyAoNy41NTJzIC0gNy40OTNzKSAvLyA/Pz9cbiAgICAvLyBGaXJlZm94NTM6IDcuNTUycyA9IDcuNTUycyArICg3LjU1MnMgLSA3LjU1MnMpIC8vIHNoaXQhXG4gICAgLy8gUmVhZGVyOiA3LjYxMXMgPSA3LjU1MnMgKyAoNy41NTJzIC0gNy40OTNzKVxuICAgIFwiLi9maXJlZm94NTVuaWdodGx5LndlYm1cIixcbiAgICAvLyBsYXN0MnRpbWVzdGFtcCh2aWRlbywgYXVkaW8pOiAoKDguNTY3cywgOC41OTBzKSwgKDguNjI2cywgOC42NDZzKSksIENvZGVjRGVsYXkoYXVkaW8pOiA2LjUwMG1zXG4gICAgLy8gQ2hyb21lNTc6IDguNjU5cyB+PSA4LjY1OTVzID0gOC42NDZzICsgKDguNjQ2cyAtIDguNjI2cykgLSA2LjUwMG1zXG4gICAgLy8gRmlyZWZveDUzOiA4LjY2NnMgPSA4LjY0NnMgKyAoOC42NDZzIC0gOC42MjZzKVxuICAgIC8vIFJlYWRlcjogOC42NTk1cyA9IDguNjQ2cyArICg4LjY0NnMgLSA4LjYyNnMpIC0gNi41MDBtc1xuICAgIFwiLi9maXJlZm94NTMud2VibVwiLFxuICAgIC8vIENocm9tZTU3OiAxMC4wMTlzLCBGaXJlZm94NTM6IDEwLjAyNnMsIFJlYWRlcjogOS45NjdzXG4gICAgLy8gbGFzdDJ0aW1lc3RhbXAodmlkZW8sIGF1ZGlvKTogKCg5LjkzMnMsIDkuOTY3cyksICg5Ljk4NnMsIDEwLjAwNnMpKSwgQ29kZWNEZWxheShhdWRpbyk6IDYuNTAwbXNcbiAgICAvLyBDaHJvbWU1NzogMTAuMDE5cyB+PSAxMC4wMTk1cyA9IDEwLjAwNnMgKyAoMTAuMDA2cyAtIDkuOTg2cykgLSA2LjUwMG1zXG4gICAgLy8gRmlyZWZveDUzOiAxMC4wMjZzID0gMTAuMDA2cyArICgxMC4wMDZzIC0gOS45ODZzKVxuICAgIC8vIFJlYWRlcjogMTAuMDE5NXMgPSAxMC4wMDZzICsgKDEwLjAwNnMgLSA5Ljk4NnMpIC0gNi41MDBtc1xuXTtcbk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNULmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICBRVW5pdC50ZXN0KFwiY3JlYXRlX3dlYnBfdGVzdDpcIiArIGZpbGUsIGNyZWF0ZV93ZWJwX3Rlc3QoZmlsZSkpO1xufSk7XG5mdW5jdGlvbiBjcmVhdGVfd2VicF90ZXN0KGZpbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXMsIHdlYm1fYnVmLCBlbG1zLCBXZWJQcywgX2ksIFdlYlBzXzEsIFdlYlAsIHNyYywgaW1nLCBlcnJfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goZmlsZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB3ZWJtX2J1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKHdlYm1fYnVmKTtcbiAgICAgICAgICAgICAgICAgICAgV2ViUHMgPSBfMi50b29scy5XZWJQRnJhbWVGaWx0ZXIoZWxtcyk7XG4gICAgICAgICAgICAgICAgICAgIF9pID0gMCwgV2ViUHNfMSA9IFdlYlBzO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShfaSA8IFdlYlBzXzEubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgIFdlYlAgPSBXZWJQc18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChXZWJQKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFs0LCA2LCAsIDddKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hJbWFnZShzcmMpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGltZyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGltZy53aWR0aCA+IDAgJiYgaW1nLmhlaWdodCA+IDAsIFwic2l6ZTpcIiArIGltZy53aWR0aCArIFwieFwiICsgaW1nLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgZXJyXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPayhlcnJfMSwgXCJ3ZWJwIGxvYWQgZmFpbHJlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA4O1xuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgX2krKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufVxuTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgIFFVbml0LnRlc3QoXCJjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX2NvbnZlcnRfdG9fc2Vla2FibGVfdGVzdChmaWxlKSk7XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3QoZmlsZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlY29kZXIsIHJlYWRlciwgcmVzLCB3ZWJtX2J1ZiwgZWxtcywgc2VjLCByZWZpbmVkTWV0YWRhdGFCdWYsIGJvZHksIHJhd193ZWJNLCByZWZpbmVkV2ViTSwgcmF3X3ZpZGVvXzEsIHJlZmluZWRfdmlkZW8sIHdhaXQsIGVycl8yLCByZWZpbmVkQnVmLCByZWZpbmVkRWxtcywgX3JlYWRlcl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBkZWNvZGVyID0gbmV3IF8xLkRlY29kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3IF8xLlJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHdlYm1fYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJhbmFsYXNpcyB1bnNlZWthYmxlIG9yaWdpbmFsIGVibWwgdHJlZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcyA9IGRlY29kZXIuZGVjb2RlKHdlYm1fYnVmKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmVhZGVyLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImNvbnZlcnQgdG8gc2Vla2FibGUgZmlsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHJlYWRlci5tZXRhZGF0YXNbMF0ubmFtZSA9PT0gXCJFQk1MXCIpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2socmVhZGVyLm1ldGFkYXRhcy5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgc2VjID0gcmVhZGVyLmR1cmF0aW9uICogcmVhZGVyLnRpbWVzdGFtcFNjYWxlIC8gMTAwMCAvIDEwMDAgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soNyA8IHNlYyAmJiBzZWMgPCAxMSk7XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRNZXRhZGF0YUJ1ZiA9IF8yLnRvb2xzLm1ha2VNZXRhZGF0YVNlZWthYmxlKHJlYWRlci5tZXRhZGF0YXMsIHJlYWRlci5kdXJhdGlvbiwgcmVhZGVyLmN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gd2VibV9idWYuc2xpY2UocmVhZGVyLm1ldGFkYXRhU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhyZWZpbmVkTWV0YWRhdGFCdWYuYnl0ZUxlbmd0aCAtIHJlYWRlci5tZXRhZGF0YVNpemUgPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHdlYm1fYnVmLmJ5dGVMZW5ndGggPT09IChyZWFkZXIubWV0YWRhdGFTaXplICsgYm9keS5ieXRlTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImNoZWNrIGR1cmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICByYXdfd2ViTSA9IG5ldyBCbG9iKFt3ZWJtX2J1Zl0sIHsgdHlwZTogXCJ2aWRlby93ZWJtXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRXZWJNID0gbmV3IEJsb2IoW3JlZmluZWRNZXRhZGF0YUJ1ZiwgYm9keV0sIHsgdHlwZTogXCJ2aWRlby93ZWJtXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMywgOCwgLCA5XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoVmlkZW8oVVJMLmNyZWF0ZU9iamVjdFVSTChyYXdfd2ViTSkpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIHJhd192aWRlb18xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaFZpZGVvKFVSTC5jcmVhdGVPYmplY3RVUkwocmVmaW5lZFdlYk0pKV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICByZWZpbmVkX3ZpZGVvID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS9GaXJlZm94Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soIU51bWJlci5pc0Zpbml0ZShyYXdfdmlkZW9fMS5kdXJhdGlvbiksIFwibWVkaWEgcmVjb3JkZXIgd2VibSBkdXJhdGlvbiBpcyBub3QgZmluaXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhOdW1iZXIuaXNGaW5pdGUocmVmaW5lZF92aWRlby5kdXJhdGlvbiksIFwicmVmaW5lZCB3ZWJtIGR1cmF0aW9uIGlzIGZpbml0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgc2xlZXAoMTAwKV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHdhaXQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHJhd192aWRlb18xLm9uc2Vla2VkID0gcmVzb2x2ZTsgcmF3X3ZpZGVvXzEub25lcnJvciA9IHJlamVjdDsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJhd192aWRlb18xLmN1cnJlbnRUaW1lID0gNyAqIDI0ICogNjAgKiA2MDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgd2FpdF07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGR1cmF0aW9uIHNlYyBpcyBkaWZmZXJlbnQgZWFjaCBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTWF0aC5hYnMocmF3X3ZpZGVvXzEuZHVyYXRpb24gLSByZWZpbmVkX3ZpZGVvLmR1cmF0aW9uKSA8IDAuMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgZXJyXzIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPayhlcnJfMik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWFkZXIubG9nZ2luZykgcmV0dXJuIFszIC8qYnJlYWsqLywgMTFdO1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZGVidWdcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwicHV0IHNlZWthYmxlIGVibWwgdHJlZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVhZEFzQXJyYXlCdWZmZXIocmVmaW5lZFdlYk0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICByZWZpbmVkQnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZWZpbmVkRWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKHJlZmluZWRCdWYpO1xuICAgICAgICAgICAgICAgICAgICBfcmVhZGVyXzEgPSBuZXcgXzEuUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9yZWFkZXJfMS5sb2dnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZEVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7IHJldHVybiBfcmVhZGVyXzEucmVhZChlbG0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgX3JlYWRlcl8xLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxMTtcbiAgICAgICAgICAgICAgICBjYXNlIDExOiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufVxuTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgIFFVbml0LnRlc3QoXCJjcmVhdGVfcmVjb3JkZXJfaGVscGVyX3Rlc3Q6XCIgKyBmaWxlLCBjcmVhdGVfcmVjb3JkZXJfaGVscGVyX3Rlc3QoZmlsZSkpO1xufSk7XG5mdW5jdGlvbiBjcmVhdGVfcmVjb3JkZXJfaGVscGVyX3Rlc3QoZmlsZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlY29kZXIsIHJlYWRlciwgbGFzdF9zZWMsIG1ldGFkYXRhX2xvYWRlZCwgY2x1c3Rlcl9udW0sIGxhc3RfdGltZXN0YW1wLCByZXMsIHdlYm1fYnVmLCBlbG1zO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBkZWNvZGVyID0gbmV3IF8xLkRlY29kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3IF8xLlJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0X3NlYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcImR1cmF0aW9uXCIsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVzdGFtcFNjYWxlID0gX2EudGltZXN0YW1wU2NhbGUsIGR1cmF0aW9uID0gX2EuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VjID0gZHVyYXRpb24gKiB0aW1lc3RhbXBTY2FsZSAvIDEwMDAgLyAxMDAwIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhOdW1iZXIuaXNGaW5pdGUoc2VjKSwgXCJkdXJhdGlvbjpcIiArIHNlYyArIFwic2VjXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHNlYyA+IGxhc3Rfc2VjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3Rfc2VjID0gc2VjO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFfbG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcIm1ldGFkYXRhXCIsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGFkYXRhU2l6ZSA9IF9hLm1ldGFkYXRhU2l6ZSwgZGF0YSA9IF9hLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobWV0YWRhdGFTaXplID4gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZGF0YS5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhkYXRhWzBdLm5hbWUgPT09IFwiRUJNTFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhX2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyX251bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RfdGltZXN0YW1wID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcImNsdXN0ZXJcIiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbHVzdGVyIGNodW5rIHRlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZXYuZGF0YSwgdGltZXN0YW1wID0gZXYudGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE51bWJlci5pc0Zpbml0ZSh0aW1lc3RhbXApLCBcImNsdXN0ZXIudGltZXN0YW1wOlwiICsgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhkYXRhLmxlbmd0aCA+IDAsIFwiY2x1c3Rlci5sZW5ndGg6XCIgKyBkYXRhLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzZXJ0aW9uID0gZGF0YS5ldmVyeShmdW5jdGlvbiAoZWxtKSB7IHJldHVybiBlbG0ubmFtZSA9PT0gXCJDbHVzdGVyXCIgfHwgZWxtLm5hbWUgPT09IFwiVGltZXN0YW1wXCIgfHwgZWxtLm5hbWUgPT09IFwiU2ltcGxlQmxvY2tcIjsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soYXNzZXJ0aW9uLCBcImVsZW1lbnQgY2hlY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sodGltZXN0YW1wID4gbGFzdF90aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3Rlcl9udW0gKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfdGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goZmlsZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB3ZWJtX2J1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcyA9IGRlY29kZXIuZGVjb2RlKHdlYm1fYnVmKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmVhZGVyLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhsYXN0X3NlYyA+IDApO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobWV0YWRhdGFfbG9hZGVkKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGNsdXN0ZXJfbnVtID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhsYXN0X3RpbWVzdGFtcCA+IDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufVxuZnVuY3Rpb24gc2xlZXAobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpOyB9KTtcbn1cbmZ1bmN0aW9uIGZldGNoVmlkZW8oc3JjKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuICAgICAgICB2aWRlby5zcmMgPSBzcmM7XG4gICAgICAgIHZpZGVvLmNvbnRyb2xzID0gdHJ1ZTtcbiAgICAgICAgdmlkZW8ub25sb2FkZWRkYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmlkZW8ub25sb2FkZWRkYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHJlc29sdmUodmlkZW8pO1xuICAgICAgICB9O1xuICAgICAgICB2aWRlby5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgdmlkZW8ub25lcnJvciA9IG51bGw7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZldGNoSW1hZ2Uoc3JjKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkgeyByZXNvbHZlKGltZyk7IH07XG4gICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKGVycikgeyByZWplY3QoZXJyKTsgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlYWRBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkgeyByZXNvbHZlKHJlYWRlci5yZXN1bHQpOyB9O1xuICAgICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uIChldikgeyByZWplY3QoZXYpOyB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gd2FpdEV2ZW50KHRhcmdldCwgZXYsIGVycikge1xuICAgIGlmIChlcnIgPT09IHZvaWQgMCkgeyBlcnIgPSBcImVycm9yXCI7IH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldiwgc3VjYyk7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGVyciwgZmFpbCk7XG4gICAgICAgIGZ1bmN0aW9uIHN1Y2MoZXYpIHsgY2xlYW4oKTsgcmVzb2x2ZShldik7IH1cbiAgICAgICAgZnVuY3Rpb24gZmFpbChldikgeyBjbGVhbigpOyByZWplY3QoZXYpOyB9XG4gICAgICAgIGZ1bmN0aW9uIGNsZWFuKCkge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXYsIHN1Y2MpO1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXJyLCBmYWlsKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuUVVuaXQub24oJ3J1bkVuZCcsIGZ1bmN0aW9uIChydW5FbmQpIHsgcmV0dXJuIGdsb2JhbC5ydW5FbmQgPSBydW5FbmQ7IH0pO1xuIl19

