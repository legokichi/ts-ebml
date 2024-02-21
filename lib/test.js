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
Object.defineProperty(exports, '__esModule', { value: true });
const _1 = require('./');
const QUnit = require('qunit');
const empower = require('empower');
const formatter = require('power-assert-formatter');
const qunitTap = require('qunit-tap');
QUnit.config.autostart = true;
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function qunitTapCallback() {
    console.log.apply(console, arguments);
}, { showSourceOnFailure: false });
const WEBM_FILE_LIST = [
    '../matroska-test-files/test_files/test1.mkv',
    '../matroska-test-files/test_files/test2.mkv',
    '../matroska-test-files/test_files/test3.mkv',
    '../matroska-test-files/test_files/test5.mkv',
    '../matroska-test-files/test_files/test6.mkv',
    '../matroska-test-files/test_files/test8.mkv',
    './chrome52.webm',
    './chrome59.webm',
    './chrome57.webm'
];
QUnit.module('ts-EBML');
QUnit.test('encoder-decoder', async assert => {
    const file = '../matroska-test-files/test_files/test1.mkv';
    const res = await fetch(file);
    const buf = await res.arrayBuffer();
    const elms = new _1.Decoder().decode(buf);
    const buf2 = new _1.Encoder().encode(elms);
    const elms2 = new _1.Decoder().decode(buf2);
    const tests = [
        {
            index: 0,
            test: elm => {
                var _rec1 = new _PowerAssertRecorder1();
                assert.ok(_rec1._expr(_rec1._capt(_rec1._capt(_rec1._capt(_rec1._capt(_rec1._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'EBML', 'arguments/0/left/left') && _rec1._capt(_rec1._capt(_rec1._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec1._capt(!_rec1._capt(_rec1._capt(elm, 'arguments/0/right/argument/object').isEnd, 'arguments/0/right/argument'), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "EBML" && elm.type === "m" && !elm.isEnd)',
                    filepath: 'lib/test.js',
                    line: 41
                }));
            }
        },
        {
            index: 4,
            test: elm => {
                var _rec2 = new _PowerAssertRecorder1();
                assert.ok(_rec2._expr(_rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'EBML', 'arguments/0/left/left') && _rec2._capt(_rec2._capt(_rec2._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec2._capt(_rec2._capt(elm, 'arguments/0/right/object').isEnd, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "EBML" && elm.type === "m" && elm.isEnd)',
                    filepath: 'lib/test.js',
                    line: 47
                }));
            }
        },
        {
            index: 5,
            test: elm => {
                var _rec3 = new _PowerAssertRecorder1();
                assert.ok(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'Segment', 'arguments/0/left/left') && _rec3._capt(_rec3._capt(_rec3._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec3._capt(!_rec3._capt(_rec3._capt(elm, 'arguments/0/right/argument/object').isEnd, 'arguments/0/right/argument'), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "Segment" && elm.type === "m" && !elm.isEnd)',
                    filepath: 'lib/test.js',
                    line: 53
                }));
            }
        },
        {
            index: 24,
            test: elm => {
                var _rec4 = new _PowerAssertRecorder1();
                assert.ok(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'Info', 'arguments/0/left/left') && _rec4._capt(_rec4._capt(_rec4._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'm', 'arguments/0/left/right'), 'arguments/0/left') && _rec4._capt(!_rec4._capt(_rec4._capt(elm, 'arguments/0/right/argument/object').isEnd, 'arguments/0/right/argument'), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "Info" && elm.type === "m" && !elm.isEnd)',
                    filepath: 'lib/test.js',
                    line: 59
                }));
            }
        },
        {
            index: 25,
            test: elm => {
                var _rec5 = new _PowerAssertRecorder1();
                assert.ok(_rec5._expr(_rec5._capt(_rec5._capt(_rec5._capt(_rec5._capt(_rec5._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'Duration', 'arguments/0/left/left') && _rec5._capt(_rec5._capt(_rec5._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'f', 'arguments/0/left/right'), 'arguments/0/left') && _rec5._capt(_rec5._capt(_rec5._capt(elm, 'arguments/0/right/left/object').value, 'arguments/0/right/left') === 87336, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "Duration" && elm.type === "f" && elm.value === 87336)',
                    filepath: 'lib/test.js',
                    line: 65
                }));
            }
        },
        {
            index: 26,
            test: elm => {
                var _rec6 = new _PowerAssertRecorder1();
                assert.ok(_rec6._expr(_rec6._capt(_rec6._capt(_rec6._capt(_rec6._capt(_rec6._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'MuxingApp', 'arguments/0/left/left') && _rec6._capt(_rec6._capt(_rec6._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === '8', 'arguments/0/left/right'), 'arguments/0/left') && _rec6._capt(_rec6._capt(_rec6._capt(elm, 'arguments/0/right/left/object').value, 'arguments/0/right/left') === 'libebml2 v0.10.0 + libmatroska2 v0.10.1', 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "MuxingApp" && elm.type === "8" && elm.value === "libebml2 v0.10.0 + libmatroska2 v0.10.1")',
                    filepath: 'lib/test.js',
                    line: 71
                }));
            }
        },
        {
            index: 28,
            test: elm => {
                var _rec7 = new _PowerAssertRecorder1();
                var _rec8 = new _PowerAssertRecorder1();
                assert.ok(_rec7._expr(_rec7._capt(_rec7._capt(_rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/left/left/left/object').name, 'arguments/0/left/left/left') === 'DateUTC', 'arguments/0/left/left') && _rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/left/right/left/object').type, 'arguments/0/left/right/left') === 'd', 'arguments/0/left/right'), 'arguments/0/left') && _rec7._capt(_rec7._capt(_rec7._capt(elm, 'arguments/0/right/left/object').value, 'arguments/0/right/left') instanceof _rec7._capt(Date, 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "DateUTC" && elm.type === "d" && elm.value instanceof Date)',
                    filepath: 'lib/test.js',
                    line: 79
                }));
                assert.ok(_rec8._expr(_rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(elm, 'arguments/0/left/left/object').type, 'arguments/0/left/left') === 'd', 'arguments/0/left') && _rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(_rec8._capt(_1, 'arguments/0/right/left/callee/object/callee/object/object').tools, 'arguments/0/right/left/callee/object/callee/object').convertEBMLDateToJSDate(_rec8._capt(_rec8._capt(elm, 'arguments/0/right/left/callee/object/arguments/0/object').value, 'arguments/0/right/left/callee/object/arguments/0')), 'arguments/0/right/left/callee/object').getTime(), 'arguments/0/right/left') === _rec8._capt(_rec8._capt(new Date('2010-08-21T07:23:03.000Z'), 'arguments/0/right/right/callee/object').getTime(), 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.type === "d" && _1.tools.convertEBMLDateToJSDate(elm.value).getTime() === new Date("2010-08-21T07:23:03.000Z").getTime())',
                    filepath: 'lib/test.js',
                    line: 83
                }));
            }
        },
        {
            index: 29,
            test: elm => {
                var _rec9 = new _PowerAssertRecorder1();
                var _rec10 = new _PowerAssertRecorder1();
                assert.ok(_rec9._expr(_rec9._capt(_rec9._capt(_rec9._capt(_rec9._capt(elm, 'arguments/0/left/left/object').name, 'arguments/0/left/left') === 'SegmentUUID', 'arguments/0/left') && _rec9._capt(_rec9._capt(_rec9._capt(elm, 'arguments/0/right/left/object').type, 'arguments/0/right/left') === 'b', 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.name === "SegmentUUID" && elm.type === "b")',
                    filepath: 'lib/test.js',
                    line: 91
                }));
                if (elm.type === 'b') {
                    const buf = new Uint8Array(Buffer.from([
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
                    const buf2 = new Uint8Array(elm.value);
                    assert.ok(_rec10._expr(_rec10._capt(_rec10._capt(buf, 'arguments/0/callee/object').every((val, i) => buf2[i] === val), 'arguments/0'), {
                        content: 'assert.ok(buf.every((val, i) => buf2[i] === val))',
                        filepath: 'lib/test.js',
                        line: 98
                    }));
                }
            }
        }
    ];
    for (const test of tests) {
        test.test(elms2[test.index]);
    }
});
for (const file of WEBM_FILE_LIST) {
    QUnit.test('encoder-decoder:' + file, create_encoder_decoder_test(file));
}
function create_encoder_decoder_test(file) {
    return async assert => {
        var _rec11 = new _PowerAssertRecorder1();
        var _rec12 = new _PowerAssertRecorder1();
        var _rec13 = new _PowerAssertRecorder1();
        var _rec14 = new _PowerAssertRecorder1();
        var _rec15 = new _PowerAssertRecorder1();
        const res = await fetch(file);
        const buf = await res.arrayBuffer();
        const elms = new _1.Decoder().decode(buf);
        const buf2 = new _1.Encoder().encode(elms);
        const elms2 = new _1.Decoder().decode(buf2);
        assert.ok(_rec11._expr(_rec11._capt(_rec11._capt(_rec11._capt(elms, 'arguments/0/left/object').length, 'arguments/0/left') === _rec11._capt(_rec11._capt(elms2, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(elms.length === elms2.length)',
            filepath: 'lib/test.js',
            line: 118,
            async: true
        }));
        for (let i = 0; i < elms.length; i++) {
            const elm = elms[i];
            const elm2 = elms2[i];
            assert.ok(_rec12._expr(_rec12._capt(_rec12._capt(_rec12._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec12._capt(_rec12._capt(elm2, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert.ok(elm.name === elm2.name)',
                filepath: 'lib/test.js',
                line: 122,
                async: true
            }));
            assert.ok(_rec13._expr(_rec13._capt(_rec13._capt(_rec13._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec13._capt(_rec13._capt(elm2, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert.ok(elm.type === elm2.type)',
                filepath: 'lib/test.js',
                line: 123,
                async: true
            }));
            if (elm.type === 'm' || elm2.type === 'm') {
                return;
            }
            if (elm.type === 'b' && elm2.type === 'b') {
                assert.ok(_rec14._expr(_rec14._capt(_rec14._capt(_rec14._capt(_rec14._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec14._capt(_rec14._capt(_rec14._capt(elm2, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(elm.value.length === elm2.value.length)',
                    filepath: 'lib/test.js',
                    line: 128,
                    async: true
                }));
                return;
            }
            assert.ok(_rec15._expr(_rec15._capt(_rec15._capt(_rec15._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec15._capt(_rec15._capt(elm2, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert.ok(elm.value === elm2.value)',
                filepath: 'lib/test.js',
                line: 131,
                async: true
            }));
            await sleep(1);
        }
    };
}
QUnit.test('handwrite-encoder', assert => {
    var _rec16 = new _PowerAssertRecorder1();
    var _rec17 = new _PowerAssertRecorder1();
    var _rec18 = new _PowerAssertRecorder1();
    var _rec19 = new _PowerAssertRecorder1();
    const tagStream = [
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
            value: Buffer.alloc(1024)
        }
    ];
    const binarized = tagStream.map(o => _1.tools.encodeValueToBuffer(o));
    const buf = new _1.Encoder().encode(binarized);
    const elms = new _1.Decoder().decode(buf);
    for (const [i, elm] of elms.entries()) {
        const origin = tagStream[i];
        assert.ok(_rec16._expr(_rec16._capt(_rec16._capt(_rec16._capt(elm, 'arguments/0/left/object').name, 'arguments/0/left') === _rec16._capt(_rec16._capt(origin, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(elm.name === origin.name, "compare tag name")',
            filepath: 'lib/test.js',
            line: 167
        }), 'compare tag name');
        assert.ok(_rec17._expr(_rec17._capt(_rec17._capt(_rec17._capt(elm, 'arguments/0/left/object').type, 'arguments/0/left') === _rec17._capt(_rec17._capt(origin, 'arguments/0/right/object').type, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(elm.type === origin.type, "compare tag type")',
            filepath: 'lib/test.js',
            line: 168
        }), 'compare tag type');
        if (elm.type === 'm' || origin.type === 'm') {
            return;
        }
        if (elm.type === 'b' && origin.type === 'b') {
            assert.ok(_rec18._expr(_rec18._capt(_rec18._capt(_rec18._capt(_rec18._capt(elm, 'arguments/0/left/object/object').value, 'arguments/0/left/object').length, 'arguments/0/left') === _rec18._capt(_rec18._capt(_rec18._capt(origin, 'arguments/0/right/object/object').value, 'arguments/0/right/object').length, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert.ok(elm.value.length === origin.value.length, "compare tag value")',
                filepath: 'lib/test.js',
                line: 173
            }), 'compare tag value');
            return;
        }
        assert.ok(_rec19._expr(_rec19._capt(_rec19._capt(_rec19._capt(elm, 'arguments/0/left/object').value, 'arguments/0/left') === _rec19._capt(_rec19._capt(origin, 'arguments/0/right/object').value, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(elm.value === origin.value, "compare tag value")',
            filepath: 'lib/test.js',
            line: 176
        }), 'compare tag value');
    }
});
QUnit.module('Reader');
const MEDIA_RECORDER_WEBM_FILE_LIST = [
    [
        './chrome52.webm',
        50
    ],
    [
        './chrome59.webm',
        60
    ],
    [
        './chrome57.webm',
        7
    ],
    [
        './firefox55nightly.webm',
        8
    ],
    [
        './firefox53.webm',
        10
    ]
];
for (const [file, _expectDur] of MEDIA_RECORDER_WEBM_FILE_LIST) {
    QUnit.test('create_webp_test:' + file, create_webp_test(file));
}
function create_webp_test(file) {
    return async assert => {
        var _rec20 = new _PowerAssertRecorder1();
        const res = await fetch(file);
        const webm_buf = await res.arrayBuffer();
        const elms = new _1.Decoder().decode(webm_buf);
        const WebPs = _1.tools.WebPFrameFilter(elms);
        for (const WebP of WebPs) {
            const src = URL.createObjectURL(WebP);
            try {
                const img = await fetchImage(src);
                assert.ok(_rec20._expr(_rec20._capt(_rec20._capt(_rec20._capt(_rec20._capt(img, 'arguments/0/left/left/object').width, 'arguments/0/left/left') > 0, 'arguments/0/left') && _rec20._capt(_rec20._capt(_rec20._capt(img, 'arguments/0/right/left/object').height, 'arguments/0/right/left') > 0, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert.ok(img.width > 0 && img.height > 0, "size:" + img.width + "x" + img.height)',
                    filepath: 'lib/test.js',
                    line: 213,
                    async: true
                }), 'size:' + img.width + 'x' + img.height);
            } catch (err) {
                assert.notOk(err, 'webp load failre');
            }
            URL.revokeObjectURL(src);
        }
    };
}
for (const [file, expectDur] of MEDIA_RECORDER_WEBM_FILE_LIST) {
    QUnit.test('create_convert_to_seekable_test:' + file, create_convert_to_seekable_test(file, expectDur));
}
function create_convert_to_seekable_test(file, expectDur) {
    return async assert => {
        var _rec21 = new _PowerAssertRecorder1();
        var _rec22 = new _PowerAssertRecorder1();
        var _rec23 = new _PowerAssertRecorder1();
        var _rec24 = new _PowerAssertRecorder1();
        var _rec25 = new _PowerAssertRecorder1();
        var _rec26 = new _PowerAssertRecorder1();
        var _rec27 = new _PowerAssertRecorder1();
        var _rec28 = new _PowerAssertRecorder1();
        const decoder = new _1.Decoder();
        const reader = new _1.Reader();
        const res = await fetch(file);
        const webm_buf = await res.arrayBuffer();
        console.info('analasis unseekable original ebml tree');
        const elms = decoder.decode(webm_buf);
        for (const elm of elms) {
            reader.read(elm);
        }
        reader.stop();
        console.info('convert to seekable file');
        assert.ok(_rec21._expr(_rec21._capt(_rec21._capt(_rec21._capt(_rec21._capt(_rec21._capt(reader, 'arguments/0/left/object/object/object').metadatas, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
            content: 'assert.ok(reader.metadatas[0].name === "EBML")',
            filepath: 'lib/test.js',
            line: 239,
            async: true
        }));
        assert.ok(_rec22._expr(_rec22._capt(_rec22._capt(_rec22._capt(_rec22._capt(reader, 'arguments/0/left/object/object').metadatas, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
            content: 'assert.ok(reader.metadatas.length > 0)',
            filepath: 'lib/test.js',
            line: 240,
            async: true
        }));
        const sec = reader.duration * reader.timestampScale / 1000 / 1000 / 1000;
        assert.ok(_rec23._expr(_rec23._capt(_rec23._capt(_rec23._capt(_rec23._capt(expectDur, 'arguments/0/left/left/left') - 1, 'arguments/0/left/left') < _rec23._capt(sec, 'arguments/0/left/right'), 'arguments/0/left') && _rec23._capt(_rec23._capt(sec, 'arguments/0/right/left') < _rec23._capt(_rec23._capt(expectDur, 'arguments/0/right/right/left') + 1, 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(expectDur - 1 < sec && sec < expectDur + 1)',
            filepath: 'lib/test.js',
            line: 242,
            async: true
        }));
        const refinedMetadataBuf = _1.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
        const body = webm_buf.slice(reader.metadataSize);
        assert.ok(_rec24._expr(_rec24._capt(_rec24._capt(_rec24._capt(_rec24._capt(refinedMetadataBuf, 'arguments/0/left/left/object').byteLength, 'arguments/0/left/left') - _rec24._capt(_rec24._capt(reader, 'arguments/0/left/right/object').metadataSize, 'arguments/0/left/right'), 'arguments/0/left') > 0, 'arguments/0'), {
            content: 'assert.ok(refinedMetadataBuf.byteLength - reader.metadataSize > 0)',
            filepath: 'lib/test.js',
            line: 245,
            async: true
        }));
        assert.ok(_rec25._expr(_rec25._capt(_rec25._capt(_rec25._capt(webm_buf, 'arguments/0/left/object').byteLength, 'arguments/0/left') === _rec25._capt(_rec25._capt(_rec25._capt(reader, 'arguments/0/right/left/object').metadataSize, 'arguments/0/right/left') + _rec25._capt(_rec25._capt(body, 'arguments/0/right/right/object').byteLength, 'arguments/0/right/right'), 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(webm_buf.byteLength === reader.metadataSize + body.byteLength)',
            filepath: 'lib/test.js',
            line: 246,
            async: true
        }));
        console.info('check duration');
        const raw_webM = new Blob([webm_buf], { type: 'video/webm' });
        const refinedWebM = new Blob([
            refinedMetadataBuf,
            body
        ], { type: 'video/webm' });
        try {
            const raw_video = await fetchVideo(URL.createObjectURL(raw_webM));
            const refined_video = await fetchVideo(URL.createObjectURL(refinedWebM));
            if (!navigator.userAgent.includes('Firefox')) {
                assert.ok(_rec26._expr(_rec26._capt(!_rec26._capt(_rec26._capt(Number, 'arguments/0/argument/callee/object').isFinite(_rec26._capt(_rec26._capt(raw_video, 'arguments/0/argument/arguments/0/object').duration, 'arguments/0/argument/arguments/0')), 'arguments/0/argument'), 'arguments/0'), {
                    content: 'assert.ok(!Number.isFinite(raw_video.duration), "media recorder webm duration is not finite")',
                    filepath: 'lib/test.js',
                    line: 256,
                    async: true
                }), 'media recorder webm duration is not finite');
            }
            assert.ok(_rec27._expr(_rec27._capt(_rec27._capt(Number, 'arguments/0/callee/object').isFinite(_rec27._capt(_rec27._capt(refined_video, 'arguments/0/arguments/0/object').duration, 'arguments/0/arguments/0')), 'arguments/0'), {
                content: 'assert.ok(Number.isFinite(refined_video.duration), "refined webm duration is finite")',
                filepath: 'lib/test.js',
                line: 258,
                async: true
            }), 'refined webm duration is finite');
            await sleep(100);
            const wait = new Promise((resolve, reject) => {
                raw_video.onseeked = resolve;
                raw_video.onerror = reject;
            });
            raw_video.currentTime = 7 * 24 * 60 * 60;
            await wait;
            assert.ok(_rec28._expr(_rec28._capt(_rec28._capt(_rec28._capt(Math, 'arguments/0/left/callee/object').abs(_rec28._capt(_rec28._capt(_rec28._capt(raw_video, 'arguments/0/left/arguments/0/left/object').duration, 'arguments/0/left/arguments/0/left') - _rec28._capt(_rec28._capt(refined_video, 'arguments/0/left/arguments/0/right/object').duration, 'arguments/0/left/arguments/0/right'), 'arguments/0/left/arguments/0')), 'arguments/0/left') < 0.25, 'arguments/0'), {
                content: 'assert.ok(Math.abs(raw_video.duration - refined_video.duration) < 0.25)',
                filepath: 'lib/test.js',
                line: 268,
                async: true
            }));
        } catch (err) {
            assert.notOk(err);
        }
        if (reader.logging) {
            console.info('put seekable ebml tree');
            const refinedBuf = await readAsArrayBuffer(refinedWebM);
            const refinedElms = new _1.Decoder().decode(refinedBuf);
            const _reader = new _1.Reader();
            _reader.logging = true;
            for (const elm of refinedElms) {
                _reader.read(elm);
            }
            _reader.stop();
        }
    };
}
for (const [file, _expectDur] of MEDIA_RECORDER_WEBM_FILE_LIST) {
    QUnit.test('create_recorder_helper_test:' + file, create_recorder_helper_test(file));
}
function create_recorder_helper_test(file) {
    return async assert => {
        var _rec38 = new _PowerAssertRecorder1();
        var _rec39 = new _PowerAssertRecorder1();
        var _rec40 = new _PowerAssertRecorder1();
        var _rec41 = new _PowerAssertRecorder1();
        const decoder = new _1.Decoder();
        const reader = new _1.Reader();
        let last_sec = 0;
        reader.addListener('duration', ({timestampScale, duration}) => {
            var _rec29 = new _PowerAssertRecorder1();
            var _rec30 = new _PowerAssertRecorder1();
            const sec = duration * timestampScale / 1000 / 1000 / 1000;
            assert.ok(_rec29._expr(_rec29._capt(_rec29._capt(Number, 'arguments/0/callee/object').isFinite(_rec29._capt(sec, 'arguments/0/arguments/0')), 'arguments/0'), {
                content: 'assert.ok(Number.isFinite(sec), "duration:" + sec + "sec")',
                filepath: 'lib/test.js',
                line: 297
            }), 'duration:' + sec + 'sec');
            assert.ok(_rec30._expr(_rec30._capt(_rec30._capt(sec, 'arguments/0/left') > _rec30._capt(last_sec, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert.ok(sec > last_sec)',
                filepath: 'lib/test.js',
                line: 298
            }));
            last_sec = sec;
        });
        let metadata_loaded = false;
        reader.addListener('metadata', ({metadataSize, data}) => {
            var _rec31 = new _PowerAssertRecorder1();
            var _rec32 = new _PowerAssertRecorder1();
            var _rec33 = new _PowerAssertRecorder1();
            assert.ok(_rec31._expr(_rec31._capt(_rec31._capt(metadataSize, 'arguments/0/left') > 0, 'arguments/0'), {
                content: 'assert.ok(metadataSize > 0)',
                filepath: 'lib/test.js',
                line: 303
            }));
            assert.ok(_rec32._expr(_rec32._capt(_rec32._capt(_rec32._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                content: 'assert.ok(data.length > 0)',
                filepath: 'lib/test.js',
                line: 304
            }));
            assert.ok(_rec33._expr(_rec33._capt(_rec33._capt(_rec33._capt(_rec33._capt(data, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'EBML', 'arguments/0'), {
                content: 'assert.ok(data[0].name === "EBML")',
                filepath: 'lib/test.js',
                line: 305
            }));
            metadata_loaded = true;
        });
        let cluster_num = 0;
        let last_timestamp = -1;
        reader.addListener('cluster', ev => {
            var _rec34 = new _PowerAssertRecorder1();
            var _rec35 = new _PowerAssertRecorder1();
            var _rec36 = new _PowerAssertRecorder1();
            var _rec37 = new _PowerAssertRecorder1();
            const {data, timestamp} = ev;
            assert.ok(_rec34._expr(_rec34._capt(_rec34._capt(Number, 'arguments/0/callee/object').isFinite(_rec34._capt(timestamp, 'arguments/0/arguments/0')), 'arguments/0'), {
                content: 'assert.ok(Number.isFinite(timestamp), "cluster.timestamp:" + timestamp)',
                filepath: 'lib/test.js',
                line: 313
            }), 'cluster.timestamp:' + timestamp);
            assert.ok(_rec35._expr(_rec35._capt(_rec35._capt(_rec35._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') > 0, 'arguments/0'), {
                content: 'assert.ok(data.length > 0, "cluster.length:" + data.length)',
                filepath: 'lib/test.js',
                line: 314
            }), 'cluster.length:' + data.length);
            const assertion = data.every(elm => elm.name === 'Cluster' || elm.name === 'Timestamp' || elm.name === 'SimpleBlock');
            assert.ok(_rec36._expr(_rec36._capt(assertion, 'arguments/0'), {
                content: 'assert.ok(assertion, "element check")',
                filepath: 'lib/test.js',
                line: 318
            }), 'element check');
            assert.ok(_rec37._expr(_rec37._capt(_rec37._capt(timestamp, 'arguments/0/left') > _rec37._capt(last_timestamp, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert.ok(timestamp > last_timestamp)',
                filepath: 'lib/test.js',
                line: 319
            }));
            cluster_num += 1;
            last_timestamp = timestamp;
        });
        const res = await fetch(file);
        const webm_buf = await res.arrayBuffer();
        const elms = decoder.decode(webm_buf);
        for (const elm of elms) {
            reader.read(elm);
        }
        reader.stop();
        assert.ok(_rec38._expr(_rec38._capt(_rec38._capt(last_sec, 'arguments/0/left') > 0, 'arguments/0'), {
            content: 'assert.ok(last_sec > 0)',
            filepath: 'lib/test.js',
            line: 330,
            async: true
        }));
        assert.ok(_rec39._expr(_rec39._capt(metadata_loaded, 'arguments/0'), {
            content: 'assert.ok(metadata_loaded)',
            filepath: 'lib/test.js',
            line: 331,
            async: true
        }));
        assert.ok(_rec40._expr(_rec40._capt(_rec40._capt(cluster_num, 'arguments/0/left') > 0, 'arguments/0'), {
            content: 'assert.ok(cluster_num > 0)',
            filepath: 'lib/test.js',
            line: 332,
            async: true
        }));
        assert.ok(_rec41._expr(_rec41._capt(_rec41._capt(last_timestamp, 'arguments/0/left') > 0, 'arguments/0'), {
            content: 'assert.ok(last_timestamp > 0)',
            filepath: 'lib/test.js',
            line: 333,
            async: true
        }));
    };
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function fetchVideo(src) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.onloadeddata = () => {
            video.onloadeddata = null;
            resolve(video);
        };
        video.onerror = err => {
            video.onerror = null;
            reject(typeof err === 'string' ? new Error(err) : err);
        };
    });
}
function fetchImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = err => {
            reject(typeof err === 'string' ? new Error(err) : err);
        };
    });
}
function readAsArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = ev => {
            reject(ev);
        };
    });
}
QUnit.on('runEnd', runEnd => {
    console.log('runEnd', runEnd);
    global.runEnd = runEnd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90ZXN0LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsIl8xIiwicmVxdWlyZSIsIlFVbml0IiwiZW1wb3dlciIsImZvcm1hdHRlciIsInF1bml0VGFwIiwiY29uZmlnIiwiYXV0b3N0YXJ0IiwiYXNzZXJ0IiwiZGVzdHJ1Y3RpdmUiLCJxdW5pdFRhcENhbGxiYWNrIiwiY29uc29sZSIsImxvZyIsImFwcGx5IiwiYXJndW1lbnRzIiwic2hvd1NvdXJjZU9uRmFpbHVyZSIsIldFQk1fRklMRV9MSVNUIiwibW9kdWxlIiwidGVzdCIsImZpbGUiLCJyZXMiLCJmZXRjaCIsImJ1ZiIsImFycmF5QnVmZmVyIiwiZWxtcyIsIkRlY29kZXIiLCJkZWNvZGUiLCJidWYyIiwiRW5jb2RlciIsImVuY29kZSIsImVsbXMyIiwidGVzdHMiLCJpbmRleCIsImVsbSIsIl9yZWMxIiwib2siLCJuYW1lIiwidHlwZSIsImlzRW5kIiwiY29udGVudCIsImZpbGVwYXRoIiwibGluZSIsIl9yZWMyIiwiX3JlYzMiLCJfcmVjNCIsIl9yZWM1IiwiX3JlYzYiLCJfcmVjNyIsIl9yZWM4IiwiRGF0ZSIsInRvb2xzIiwiY29udmVydEVCTUxEYXRlVG9KU0RhdGUiLCJnZXRUaW1lIiwiX3JlYzkiLCJfcmVjMTAiLCJVaW50OEFycmF5IiwiQnVmZmVyIiwiZnJvbSIsImV2ZXJ5IiwidmFsIiwiaSIsImNyZWF0ZV9lbmNvZGVyX2RlY29kZXJfdGVzdCIsIl9yZWMxMSIsIl9yZWMxMiIsIl9yZWMxMyIsIl9yZWMxNCIsIl9yZWMxNSIsImxlbmd0aCIsImFzeW5jIiwiZWxtMiIsInNsZWVwIiwiX3JlYzE2IiwiX3JlYzE3IiwiX3JlYzE4IiwiX3JlYzE5IiwidGFnU3RyZWFtIiwidW5rbm93blNpemUiLCJhbGxvYyIsImJpbmFyaXplZCIsIm1hcCIsIm8iLCJlbmNvZGVWYWx1ZVRvQnVmZmVyIiwiZW50cmllcyIsIm9yaWdpbiIsIk1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNUIiwiX2V4cGVjdER1ciIsImNyZWF0ZV93ZWJwX3Rlc3QiLCJfcmVjMjAiLCJ3ZWJtX2J1ZiIsIldlYlBzIiwiV2ViUEZyYW1lRmlsdGVyIiwiV2ViUCIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImltZyIsImZldGNoSW1hZ2UiLCJ3aWR0aCIsImhlaWdodCIsImVyciIsIm5vdE9rIiwicmV2b2tlT2JqZWN0VVJMIiwiZXhwZWN0RHVyIiwiY3JlYXRlX2NvbnZlcnRfdG9fc2Vla2FibGVfdGVzdCIsIl9yZWMyMSIsIl9yZWMyMiIsIl9yZWMyMyIsIl9yZWMyNCIsIl9yZWMyNSIsIl9yZWMyNiIsIl9yZWMyNyIsIl9yZWMyOCIsImRlY29kZXIiLCJyZWFkZXIiLCJSZWFkZXIiLCJpbmZvIiwicmVhZCIsInN0b3AiLCJtZXRhZGF0YXMiLCJzZWMiLCJkdXJhdGlvbiIsInRpbWVzdGFtcFNjYWxlIiwicmVmaW5lZE1ldGFkYXRhQnVmIiwibWFrZU1ldGFkYXRhU2Vla2FibGUiLCJjdWVzIiwiYm9keSIsInNsaWNlIiwibWV0YWRhdGFTaXplIiwiYnl0ZUxlbmd0aCIsInJhd193ZWJNIiwiQmxvYiIsInJlZmluZWRXZWJNIiwicmF3X3ZpZGVvIiwiZmV0Y2hWaWRlbyIsInJlZmluZWRfdmlkZW8iLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpbmNsdWRlcyIsIk51bWJlciIsImlzRmluaXRlIiwid2FpdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25zZWVrZWQiLCJvbmVycm9yIiwiY3VycmVudFRpbWUiLCJNYXRoIiwiYWJzIiwibG9nZ2luZyIsInJlZmluZWRCdWYiLCJyZWFkQXNBcnJheUJ1ZmZlciIsInJlZmluZWRFbG1zIiwiX3JlYWRlciIsImNyZWF0ZV9yZWNvcmRlcl9oZWxwZXJfdGVzdCIsIl9yZWMzOCIsIl9yZWMzOSIsIl9yZWM0MCIsIl9yZWM0MSIsImxhc3Rfc2VjIiwiYWRkTGlzdGVuZXIiLCJfcmVjMjkiLCJfcmVjMzAiLCJtZXRhZGF0YV9sb2FkZWQiLCJkYXRhIiwiX3JlYzMxIiwiX3JlYzMyIiwiX3JlYzMzIiwiY2x1c3Rlcl9udW0iLCJsYXN0X3RpbWVzdGFtcCIsImV2IiwiX3JlYzM0IiwiX3JlYzM1IiwiX3JlYzM2IiwiX3JlYzM3IiwidGltZXN0YW1wIiwiYXNzZXJ0aW9uIiwibXMiLCJzZXRUaW1lb3V0IiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb250cm9scyIsIm9ubG9hZGVkZGF0YSIsIkVycm9yIiwiSW1hZ2UiLCJvbmxvYWQiLCJibG9iIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlc3VsdCIsIm9uIiwicnVuRW5kIiwiZ2xvYmFsIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLElBQUFBLHFCQUFBO0FBQUEsYUFBQUMsbUJBQUE7QUFBQSxhQUFBQyxRQUFBO0FBQUE7QUFBQSxJQUFBRCxtQkFBQSxDQUFBRSxTQUFBLENBQUFDLEtBQUEsWUFBQUEsS0FBQSxDQUFBQyxLQUFBLEVBQUFDLE1BQUE7QUFBQSxhQUFBSixRQUFBLENBQUFLLElBQUE7QUFBQSxZQUFBRixLQUFBLEVBQUFBLEtBQUE7QUFBQSxZQUFBQyxNQUFBLEVBQUFBLE1BQUE7QUFBQTtBQUFBLGVBQUFELEtBQUE7QUFBQTtBQUFBLElBQUFKLG1CQUFBLENBQUFFLFNBQUEsQ0FBQUssS0FBQSxZQUFBQSxLQUFBLENBQUFILEtBQUEsRUFBQUksTUFBQTtBQUFBLFlBQUFDLGNBQUEsUUFBQVIsUUFBQTtBQUFBLGFBQUFBLFFBQUE7QUFBQTtBQUFBLFlBQUFTLGtCQUFBO0FBQUEsZ0JBQUFOLEtBQUEsRUFBQUEsS0FBQTtB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QURxQjtBQUFBLFNBQXpCLENBSG9DO0FBQUEsUUFNcEM3RSxNQUFBLENBQU9nQyxPQUFQLEdBQWtCeUIsRUFBRCxJQUFRO0FBQUEsWUFDckIzQixNQUFBLENBQU8yQixFQUFQLEVBRHFCO0FBQUEsU0FBekIsQ0FOb0M7QUFBQSxLQUFqQyxDQUFQLENBRDZCO0FBQUEsQ0E3V2pDO0FBMlhBeEssS0FBQSxDQUFNNkwsRUFBTixDQUFTLFFBQVQsRUFBb0JDLE1BQUQsSUFBWTtBQUFBLElBQzNCckwsT0FBQSxDQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQm9MLE1BQXRCLEVBRDJCO0FBQUEsSUFFM0JDLE1BQUEsQ0FBT0QsTUFBUCxHQUFnQkEsTUFBaEIsQ0FGMkI7QUFBQSxDQUEvQiIsInNvdXJjZVJvb3QiOiIvaG9tZS9sZWdva2ljaGkvR2l0aHViL3RzLWVibWwiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIC8vLyA8cmVmZXJlbmNlIHR5cGVzPVwicXVuaXRcIi8+XG5jb25zdCBfMSA9IHJlcXVpcmUoXCIuL1wiKTtcbi8vIGNvbnN0IEJ1ZmZlciA9IHRvb2xzLkJ1ZmZlcjtcbmNvbnN0IFFVbml0ID0gcmVxdWlyZShcInF1bml0XCIpO1xuY29uc3QgZW1wb3dlciA9IHJlcXVpcmUoXCJlbXBvd2VyXCIpO1xuY29uc3QgZm9ybWF0dGVyID0gcmVxdWlyZShcInBvd2VyLWFzc2VydC1mb3JtYXR0ZXJcIik7XG5jb25zdCBxdW5pdFRhcCA9IHJlcXVpcmUoXCJxdW5pdC10YXBcIik7XG5RVW5pdC5jb25maWcuYXV0b3N0YXJ0ID0gdHJ1ZTtcbmVtcG93ZXIoUVVuaXQuYXNzZXJ0LCBmb3JtYXR0ZXIoKSwgeyBkZXN0cnVjdGl2ZTogdHJ1ZSB9KTtcbnF1bml0VGFwKFFVbml0LCBmdW5jdGlvbiBxdW5pdFRhcENhbGxiYWNrKCkge1xuICAgIC8qIGVzbGludCBwcmVmZXItcmVzdC1wYXJhbXM6IG9mZiAqL1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59LCB7IHNob3dTb3VyY2VPbkZhaWx1cmU6IGZhbHNlIH0pO1xuY29uc3QgV0VCTV9GSUxFX0xJU1QgPSBbXG4gICAgXCIuLi9tYXRyb3NrYS10ZXN0LWZpbGVzL3Rlc3RfZmlsZXMvdGVzdDEubWt2XCIsXG4gICAgXCIuLi9tYXRyb3NrYS10ZXN0LWZpbGVzL3Rlc3RfZmlsZXMvdGVzdDIubWt2XCIsXG4gICAgXCIuLi9tYXRyb3NrYS10ZXN0LWZpbGVzL3Rlc3RfZmlsZXMvdGVzdDMubWt2XCIsXG4gICAgLy8gXCIuLi9tYXRyb3NrYS10ZXN0LWZpbGVzL3Rlc3RfZmlsZXMvdGVzdDQubWt2XCIsIHRoaXMgZmlsZSBpcyBicm9rZW4gc28gbm90IHBhc3MgZW5jb2Rlcl9kZWNvZGVyX3Rlc3RcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0NS5ta3ZcIixcbiAgICBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ni5ta3ZcIixcbiAgICAvLyBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0Ny5ta3ZcIiwgdGhpcyBmaWxlIGhhcyB1bmtub3duIHRhZyBzbyBjYW5ub3Qgd3JpdGUgZmlsZVxuICAgIFwiLi4vbWF0cm9za2EtdGVzdC1maWxlcy90ZXN0X2ZpbGVzL3Rlc3Q4Lm1rdlwiLFxuICAgIFwiLi9jaHJvbWU1Mi53ZWJtXCIsXG4gICAgXCIuL2Nocm9tZTU5LndlYm1cIixcbiAgICBcIi4vY2hyb21lNTcud2VibVwiXG5dO1xuUVVuaXQubW9kdWxlKFwidHMtRUJNTFwiKTtcblFVbml0LnRlc3QoXCJlbmNvZGVyLWRlY29kZXJcIiwgYXN5bmMgKGFzc2VydCkgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBcIi4uL21hdHJvc2thLXRlc3QtZmlsZXMvdGVzdF9maWxlcy90ZXN0MS5ta3ZcIjtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChmaWxlKTtcbiAgICBjb25zdCBidWYgPSBhd2FpdCByZXMuYXJyYXlCdWZmZXIoKTtcbiAgICBjb25zdCBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmKTtcbiAgICBjb25zdCBidWYyID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoZWxtcyk7XG4gICAgY29uc3QgZWxtczIgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYyKTtcbiAgICBjb25zdCB0ZXN0cyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICB0ZXN0OiAoZWxtKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkVCTUxcIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgIWVsbS5pc0VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluZGV4OiA0LFxuICAgICAgICAgICAgdGVzdDogKGVsbSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJFQk1MXCIgJiYgZWxtLnR5cGUgPT09IFwibVwiICYmIGVsbS5pc0VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluZGV4OiA1LFxuICAgICAgICAgICAgdGVzdDogKGVsbSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0ubmFtZSA9PT0gXCJTZWdtZW50XCIgJiYgZWxtLnR5cGUgPT09IFwibVwiICYmICFlbG0uaXNFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogMjQsXG4gICAgICAgICAgICB0ZXN0OiAoZWxtKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIkluZm9cIiAmJiBlbG0udHlwZSA9PT0gXCJtXCIgJiYgIWVsbS5pc0VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluZGV4OiAyNSxcbiAgICAgICAgICAgIHRlc3Q6IChlbG0pID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRHVyYXRpb25cIiAmJiBlbG0udHlwZSA9PT0gXCJmXCIgJiYgZWxtLnZhbHVlID09PSA4NzMzNik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluZGV4OiAyNixcbiAgICAgICAgICAgIHRlc3Q6IChlbG0pID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiTXV4aW5nQXBwXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgZWxtLnR5cGUgPT09IFwiOFwiICYmXG4gICAgICAgICAgICAgICAgICAgIGVsbS52YWx1ZSA9PT0gXCJsaWJlYm1sMiB2MC4xMC4wICsgbGlibWF0cm9za2EyIHYwLjEwLjFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluZGV4OiAyOCxcbiAgICAgICAgICAgIHRlc3Q6IChlbG0pID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IFwiRGF0ZVVUQ1wiICYmXG4gICAgICAgICAgICAgICAgICAgIGVsbS50eXBlID09PSBcImRcIiAmJlxuICAgICAgICAgICAgICAgICAgICBlbG0udmFsdWUgaW5zdGFuY2VvZiBEYXRlKTtcbiAgICAgICAgICAgICAgICAvLyB0b0lTT1N0cmluZ1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhlbG0udHlwZSA9PT0gXCJkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgXzEudG9vbHMuY29udmVydEVCTUxEYXRlVG9KU0RhdGUoZWxtLnZhbHVlKS5nZXRUaW1lKCkgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZShcIjIwMTAtMDgtMjFUMDc6MjM6MDMuMDAwWlwiKS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogMjksXG4gICAgICAgICAgICB0ZXN0OiAoZWxtKSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBcIlNlZ21lbnRVVUlEXCIgJiYgZWxtLnR5cGUgPT09IFwiYlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KEJ1ZmZlci5mcm9tKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIDB4OTIsIDB4MmQsIDB4MTksIDB4MzIsIDB4MGYsIDB4MWUsIDB4MTMsIDB4YzUsIDB4YjUsIDB4MDUsIDB4NjMsXG4gICAgICAgICAgICAgICAgICAgICAgICAweDBhLCAweGFmLCAweGQ4LCAweDUzLCAweDM2XG4gICAgICAgICAgICAgICAgICAgIF0pKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVmMiA9IG5ldyBVaW50OEFycmF5KGVsbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydC5vayhidWYuZXZlcnkoKHZhbCwgaSkgPT4gYnVmMltpXSA9PT0gdmFsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcbiAgICBmb3IgKGNvbnN0IHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgICAgdGVzdC50ZXN0KGVsbXMyW3Rlc3QuaW5kZXhdKTtcbiAgICB9XG59KTtcbmZvciAoY29uc3QgZmlsZSBvZiBXRUJNX0ZJTEVfTElTVCkge1xuICAgIFFVbml0LnRlc3QoXCJlbmNvZGVyLWRlY29kZXI6XCIgKyBmaWxlLCBjcmVhdGVfZW5jb2Rlcl9kZWNvZGVyX3Rlc3QoZmlsZSkpO1xufVxuZnVuY3Rpb24gY3JlYXRlX2VuY29kZXJfZGVjb2Rlcl90ZXN0KGZpbGUpIHtcbiAgICByZXR1cm4gYXN5bmMgKGFzc2VydCkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChmaWxlKTtcbiAgICAgICAgY29uc3QgYnVmID0gYXdhaXQgcmVzLmFycmF5QnVmZmVyKCk7XG4gICAgICAgIGNvbnN0IGVsbXMgPSBuZXcgXzEuRGVjb2RlcigpLmRlY29kZShidWYpO1xuICAgICAgICBjb25zdCBidWYyID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoZWxtcyk7XG4gICAgICAgIGNvbnN0IGVsbXMyID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmMik7XG4gICAgICAgIC8vYXNzZXJ0Lm9rKGJ1Zi5ieXRlTGVuZ3RoID09PSBidWYyLmJ5dGVMZW5ndGgsIFwiVGhpcyBwcm9ibGVtIGlzIGNhdXNlZCBieSBKUyBiZWluZyB1bmFibGUgdG8gaGFuZGxlIEludDY0LlwiKTtcbiAgICAgICAgYXNzZXJ0Lm9rKGVsbXMubGVuZ3RoID09PSBlbG1zMi5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsbSA9IGVsbXNbaV07XG4gICAgICAgICAgICBjb25zdCBlbG0yID0gZWxtczJbaV07XG4gICAgICAgICAgICBhc3NlcnQub2soZWxtLm5hbWUgPT09IGVsbTIubmFtZSk7XG4gICAgICAgICAgICBhc3NlcnQub2soZWxtLnR5cGUgPT09IGVsbTIudHlwZSk7XG4gICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwibVwiIHx8IGVsbTIudHlwZSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxtLnR5cGUgPT09IFwiYlwiICYmIGVsbTIudHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soZWxtLnZhbHVlLmxlbmd0aCA9PT0gZWxtMi52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUgPT09IGVsbTIudmFsdWUpO1xuICAgICAgICAgICAgYXdhaXQgc2xlZXAoMSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuUVVuaXQudGVzdChcImhhbmR3cml0ZS1lbmNvZGVyXCIsIChhc3NlcnQpID0+IHtcbiAgICBjb25zdCB0YWdTdHJlYW0gPSBbXG4gICAgICAgIHsgbmFtZTogXCJFQk1MXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiBcIkVCTUxWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICB7IG5hbWU6IFwiRUJNTFJlYWRWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICB7IG5hbWU6IFwiRUJNTE1heElETGVuZ3RoXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogNCB9LFxuICAgICAgICB7IG5hbWU6IFwiRUJNTE1heFNpemVMZW5ndGhcIiwgdHlwZTogXCJ1XCIsIHZhbHVlOiA4IH0sXG4gICAgICAgIHsgbmFtZTogXCJEb2NUeXBlXCIsIHR5cGU6IFwic1wiLCB2YWx1ZTogXCJ3ZWJtXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkRvY1R5cGVWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogNCB9LFxuICAgICAgICB7IG5hbWU6IFwiRG9jVHlwZVJlYWRWZXJzaW9uXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMiB9LFxuICAgICAgICB7IG5hbWU6IFwiRUJNTFwiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IHRydWUgfSxcbiAgICAgICAgeyBuYW1lOiBcIlNlZ21lbnRcIiwgdHlwZTogXCJtXCIsIHVua25vd25TaXplOiB0cnVlLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiBcIlNlZWtIZWFkXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogZmFsc2UgfSxcbiAgICAgICAgeyBuYW1lOiBcIlNlZWtIZWFkXCIsIHR5cGU6IFwibVwiLCBpc0VuZDogdHJ1ZSB9LFxuICAgICAgICB7IG5hbWU6IFwiSW5mb1wiLCB0eXBlOiBcIm1cIiwgaXNFbmQ6IGZhbHNlIH0sXG4gICAgICAgIHsgbmFtZTogXCJUaW1lc3RhbXBTY2FsZVwiLCB0eXBlOiBcInVcIiwgdmFsdWU6IDEwMDAwMDAgfSxcbiAgICAgICAgeyBuYW1lOiBcIkluZm9cIiwgdHlwZTogXCJtXCIsIGlzRW5kOiB0cnVlIH0sXG4gICAgICAgIHsgbmFtZTogXCJEdXJhdGlvblwiLCB0eXBlOiBcImZcIiwgdmFsdWU6IDAuMCB9LFxuICAgICAgICB7IG5hbWU6IFwiQ2x1c3RlclwiLCB0eXBlOiBcIm1cIiwgdW5rbm93blNpemU6IHRydWUsIGlzRW5kOiBmYWxzZSB9LFxuICAgICAgICB7IG5hbWU6IFwiVGltZXN0YW1wXCIsIHR5cGU6IFwidVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIlNpbXBsZUJsb2NrXCIsXG4gICAgICAgICAgICB0eXBlOiBcImJcIixcbiAgICAgICAgICAgIHZhbHVlOiBCdWZmZXIuYWxsb2MoMTAyNClcbiAgICAgICAgfVxuICAgIF07XG4gICAgY29uc3QgYmluYXJpemVkID0gdGFnU3RyZWFtLm1hcCgobykgPT4gXzEudG9vbHMuZW5jb2RlVmFsdWVUb0J1ZmZlcihvKSk7XG4gICAgY29uc3QgYnVmID0gbmV3IF8xLkVuY29kZXIoKS5lbmNvZGUoYmluYXJpemVkKTtcbiAgICBjb25zdCBlbG1zID0gbmV3IF8xLkRlY29kZXIoKS5kZWNvZGUoYnVmKTtcbiAgICBmb3IgKGNvbnN0IFtpLCBlbG1dIG9mIGVsbXMuZW50cmllcygpKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHRhZ1N0cmVhbVtpXTtcbiAgICAgICAgYXNzZXJ0Lm9rKGVsbS5uYW1lID09PSBvcmlnaW4ubmFtZSwgXCJjb21wYXJlIHRhZyBuYW1lXCIpO1xuICAgICAgICBhc3NlcnQub2soZWxtLnR5cGUgPT09IG9yaWdpbi50eXBlLCBcImNvbXBhcmUgdGFnIHR5cGVcIik7XG4gICAgICAgIGlmIChlbG0udHlwZSA9PT0gXCJtXCIgfHwgb3JpZ2luLnR5cGUgPT09IFwibVwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsbS50eXBlID09PSBcImJcIiAmJiBvcmlnaW4udHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUubGVuZ3RoID09PSBvcmlnaW4udmFsdWUubGVuZ3RoLCBcImNvbXBhcmUgdGFnIHZhbHVlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydC5vayhlbG0udmFsdWUgPT09IG9yaWdpbi52YWx1ZSwgXCJjb21wYXJlIHRhZyB2YWx1ZVwiKTtcbiAgICB9XG59KTtcblFVbml0Lm1vZHVsZShcIlJlYWRlclwiKTtcbmNvbnN0IE1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNUID0gW1xuICAgIFtcIi4vY2hyb21lNTIud2VibVwiLCA1MF0sXG4gICAgW1wiLi9jaHJvbWU1OS53ZWJtXCIsIDYwXSxcbiAgICBbXCIuL2Nocm9tZTU3LndlYm1cIiwgN10sXG4gICAgLy8gbGFzdDJ0aW1lc3RhbXAodmlkZW8sIGF1ZGlvKTogKCg3LjQ5M3MsIDcuNTUycyksICg3LjQ5M3MsIDcuNTUycykpXG4gICAgLy8gQ2hyb21lNTc6IDcuNjEycyB+PSA3LjYxMXMgPSA3LjU1MnMgKyAoNy41NTJzIC0gNy40OTNzKSAvLyA/Pz9cbiAgICAvLyBGaXJlZm94NTM6IDcuNTUycyA9IDcuNTUycyArICg3LjU1MnMgLSA3LjU1MnMpIC8vIHNoaXQhXG4gICAgLy8gUmVhZGVyOiA3LjYxMXMgPSA3LjU1MnMgKyAoNy41NTJzIC0gNy40OTNzKVxuICAgIFtcIi4vZmlyZWZveDU1bmlnaHRseS53ZWJtXCIsIDhdLFxuICAgIC8vIGxhc3QydGltZXN0YW1wKHZpZGVvLCBhdWRpbyk6ICgoOC41NjdzLCA4LjU5MHMpLCAoOC42MjZzLCA4LjY0NnMpKSwgQ29kZWNEZWxheShhdWRpbyk6IDYuNTAwbXNcbiAgICAvLyBDaHJvbWU1NzogOC42NTlzIH49IDguNjU5NXMgPSA4LjY0NnMgKyAoOC42NDZzIC0gOC42MjZzKSAtIDYuNTAwbXNcbiAgICAvLyBGaXJlZm94NTM6IDguNjY2cyA9IDguNjQ2cyArICg4LjY0NnMgLSA4LjYyNnMpXG4gICAgLy8gUmVhZGVyOiA4LjY1OTVzID0gOC42NDZzICsgKDguNjQ2cyAtIDguNjI2cykgLSA2LjUwMG1zXG4gICAgW1wiLi9maXJlZm94NTMud2VibVwiLCAxMF1cbiAgICAvLyBDaHJvbWU1NzogMTAuMDE5cywgRmlyZWZveDUzOiAxMC4wMjZzLCBSZWFkZXI6IDkuOTY3c1xuICAgIC8vIGxhc3QydGltZXN0YW1wKHZpZGVvLCBhdWRpbyk6ICgoOS45MzJzLCA5Ljk2N3MpLCAoOS45ODZzLCAxMC4wMDZzKSksIENvZGVjRGVsYXkoYXVkaW8pOiA2LjUwMG1zXG4gICAgLy8gQ2hyb21lNTc6IDEwLjAxOXMgfj0gMTAuMDE5NXMgPSAxMC4wMDZzICsgKDEwLjAwNnMgLSA5Ljk4NnMpIC0gNi41MDBtc1xuICAgIC8vIEZpcmVmb3g1MzogMTAuMDI2cyA9IDEwLjAwNnMgKyAoMTAuMDA2cyAtIDkuOTg2cylcbiAgICAvLyBSZWFkZXI6IDEwLjAxOTVzID0gMTAuMDA2cyArICgxMC4wMDZzIC0gOS45ODZzKSAtIDYuNTAwbXNcbl07XG5mb3IgKGNvbnN0IFtmaWxlLCBfZXhwZWN0RHVyXSBvZiBNRURJQV9SRUNPUkRFUl9XRUJNX0ZJTEVfTElTVCkge1xuICAgIFFVbml0LnRlc3QoXCJjcmVhdGVfd2VicF90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX3dlYnBfdGVzdChmaWxlKSk7XG59XG5mdW5jdGlvbiBjcmVhdGVfd2VicF90ZXN0KGZpbGUpIHtcbiAgICByZXR1cm4gYXN5bmMgKGFzc2VydCkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChmaWxlKTtcbiAgICAgICAgY29uc3Qgd2VibV9idWYgPSBhd2FpdCByZXMuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgY29uc3QgZWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKHdlYm1fYnVmKTtcbiAgICAgICAgY29uc3QgV2ViUHMgPSBfMS50b29scy5XZWJQRnJhbWVGaWx0ZXIoZWxtcyk7XG4gICAgICAgIGZvciAoY29uc3QgV2ViUCBvZiBXZWJQcykge1xuICAgICAgICAgICAgY29uc3Qgc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChXZWJQKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gYXdhaXQgZmV0Y2hJbWFnZShzcmMpO1xuICAgICAgICAgICAgICAgIGFzc2VydC5vayhpbWcud2lkdGggPiAwICYmIGltZy5oZWlnaHQgPiAwLCBcInNpemU6XCIgKyBpbWcud2lkdGggKyBcInhcIiArIGltZy5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGFzc2VydC5ub3RPayhlcnIsIFwid2VicCBsb2FkIGZhaWxyZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc3JjKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mb3IgKGNvbnN0IFtmaWxlLCBleHBlY3REdXJdIG9mIE1FRElBX1JFQ09SREVSX1dFQk1fRklMRV9MSVNUKSB7XG4gICAgUVVuaXQudGVzdChcImNyZWF0ZV9jb252ZXJ0X3RvX3NlZWthYmxlX3Rlc3Q6XCIgKyBmaWxlLCBjcmVhdGVfY29udmVydF90b19zZWVrYWJsZV90ZXN0KGZpbGUsIGV4cGVjdER1cikpO1xufVxuZnVuY3Rpb24gY3JlYXRlX2NvbnZlcnRfdG9fc2Vla2FibGVfdGVzdChmaWxlLCBleHBlY3REdXIpIHtcbiAgICByZXR1cm4gYXN5bmMgKGFzc2VydCkgPT4ge1xuICAgICAgICBjb25zdCBkZWNvZGVyID0gbmV3IF8xLkRlY29kZXIoKTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IF8xLlJlYWRlcigpO1xuICAgICAgICAvL3JlYWRlci5sb2dnaW5nID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goZmlsZSk7XG4gICAgICAgIGNvbnN0IHdlYm1fYnVmID0gYXdhaXQgcmVzLmFycmF5QnVmZmVyKCk7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcImFuYWxhc2lzIHVuc2Vla2FibGUgb3JpZ2luYWwgZWJtbCB0cmVlXCIpO1xuICAgICAgICBjb25zdCBlbG1zID0gZGVjb2Rlci5kZWNvZGUod2VibV9idWYpO1xuICAgICAgICBmb3IgKGNvbnN0IGVsbSBvZiBlbG1zKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZChlbG0pO1xuICAgICAgICB9XG4gICAgICAgIHJlYWRlci5zdG9wKCk7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcImNvbnZlcnQgdG8gc2Vla2FibGUgZmlsZVwiKTtcbiAgICAgICAgYXNzZXJ0Lm9rKHJlYWRlci5tZXRhZGF0YXNbMF0ubmFtZSA9PT0gXCJFQk1MXCIpO1xuICAgICAgICBhc3NlcnQub2socmVhZGVyLm1ldGFkYXRhcy5sZW5ndGggPiAwKTtcbiAgICAgICAgY29uc3Qgc2VjID0gKHJlYWRlci5kdXJhdGlvbiAqIHJlYWRlci50aW1lc3RhbXBTY2FsZSkgLyAxMDAwIC8gMTAwMCAvIDEwMDA7XG4gICAgICAgIGFzc2VydC5vayhleHBlY3REdXIgLSAxIDwgc2VjICYmIHNlYyA8IGV4cGVjdER1ciArIDEpO1xuICAgICAgICBjb25zdCByZWZpbmVkTWV0YWRhdGFCdWYgPSBfMS50b29scy5tYWtlTWV0YWRhdGFTZWVrYWJsZShyZWFkZXIubWV0YWRhdGFzLCByZWFkZXIuZHVyYXRpb24sIHJlYWRlci5jdWVzKTtcbiAgICAgICAgY29uc3QgYm9keSA9IHdlYm1fYnVmLnNsaWNlKHJlYWRlci5tZXRhZGF0YVNpemUpO1xuICAgICAgICBhc3NlcnQub2socmVmaW5lZE1ldGFkYXRhQnVmLmJ5dGVMZW5ndGggLSByZWFkZXIubWV0YWRhdGFTaXplID4gMCk7XG4gICAgICAgIGFzc2VydC5vayh3ZWJtX2J1Zi5ieXRlTGVuZ3RoID09PSByZWFkZXIubWV0YWRhdGFTaXplICsgYm9keS5ieXRlTGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiY2hlY2sgZHVyYXRpb25cIik7XG4gICAgICAgIGNvbnN0IHJhd193ZWJNID0gbmV3IEJsb2IoW3dlYm1fYnVmXSwgeyB0eXBlOiBcInZpZGVvL3dlYm1cIiB9KTtcbiAgICAgICAgY29uc3QgcmVmaW5lZFdlYk0gPSBuZXcgQmxvYihbcmVmaW5lZE1ldGFkYXRhQnVmLCBib2R5XSwge1xuICAgICAgICAgICAgdHlwZTogXCJ2aWRlby93ZWJtXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByYXdfdmlkZW8gPSBhd2FpdCBmZXRjaFZpZGVvKFVSTC5jcmVhdGVPYmplY3RVUkwocmF3X3dlYk0pKTtcbiAgICAgICAgICAgIGNvbnN0IHJlZmluZWRfdmlkZW8gPSBhd2FpdCBmZXRjaFZpZGVvKFVSTC5jcmVhdGVPYmplY3RVUkwocmVmaW5lZFdlYk0pKTtcbiAgICAgICAgICAgIGlmICghbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkZpcmVmb3hcIikpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQub2soIU51bWJlci5pc0Zpbml0ZShyYXdfdmlkZW8uZHVyYXRpb24pLCBcIm1lZGlhIHJlY29yZGVyIHdlYm0gZHVyYXRpb24gaXMgbm90IGZpbml0ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydC5vayhOdW1iZXIuaXNGaW5pdGUocmVmaW5lZF92aWRlby5kdXJhdGlvbiksIFwicmVmaW5lZCB3ZWJtIGR1cmF0aW9uIGlzIGZpbml0ZVwiKTtcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKDEwMCk7XG4gICAgICAgICAgICBjb25zdCB3YWl0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJhd192aWRlby5vbnNlZWtlZCA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgcmF3X3ZpZGVvLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8qIGVzbGludCByZXF1aXJlLWF0b21pYy11cGRhdGVzOiBvZmYgKi9cbiAgICAgICAgICAgIHJhd192aWRlby5jdXJyZW50VGltZSA9IDcgKiAyNCAqIDYwICogNjA7XG4gICAgICAgICAgICBhd2FpdCB3YWl0O1xuICAgICAgICAgICAgLy8gZHVyYXRpb24gc2VjIGlzIGRpZmZlcmVudCBlYWNoIGJyb3dzZXJzXG4gICAgICAgICAgICBhc3NlcnQub2soTWF0aC5hYnMocmF3X3ZpZGVvLmR1cmF0aW9uIC0gcmVmaW5lZF92aWRlby5kdXJhdGlvbikgPCAwLjI1KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBhc3NlcnQubm90T2soZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVhZGVyLmxvZ2dpbmcpIHtcbiAgICAgICAgICAgIC8vIGZvciBkZWJ1Z1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwicHV0IHNlZWthYmxlIGVibWwgdHJlZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHJlZmluZWRCdWYgPSBhd2FpdCByZWFkQXNBcnJheUJ1ZmZlcihyZWZpbmVkV2ViTSk7XG4gICAgICAgICAgICBjb25zdCByZWZpbmVkRWxtcyA9IG5ldyBfMS5EZWNvZGVyKCkuZGVjb2RlKHJlZmluZWRCdWYpO1xuICAgICAgICAgICAgY29uc3QgX3JlYWRlciA9IG5ldyBfMS5SZWFkZXIoKTtcbiAgICAgICAgICAgIF9yZWFkZXIubG9nZ2luZyA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsbSBvZiByZWZpbmVkRWxtcykge1xuICAgICAgICAgICAgICAgIF9yZWFkZXIucmVhZChlbG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3JlYWRlci5zdG9wKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZm9yIChjb25zdCBbZmlsZSwgX2V4cGVjdER1cl0gb2YgTUVESUFfUkVDT1JERVJfV0VCTV9GSUxFX0xJU1QpIHtcbiAgICBRVW5pdC50ZXN0KFwiY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0OlwiICsgZmlsZSwgY3JlYXRlX3JlY29yZGVyX2hlbHBlcl90ZXN0KGZpbGUpKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9yZWNvcmRlcl9oZWxwZXJfdGVzdChmaWxlKSB7XG4gICAgcmV0dXJuIGFzeW5jIChhc3NlcnQpID0+IHtcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBfMS5EZWNvZGVyKCk7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBfMS5SZWFkZXIoKTtcbiAgICAgICAgbGV0IGxhc3Rfc2VjID0gMDtcbiAgICAgICAgcmVhZGVyLmFkZExpc3RlbmVyKFwiZHVyYXRpb25cIiwgKHsgdGltZXN0YW1wU2NhbGUsIGR1cmF0aW9uIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlYyA9IChkdXJhdGlvbiAqIHRpbWVzdGFtcFNjYWxlKSAvIDEwMDAgLyAxMDAwIC8gMTAwMDtcbiAgICAgICAgICAgIGFzc2VydC5vayhOdW1iZXIuaXNGaW5pdGUoc2VjKSwgXCJkdXJhdGlvbjpcIiArIHNlYyArIFwic2VjXCIpO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKHNlYyA+IGxhc3Rfc2VjKTtcbiAgICAgICAgICAgIGxhc3Rfc2VjID0gc2VjO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG1ldGFkYXRhX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgICByZWFkZXIuYWRkTGlzdGVuZXIoXCJtZXRhZGF0YVwiLCAoeyBtZXRhZGF0YVNpemUsIGRhdGEgfSkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKG1ldGFkYXRhU2l6ZSA+IDApO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGRhdGEubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICBhc3NlcnQub2soZGF0YVswXS5uYW1lID09PSBcIkVCTUxcIik7XG4gICAgICAgICAgICBtZXRhZGF0YV9sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGNsdXN0ZXJfbnVtID0gMDtcbiAgICAgICAgbGV0IGxhc3RfdGltZXN0YW1wID0gLTE7XG4gICAgICAgIHJlYWRlci5hZGRMaXN0ZW5lcihcImNsdXN0ZXJcIiwgKGV2KSA9PiB7XG4gICAgICAgICAgICAvLyBjbHVzdGVyIGNodW5rIHRlc3RcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgdGltZXN0YW1wIH0gPSBldjtcbiAgICAgICAgICAgIGFzc2VydC5vayhOdW1iZXIuaXNGaW5pdGUodGltZXN0YW1wKSwgXCJjbHVzdGVyLnRpbWVzdGFtcDpcIiArIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBhc3NlcnQub2soZGF0YS5sZW5ndGggPiAwLCBcImNsdXN0ZXIubGVuZ3RoOlwiICsgZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgYXNzZXJ0aW9uID0gZGF0YS5ldmVyeSgoZWxtKSA9PiBlbG0ubmFtZSA9PT0gXCJDbHVzdGVyXCIgfHxcbiAgICAgICAgICAgICAgICBlbG0ubmFtZSA9PT0gXCJUaW1lc3RhbXBcIiB8fFxuICAgICAgICAgICAgICAgIGVsbS5uYW1lID09PSBcIlNpbXBsZUJsb2NrXCIpO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKGFzc2VydGlvbiwgXCJlbGVtZW50IGNoZWNrXCIpO1xuICAgICAgICAgICAgYXNzZXJ0Lm9rKHRpbWVzdGFtcCA+IGxhc3RfdGltZXN0YW1wKTtcbiAgICAgICAgICAgIGNsdXN0ZXJfbnVtICs9IDE7XG4gICAgICAgICAgICBsYXN0X3RpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGZpbGUpO1xuICAgICAgICBjb25zdCB3ZWJtX2J1ZiA9IGF3YWl0IHJlcy5hcnJheUJ1ZmZlcigpO1xuICAgICAgICBjb25zdCBlbG1zID0gZGVjb2Rlci5kZWNvZGUod2VibV9idWYpO1xuICAgICAgICBmb3IgKGNvbnN0IGVsbSBvZiBlbG1zKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZChlbG0pO1xuICAgICAgICB9XG4gICAgICAgIHJlYWRlci5zdG9wKCk7XG4gICAgICAgIGFzc2VydC5vayhsYXN0X3NlYyA+IDApO1xuICAgICAgICBhc3NlcnQub2sobWV0YWRhdGFfbG9hZGVkKTtcbiAgICAgICAgYXNzZXJ0Lm9rKGNsdXN0ZXJfbnVtID4gMCk7XG4gICAgICAgIGFzc2VydC5vayhsYXN0X3RpbWVzdGFtcCA+IDApO1xuICAgIH07XG59XG5mdW5jdGlvbiBzbGVlcChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuZnVuY3Rpb24gZmV0Y2hWaWRlbyhzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcbiAgICAgICAgdmlkZW8uc3JjID0gc3JjO1xuICAgICAgICB2aWRlby5jb250cm9scyA9IHRydWU7XG4gICAgICAgIHZpZGVvLm9ubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgICAgIHZpZGVvLm9ubG9hZGVkZGF0YSA9IG51bGw7XG4gICAgICAgICAgICByZXNvbHZlKHZpZGVvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmlkZW8ub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHZpZGVvLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgcmVqZWN0KHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIgPyBuZXcgRXJyb3IoZXJyKSA6IGVycik7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaEltYWdlKHNyYykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgICB9O1xuICAgICAgICBpbWcub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiID8gbmV3IEVycm9yKGVycikgOiBlcnIpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVhZEFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKGV2KSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXYpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuLy8gQHR5cGVzL3F1bml0IGRvZXNuJ3QgZGVmaW5lIFFVbml0Lm9uIHlldFxuLy8gaGFjayBmb3IgdGhlIHBsYXl3cmlnaHQgdGVzdGluZyBpbiBydW5fdGVzdC50c1xuUVVuaXQub24oXCJydW5FbmRcIiwgKHJ1bkVuZCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwicnVuRW5kXCIsIHJ1bkVuZCk7XG4gICAgZ2xvYmFsLnJ1bkVuZCA9IHJ1bkVuZDtcbn0pO1xuIl19

