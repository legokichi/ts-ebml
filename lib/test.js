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
                                    filepath: '.\\lib\\test.js',
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
                                    filepath: '.\\lib\\test.js',
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
                                    filepath: '.\\lib\\test.js',
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
                                    filepath: '.\\lib\\test.js',
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
                                    filepath: '.\\lib\\test.js',
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
                                    filepath: '.\\lib\\test.js',
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
                                    filepath: '.\\lib\\test.js',
                                    line: 85
                                }));
                                assert.ok(_rec8._expr(_rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(elm, 'arguments/0/left/left/object').type, 'arguments/0/left/left') === 'd', 'arguments/0/left') && _rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(_2, 'arguments/0/right/left/callee/object/callee/object/object').tools, 'arguments/0/right/left/callee/object/callee/object').convertEBMLDateToJSDate(_rec8._capt(_rec8._capt(elm, 'arguments/0/right/left/callee/object/arguments/0/object').value, 'arguments/0/right/left/callee/object/arguments/0')), 'arguments/0/right/left/callee/object').getTime(), 'arguments/0/right/left') === _rec8._capt(_rec8._capt(new Date('2010-08-21T07:23:03.000Z'), 'arguments/0/right/right/callee/object').getTime(), 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                                    content: 'assert.ok(elm.type === "d" && _2.tools.convertEBMLDateToJSDate(elm.value).getTime() === new Date("2010-08-21T07:23:03.000Z").getTime())',
                                    filepath: '.\\lib\\test.js',
                                    line: 86
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
                                    filepath: '.\\lib\\test.js',
                                    line: 92
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
                                        filepath: '.\\lib\\test.js',
                                        line: 113
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
                            filepath: '.\\lib\\test.js',
                            line: 145
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
                            filepath: '.\\lib\\test.js',
                            line: 152
                        }));
                        assert.ok(_rec13._expr(_rec13._capt(_rec13._capt(_rec13._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec13._capt(_rec13._capt(elm2, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(elm.type === elm2.type)',
                            filepath: '.\\lib\\test.js',
                            line: 153
                        }));
                        if (elm.type === 'm' || elm2.type === 'm') {
                            return [2];
                        }
                        if (elm.type === 'b' && elm2.type === 'b') {
                            assert.ok(_rec14._expr(_rec14._capt(_rec14._capt(_rec14._capt(_rec14._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec14._capt(_rec14._capt(_rec14._capt(elm2, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(elm.value.length === elm2.value.length)',
                                filepath: '.\\lib\\test.js',
                                line: 158
                            }));
                            return [2];
                        }
                        assert.ok(_rec15._expr(_rec15._capt(_rec15._capt(_rec15._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec15._capt(_rec15._capt(elm2, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(elm.value === elm2.value)',
                            filepath: '.\\lib\\test.js',
                            line: 161
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
                var _rec16 = new _PowerAssertRecorder1();
                var _rec17 = new _PowerAssertRecorder1();
                var _rec18 = new _PowerAssertRecorder1();
                var _rec19 = new _PowerAssertRecorder1();
                var origin = tagStream[i];
                assert.ok(_rec16._expr(_rec16._capt(_rec16._capt(_rec16._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec16._capt(_rec16._capt(origin, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === origin.name, "compare tag name")',
                    filepath: '.\\lib\\test.js',
                    line: 203
                }), 'compare tag name');
                assert.ok(_rec17._expr(_rec17._capt(_rec17._capt(_rec17._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec17._capt(_rec17._capt(origin, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.type === origin.type, "compare tag type")',
                    filepath: '.\\lib\\test.js',
                    line: 204
                }), 'compare tag type');
                if (elm.type === 'm' || origin.type === 'm') {
                    return;
                }
                if (elm.type === 'b' && origin.type === 'b') {
                    assert.ok(_rec18._expr(_rec18._capt(_rec18._capt(_rec18._capt(_rec18._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec18._capt(_rec18._capt(_rec18._capt(origin, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                        content: 'assert.ok(elm.value.length === origin.value.length, "compare tag value")',
                        filepath: '.\\lib\\test.js',
                        line: 209
                    }), 'compare tag value');
                    return;
                }
                assert.ok(_rec19._expr(_rec19._capt(_rec19._capt(_rec19._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec19._capt(_rec19._capt(origin, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.value === origin.value, "compare tag value")',
                    filepath: '.\\lib\\test.js',
                    line: 212
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
                            filepath: '.\\lib\\test.js',
                            line: 260
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
                            filepath: '.\\lib\\test.js',
                            line: 300
                        }));
                        assert.ok(_rec22._expr(_rec22._capt(_rec22._capt(_rec22._capt(_rec22._capt(reader, 'arguments/0/left/object/object').metadatas, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(reader.metadatas.length > 0)',
                            filepath: '.\\lib\\test.js',
                            line: 301
                        }));
                        sec = reader.duration * reader.timecodeScale / 1000 / 1000 / 1000;
                        assert.ok(_rec23._expr(_rec23._capt(_rec23._capt(7 < _rec23._capt(sec, 'arguments/0/left/right'), 'arguments/0/left') && _rec23._capt(_rec23._capt(sec, 'arguments/0/right/left') < 11, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(7 < sec && sec < 11)',
                            filepath: '.\\lib\\test.js',
                            line: 303
                        }));
                        refinedMetadataBuf = _2.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
                        body = webm_buf.slice(reader.metadataSize);
                        assert.ok(_rec24._expr(_rec24._capt(_rec24._capt(_rec24._capt(_rec24._capt(refinedMetadataBuf, 'arguments/0/left/left/object').byteLength, 'arguments/0/left/left') - _rec24._capt(_rec24._capt(reader, 'arguments/0/left/right/object').metadataSize, 'arguments/0/left/right'), 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(refinedMetadataBuf.byteLength - reader.metadataSize > 0)',
                            filepath: '.\\lib\\test.js',
                            line: 306
                        }));
                        assert.ok(_rec25._expr(_rec25._capt(_rec25._capt(_rec25._capt(webm_buf, 'arguments/0/left/object').byteLength, 'arguments/0/left') === _rec25._capt(_rec25._capt(_rec25._capt(reader, 'arguments/0/right/left/object').metadataSize, 'arguments/0/right/left') + _rec25._capt(_rec25._capt(body, 'arguments/0/right/right/object').byteLength, 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert.ok(webm_buf.byteLength === reader.metadataSize + body.byteLength)',
                            filepath: '.\\lib\\test.js',
                            line: 307
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
                                filepath: '.\\lib\\test.js',
                                line: 321
                            }), 'media recorder webm duration is not finite');
                        }
                        assert.ok(_rec27._expr(_rec27._capt(_rec27._capt(Number, 'arguments/0/callee/object').isFinite(_rec27._capt(_rec27._capt(refined_video, 'arguments/0/arguments/0/object').duration, 'arguments/0/arguments/0')), 'arguments/0'), {
                            content: 'assert.ok(Number.isFinite(refined_video.duration), "refined webm duration is finite")',
                            filepath: '.\\lib\\test.js',
                            line: 323
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
                            filepath: '.\\lib\\test.js',
                            line: 333
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
            var decoder, reader, last_sec, metadata_loaded, cluster_num, last_timecode, res, webm_buf, elms;
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
                            var timecodeScale = _a.timecodeScale, duration = _a.duration;
                            var sec = duration * timecodeScale / 1000 / 1000 / 1000;
                            assert.ok(_rec29._expr(_rec29._capt(_rec29._capt(Number, 'arguments/0/callee/object').isFinite(_rec29._capt(sec, 'arguments/0/arguments/0')), 'arguments/0'), {
                                content: 'assert.ok(Number.isFinite(sec), "duration:" + sec + "sec")',
                                filepath: '.\\lib\\test.js',
                                line: 373
                            }), 'duration:' + sec + 'sec');
                            assert.ok(_rec30._expr(_rec30._capt(_rec30._capt(sec, 'arguments/0/left') > _rec30._capt(last_sec, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(sec > last_sec)',
                                filepath: '.\\lib\\test.js',
                                line: 374
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
                                filepath: '.\\lib\\test.js',
                                line: 380
                            }));
                            assert.ok(_rec32._expr(_rec32._capt(_rec32._capt(_rec32._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                                content: 'assert.ok(data.length > 0)',
                                filepath: '.\\lib\\test.js',
                                line: 381
                            }));
                            assert.ok(_rec33._expr(_rec33._capt(_rec33._capt(_rec33._capt(_rec33._capt(data, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
                                content: 'assert.ok(data[0].name === "EBML")',
                                filepath: '.\\lib\\test.js',
                                line: 382
                            }));
                            metadata_loaded = true;
                        });
                        cluster_num = 0;
                        last_timecode = -1;
                        reader.addListener('cluster', function (ev) {
                            var _rec34 = new _PowerAssertRecorder1();
                            var _rec35 = new _PowerAssertRecorder1();
                            var _rec36 = new _PowerAssertRecorder1();
                            var _rec37 = new _PowerAssertRecorder1();
                            var data = ev.data, timecode = ev.timecode;
                            assert.ok(_rec34._expr(_rec34._capt(_rec34._capt(Number, 'arguments/0/callee/object').isFinite(_rec34._capt(timecode, 'arguments/0/arguments/0')), 'arguments/0'), {
                                content: 'assert.ok(Number.isFinite(timecode), "cluster.timecode:" + timecode)',
                                filepath: '.\\lib\\test.js',
                                line: 390
                            }), 'cluster.timecode:' + timecode);
                            assert.ok(_rec35._expr(_rec35._capt(_rec35._capt(_rec35._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                                content: 'assert.ok(data.length > 0, "cluster.length:" + data.length)',
                                filepath: '.\\lib\\test.js',
                                line: 391
                            }), 'cluster.length:' + data.length);
                            var assertion = data.every(function (elm) {
                                return elm.name === 'Cluster' || elm.name === 'Timecode' || elm.name === 'SimpleBlock';
                            });
                            assert.ok(_rec36._expr(_rec36._capt(assertion, 'arguments/0'), {
                                content: 'assert.ok(assertion, "element check")',
                                filepath: '.\\lib\\test.js',
                                line: 393
                            }), 'element check');
                            assert.ok(_rec37._expr(_rec37._capt(_rec37._capt(timecode, 'arguments/0/left') > _rec37._capt(last_timecode, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert.ok(timecode > last_timecode)',
                                filepath: '.\\lib\\test.js',
                                line: 394
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
                        assert.ok(_rec38._expr(_rec38._capt(_rec38._capt(last_sec, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(last_sec > 0)',
                            filepath: '.\\lib\\test.js',
                            line: 407
                        }));
                        assert.ok(_rec39._expr(_rec39._capt(metadata_loaded, 'arguments/0'), {
                            content: 'assert.ok(metadata_loaded)',
                            filepath: '.\\lib\\test.js',
                            line: 408
                        }));
                        assert.ok(_rec40._expr(_rec40._capt(_rec40._capt(cluster_num, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(cluster_num > 0)',
                            filepath: '.\\lib\\test.js',
                            line: 409
                        }));
                        assert.ok(_rec41._expr(_rec41._capt(_rec41._capt(last_timecode, 'arguments/0/left') > 0, 'arguments/0'), {
                            content: 'assert.ok(last_timecode > 0)',
                            filepath: '.\\lib\\test.js',
                            line: 410
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi5cXGxpYlxcdGVzdC5qcyJdLCJuYW1lcyI6WyJfUG93ZXJBc3NlcnRSZWNvcmRlcjEiLCJQb3dlckFzc2VydFJlY29yZGVyIiwiY2FwdHVyZWQiLCJwcm90b3R5cGUiLCJfY2FwdCIsInZhbHVlIiwiZXNwYXRoIiwicHVzaCIsIl9leHByIiwic291cmNlIiwiY2FwdHVyZWRWYWx1ZXMiLCJwb3dlckFzc2VydENvbnRleHQiLCJldmVudHMiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJhZG9wdCIsInJlc29sdmUiLCJQcm9taXNlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiX19nZW5lcmF0b3IiLCJib2R5IiwiXyIsImxhYmVsIiwic2VudCIsInQiLCJ0cnlzIiwib3BzIiwiZiIsInkiLCJnIiwidmVyYiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibiIsInYiLCJvcCIsIlR5cGVFcnJvciIsImNhbGwiLCJwb3AiLCJsZW5ndGgiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJfMSIsInJlcXVpcmUiLCJfMiIsIkJ1ZmZlciIsInRvb2xzIiwiUVVuaXQiLCJlbXBvd2VyIiwiZm9ybWF0dGVyIiwicXVuaXRUYXAiLCJjb25maWciLCJhdXRvc3RhcnQiLCJhc3NlcnQiLCJkZXN0cnVjdGl2ZSIsImNvbnNvbGUiLCJsb2ciLCJhcmd1bWVudHMiLCJzaG93U291cmNlT25GYWlsdXJlIiwiV0VCTV9GSUxFX0xJU1QiLCJtb2R1bGUiLCJ0ZXN0IiwiZmlsZSIsInJlcyIsImJ1ZiIsImVsbXMiLCJidWYyIiwiZWxtczIiLCJ0ZXN0cyIsIl9pIiwidGVzdHNfMSIsIl9hIiwiZmV0Y2giLCJhcnJheUJ1ZmZlciIsIkRlY29kZXIiLCJkZWNvZGUiLCJFbmNvZGVyIiwiZW5jb2RlIiwiaW5kZXgiLCJlbG0iLCJfcmVjMSIsIm9rIiwibmFtZSIsInR5cGUiLCJpc0VuZCIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJfcmVjMiIsIl9yZWMzIiwiX3JlYzQiLCJfcmVjNSIsIl9yZWM2IiwiX3JlYzciLCJfcmVjOCIsIkRhdGUiLCJjb252ZXJ0RUJNTERhdGVUb0pTRGF0ZSIsImdldFRpbWUiLCJfcmVjOSIsIl9yZWMxMCIsImJ1Zl8xIiwiVWludDhBcnJheSIsImJ1ZjJfMSIsImV2ZXJ5IiwidmFsIiwiaSIsImZvckVhY2giLCJjcmVhdGVfZW5jb2Rlcl9kZWNvZGVyX3Rlc3QiLCJfdGhpcyIsImVsbTIiLCJfcmVjMTEiLCJfcmVjMTIiLCJfcmVjMTMiLCJfcmVjMTQiLCJfcmVjMTUiLCJzbGVlcCIsInRhZ1N0cmVhbSIsImJpbmFyaXplZCIsInVua25vd25TaXplIiwibWFwIiwiZW5jb2RlVmFsdWVUb0J1ZmZlciIsIl9yZWMxNiIsIl9yZWMxNyIsIl9yZWMxOCIsIl9yZWMxOSIsIm9yaWdpbiIsIk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNUIiwiY3JlYXRlX3dlYnBfdGVzdCIsIndlYm1fYnVmIiwiV2ViUHMiLCJXZWJQc18xIiwiV2ViUCIsInNyYyIsImltZyIsImVycl8xIiwiX3JlYzIwIiwiV2ViUEZyYW1lRmlsdGVyIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmV0Y2hJbWFnZSIsIndpZHRoIiwiaGVpZ2h0Iiwibm90T2siLCJyZXZva2VPYmplY3RVUkwiLCJjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0IiwiZGVjb2RlciIsInJlYWRlciIsInNlYyIsInJlZmluZWRNZXRhZGF0YUJ1ZiIsInJhd193ZWJNIiwicmVmaW5lZFdlYk0iLCJyYXdfdmlkZW9fMSIsInJlZmluZWRfdmlkZW8iLCJ3YWl0IiwiZXJyXzIiLCJyZWZpbmVkQnVmIiwicmVmaW5lZEVsbXMiLCJfcmVhZGVyXzEiLCJfcmVjMjEiLCJfcmVjMjIiLCJfcmVjMjMiLCJfcmVjMjQiLCJfcmVjMjUiLCJfcmVjMjYiLCJfcmVjMjciLCJfcmVjMjgiLCJSZWFkZXIiLCJpbmZvIiwicmVhZCIsInN0b3AiLCJtZXRhZGF0YXMiLCJkdXJhdGlvbiIsInRpbWVjb2RlU2NhbGUiLCJtYWtlTWV0YWRhdGFTZWVrYWJsZSIsImN1ZXMiLCJzbGljZSIsIm1ldGFkYXRhU2l6ZSIsImJ5dGVMZW5ndGgiLCJCbG9iIiwiZmV0Y2hWaWRlbyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIk51bWJlciIsImlzRmluaXRlIiwib25zZWVrZWQiLCJvbmVycm9yIiwiY3VycmVudFRpbWUiLCJNYXRoIiwiYWJzIiwibG9nZ2luZyIsInJlYWRBc0FycmF5QnVmZmVyIiwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0IiwibGFzdF9zZWMiLCJtZXRhZGF0YV9sb2FkZWQiLCJjbHVzdGVyX251bSIsImxhc3RfdGltZWNvZGUiLCJfcmVjMzgiLCJfcmVjMzkiLCJfcmVjNDAiLCJfcmVjNDEiLCJhZGRMaXN0ZW5lciIsIl9yZWMyOSIsIl9yZWMzMCIsIl9yZWMzMSIsIl9yZWMzMiIsIl9yZWMzMyIsImRhdGEiLCJldiIsIl9yZWMzNCIsIl9yZWMzNSIsIl9yZWMzNiIsIl9yZWMzNyIsInRpbWVjb2RlIiwiYXNzZXJ0aW9uIiwibXMiLCJzZXRUaW1lb3V0IiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb250cm9scyIsIm9ubG9hZGVkZGF0YSIsImVyciIsIkltYWdlIiwib25sb2FkIiwiYmxvYiIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJ3YWl0RXZlbnQiLCJ0YXJnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3VjYyIsImZhaWwiLCJjbGVhbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsSUFBQUEscUJBQUE7QUFBQSxhQUFBQyxtQkFBQTtBQUFBLGFBQUFDLFFBQUE7QUFBQTtBQUFBLElBQUFELG1CQUFBLENBQUFFLFNBQUEsQ0FBQUMsS0FBQSxZQUFBQSxLQUFBLENB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LENBQVF5TSxFQUFSLEVBQVg7QUFBQSxTQUh3QjtBQUFBLFFBSTFDLFNBQVN3QixJQUFULENBQWN4QixFQUFkLEVBQWtCO0FBQUEsWUFBRXlCLEtBQUEsR0FBRjtBQUFBLFlBQVdoTyxNQUFBLENBQU91TSxFQUFQLEVBQVg7QUFBQSxTQUp3QjtBQUFBLFFBSzFDLFNBQVN5QixLQUFULEdBQWlCO0FBQUEsWUFDYkosTUFBQSxDQUFPSyxtQkFBUCxDQUEyQjFCLEVBQTNCLEVBQStCdUIsSUFBL0IsRUFEYTtBQUFBLFlBRWJGLE1BQUEsQ0FBT0ssbUJBQVAsQ0FBMkJaLEdBQTNCLEVBQWdDVSxJQUFoQyxFQUZhO0FBQUEsU0FMeUI7QUFBQSxLQUF2QyxDQUFQLENBRmdDO0FBQUEiLCJzb3VyY2VSb290IjoiQzpcXFVzZXJzXFxyaWNhclxcc291cmNlXFxyZXBvc1xcdHMtZWJtbCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwicXVuaXRcIi8+XG52YXIgXzEgPSByZXF1aXJlKFwiLi9cIik7XG52YXIgXzIgPSByZXF1aXJlKFwiLi9cIik7XG52YXIgQnVmZmVyID0gXzIudG9vbHMuQnVmZmVyO1xudmFyIFFVbml0ID0gcmVxdWlyZShcInF1bml0anNcIik7XG52YXIgZW1wb3dlciA9IHJlcXVpcmUoXCJlbXBvd2VyXCIpO1xudmFyIGZvcm1hdHRlciA9IHJlcXVpcmUoXCJwb3dlci1hc3NlcnQtZm9ybWF0dGVyXCIpO1xudmFyIHF1bml0VGFwID0gcmVxdWlyZShcInF1bml0LXRhcFwiKTtcblFVbml0LmNvbmZpZy5hdXRvc3RhcnQgPSB0cnVlO1xuZW1wb3dlcihRVW5pdC5hc3NlcnQsIGZvcm1hdHRlcigpLCB7IGRlc3RydWN0aXZlOiB0cnVlIH0pO1xucXVuaXRUYXAoUVVuaXQsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgfSwgeyBzaG93U291cmNlT25GYWlsdXJlOiBmYWxzZSB9KTtcbnZhciBXRUJNX0ZJTEVfTElTVCA9IFtcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Mi5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0My5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NC5ta3ZcIiwgdGhpcyBmaWxlIGlzIGJyb2tlbiBzbyBub3QgcGFzcyBlbmNvZGVyX2RlY29kZXJfdGVzdCBcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ni5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ny5ta3ZcIiwgdGhpcyBmaWxlIGhhcyB1bmtub3duIHRhZyBzbyBjYW5ub3Qgd3JpdGUgZmlsZVxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q4Lm1rdlwiLFxuXTtcblFVbml0Lm1vZHVsZShcInRzLUVCTUxcIik7XG5RVW5pdC50ZXN0KFwiZW5jb2Rlci1kZWNvZGVyXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGUsIHJlcywgYnVmLCBlbG1zLCBidWYyLCBlbG1zMiwgdGVzdHMsIF9pLCB0ZXN0c18xLCB0ZXN0O1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGZpbGUgPSBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBidWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgICAgICAgICAgYnVmMiA9IG5ldyBfMS5FbmNvZGVyKCkuZW5jb2RlKGVsbXMpO1xuICAgICAgICAgICAgICAgIGVsbXMyID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmMik7XG4gICAgICAgICAgICAgICAgdGVzdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDAsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkVCTUxcIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogNCwgdGVzdDogZnVuY3Rpb24gKGVsbSkgeyBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRUJNTFwiICYmIGVsbS50eXBlID09PSBcIm1cIiAmJiBlbG0uaXNFbmQgPT09IHRydWUpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDUsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIlNlZ21lbnRcIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjQsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkluZm9cIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgZWxtLmlzRW5kID09PSBmYWxzZSk7IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpbmRleDogMjUsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHsgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkR1cmF0aW9uXCIgJiYgZWxtLnR5cGUgPT09IFwiZlwiICYmIGVsbS52YWx1ZSA9PT0gODczMzYpOyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaW5kZXg6IDI2LCB0ZXN0OiBmdW5jdGlvbiAoZWxtKSB7IGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJNdXhpbmdBcHBcIiAmJiBlbG0udHlwZSA9PT0gXCI4XCIgJiYgZWxtLnZhbHVlID09PSBcImxpYmVibWwyIHYwLjEwLjAgKyBsaWJtYXRyb3NrYTIgdjAuMTAuMVwiKTsgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMjgsIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRGF0ZVVUQ1wiICYmIGVsbS50eXBlID09PSBcImRcIiAmJiBlbG0udmFsdWUgaW5zdGFuY2VvZiBEYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnR5cGUgPT09IFwiZFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8yLnRvb2xzLmNvbnZlcnRFQk1MRGF0ZVRvSlNEYXRlKGVsbS52YWx1ZSkuZ2V0VGltZSgpID09PSBuZXcgRGF0ZShcIjIwMTAtMDgtMjFUMDc6MjM6MDMuMDAwWlwiKS5nZXRUaW1lKCkpOyAvLyB0b0lTT1N0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMjksIHRlc3Q6IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiU2VnbWVudFVJRFwiICYmIGVsbS50eXBlID09PSBcImJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcImJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmXzEgPSBuZXcgVWludDhBcnJheShuZXcgQnVmZmVyKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4OTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAweDJkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgxOSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAweDBmLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgxZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MTMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAweGM1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMHhiNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAweDYzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMHgwYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4YWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAweGQ4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMHg1MyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MzZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVmMl8xID0gbmV3IFVpbnQ4QXJyYXkoZWxtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGJ1Zl8xLmV2ZXJ5KGZ1bmN0aW9uICh2YWwsIGkpIHsgcmV0dXJuIGJ1ZjJfMVtpXSA9PT0gdmFsOyB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgZm9yIChfaSA9IDAsIHRlc3RzXzEgPSB0ZXN0czsgX2kgPCB0ZXN0c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0ID0gdGVzdHNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgIHRlc3QudGVzdChlbG1zMlt0ZXN0LmluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH0pO1xuV0VCTV9GSUxFX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgIFFVbml0LnRlc3QoXCJlbmNvZGVyLWRlY29kZXI6XCIgKyBmaWxlLCBjcmVhdGVfZW5jb2Rlcl9kZWNvZGVyX3Rlc3QoZmlsZSkpO1xufSk7XG5mdW5jdGlvbiBjcmVhdGVfZW5jb2Rlcl9kZWNvZGVyX3Rlc3QoZmlsZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcywgYnVmLCBlbG1zLCBidWYyLCBlbG1zMiwgaSwgZWxtLCBlbG0yO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZjIgPSBuZXcgXzEuRW5jb2RlcigpLmVuY29kZShlbG1zKTtcbiAgICAgICAgICAgICAgICAgICAgZWxtczIgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYyKTtcbiAgICAgICAgICAgICAgICAgICAgLy9hc3NlcnQub2soYnVmLmJ5dGVMZW5ndGggPT09IGJ1ZjIuYnl0ZUxlbmd0aCwgXCJUaGlzIHByb2JsZW0gaXMgY2F1c2VkIGJ5IEpTIGJlaW5nIHVuYWJsZSB0byBoYW5kbGUgSW50NjQuXCIpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtcy5sZW5ndGggPT09IGVsbXMyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShpIDwgZWxtcy5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA2XTtcbiAgICAgICAgICAgICAgICAgICAgZWxtID0gZWxtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgZWxtMiA9IGVsbXMyW2ldO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IGVsbTIubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udHlwZSA9PT0gZWxtMi50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcIm1cIiB8fCBlbG0yLnR5cGUgPT09IFwibVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcImJcIiAmJiBlbG0yLnR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlLmxlbmd0aCA9PT0gZWxtMi52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUgPT09IGVsbTIudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBzbGVlcCgxKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufVxuUVVuaXQudGVzdChcImhhbmR3cml0ZS1lbmNvZGVyXCIsIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRhZ1N0cmVhbSwgYmluYXJpemVkLCBidWYsIGVsbXM7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB0YWdTdHJlYW0gPSBbXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAxIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFJlYWRWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkVCTUxNYXhJRExlbmd0aFwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJFQk1MTWF4U2l6ZUxlbmd0aFwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDggfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEb2NUeXBlXCIsIHR5cGU6IFwic1wiLCB2YWx1ZTogXCJ3ZWJtXCIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEb2NUeXBlVmVyc2lvblwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEb2NUeXBlUmVhZFZlcnNpb25cIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAyIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiRUJNTFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTZWdtZW50XCIsIHR5cGU6IFwibVwiLCB1bmtub3duU2l6ZTogdHJ1ZSwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiU2Vla0hlYWRcIiwgdHlwZTogXCJtXCIsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlNlZWtIZWFkXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkluZm9cIiwgdHlwZTogXCJtXCIsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIlRpbWVjb2RlU2NhbGVcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiAxMDAwMDAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwiSW5mb1wiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJEdXJhdGlvblwiLCB0eXBlOiBcImZcIiwgdmFsdWU6IDAuMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiBcIkNsdXN0ZXJcIiwgdHlwZTogXCJtXCIsIHVua25vd25TaXplOiB0cnVlLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJUaW1lY29kZVwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogXCJTaW1wbGVCbG9ja1wiLCB0eXBlOiBcImJcIiwgdmFsdWU6IG5ldyBCdWZmZXIoMTAyNCkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgYmluYXJpemVkID0gdGFnU3RyZWFtLm1hcChfMi50b29scy5lbmNvZGVWYWx1ZVRvQnVmZmVyKTtcbiAgICAgICAgYnVmID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoYmluYXJpemVkKTtcbiAgICAgICAgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKGJ1Zik7XG4gICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtLCBpKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luID0gdGFnU3RyZWFtW2ldO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBvcmlnaW4ubmFtZSwgXCJjb21wYXJlIHRhZyBuYW1lXCIpO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS50eXBlID09PSBvcmlnaW4udHlwZSwgXCJjb21wYXJlIHRhZyB0eXBlXCIpO1xuICAgICAgICAgICAgaWYgKGVsbS50eXBlID09PSBcIm1cIiB8fCBvcmlnaW4udHlwZSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiICYmIG9yaWdpbi50eXBlID09PSBcImJcIikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUubGVuZ3RoID09PSBvcmlnaW4udmFsdWUubGVuZ3RoLCBcImNvbXBhcmUgdGFnIHZhbHVlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUgPT09IG9yaWdpbi52YWx1ZSwgXCJjb21wYXJlIHRhZyB2YWx1ZVwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICB9KTtcbn0pOyB9KTtcblFVbml0Lm1vZHVsZShcIlJlYWRlclwiKTtcbnZhciBNRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVCA9IFtcbiAgICBcIi4vY2hyb21lNTcud2VibVwiLFxuICAgIC8vIGxhc3QydGltZWNvZGUodmlkZW8sIGF1ZGlvKTogKCg3LjQ5M3MsIDcuNTUycyksICg3LjQ5M3MsIDcuNTUycykpXG4gICAgLy8gQ2hyb21lNTc6IDcuNjEycyB+PSA3LjYxMXMgPSA3LjU1MnMgKyAoNy41NTJzIC0gNy40OTNzKSAvLyA/Pz9cbiAgICAvLyBGaXJlZm94NTM6IDcuNTUycyA9IDcuNTUycyArICg3LjU1MnMgLSA3LjU1MnMpIC8vIHNoaXQhXG4gICAgLy8gUmVhZGVyOiA3LjYxMXMgPSA3LjU1MnMgKyAoNy41NTJzIC0gNy40OTNzKVxuICAgIFwiLi9maXJlZm94NTVuaWdodGx5LndlYm1cIixcbiAgICAvLyBsYXN0MnRpbWVjb2RlKHZpZGVvLCBhdWRpbyk6ICgoOC41NjdzLCA4LjU5MHMpLCAoOC42MjZzLCA4LjY0NnMpKSwgQ29kZWNEZWxheShhdWRpbyk6IDYuNTAwbXNcbiAgICAvLyBDaHJvbWU1NzogOC42NTlzIH49IDguNjU5NXMgPSA4LjY0NnMgKyAoOC42NDZzIC0gOC42MjZzKSAtIDYuNTAwbXNcbiAgICAvLyBGaXJlZm94NTM6IDguNjY2cyA9IDguNjQ2cyArICg4LjY0NnMgLSA4LjYyNnMpXG4gICAgLy8gUmVhZGVyOiA4LjY1OTVzID0gOC42NDZzICsgKDguNjQ2cyAtIDguNjI2cykgLSA2LjUwMG1zXG4gICAgXCIuL2ZpcmVmb3g1My53ZWJtXCIsXG5dO1xuTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgIFFVbml0LnRlc3QoXCJjcmVhdGVfd2VicF90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX3dlYnBfdGVzdChmaWxlKSk7XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZV93ZWJwX3Rlc3QoZmlsZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhc3NlcnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcywgd2VibV9idWYsIGVsbXMsIFdlYlBzLCBfaSwgV2ViUHNfMSwgV2ViUCwgc3JjLCBpbWcsIGVycl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChmaWxlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcy5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHdlYm1fYnVmID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUod2VibV9idWYpO1xuICAgICAgICAgICAgICAgICAgICBXZWJQcyA9IF8yLnRvb2xzLldlYlBGcmFtZUZpbHRlcihlbG1zKTtcbiAgICAgICAgICAgICAgICAgICAgX2kgPSAwLCBXZWJQc18xID0gV2ViUHM7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKF9pIDwgV2ViUHNfMS5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgV2ViUCA9IFdlYlBzXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICBzcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKFdlYlApO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzQsIDYsICwgN10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaEltYWdlKHNyYyldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgaW1nID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soaW1nLndpZHRoID4gMCAmJiBpbWcuaGVpZ2h0ID4gMCwgXCJzaXplOlwiICsgaW1nLndpZHRoICsgXCJ4XCIgKyBpbWcuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdE9rKGVycl8xLCBcIndlYnAgbG9hZCBmYWlscmVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzcmMpO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDg7XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICBfaSsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH07XG59XG5NRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgUVVuaXQudGVzdChcImNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3Q6XCIgKyBmaWxlLCBjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX2NvbnZlcnRfdG9fc2Vla2FibGVfdGVzdChmaWxlKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFzc2VydCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVjb2RlciwgcmVhZGVyLCByZXMsIHdlYm1fYnVmLCBlbG1zLCBzZWMsIHJlZmluZWRNZXRhZGF0YUJ1ZiwgYm9keSwgcmF3X3dlYk0sIHJlZmluZWRXZWJNLCByYXdfdmlkZW9fMSwgcmVmaW5lZF92aWRlbywgd2FpdCwgZXJyXzIsIHJlZmluZWRCdWYsIHJlZmluZWRFbG1zLCBfcmVhZGVyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZXIgPSBuZXcgXzEuRGVjb2RlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgXzEuUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VibV9idWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcImFuYWxhc2lzIHVuc2Vla2FibGUgb3JpZ2luYWwgZWJtbCB0cmVlXCIpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zID0gZGVjb2Rlci5kZWNvZGUod2VibV9idWYpO1xuICAgICAgICAgICAgICAgICAgICBlbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSkgeyByZWFkZXIucmVhZChlbG0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiY29udmVydCB0byBzZWVrYWJsZSBmaWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2socmVhZGVyLm1ldGFkYXRhc1swXS5uYW1lID09PSBcIkVCTUxcIik7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhyZWFkZXIubWV0YWRhdGFzLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgICAgICBzZWMgPSByZWFkZXIuZHVyYXRpb24gKiByZWFkZXIudGltZWNvZGVTY2FsZSAvIDEwMDAgLyAxMDAwIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKDcgPCBzZWMgJiYgc2VjIDwgMTEpO1xuICAgICAgICAgICAgICAgICAgICByZWZpbmVkTWV0YWRhdGFCdWYgPSBfMi50b29scy5tYWtlTWV0YWRhdGFTZWVrYWJsZShyZWFkZXIubWV0YWRhdGFzLCByZWFkZXIuZHVyYXRpb24sIHJlYWRlci5jdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IHdlYm1fYnVmLnNsaWNlKHJlYWRlci5tZXRhZGF0YVNpemUpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2socmVmaW5lZE1ldGFkYXRhQnVmLmJ5dGVMZW5ndGggLSByZWFkZXIubWV0YWRhdGFTaXplID4gMCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayh3ZWJtX2J1Zi5ieXRlTGVuZ3RoID09PSAocmVhZGVyLm1ldGFkYXRhU2l6ZSArIGJvZHkuYnl0ZUxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXCJjaGVjayBkdXJhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmF3X3dlYk0gPSBuZXcgQmxvYihbd2VibV9idWZdLCB7IHR5cGU6IFwidmlkZW8vd2VibVwiIH0pO1xuICAgICAgICAgICAgICAgICAgICByZWZpbmVkV2ViTSA9IG5ldyBCbG9iKFtyZWZpbmVkTWV0YWRhdGFCdWYsIGJvZHldLCB7IHR5cGU6IFwidmlkZW8vd2VibVwiIH0pO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzMsIDgsICwgOV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaFZpZGVvKFVSTC5jcmVhdGVPYmplY3RVUkwocmF3X3dlYk0pKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICByYXdfdmlkZW9fMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hWaWRlbyhVUkwuY3JlYXRlT2JqZWN0VVJMKHJlZmluZWRXZWJNKSldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZF92aWRlbyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEvRmlyZWZveC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKCFOdW1iZXIuaXNGaW5pdGUocmF3X3ZpZGVvXzEuZHVyYXRpb24pLCBcIm1lZGlhIHJlY29yZGVyIHdlYm0gZHVyYXRpb24gaXMgbm90IGZpbml0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soTnVtYmVyLmlzRmluaXRlKHJlZmluZWRfdmlkZW8uZHVyYXRpb24pLCBcInJlZmluZWQgd2VibSBkdXJhdGlvbiBpcyBmaW5pdGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHNsZWVwKDEwMCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB3YWl0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyByYXdfdmlkZW9fMS5vbnNlZWtlZCA9IHJlc29sdmU7IHJhd192aWRlb18xLm9uZXJyb3IgPSByZWplY3Q7IH0pO1xuICAgICAgICAgICAgICAgICAgICByYXdfdmlkZW9fMS5jdXJyZW50VGltZSA9IDcgKiAyNCAqIDYwICogNjA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHdhaXRdO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkdXJhdGlvbiBzZWMgaXMgZGlmZmVyZW50IGVhY2ggYnJvd3NlcnNcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE1hdGguYWJzKHJhd192aWRlb18xLmR1cmF0aW9uIC0gcmVmaW5lZF92aWRlby5kdXJhdGlvbikgPCAwLjEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgIGVycl8yID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQubm90T2soZXJyXzIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVhZGVyLmxvZ2dpbmcpIHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGRlYnVnXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcInB1dCBzZWVrYWJsZSBlYm1sIHRyZWVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlYWRBc0FycmF5QnVmZmVyKHJlZmluZWRXZWJNKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZEJ1ZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmaW5lZEVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShyZWZpbmVkQnVmKTtcbiAgICAgICAgICAgICAgICAgICAgX3JlYWRlcl8xID0gbmV3IF8xLlJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBfcmVhZGVyXzEubG9nZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlZmluZWRFbG1zLmZvckVhY2goZnVuY3Rpb24gKGVsbSkgeyByZXR1cm4gX3JlYWRlcl8xLnJlYWQoZWxtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIF9yZWFkZXJfMS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTE7XG4gICAgICAgICAgICAgICAgY2FzZSAxMTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfTtcbn1cbk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNULmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICBRVW5pdC50ZXN0KFwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0KGZpbGUpKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0KGZpbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXNzZXJ0KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWNvZGVyLCByZWFkZXIsIGxhc3Rfc2VjLCBtZXRhZGF0YV9sb2FkZWQsIGNsdXN0ZXJfbnVtLCBsYXN0X3RpbWVjb2RlLCByZXMsIHdlYm1fYnVmLCBlbG1zO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBkZWNvZGVyID0gbmV3IF8xLkRlY29kZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gbmV3IF8xLlJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0X3NlYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcImR1cmF0aW9uXCIsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVjb2RlU2NhbGUgPSBfYS50aW1lY29kZVNjYWxlLCBkdXJhdGlvbiA9IF9hLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYyA9IGR1cmF0aW9uICogdGltZWNvZGVTY2FsZSAvIDEwMDAgLyAxMDAwIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhOdW1iZXIuaXNGaW5pdGUoc2VjKSwgXCJkdXJhdGlvbjpcIiArIHNlYyArIFwic2VjXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKHNlYyA+IGxhc3Rfc2VjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3Rfc2VjID0gc2VjO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGFfbG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcIm1ldGFkYXRhXCIsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGFkYXRhU2l6ZSA9IF9hLm1ldGFkYXRhU2l6ZSwgZGF0YSA9IF9hLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobWV0YWRhdGFTaXplID4gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2soZGF0YS5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhkYXRhWzBdLm5hbWUgPT09IFwiRUJNTFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhX2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyX251bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RfdGltZWNvZGUgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiY2x1c3RlclwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsdXN0ZXIgY2h1bmsgdGVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBldi5kYXRhLCB0aW1lY29kZSA9IGV2LnRpbWVjb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKE51bWJlci5pc0Zpbml0ZSh0aW1lY29kZSksIFwiY2x1c3Rlci50aW1lY29kZTpcIiArIHRpbWVjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhkYXRhLmxlbmd0aCA+IDAsIFwiY2x1c3Rlci5sZW5ndGg6XCIgKyBkYXRhLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzZXJ0aW9uID0gZGF0YS5ldmVyeShmdW5jdGlvbiAoZWxtKSB7IHJldHVybiBlbG0ubmFtZSA9PT0gXCJDbHVzdGVyXCIgfHwgZWxtLm5hbWUgPT09IFwiVGltZWNvZGVcIiB8fCBlbG0ubmFtZSA9PT0gXCJTaW1wbGVCbG9ja1wiOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhhc3NlcnRpb24sIFwiZWxlbWVudCBjaGVja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayh0aW1lY29kZSA+IGxhc3RfdGltZWNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3Rlcl9udW0gKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfdGltZWNvZGUgPSB0aW1lY29kZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGZpbGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VibV9idWYgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMgPSBkZWNvZGVyLmRlY29kZSh3ZWJtX2J1Zik7XG4gICAgICAgICAgICAgICAgICAgIGVsbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7IHJlYWRlci5yZWFkKGVsbSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobGFzdF9zZWMgPiAwKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKG1ldGFkYXRhX2xvYWRlZCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhjbHVzdGVyX251bSA+IDApO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQub2sobGFzdF90aW1lY29kZSA+IDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pOyB9O1xufVxuZnVuY3Rpb24gc2xlZXAobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpOyB9KTtcbn1cbmZ1bmN0aW9uIGZldGNoVmlkZW8oc3JjKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuICAgICAgICB2aWRlby5zcmMgPSBzcmM7XG4gICAgICAgIHZpZGVvLmNvbnRyb2xzID0gdHJ1ZTtcbiAgICAgICAgdmlkZW8ub25sb2FkZWRkYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmlkZW8ub25sb2FkZWRkYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHJlc29sdmUodmlkZW8pO1xuICAgICAgICB9O1xuICAgICAgICB2aWRlby5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgdmlkZW8ub25lcnJvciA9IG51bGw7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZldGNoSW1hZ2Uoc3JjKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkgeyByZXNvbHZlKGltZyk7IH07XG4gICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKGVycikgeyByZWplY3QoZXJyKTsgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlYWRBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkgeyByZXNvbHZlKHJlYWRlci5yZXN1bHQpOyB9O1xuICAgICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uIChldikgeyByZWplY3QoZXYpOyB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gd2FpdEV2ZW50KHRhcmdldCwgZXYsIGVycikge1xuICAgIGlmIChlcnIgPT09IHZvaWQgMCkgeyBlcnIgPSBcImVycm9yXCI7IH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldiwgc3VjYyk7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGVyciwgZmFpbCk7XG4gICAgICAgIGZ1bmN0aW9uIHN1Y2MoZXYpIHsgY2xlYW4oKTsgcmVzb2x2ZShldik7IH1cbiAgICAgICAgZnVuY3Rpb24gZmFpbChldikgeyBjbGVhbigpOyByZWplY3QoZXYpOyB9XG4gICAgICAgIGZ1bmN0aW9uIGNsZWFuKCkge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXYsIHN1Y2MpO1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXJyLCBmYWlsKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIl19

