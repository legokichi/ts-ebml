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
var QUnit = require('qunit');
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
QUnit['on']('runEnd', function (runEnd) {
    return global.runEnd = runEnd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsImFkb3B0IiwicmVzb2x2ZSIsIlByb21pc2UiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJfIiwibGFiZWwiLCJzZW50IiwidCIsInRyeXMiLCJvcHMiLCJmIiwieSIsImciLCJ2ZXJiIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJuIiwidiIsIm9wIiwiVHlwZUVycm9yIiwiY2FsbCIsInBvcCIsImxlbmd0aCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsIl8xIiwicmVxdWlyZSIsIl8yIiwiQnVmZmVyIiwidG9vbHMiLCJRVW5pdCIsImVtcG93ZXIiLCJmb3JtYXR0ZXIiLCJxdW5pdFRhcCIsImNvbmZpZyIsImF1dG9zdGFydCIsImFzc2VydCIsImRlc3RydWN0aXZlIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsInNob3dTb3VyY2VPbkZhaWx1cmUiLCJXRUJNX0ZJTEVfTElTVCIsIm1vZHVsZSIsInRlc3QiLCJmaWxlIiwicmVzIiwiYnVmIiwiZWxtcyIsImJ1ZjIiLCJlbG1zMiIsInRlc3RzIiwiX2kiLCJ0ZXN0c18xIiwiX2EiLCJmZXRjaCIsImFycmF5QnVmZmVyIiwiRGVjb2RlciIsImRlY29kZSIsIkVuY29kZXIiLCJlbmNvZGUiLCJpbmRleCIsImVsbSIsIl9yZWMxIiwib2siLCJuYW1lIiwidHlwZSIsImlzRW5kIiwiY29udGVudCIsImZpbGVwYXRoIiwibGluZSIsIl9yZWMyIiwiX3JlYzMiLCJfcmVjNCIsIl9yZWM1IiwiX3JlYzYiLCJfcmVjNyIsIl9yZWM4IiwiRGF0ZSIsImNvbnZlcnRFQk1MRGF0ZVRvSlNEYXRlIiwiZ2V0VGltZSIsIl9yZWM5IiwiX3JlYzEwIiwiYnVmXzEiLCJVaW50OEFycmF5IiwiYnVmMl8xIiwiZXZlcnkiLCJ2YWwiLCJpIiwiZm9yRWFjaCIsImNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdCIsIl90aGlzIiwiZWxtMiIsIl9yZWMxMSIsIl9yZWMxMiIsIl9yZWMxMyIsIl9yZWMxNCIsIl9yZWMxNSIsInNsZWVwIiwidGFnU3RyZWFtIiwiYmluYXJpemVkIiwidW5rbm93blNpemUiLCJtYXAiLCJlbmNvZGVWYWx1ZVRvQnVmZmVyIiwiX3JlYzE2IiwiX3JlYzE3IiwiX3JlYzE4IiwiX3JlYzE5Iiwib3JpZ2luIiwiTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QiLCJjcmVhdGVfd2VicF90ZXN0Iiwid2VibV9idWYiLCJXZWJQcyIsIldlYlBzXzEiLCJXZWJQIiwic3JjIiwiaW1nIiwiZXJyXzEiLCJfcmVjMjAiLCJXZWJQRnJhbWVGaWx0ZXIiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJmZXRjaEltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJub3RPayIsInJldm9rZU9iamVjdFVSTCIsImNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3QiLCJkZWNvZGVyIiwicmVhZGVyIiwic2VjIiwicmVmaW5lZE1ldGFkYXRhQnVmIiwicmF3X3dlYk0iLCJyZWZpbmVkV2ViTSIsInJhd192aWRlb18xIiwicmVmaW5lZF92aWRlbyIsIndhaXQiLCJlcnJfMiIsInJlZmluZWRCdWYiLCJyZWZpbmVkRWxtcyIsIl9yZWFkZXJfMSIsIl9yZWMyMSIsIl9yZWMyMiIsIl9yZWMyMyIsIl9yZWMyNCIsIl9yZWMyNSIsIl9yZWMyNiIsIl9yZWMyNyIsIl9yZWMyOCIsIlJlYWRlciIsImluZm8iLCJyZWFkIiwic3RvcCIsIm1ldGFkYXRhcyIsImR1cmF0aW9uIiwidGltZXN0YW1wU2NhbGUiLCJtYWtlTWV0YWRhdGFTZWVrYWJsZSIsImN1ZXMiLCJzbGljZSIsIm1ldGFkYXRhU2l6ZSIsImJ5dGVMZW5ndGgiLCJCbG9iIiwiZmV0Y2hWaWRlbyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIk51bWJlciIsImlzRmluaXRlIiwib25zZWVrZWQiLCJvbmVycm9yIiwiY3VycmVudFRpbWUiLCJNYXRoIiwiYWJzIiwibG9nZ2luZyIsInJlYWRBc0FycmF5QnVmZmVyIiwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0IiwibGFzdF9zZWMiLCJtZXRhZGF0YV9sb2FkZWQiLCJjbHVzdGVyX251bSIsImxhc3RfdGltZXN0YW1wIiwiX3JlYzM4IiwiX3JlYzM5IiwiX3JlYzQwIiwiX3JlYzQxIiwiYWRkTGlzdGVuZXIiLCJfcmVjMjkiLCJfcmVjMzAiLCJfcmVjMzEiLCJfcmVjMzIiLCJfcmVjMzMiLCJkYXRhIiwiZXYiLCJfcmVjMzQiLCJfcmVjMzUiLCJfcmVjMzYiLCJfcmVjMzciLCJ0aW1lc3RhbXAiLCJhc3NlcnRpb24iLCJtcyIsInNldFRpbWVvdXQiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRyb2xzIiwib25sb2FkZWRkYXRhIiwiZXJyIiwiSW1hZ2UiLCJvbmxvYWQiLCJibG9iIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsIndhaXRFdmVudCIsInRhcmdldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWNjIiwiZmFpbCIsImNsZWFuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJ1bkVuZCIsImdsb2JhbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxJQUFBQSxxQkFBQTtBQUFBLGFBQUFDLG1CQUFBO0FBQUEsYUFBQUMsUUFBQTtBQUFBO0FBQUEsSUFBQUQsbUJBQUEsQ0FBQUUsU0FBQSxDQUFBQyxL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LENBQVF5TSxFQUFSLEVBQVg7QUFBQSxTQUh3QjtBQUFBLFFBSTFDLFNBQVN3QixJQUFULENBQWN4QixFQUFkLEVBQWtCO0FBQUEsWUFBRXlCLEtBQUEsR0FBRjtBQUFBLFlBQVdoTyxNQUFBLENBQU91TSxFQUFQLEVBQVg7QUFBQSxTQUp3QjtBQUFBLFFBSzFDLFNBQVN5QixLQUFULEdBQWlCO0FBQUEsWUFDYkosTUFBQSxDQUFPSyxtQkFBUCxDQUEyQjFCLEVBQTNCLEVBQStCdUIsSUFBL0IsRUFEYTtBQUFBLFlBRWJGLE1BQUEsQ0FBT0ssbUJBQVAsQ0FBMkJaLEdBQTNCLEVBQWdDVSxJQUFoQyxFQUZhO0FBQUEsU0FMeUI7QUFBQSxLQUF2QyxDQUFQLENBRmdDO0FBQUEsQ0FuYnBDO0FBaWNBeEwsS0FBQSxDQUFNLElBQU4sRUFBWSxRQUFaLEVBQXNCLFVBQVUyTCxNQUFWLEVBQWtCO0FBQUEsSUFBRSxPQUFPQyxNQUFBLENBQU9ELE1BQVAsR0FBZ0JBLE1BQXZCLENBQUY7QUFBQSxDQUF4QyIsInNvdXJjZVJvb3QiOiIvaG9tZS9kYXZpZC90cy1lYm1sIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJxdW5pdFwiLz5cbnZhciBfMSA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBfMiA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBCdWZmZXIgPSBfMi50b29scy5CdWZmZXI7XG52YXIgUVVuaXQgPSByZXF1aXJlKFwicXVuaXRcIik7XG52YXIgZW1wb3dlciA9IHJlcXVpcmUoXCJlbXBvd2VyXCIpO1xudmFyIGZvcm1hdHRlciA9IHJlcXVpcmUoXCJwb3dlci1hc3NlcnQtZm9ybWF0dGVyXCIpO1xudmFyIHF1bml0VGFwID0gcmVxdWlyZShcInF1bml0LXRhcFwiKTtcblFVbml0LmNvbmZpZy5hdXRvc3RhcnQgPSB0cnVlO1xuZW1wb3dlcihRVW5pdC5hc3NlcnQsIGZvcm1hdHRlcigpLCB7IGRlc3RydWN0aXZlOiB0cnVlIH0pO1xucXVuaXRUYXAoUVVuaXQsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgfSwgeyBzaG93U291cmNlT25GYWlsdXJlOiBmYWxzZSB9KTtcbnZhciBXRUJNX0ZJTEVfTElTVCA9IFtcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Mi5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0My5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NC5ta3ZcIiwgdGhpcyBmaWxlIGlzIGJyb2tlbiBzbyBub3QgcGFzcyBlbmNvZGVyX2RlY29kZXJfdGVzdCBcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ni5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ny5ta3ZcIiwgdGhpcyBmaWxlIGhhcyB1bmtub3duIHRhZyBzbyBjYW5ub3Qgd3JpdGUgZmlsZVxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q4Lm1rdlwiLFxuXTtcblFVbml0Lm1vZHVsZShcInRzLUVCTUxcIik7XG5RVW5pdC50ZXN0KFwiZW5jb2Rlci1kZWNvZGVyXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGUsIHJlcywgYnVmLCBlbG1zLCBidWYyLCBlbG1zMiwgdGVzdHMsIF9pLCB0ZXN0c18xLCB0ZXN0O1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGZpbGUgPSBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBidWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgICAgICAgICAgYnVmMiA9IG5ldyBfMS5FbmNvZGVyKCkuZW5jb2RlKGVsbXMpO1xuICAgICAgICAgICAgICAgIGVsbXMyID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmMik7XG4gICAgICAgICAgICAgICAgdGVzdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDAsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkVCTUxcIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogNCwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRUJNTFwiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IHRydWUpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDUsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIlNlZ21lbnRcIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjQsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkluZm9cIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjUsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkR1cmF0aW9uXCIgJiYgZWxtLnR5cGUgPT09IFwiZlwiICYmIGVsbS52YWx1ZSA9PT0gODczMzYpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDI2LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7IGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJNdXhpbmdBcHBcIiAmJiBlbG0udHlwZSA9PT0gXCI4XCIgJiYgZWxtLnZhbHVlID09PSBcImxpYmVibWwyIHYwLjEwLjAgKyBsaWJtYXRyb3NrYTIgdjAuMTAuMVwiKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiAyOCwgdGVzdDogZnVuY3Rpb24gKGVsbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJEYXRlVVRDXCIgJiYgZWxtLnR5cGUgPT09IFwiZFwiICYmIGVsbS52YWx1ZSBpbnN0YW5jZW9mIERhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udHlwZSA9PT0gXCJkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXzIudG9vbHMuY29udmVydEVCTUxEYXRlVG9KU0RhdGUoZWxtLnZhbHVlKS5nZXRUaW1lKCkgPT09IG5ldyBEYXRlKFwiMjAxMC0wOC0yMVQwNzoyMzowMy4wMDBaXCIpLmdldFRpbWUoKSk7IC8vIHRvSVNPU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDI5LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIlNlZ21lbnRVSURcIiAmJiBlbG0udHlwZSA9PT0gXCJiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbG0udHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1Zl8xID0gbmV3IFVpbnQ4QXJyYXkobmV3IEJ1ZmZlcihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAweDkyLCAweDJkLCAweDE5LCAweDMyLCAweDBmLCAweDFlLCAweDEzLCAweGM1LCAweGI1LCAweDA1LCAweDYzLCAweDBhLCAweGFmLCAweGQ4LCAweDUzLCAweDM2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZjJfMSA9IG5ldyBVaW50OEFycmF5KGVsbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhidWZfMS5ldmVyeShmdW5jdGlvbiAodmFsLCBpKSB7IHJldHVybiBidWYyXzFbaV0gPT09IHZhbDsgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGZvciAoX2kgPSAwLCB0ZXN0c18xID0gdGVzdHM7IF9pIDwgdGVzdHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdCA9IHRlc3RzXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICB0ZXN0LnRlc3QoZWxtczJbdGVzdC5pbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyB9KTtcbldFQk1fRklMRV9MSVNULmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICBRVW5pdC50ZXN0KFwiZW5jb2Rlci1kZWNvZGVyOlwiICsgZmlsZSwgY3JlYXRlX2VuY29kZXJfZGVjb2Rlcl90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX2VuY29kZXJfZGVjb2Rlcl90ZXN0KGZpbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXMsIGJ1ZiwgZWxtcywgYnVmMiwgZWxtczIsIGksIGVsbSwgZWxtMjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goZmlsZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBidWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYpO1xuICAgICAgICAgICAgICAgICAgICBidWYyID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoZWxtcyk7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMyID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmMik7XG4gICAgICAgICAgICAgICAgICAgIC8vYXNzZXJ0Lm9rKGJ1Zi5ieXRlTGVuZ3RoID09PSBidWYyLmJ5dGVMZW5ndGgsIFwiVGhpcyBwcm9ibGVtIGlzIGNhdXNlZCBieSBKUyBiZWluZyB1bmFibGUgdG8gaGFuZGxlIEludDY0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbXMubGVuZ3RoID09PSBlbG1zMi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSA8IGVsbXMubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgIGVsbSA9IGVsbXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGVsbTIgPSBlbG1zMltpXTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBlbG0yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnR5cGUgPT09IGVsbTIudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG0udHlwZSA9PT0gXCJtXCIgfHwgZWxtMi50eXBlID09PSBcIm1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG0udHlwZSA9PT0gXCJiXCIgJiYgZWxtMi50eXBlID09PSBcImJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS52YWx1ZS5sZW5ndGggPT09IGVsbTIudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlID09PSBlbG0yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgc2xlZXAoMSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDU7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn1cblFVbml0LnRlc3QoXCJoYW5kd3JpdGUtZW5jb2RlclwiLCBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YWdTdHJlYW0sIGJpbmFyaXplZCwgYnVmLCBlbG1zO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdGFnU3RyZWFtID0gW1xuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxSZWFkVmVyc2lvblwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MTWF4SURMZW5ndGhcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTE1heFNpemVMZW5ndGhcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA4IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVwiLCB0eXBlOiBcInNcIiwgdmFsdWU6IFwid2VibVwiIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVJlYWRWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2VnbWVudFwiLCB0eXBlOiBcIm1cIiwgdW5rbm93blNpemU6IHRydWUsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlNlZWtIZWFkXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTZWVrSGVhZFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJJbmZvXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUaW1lc3RhbXBTY2FsZVwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEwMDAwMDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJJbmZvXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkR1cmF0aW9uXCIsIHR5cGU6IFwiZlwiLCB2YWx1ZTogMC4wIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiQ2x1c3RlclwiLCB0eXBlOiBcIm1cIiwgdW5rbm93blNpemU6IHRydWUsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlRpbWVzdGFtcFwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTaW1wbGVCbG9ja1wiLCB0eXBlOiBcImJcIiwgdmFsdWU6IG5ldyBCdWZmZXIoMTAyNCkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgYmluYXJpemVkID0gdGFnU3RyZWFtLm1hcChfMi50b29scy5lbmNvZGVWYWx1ZVRvQnVmZmVyKTtcbiAgICAgICAgYnVmID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoYmluYXJpemVkKTtcbiAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtLCBpKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luID0gdGFnU3RyZWFtW2ldO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBvcmlnaW4ubmFtZSwgXCJjb21wYXJlIHRhZyBuYW1lXCIpO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS50eXBlID09PSBvcmlnaW4udHlwZSwgXCJjb21wYXJlIHRhZyB0eXBlXCIpO1xuICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcIm1cIiB8fCBvcmlnaW4udHlwZSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiICYmIG9yaWdpbi50eXBlID09PSBcImJcIikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUubGVuZ3RoID09PSBvcmlnaW4udmFsdWUubGVuZ3RoLCBcImNvbXBhcmUgdGFnIHZhbHVlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUgPT09IG9yaWdpbi52YWx1ZSwgXCJjb21wYXJlIHRhZyB2YWx1ZVwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICB9KTtcbn0pOyB9KTtcblFVbml0Lm1vZHVsZShcIlJlYWRlclwiKTtcbnZhciBNRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVCA9IFtcbiAgICBcIi4vY2hyb21lNTcud2VibVwiLFxuICAgIC8vIGxhc3QydGltZXN0YW1wKHZpZGVvLCBhdWRpbyk6ICgoNy40OTNzLCA3LjU1MnMpLCAoNy40OTNzLCA3LjU1MnMpKVxuICAgIC8vIENocm9tZTU3OiA3LjYxMnMgfj0gNy42MTFzID0gNy41NTJzICsgKDcuNTUycyAtIDcuNDkzcykgLy8gPz8/XG4gICAgLy8gRmlyZWZveDUzOiA3LjU1MnMgPSA3LjU1MnMgKyAoNy41NTJzIC0gNy41NTJzKSAvLyBzaGl0IVxuICAgIC8vIFJlYWRlcjogNy42MTFzID0gNy41NTJzICsgKDcuNTUycyAtIDcuNDkzcylcbiAgICBcIi4vZmlyZWZveDU1bmlnaHRseS53ZWJtXCIsXG4gICAgLy8gbGFzdDJ0aW1lc3RhbXAodmlkZW8sIGF1ZGlvKTogKCg4LjU2N3MsIDguNTkwcyksICg4LjYyNnMsIDguNjQ2cykpLCBDb2RlY0RlbGF5KGF1ZGlvKTogNi41MDBtc1xuICAgIC8vIENocm9tZTU3OiA4LjY1OXMgfj0gOC42NTk1cyA9IDguNjQ2cyArICg4LjY0NnMgLSA4LjYyNnMpIC0gNi41MDBtc1xuICAgIC8vIEZpcmVmb3g1MzogOC42NjZzID0gOC42NDZzICsgKDguNjQ2cyAtIDguNjI2cylcbiAgICAvLyBSZWFkZXI6IDguNjU5NXMgPSA4LjY0NnMgKyAoOC42NDZzIC0gOC42MjZzKSAtIDYuNTAwbXNcbiAgICBcIi4vZmlyZWZveDUzLndlYm1cIixcbiAgICAvLyBDaHJvbWU1NzogMTAuMDE5cywgRmlyZWZveDUzOiAxMC4wMjZzLCBSZWFkZXI6IDkuOTY3c1xuICAgIC8vIGxhc3QydGltZXN0YW1wKHZpZGVvLCBhdWRpbyk6ICgoOS45MzJzLCA5Ljk2N3MpLCAoOS45ODZzLCAxMC4wMDZzKSksIENvZGVjRGVsYXkoYXVkaW8pOiA2LjUwMG1zXG4gICAgLy8gQ2hyb21lNTc6IDEwLjAxOXMgfj0gMTAuMDE5NXMgPSAxMC4wMDZzICsgKDEwLjAwNnMgLSA5Ljk4NnMpIC0gNi41MDBtc1xuICAgIC8vIEZpcmVmb3g1MzogMTAuMDI2cyA9IDEwLjAwNnMgKyAoMTAuMDA2cyAtIDkuOTg2cylcbiAgICAvLyBSZWFkZXI6IDEwLjAxOTVzID0gMTAuMDA2cyArICgxMC4wMDZzIC0gOS45ODZzKSAtIDYuNTAwbXNcbl07XG5NRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgUVVuaXQudGVzdChcImNyZWF0ZV93ZWJwX3Rlc3Q6XCIgKyBmaWxlLCBjcmVhdGVfd2VicF90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX3dlYnBfdGVzdChmaWxlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzLCB3ZWJtX2J1ZiwgZWxtcywgV2ViUHMsIF9pLCBXZWJQc18xLCBXZWJQLCBzcmMsIGltZywgZXJyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VibV9idWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZSh3ZWJtX2J1Zik7XG4gICAgICAgICAgICAgICAgICAgIFdlYlBzID0gXzIudG9vbHMuV2ViUEZyYW1lRmlsdGVyKGVsbXMpO1xuICAgICAgICAgICAgICAgICAgICBfaSA9IDAsIFdlYlBzXzEgPSBXZWJQcztcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoX2kgPCBXZWJQc18xLmxlbmd0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICBXZWJQID0gV2ViUHNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoV2ViUCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbNCwgNiwgLCA3XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoSW1hZ2Uoc3JjKV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBpbWcgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhpbWcud2lkdGggPiAwICYmIGltZy5oZWlnaHQgPiAwLCBcInNpemU6XCIgKyBpbWcud2lkdGggKyBcInhcIiArIGltZy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA3XTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIGVycl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soZXJyXzEsIFwid2VicCBsb2FkIGZhaWxyZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNyYyk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgIF9pKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn1cbk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNULmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICBRVW5pdC50ZXN0KFwiY3JlYXRlX2NvbnZlcnRfdG9fc2Vla2FibGVfdGVzdDpcIiArIGZpbGUsIGNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3QoZmlsZSkpO1xufSk7XG5mdW5jdGlvbiBjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0KGZpbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWNvZGVyLCByZWFkZXIsIHJlcywgd2VibV9idWYsIGVsbXMsIHNlYywgcmVmaW5lZE1ldGFkYXRhQnVmLCBib2R5LCByYXdfd2ViTSwgcmVmaW5lZFdlYk0sIHJhd192aWRlb18xLCByZWZpbmVkX3ZpZGVvLCB3YWl0LCBlcnJfMiwgcmVmaW5lZEJ1ZiwgcmVmaW5lZEVsbXMsIF9yZWFkZXJfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlciA9IG5ldyBfMS5EZWNvZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyBfMS5SZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goZmlsZSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXMuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB3ZWJtX2J1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiYW5hbGFzaXMgdW5zZWVrYWJsZSBvcmlnaW5hbCBlYm1sIHRyZWVcIik7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMgPSBkZWNvZGVyLmRlY29kZSh3ZWJtX2J1Zik7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7IHJlYWRlci5yZWFkKGVsbSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJjb252ZXJ0IHRvIHNlZWthYmxlIGZpbGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhyZWFkZXIubWV0YWRhdGFzWzBdLm5hbWUgPT09IFwiRUJNTFwiKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHJlYWRlci5tZXRhZGF0YXMubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIHNlYyA9IHJlYWRlci5kdXJhdGlvbiAqIHJlYWRlci50aW1lc3RhbXBTY2FsZSAvIDEwMDAgLyAxMDAwIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKDcgPCBzZWMgJiYgc2VjIDwgMTEpO1xuICAgICAgICAgICAgICAgICAgICByZWZpbmVkTWV0YWRhdGFCdWYgPSBfMi50b29scy5tYWtlTWV0YWRhdGFTZWVrYWJsZShyZWFkZXIubWV0YWRhdGFzLCByZWFkZXIuZHVyYXRpb24sIHJlYWRlci5jdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IHdlYm1fYnVmLnNsaWNlKHJlYWRlci5tZXRhZGF0YVNpemUpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2socmVmaW5lZE1ldGFkYXRhQnVmLmJ5dGVMZW5ndGggLSByZWFkZXIubWV0YWRhdGFTaXplID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayh3ZWJtX2J1Zi5ieXRlTGVuZ3RoID09PSAocmVhZGVyLm1ldGFkYXRhU2l6ZSArIGJvZHkuYnl0ZUxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJjaGVjayBkdXJhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmF3X3dlYk0gPSBuZXcgQmxvYihbd2VibV9idWZdLCB7IHR5cGU6IFwidmlkZW8vd2VibVwiIH0pO1xuICAgICAgICAgICAgICAgICAgICByZWZpbmVkV2ViTSA9IG5ldyBCbG9iKFtyZWZpbmVkTWV0YWRhdGFCdWYsIGJvZHldLCB7IHR5cGU6IFwidmlkZW8vd2VibVwiIH0pO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzMsIDgsICwgOV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaFZpZGVvKFVSTC5jcmVhdGVPYmplY3RVUkwocmF3X3dlYk0pKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICByYXdfdmlkZW9fMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hWaWRlbyhVUkwuY3JlYXRlT2JqZWN0VVJMKHJlZmluZWRXZWJNKSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZF92aWRlbyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEvRmlyZWZveC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKCFOdW1iZXIuaXNGaW5pdGUocmF3X3ZpZGVvXzEuZHVyYXRpb24pLCBcIm1lZGlhIHJlY29yZGVyIHdlYm0gZHVyYXRpb24gaXMgbm90IGZpbml0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKHJlZmluZWRfdmlkZW8uZHVyYXRpb24pLCBcInJlZmluZWQgd2VibSBkdXJhdGlvbiBpcyBmaW5pdGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHNsZWVwKDEwMCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB3YWl0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyByYXdfdmlkZW9fMS5vbnNlZWtlZCA9IHJlc29sdmU7IHJhd192aWRlb18xLm9uZXJyb3IgPSByZWplY3Q7IH0pO1xuICAgICAgICAgICAgICAgICAgICByYXdfdmlkZW9fMS5jdXJyZW50VGltZSA9IDcgKiAyNCAqIDYwICogNjA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHdhaXRdO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkdXJhdGlvbiBzZWMgaXMgZGlmZmVyZW50IGVhY2ggYnJvd3NlcnNcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE1hdGguYWJzKHJhd192aWRlb18xLmR1cmF0aW9uIC0gcmVmaW5lZF92aWRlby5kdXJhdGlvbikgPCAwLjEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgIGVycl8yID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soZXJyXzIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVhZGVyLmxvZ2dpbmcpIHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGRlYnVnXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcInB1dCBzZWVrYWJsZSBlYm1sIHRyZWVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlYWRBc0FycmF5QnVmZmVyKHJlZmluZWRXZWJNKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZEJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZEVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShyZWZpbmVkQnVmKTtcbiAgICAgICAgICAgICAgICAgICAgX3JlYWRlcl8xID0gbmV3IF8xLlJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfcmVhZGVyXzEubG9nZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRFbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSkgeyByZXR1cm4gX3JlYWRlcl8xLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIF9yZWFkZXJfMS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTE7XG4gICAgICAgICAgICAgICAgY2FzZSAxMTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn1cbk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNULmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICBRVW5pdC50ZXN0KFwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0KGZpbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWNvZGVyLCByZWFkZXIsIGxhc3Rfc2VjLCBtZXRhZGF0YV9sb2FkZWQsIGNsdXN0ZXJfbnVtLCBsYXN0X3RpbWVzdGFtcCwgcmVzLCB3ZWJtX2J1ZiwgZWxtcztcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlciA9IG5ldyBfMS5EZWNvZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlciA9IG5ldyBfMS5SZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9zZWMgPSAwO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIuYWRkTGlzdGVuZXIoXCJkdXJhdGlvblwiLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lc3RhbXBTY2FsZSA9IF9hLnRpbWVzdGFtcFNjYWxlLCBkdXJhdGlvbiA9IF9hLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYyA9IGR1cmF0aW9uICogdGltZXN0YW1wU2NhbGUgLyAxMDAwIC8gMTAwMCAvIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKHNlYyksIFwiZHVyYXRpb246XCIgKyBzZWMgKyBcInNlY1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhzZWMgPiBsYXN0X3NlYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3NlYyA9IHNlYztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIuYWRkTGlzdGVuZXIoXCJtZXRhZGF0YVwiLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXRhZGF0YVNpemUgPSBfYS5tZXRhZGF0YVNpemUsIGRhdGEgPSBfYS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKG1ldGFkYXRhU2l6ZSA+IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGRhdGEubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZGF0YVswXS5uYW1lID09PSBcIkVCTUxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YV9sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3Rlcl9udW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBsYXN0X3RpbWVzdGFtcCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIuYWRkTGlzdGVuZXIoXCJjbHVzdGVyXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2x1c3RlciBjaHVuayB0ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGV2LmRhdGEsIHRpbWVzdGFtcCA9IGV2LnRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhOdW1iZXIuaXNGaW5pdGUodGltZXN0YW1wKSwgXCJjbHVzdGVyLnRpbWVzdGFtcDpcIiArIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZGF0YS5sZW5ndGggPiAwLCBcImNsdXN0ZXIubGVuZ3RoOlwiICsgZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2VydGlvbiA9IGRhdGEuZXZlcnkoZnVuY3Rpb24gKGVsbSkgeyByZXR1cm4gZWxtLm5hbWUgPT09IFwiQ2x1c3RlclwiIHx8IGVsbS5uYW1lID09PSBcIlRpbWVzdGFtcFwiIHx8IGVsbS5uYW1lID09PSBcIlNpbXBsZUJsb2NrXCI7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGFzc2VydGlvbiwgXCJlbGVtZW50IGNoZWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHRpbWVzdGFtcCA+IGxhc3RfdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJfbnVtICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3RpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VibV9idWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMgPSBkZWNvZGVyLmRlY29kZSh3ZWJtX2J1Zik7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7IHJlYWRlci5yZWFkKGVsbSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobGFzdF9zZWMgPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKG1ldGFkYXRhX2xvYWRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhjbHVzdGVyX251bSA+IDApO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobGFzdF90aW1lc3RhbXAgPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn1cbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTsgfSk7XG59XG5mdW5jdGlvbiBmZXRjaFZpZGVvKHNyYykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcbiAgICAgICAgdmlkZW8uc3JjID0gc3JjO1xuICAgICAgICB2aWRlby5jb250cm9scyA9IHRydWU7XG4gICAgICAgIHZpZGVvLm9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZpZGVvLm9ubG9hZGVkZGF0YSA9IG51bGw7XG4gICAgICAgICAgICByZXNvbHZlKHZpZGVvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmlkZW8ub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHZpZGVvLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaEltYWdlKHNyYykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgcmVzb2x2ZShpbWcpOyB9O1xuICAgICAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHsgcmVqZWN0KGVycik7IH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZWFkQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHsgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTsgfTtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXYpIHsgcmVqZWN0KGV2KTsgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHdhaXRFdmVudCh0YXJnZXQsIGV2LCBlcnIpIHtcbiAgICBpZiAoZXJyID09PSB2b2lkIDApIHsgZXJyID0gXCJlcnJvclwiOyB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXYsIHN1Y2MpO1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihlcnIsIGZhaWwpO1xuICAgICAgICBmdW5jdGlvbiBzdWNjKGV2KSB7IGNsZWFuKCk7IHJlc29sdmUoZXYpOyB9XG4gICAgICAgIGZ1bmN0aW9uIGZhaWwoZXYpIHsgY2xlYW4oKTsgcmVqZWN0KGV2KTsgfVxuICAgICAgICBmdW5jdGlvbiBjbGVhbigpIHtcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2LCBzdWNjKTtcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGVyciwgZmFpbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIEB0eXBlcy9xdW5pdCBkb2Vzbid0IGRlZmluZSBRVW5pdC5vbiB5ZXRcblFVbml0WydvbiddKCdydW5FbmQnLCBmdW5jdGlvbiAocnVuRW5kKSB7IHJldHVybiBnbG9iYWwucnVuRW5kID0gcnVuRW5kOyB9KTtcbiJdfQ==

