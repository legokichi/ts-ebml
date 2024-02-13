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
        while (g && (g = 0, op[0] && (_ = 0)), _)
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
                            assert.ok(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt(_rec9._capt(elm, 'arguments/0/left/left/object').name, 'arguments/0/left/left') === 'SegmentUUID', 'arguments/0/left') && _rec9._capt(_rec9._capt(_rec9._capt(elm, 'arguments/0/right/left/object').type, 'arguments/0/right/left') === 'b', 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.name === "SegmentUUID" && elm.type === "b")',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsImFkb3B0IiwicmVzb2x2ZSIsIlByb21pc2UiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJfIiwibGFiZWwiLCJzZW50IiwidCIsInRyeXMiLCJvcHMiLCJmIiwieSIsImciLCJ2ZXJiIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJuIiwidiIsIm9wIiwiVHlwZUVycm9yIiwiY2FsbCIsInBvcCIsImxlbmd0aCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsIl8xIiwicmVxdWlyZSIsIl8yIiwiQnVmZmVyIiwidG9vbHMiLCJRVW5pdCIsImVtcG93ZXIiLCJmb3JtYXR0ZXIiLCJxdW5pdFRhcCIsImNvbmZpZyIsImF1dG9zdGFydCIsImFzc2VydCIsImRlc3RydWN0aXZlIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsInNob3dTb3VyY2VPbkZhaWx1cmUiLCJXRUJNX0ZJTEVfTElTVCIsIm1vZHVsZSIsInRlc3QiLCJmaWxlIiwicmVzIiwiYnVmIiwiZWxtcyIsImJ1ZjIiLCJlbG1zMiIsInRlc3RzIiwiX2kiLCJ0ZXN0c18xIiwiX2EiLCJmZXRjaCIsImFycmF5QnVmZmVyIiwiRGVjb2RlciIsImRlY29kZSIsIkVuY29kZXIiLCJlbmNvZGUiLCJpbmRleCIsImVsbSIsIl9yZWMxIiwib2siLCJuYW1lIiwidHlwZSIsImlzRW5kIiwiY29udGVudCIsImZpbGVwYXRoIiwibGluZSIsIl9yZWMyIiwiX3JlYzMiLCJfcmVjNCIsIl9yZWM1IiwiX3JlYzYiLCJfcmVjNyIsIl9yZWM4IiwiRGF0ZSIsImNvbnZlcnRFQk1MRGF0ZVRvSlNEYXRlIiwiZ2V0VGltZSIsIl9yZWM5IiwiX3JlYzEwIiwiYnVmXzEiLCJVaW50OEFycmF5IiwiYnVmMl8xIiwiZXZlcnkiLCJ2YWwiLCJpIiwiZm9yRWFjaCIsImNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdCIsIl90aGlzIiwiZWxtMiIsIl9yZWMxMSIsIl9yZWMxMiIsIl9yZWMxMyIsIl9yZWMxNCIsIl9yZWMxNSIsInNsZWVwIiwidGFnU3RyZWFtIiwiYmluYXJpemVkIiwidW5rbm93blNpemUiLCJtYXAiLCJlbmNvZGVWYWx1ZVRvQnVmZmVyIiwiX3JlYzE2IiwiX3JlYzE3IiwiX3JlYzE4IiwiX3JlYzE5Iiwib3JpZ2luIiwiTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QiLCJjcmVhdGVfd2VicF90ZXN0Iiwid2VibV9idWYiLCJXZWJQcyIsIldlYlBzXzEiLCJXZWJQIiwic3JjIiwiaW1nIiwiZXJyXzEiLCJfcmVjMjAiLCJXZWJQRnJhbWVGaWx0ZXIiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJmZXRjaEltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJub3RPayIsInJldm9rZU9iamVjdFVSTCIsImNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3QiLCJkZWNvZGVyIiwicmVhZGVyIiwic2VjIiwicmVmaW5lZE1ldGFkYXRhQnVmIiwicmF3X3dlYk0iLCJyZWZpbmVkV2ViTSIsInJhd192aWRlb18xIiwicmVmaW5lZF92aWRlbyIsIndhaXQiLCJlcnJfMiIsInJlZmluZWRCdWYiLCJyZWZpbmVkRWxtcyIsIl9yZWFkZXJfMSIsIl9yZWMyMSIsIl9yZWMyMiIsIl9yZWMyMyIsIl9yZWMyNCIsIl9yZWMyNSIsIl9yZWMyNiIsIl9yZWMyNyIsIl9yZWMyOCIsIlJlYWRlciIsImluZm8iLCJyZWFkIiwic3RvcCIsIm1ldGFkYXRhcyIsImR1cmF0aW9uIiwidGltZXN0YW1wU2NhbGUiLCJtYWtlTWV0YWRhdGFTZWVrYWJsZSIsImN1ZXMiLCJzbGljZSIsIm1ldGFkYXRhU2l6ZSIsImJ5dGVMZW5ndGgiLCJCbG9iIiwiZmV0Y2hWaWRlbyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIk51bWJlciIsImlzRmluaXRlIiwib25zZWVrZWQiLCJvbmVycm9yIiwiY3VycmVudFRpbWUiLCJNYXRoIiwiYWJzIiwibG9nZ2luZyIsInJlYWRBc0FycmF5QnVmZmVyIiwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0IiwibGFzdF9zZWMiLCJtZXRhZGF0YV9sb2FkZWQiLCJjbHVzdGVyX251bSIsImxhc3RfdGltZXN0YW1wIiwiX3JlYzM4IiwiX3JlYzM5IiwiX3JlYzQwIiwiX3JlYzQxIiwiYWRkTGlzdGVuZXIiLCJfcmVjMjkiLCJfcmVjMzAiLCJfcmVjMzEiLCJfcmVjMzIiLCJfcmVjMzMiLCJkYXRhIiwiZXYiLCJfcmVjMzQiLCJfcmVjMzUiLCJfcmVjMzYiLCJfcmVjMzciLCJ0aW1lc3RhbXAiLCJhc3NlcnRpb24iLCJtcyIsInNldFRpbWVvdXQiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRyb2xzIiwib25sb2FkZWRkYXRhIiwiZXJyIiwiSW1hZ2UiLCJvbmxvYWQiLCJibG9iIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsIndhaXRFdmVudCIsInRhcmdldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWNjIiwiZmFpbCIsImNsZWFuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJ1bkVuZCIsImdsb2JhbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxJQUFBQSxxQkFBQTtBQUFBLGFBQUFDLG1CQUFBO0FBQUEsYUFBQUMsUUFBQTtBQUFBO0FBQUEsSUFBQUQsbUJBQUEsQ0FBQUUsU0FBQSxDQUFBQyxL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QlIsR0FBeEIsRUFBNkJVLElBQTdCLEVBRjBDO0FBQUEsUUFHMUMsU0FBU0QsSUFBVCxDQUFjdkIsRUFBZCxFQUFrQjtBQUFBLFlBQUV5QixLQUFBLEdBQUY7QUFBQSxZQUFXbE8sT0FBQSxDQUFReU0sRUFBUixFQUFYO0FBQUEsU0FId0I7QUFBQSxRQUkxQyxTQUFTd0IsSUFBVCxDQUFjeEIsRUFBZCxFQUFrQjtBQUFBLFlBQUV5QixLQUFBLEdBQUY7QUFBQSxZQUFXaE8sTUFBQSxDQUFPdU0sRUFBUCxFQUFYO0FBQUEsU0FKd0I7QUFBQSxRQUsxQyxTQUFTeUIsS0FBVCxHQUFpQjtBQUFBLFlBQ2JKLE1BQUEsQ0FBT0ssbUJBQVAsQ0FBMkIxQixFQUEzQixFQUErQnVCLElBQS9CLEVBRGE7QUFBQSxZQUViRixNQUFBLENBQU9LLG1CQUFQLENBQTJCWixHQUEzQixFQUFnQ1UsSUFBaEMsRUFGYTtBQUFBLFNBTHlCO0FBQUEsS0FBdkMsQ0FBUCxDQUZnQztBQUFBLENBbmJwQztBQWljQXhMLEtBQUEsQ0FBTSxJQUFOLEVBQVksUUFBWixFQUFzQixVQUFVMkwsTUFBVixFQUFrQjtBQUFBLElBQUUsT0FBT0MsTUFBQSxDQUFPRCxNQUFQLEdBQWdCQSxNQUF2QixDQUFGO0FBQUEsQ0FBeEMiLCJzb3VyY2VSb290IjoiL2hvbWUvZGF2aWQvdHMtZWJtbCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJxdW5pdFwiLz5cbnZhciBfMSA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBfMiA9IHJlcXVpcmUoXCIuL1wiKTtcbnZhciBCdWZmZXIgPSBfMi50b29scy5CdWZmZXI7XG52YXIgUVVuaXQgPSByZXF1aXJlKFwicXVuaXRcIik7XG52YXIgZW1wb3dlciA9IHJlcXVpcmUoXCJlbXBvd2VyXCIpO1xudmFyIGZvcm1hdHRlciA9IHJlcXVpcmUoXCJwb3dlci1hc3NlcnQtZm9ybWF0dGVyXCIpO1xudmFyIHF1bml0VGFwID0gcmVxdWlyZShcInF1bml0LXRhcFwiKTtcblFVbml0LmNvbmZpZy5hdXRvc3RhcnQgPSB0cnVlO1xuZW1wb3dlcihRVW5pdC5hc3NlcnQsIGZvcm1hdHRlcigpLCB7IGRlc3RydWN0aXZlOiB0cnVlIH0pO1xucXVuaXRUYXAoUVVuaXQsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgfSwgeyBzaG93U291cmNlT25GYWlsdXJlOiBmYWxzZSB9KTtcbnZhciBXRUJNX0ZJTEVfTElTVCA9IFtcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Mi5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0My5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NC5ta3ZcIiwgdGhpcyBmaWxlIGlzIGJyb2tlbiBzbyBub3QgcGFzcyBlbmNvZGVyX2RlY29kZXJfdGVzdCBcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ni5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ny5ta3ZcIiwgdGhpcyBmaWxlIGhhcyB1bmtub3duIHRhZyBzbyBjYW5ub3Qgd3JpdGUgZmlsZVxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q4Lm1rdlwiLFxuXTtcblFVbml0Lm1vZHVsZShcInRzLUVCTUxcIik7XG5RVW5pdC50ZXN0KFwiZW5jb2Rlci1kZWNvZGVyXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGUsIHJlcywgYnVmLCBlbG1zLCBidWYyLCBlbG1zMiwgdGVzdHMsIF9pLCB0ZXN0c18xLCB0ZXN0O1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGZpbGUgPSBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBidWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgICAgICAgICAgYnVmMiA9IG5ldyBfMS5FbmNvZGVyKCkuZW5jb2RlKGVsbXMpO1xuICAgICAgICAgICAgICAgIGVsbXMyID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmMik7XG4gICAgICAgICAgICAgICAgdGVzdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDAsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkVCTUxcIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogNCwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRUJNTFwiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IHRydWUpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDUsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIlNlZ21lbnRcIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjQsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkluZm9cIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjUsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkR1cmF0aW9uXCIgJiYgZWxtLnR5cGUgPT09IFwiZlwiICYmIGVsbS52YWx1ZSA9PT0gODczMzYpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDI2LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7IGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJNdXhpbmdBcHBcIiAmJiBlbG0udHlwZSA9PT0gXCI4XCIgJiYgZWxtLnZhbHVlID09PSBcImxpYmVibWwyIHYwLjEwLjAgKyBsaWJtYXRyb3NrYTIgdjAuMTAuMVwiKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGluZGV4OiAyOCwgdGVzdDogZnVuY3Rpb24gKGVsbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJEYXRlVVRDXCIgJiYgZWxtLnR5cGUgPT09IFwiZFwiICYmIGVsbS52YWx1ZSBpbnN0YW5jZW9mIERhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udHlwZSA9PT0gXCJkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXzIudG9vbHMuY29udmVydEVCTUxEYXRlVG9KU0RhdGUoZWxtLnZhbHVlKS5nZXRUaW1lKCkgPT09IG5ldyBEYXRlKFwiMjAxMC0wOC0yMVQwNzoyMzowMy4wMDBaXCIpLmdldFRpbWUoKSk7IC8vIHRvSVNPU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDI5LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIlNlZ21lbnRVVUlEXCIgJiYgZWxtLnR5cGUgPT09IFwiYlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZfMSA9IG5ldyBVaW50OEFycmF5KG5ldyBCdWZmZXIoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMHg5MiwgMHgyZCwgMHgxOSwgMHgzMiwgMHgwZiwgMHgxZSwgMHgxMywgMHhjNSwgMHhiNSwgMHgwNSwgMHg2MywgMHgwYSwgMHhhZiwgMHhkOCwgMHg1MywgMHgzNlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWYyXzEgPSBuZXcgVWludDhBcnJheShlbG0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soYnVmXzEuZXZlcnkoZnVuY3Rpb24gKHZhbCwgaSkgeyByZXR1cm4gYnVmMl8xW2ldID09PSB2YWw7IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBmb3IgKF9pID0gMCwgdGVzdHNfMSA9IHRlc3RzOyBfaSA8IHRlc3RzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QgPSB0ZXN0c18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdC50ZXN0KGVsbXMyW3Rlc3QuaW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfSk7XG5XRUJNX0ZJTEVfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgUVVuaXQudGVzdChcImVuY29kZXItZGVjb2RlcjpcIiArIGZpbGUsIGNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdChmaWxlKSk7XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdChmaWxlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzLCBidWYsIGVsbXMsIGJ1ZjIsIGVsbXMyLCBpLCBlbG0sIGVsbTI7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmMiA9IG5ldyBfMS5FbmNvZGVyKCkuZW5jb2RlKGVsbXMpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zMiA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1ZjIpO1xuICAgICAgICAgICAgICAgICAgICAvL2Fzc2VydC5vayhidWYuYnl0ZUxlbmd0aCA9PT0gYnVmMi5ieXRlTGVuZ3RoLCBcIlRoaXMgcHJvYmxlbSBpcyBjYXVzZWQgYnkgSlMgYmVpbmcgdW5hYmxlIHRvIGhhbmRsZSBJbnQ2NC5cIik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG1zLmxlbmd0aCA9PT0gZWxtczIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBlbG1zLmxlbmd0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBlbG0gPSBlbG1zW2ldO1xuICAgICAgICAgICAgICAgICAgICBlbG0yID0gZWxtczJbaV07XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gZWxtMi5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS50eXBlID09PSBlbG0yLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwibVwiIHx8IGVsbTIudHlwZSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiICYmIGVsbTIudHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUubGVuZ3RoID09PSBlbG0yLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS52YWx1ZSA9PT0gZWxtMi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHNsZWVwKDEpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59XG5RVW5pdC50ZXN0KFwiaGFuZHdyaXRlLWVuY29kZXJcIiwgZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGFnU3RyZWFtLCBiaW5hcml6ZWQsIGJ1ZiwgZWxtcztcbiAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHRhZ1N0cmVhbSA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MVmVyc2lvblwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MUmVhZFZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTE1heElETGVuZ3RoXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogNCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxNYXhTaXplTGVuZ3RoXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogOCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkRvY1R5cGVcIiwgdHlwZTogXCJzXCIsIHZhbHVlOiBcIndlYm1cIiB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkRvY1R5cGVWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogNCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkRvY1R5cGVSZWFkVmVyc2lvblwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlNlZ21lbnRcIiwgdHlwZTogXCJtXCIsIHVua25vd25TaXplOiB0cnVlLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTZWVrSGVhZFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2Vla0hlYWRcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiSW5mb1wiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiVGltZXN0YW1wU2NhbGVcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAxMDAwMDAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiSW5mb1wiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEdXJhdGlvblwiLCB0eXBlOiBcImZcIiwgdmFsdWU6IDAuMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkNsdXN0ZXJcIiwgdHlwZTogXCJtXCIsIHVua25vd25TaXplOiB0cnVlLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUaW1lc3RhbXBcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2ltcGxlQmxvY2tcIiwgdHlwZTogXCJiXCIsIHZhbHVlOiBuZXcgQnVmZmVyKDEwMjQpIH0sXG4gICAgICAgIF07XG4gICAgICAgIGJpbmFyaXplZCA9IHRhZ1N0cmVhbS5tYXAoXzIudG9vbHMuZW5jb2RlVmFsdWVUb0J1ZmZlcik7XG4gICAgICAgIGJ1ZiA9IG5ldyBfMS5FbmNvZGVyKCkuZW5jb2RlKGJpbmFyaXplZCk7XG4gICAgICAgIGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYpO1xuICAgICAgICBlbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSwgaSkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbiA9IHRhZ1N0cmVhbVtpXTtcbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gb3JpZ2luLm5hbWUsIFwiY29tcGFyZSB0YWcgbmFtZVwiKTtcbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0udHlwZSA9PT0gb3JpZ2luLnR5cGUsIFwiY29tcGFyZSB0YWcgdHlwZVwiKTtcbiAgICAgICAgICAgIGlmIChlbG0udHlwZSA9PT0gXCJtXCIgfHwgb3JpZ2luLnR5cGUgPT09IFwibVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcImJcIiAmJiBvcmlnaW4udHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlLmxlbmd0aCA9PT0gb3JpZ2luLnZhbHVlLmxlbmd0aCwgXCJjb21wYXJlIHRhZyB2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlID09PSBvcmlnaW4udmFsdWUsIFwiY29tcGFyZSB0YWcgdmFsdWVcIik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgfSk7XG59KTsgfSk7XG5RVW5pdC5tb2R1bGUoXCJSZWFkZXJcIik7XG52YXIgTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QgPSBbXG4gICAgXCIuL2Nocm9tZTU3LndlYm1cIixcbiAgICAvLyBsYXN0MnRpbWVzdGFtcCh2aWRlbywgYXVkaW8pOiAoKDcuNDkzcywgNy41NTJzKSwgKDcuNDkzcywgNy41NTJzKSlcbiAgICAvLyBDaHJvbWU1NzogNy42MTJzIH49IDcuNjExcyA9IDcuNTUycyArICg3LjU1MnMgLSA3LjQ5M3MpIC8vID8/P1xuICAgIC8vIEZpcmVmb3g1MzogNy41NTJzID0gNy41NTJzICsgKDcuNTUycyAtIDcuNTUycykgLy8gc2hpdCFcbiAgICAvLyBSZWFkZXI6IDcuNjExcyA9IDcuNTUycyArICg3LjU1MnMgLSA3LjQ5M3MpXG4gICAgXCIuL2ZpcmVmb3g1NW5pZ2h0bHkud2VibVwiLFxuICAgIC8vIGxhc3QydGltZXN0YW1wKHZpZGVvLCBhdWRpbyk6ICgoOC41NjdzLCA4LjU5MHMpLCAoOC42MjZzLCA4LjY0NnMpKSwgQ29kZWNEZWxheShhdWRpbyk6IDYuNTAwbXNcbiAgICAvLyBDaHJvbWU1NzogOC42NTlzIH49IDguNjU5NXMgPSA4LjY0NnMgKyAoOC42NDZzIC0gOC42MjZzKSAtIDYuNTAwbXNcbiAgICAvLyBGaXJlZm94NTM6IDguNjY2cyA9IDguNjQ2cyArICg4LjY0NnMgLSA4LjYyNnMpXG4gICAgLy8gUmVhZGVyOiA4LjY1OTVzID0gOC42NDZzICsgKDguNjQ2cyAtIDguNjI2cykgLSA2LjUwMG1zXG4gICAgXCIuL2ZpcmVmb3g1My53ZWJtXCIsXG4gICAgLy8gQ2hyb21lNTc6IDEwLjAxOXMsIEZpcmVmb3g1MzogMTAuMDI2cywgUmVhZGVyOiA5Ljk2N3NcbiAgICAvLyBsYXN0MnRpbWVzdGFtcCh2aWRlbywgYXVkaW8pOiAoKDkuOTMycywgOS45NjdzKSwgKDkuOTg2cywgMTAuMDA2cykpLCBDb2RlY0RlbGF5KGF1ZGlvKTogNi41MDBtc1xuICAgIC8vIENocm9tZTU3OiAxMC4wMTlzIH49IDEwLjAxOTVzID0gMTAuMDA2cyArICgxMC4wMDZzIC0gOS45ODZzKSAtIDYuNTAwbXNcbiAgICAvLyBGaXJlZm94NTM6IDEwLjAyNnMgPSAxMC4wMDZzICsgKDEwLjAwNnMgLSA5Ljk4NnMpXG4gICAgLy8gUmVhZGVyOiAxMC4wMTk1cyA9IDEwLjAwNnMgKyAoMTAuMDA2cyAtIDkuOTg2cykgLSA2LjUwMG1zXG5dO1xuTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgIFFVbml0LnRlc3QoXCJjcmVhdGVfd2VicF90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX3dlYnBfdGVzdChmaWxlKSk7XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZV93ZWJwX3Rlc3QoZmlsZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcywgd2VibV9idWYsIGVsbXMsIFdlYlBzLCBfaSwgV2ViUHNfMSwgV2ViUCwgc3JjLCBpbWcsIGVycl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHdlYm1fYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUod2VibV9idWYpO1xuICAgICAgICAgICAgICAgICAgICBXZWJQcyA9IF8yLnRvb2xzLldlYlBGcmFtZUZpbHRlcihlbG1zKTtcbiAgICAgICAgICAgICAgICAgICAgX2kgPSAwLCBXZWJQc18xID0gV2ViUHM7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKF9pIDwgV2ViUHNfMS5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgV2ViUCA9IFdlYlBzXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICBzcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKFdlYlApO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzQsIDYsICwgN10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaEltYWdlKHNyYyldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgaW1nID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soaW1nLndpZHRoID4gMCAmJiBpbWcuaGVpZ2h0ID4gMCwgXCJzaXplOlwiICsgaW1nLndpZHRoICsgXCJ4XCIgKyBpbWcuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKGVycl8xLCBcIndlYnAgbG9hZCBmYWlscmVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzcmMpO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDg7XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICBfaSsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59XG5NRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgUVVuaXQudGVzdChcImNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3Q6XCIgKyBmaWxlLCBjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX2NvbnZlcnRfdG9fc2Vla2FibGVfdGVzdChmaWxlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVjb2RlciwgcmVhZGVyLCByZXMsIHdlYm1fYnVmLCBlbG1zLCBzZWMsIHJlZmluZWRNZXRhZGF0YUJ1ZiwgYm9keSwgcmF3X3dlYk0sIHJlZmluZWRXZWJNLCByYXdfdmlkZW9fMSwgcmVmaW5lZF92aWRlbywgd2FpdCwgZXJyXzIsIHJlZmluZWRCdWYsIHJlZmluZWRFbG1zLCBfcmVhZGVyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZXIgPSBuZXcgXzEuRGVjb2RlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgXzEuUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VibV9idWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImFuYWxhc2lzIHVuc2Vla2FibGUgb3JpZ2luYWwgZWJtbCB0cmVlXCIpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zID0gZGVjb2Rlci5kZWNvZGUod2VibV9idWYpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSkgeyByZWFkZXIucmVhZChlbG0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiY29udmVydCB0byBzZWVrYWJsZSBmaWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2socmVhZGVyLm1ldGFkYXRhc1swXS5uYW1lID09PSBcIkVCTUxcIik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhyZWFkZXIubWV0YWRhdGFzLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgICAgICBzZWMgPSByZWFkZXIuZHVyYXRpb24gKiByZWFkZXIudGltZXN0YW1wU2NhbGUgLyAxMDAwIC8gMTAwMCAvIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayg3IDwgc2VjICYmIHNlYyA8IDExKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZE1ldGFkYXRhQnVmID0gXzIudG9vbHMubWFrZU1ldGFkYXRhU2Vla2FibGUocmVhZGVyLm1ldGFkYXRhcywgcmVhZGVyLmR1cmF0aW9uLCByZWFkZXIuY3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSB3ZWJtX2J1Zi5zbGljZShyZWFkZXIubWV0YWRhdGFTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHJlZmluZWRNZXRhZGF0YUJ1Zi5ieXRlTGVuZ3RoIC0gcmVhZGVyLm1ldGFkYXRhU2l6ZSA+IDApO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sod2VibV9idWYuYnl0ZUxlbmd0aCA9PT0gKHJlYWRlci5tZXRhZGF0YVNpemUgKyBib2R5LmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiY2hlY2sgZHVyYXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIHJhd193ZWJNID0gbmV3IEJsb2IoW3dlYm1fYnVmXSwgeyB0eXBlOiBcInZpZGVvL3dlYm1cIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZFdlYk0gPSBuZXcgQmxvYihbcmVmaW5lZE1ldGFkYXRhQnVmLCBib2R5XSwgeyB0eXBlOiBcInZpZGVvL3dlYm1cIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFszLCA4LCAsIDldKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hWaWRlbyhVUkwuY3JlYXRlT2JqZWN0VVJMKHJhd193ZWJNKSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgcmF3X3ZpZGVvXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoVmlkZW8oVVJMLmNyZWF0ZU9iamVjdFVSTChyZWZpbmVkV2ViTSkpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRfdmlkZW8gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayghTnVtYmVyLmlzRmluaXRlKHJhd192aWRlb18xLmR1cmF0aW9uKSwgXCJtZWRpYSByZWNvcmRlciB3ZWJtIGR1cmF0aW9uIGlzIG5vdCBmaW5pdGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE51bWJlci5pc0Zpbml0ZShyZWZpbmVkX3ZpZGVvLmR1cmF0aW9uKSwgXCJyZWZpbmVkIHdlYm0gZHVyYXRpb24gaXMgZmluaXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBzbGVlcCgxMDApXTtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgd2FpdCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgcmF3X3ZpZGVvXzEub25zZWVrZWQgPSByZXNvbHZlOyByYXdfdmlkZW9fMS5vbmVycm9yID0gcmVqZWN0OyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmF3X3ZpZGVvXzEuY3VycmVudFRpbWUgPSA3ICogMjQgKiA2MCAqIDYwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB3YWl0XTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZHVyYXRpb24gc2VjIGlzIGRpZmZlcmVudCBlYWNoIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhNYXRoLmFicyhyYXdfdmlkZW9fMS5kdXJhdGlvbiAtIHJlZmluZWRfdmlkZW8uZHVyYXRpb24pIDwgMC4xKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICBlcnJfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKGVycl8yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlYWRlci5sb2dnaW5nKSByZXR1cm4gWzMgLypicmVhayovLCAxMV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBkZWJ1Z1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJwdXQgc2Vla2FibGUgZWJtbCB0cmVlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZWFkQXNBcnJheUJ1ZmZlcihyZWZpbmVkV2ViTSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRCdWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRFbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUocmVmaW5lZEJ1Zik7XG4gICAgICAgICAgICAgICAgICAgIF9yZWFkZXJfMSA9IG5ldyBfMS5SZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgX3JlYWRlcl8xLmxvZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZWZpbmVkRWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHsgcmV0dXJuIF9yZWFkZXJfMS5yZWFkKGVsbSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICBfcmVhZGVyXzEuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDExO1xuICAgICAgICAgICAgICAgIGNhc2UgMTE6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59XG5NRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgUVVuaXQudGVzdChcImNyZWF0ZV9yZWNvcmRlcl9oZWxwZXJfdGVzdDpcIiArIGZpbGUsIGNyZWF0ZV9yZWNvcmRlcl9oZWxwZXJfdGVzdChmaWxlKSk7XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZV9yZWNvcmRlcl9oZWxwZXJfdGVzdChmaWxlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVjb2RlciwgcmVhZGVyLCBsYXN0X3NlYywgbWV0YWRhdGFfbG9hZGVkLCBjbHVzdGVyX251bSwgbGFzdF90aW1lc3RhbXAsIHJlcywgd2VibV9idWYsIGVsbXM7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZXIgPSBuZXcgXzEuRGVjb2RlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgXzEuUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3Rfc2VjID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiZHVyYXRpb25cIiwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZXN0YW1wU2NhbGUgPSBfYS50aW1lc3RhbXBTY2FsZSwgZHVyYXRpb24gPSBfYS5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWMgPSBkdXJhdGlvbiAqIHRpbWVzdGFtcFNjYWxlIC8gMTAwMCAvIDEwMDAgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE51bWJlci5pc0Zpbml0ZShzZWMpLCBcImR1cmF0aW9uOlwiICsgc2VjICsgXCJzZWNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soc2VjID4gbGFzdF9zZWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9zZWMgPSBzZWM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YV9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwibWV0YWRhdGFcIiwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGFTaXplID0gX2EubWV0YWRhdGFTaXplLCBkYXRhID0gX2EuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhtZXRhZGF0YVNpemUgPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhkYXRhLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGRhdGFbMF0ubmFtZSA9PT0gXCJFQk1MXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFfbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJfbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGFzdF90aW1lc3RhbXAgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiY2x1c3RlclwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsdXN0ZXIgY2h1bmsgdGVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBldi5kYXRhLCB0aW1lc3RhbXAgPSBldi50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKHRpbWVzdGFtcCksIFwiY2x1c3Rlci50aW1lc3RhbXA6XCIgKyB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGRhdGEubGVuZ3RoID4gMCwgXCJjbHVzdGVyLmxlbmd0aDpcIiArIGRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NlcnRpb24gPSBkYXRhLmV2ZXJ5KGZ1bmN0aW9uIChlbG0pIHsgcmV0dXJuIGVsbS5uYW1lID09PSBcIkNsdXN0ZXJcIiB8fCBlbG0ubmFtZSA9PT0gXCJUaW1lc3RhbXBcIiB8fCBlbG0ubmFtZSA9PT0gXCJTaW1wbGVCbG9ja1wiOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhhc3NlcnRpb24sIFwiZWxlbWVudCBjaGVja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayh0aW1lc3RhbXAgPiBsYXN0X3RpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyX251bSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF90aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHdlYm1fYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zID0gZGVjb2Rlci5kZWNvZGUod2VibV9idWYpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSkgeyByZWFkZXIucmVhZChlbG0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGxhc3Rfc2VjID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhtZXRhZGF0YV9sb2FkZWQpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soY2x1c3Rlcl9udW0gPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGxhc3RfdGltZXN0YW1wID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59XG5mdW5jdGlvbiBzbGVlcChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gc2V0VGltZW91dChyZXNvbHZlLCBtcyk7IH0pO1xufVxuZnVuY3Rpb24gZmV0Y2hWaWRlbyhzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XG4gICAgICAgIHZpZGVvLnNyYyA9IHNyYztcbiAgICAgICAgdmlkZW8uY29udHJvbHMgPSB0cnVlO1xuICAgICAgICB2aWRlby5vbmxvYWRlZGRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2aWRlby5vbmxvYWRlZGRhdGEgPSBudWxsO1xuICAgICAgICAgICAgcmVzb2x2ZSh2aWRlbyk7XG4gICAgICAgIH07XG4gICAgICAgIHZpZGVvLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICB2aWRlby5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZmV0Y2hJbWFnZShzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7IHJlc29sdmUoaW1nKTsgfTtcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7IHJlamVjdChlcnIpOyB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVhZEFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7IHJlc29sdmUocmVhZGVyLnJlc3VsdCk7IH07XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2KSB7IHJlamVjdChldik7IH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiB3YWl0RXZlbnQodGFyZ2V0LCBldiwgZXJyKSB7XG4gICAgaWYgKGVyciA9PT0gdm9pZCAwKSB7IGVyciA9IFwiZXJyb3JcIjsgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2LCBzdWNjKTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXJyLCBmYWlsKTtcbiAgICAgICAgZnVuY3Rpb24gc3VjYyhldikgeyBjbGVhbigpOyByZXNvbHZlKGV2KTsgfVxuICAgICAgICBmdW5jdGlvbiBmYWlsKGV2KSB7IGNsZWFuKCk7IHJlamVjdChldik7IH1cbiAgICAgICAgZnVuY3Rpb24gY2xlYW4oKSB7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldiwgc3VjYyk7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlcnIsIGZhaWwpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBAdHlwZXMvcXVuaXQgZG9lc24ndCBkZWZpbmUgUVVuaXQub24geWV0XG5RVW5pdFsnb24nXSgncnVuRW5kJywgZnVuY3Rpb24gKHJ1bkVuZCkgeyByZXR1cm4gZ2xvYmFsLnJ1bkVuZCA9IHJ1bkVuZDsgfSk7XG4iXX0=

