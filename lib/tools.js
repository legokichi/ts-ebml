"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var int64_buffer_1 = require("int64-buffer");
var EBMLEncoder_1 = require("./EBMLEncoder");
exports.Buffer = require("buffer/").Buffer;
exports.readVint = require("ebml/lib/ebml/tools").readVint;
exports.writeVint = require("ebml/lib/ebml/tools").writeVint;
exports.ebmlBlock = require("ebml-block");
function readBlock(buf) {
    return exports.ebmlBlock(new exports.Buffer(buf));
}
exports.readBlock = readBlock;
/**
  * @param end - if end === false then length is unknown
  */
function encodeTag(tagId, tagData, unknownSize) {
    if (unknownSize === void 0) { unknownSize = false; }
    return concat([
        tagId,
        unknownSize ?
            new exports.Buffer('01ffffffffffffff', 'hex') :
            exports.writeVint(tagData.length),
        tagData
    ]);
}
exports.encodeTag = encodeTag;
/**
 * @return - SimpleBlock to WebP Filter
 */
function WebPFrameFilter(elms) {
    return WebPBlockFilter(elms).reduce(function (lst, elm) {
        var o = exports.ebmlBlock(elm.data);
        return o.frames.reduce(function (lst, frame) {
            // https://developers.Blob.com/speed/webp/docs/riff_container
            var webpBuf = VP8BitStreamToRiffWebPBuffer(frame);
            var webp = new Blob([webpBuf], { type: "image/webp" });
            return lst.concat(webp);
        }, lst);
    }, []);
}
exports.WebPFrameFilter = WebPFrameFilter;
/**
 * WebP ファイルにできる SimpleBlock の パスフィルタ
 */
function WebPBlockFilter(elms) {
    return elms.reduce(function (lst, elm) {
        if (elm.type !== "b") {
            return lst;
        }
        if (elm.name !== "SimpleBlock") {
            return lst;
        }
        var o = exports.ebmlBlock(elm.data);
        var hasWebP = o.frames.some(function (frame) {
            // https://tools.ietf.org/html/rfc6386#section-19.1
            var startcode = frame.slice(3, 6).toString("hex");
            return startcode === "9d012a";
        });
        if (!hasWebP) {
            return lst;
        }
        return lst.concat(elm);
    }, []);
}
exports.WebPBlockFilter = WebPBlockFilter;
/**
 * @param frame - VP8 BitStream のうち startcode をもつ frame
 * @return - WebP ファイルの ArrayBuffer
 */
function VP8BitStreamToRiffWebPBuffer(frame) {
    var VP8Chunk = createRIFFChunk("VP8 ", frame);
    var WebPChunk = concat([
        new exports.Buffer("WEBP", "ascii"),
        VP8Chunk
    ]);
    return createRIFFChunk("RIFF", WebPChunk);
}
exports.VP8BitStreamToRiffWebPBuffer = VP8BitStreamToRiffWebPBuffer;
/**
 * RIFF データチャンクを作る
 */
function createRIFFChunk(FourCC, chunk) {
    var chunkSize = new exports.Buffer(4);
    chunkSize.writeUInt32LE(chunk.byteLength, 0);
    return concat([
        new exports.Buffer(FourCC.substr(0, 4), "ascii"),
        chunkSize,
        chunk,
        new exports.Buffer(chunk.byteLength % 2 === 0 ? 0 : 1) // padding
    ]);
}
exports.createRIFFChunk = createRIFFChunk;
/**
 * metadata に対して duration と seekhead を追加した metadata を返す
 * @param metadata - 変更前の webm における ファイル先頭から 最初の Cluster 要素までの 要素
 * @param duration - Duration (TimecodeScale)
 * @param cues - cue points for clusters
 * @deprecated @param clusterPtrs - 変更前の webm における SeekHead に追加する Cluster 要素 への start pointer
 * @deprecated @param cueInfos - please use cues.
 */
function putRefinedMetaData(metadata, info) {
    if (Array.isArray(info.cueInfos) && !Array.isArray(info.cues)) {
        console.warn("putRefinedMetaData: info.cueInfos property is deprecated. please use info.cues");
        info.cues = info.cueInfos;
    }
    var ebml = [];
    var payload = [];
    for (var i_1 = 0; i_1 < metadata.length; i_1++) {
        var elm = metadata[i_1];
        if (elm.type === "m" && elm.name === "Segment") {
            ebml = metadata.slice(0, i_1);
            payload = metadata.slice(i_1);
            if (elm.unknownSize) {
                payload.shift(); // remove segment tag
                break;
            }
            throw new Error("this metadata is not streaming webm file");
        }
    }
    // *0    *4    *5  *36      *40   *48=segmentOffset              *185=originalPayloadOffsetEnd
    // |     |     |   |        |     |                              |
    // [EBML][size]....[Segment][size][Info][size][Duration][size]...[Cluster]
    // |               |        |     |                              |
    // |               +segmentSiz(12)+                              |
    // +-ebmlSize(36)--+        |     +-payloadSize(137)-------------+-offsetEndDiff-+
    //                 |        |     |  +-newPayloadSize(??)------------------------+
    //                 +newSegmentSize---+                                           |
    //                 [Segment][newSize][Info][size][Duration][size]...[size][value][Cluster]
    //                                |  |                                           |
    //                                |  *??=newSegmentOffset                        *??=newPayloadOffsetEnd
    //                                +--+
    //                                 \offsetDiff
    if (!(payload[payload.length - 1].dataEnd > 0)) {
        throw new Error("metadata dataEnd has wrong number");
    }
    var originalPayloadOffsetEnd = payload[payload.length - 1].dataEnd;
    var ebmlSize = ebml[ebml.length - 1].dataEnd;
    var payloadSize = payload[payload.length - 1].dataEnd - payload[0].tagStart;
    var segmentTag = new exports.Buffer([0x18, 0x53, 0x80, 0x67]); // Segment
    var segmentSize = payload[0].tagStart - ebmlSize;
    var segmentOffset = ebmlSize + segmentSize;
    var newPayloadSize = payloadSize;
    // We need the size to be stable between two refinements in order for our offsets to be correct
    // Bound the number of possible refinements so we can't go infinate if something goes wrong
    var i;
    for (i = 1; i < 20; i++) {
        var newSize = new exports.Buffer('01ffffffffffffff', 'hex').byteLength; // Segmentの最後の位置は無数の Cluster 依存なので。 writeVint(newPayloadSize).byteLength ではない。
        var newSegmentSize = segmentTag.byteLength + newSize;
        var newPayloadOffsetEnd = ebmlSize + newSegmentSize + newPayloadSize;
        var offsetEndDiff = newPayloadOffsetEnd - originalPayloadOffsetEnd;
        var newSegmentOffset = ebmlSize + newSegmentSize;
        var offsetDiff = newSegmentOffset - segmentOffset;
        var sizeDiff = offsetDiff + offsetEndDiff;
        var refined = refineMetadata(payload, sizeDiff, info);
        var newNewRefinedSize = new EBMLEncoder_1.default().encode(refined).byteLength; // 一旦 seekhead を作って自身のサイズを調べる
        if (newNewRefinedSize === newPayloadSize) {
            // Size is stable
            return new EBMLEncoder_1.default().encode([].concat(ebml, [{ type: "m", name: "Segment", isEnd: false, unknownSize: true }], refined));
        }
        newPayloadSize = newNewRefinedSize;
    }
    throw new Error("unable to refine metadata, stable size could not be found in " + i + " iterations!");
}
exports.putRefinedMetaData = putRefinedMetaData;
// Given a list of EBMLElementBuffers, returns their encoded size in bytes
function encodedSizeOfEbml(refinedMetaData) {
    var encorder = new EBMLEncoder_1.default();
    return refinedMetaData.reduce(function (lst, elm) { return lst.concat(encorder.encode([elm])); }, []).reduce(function (o, buf) { return o + buf.byteLength; }, 0);
}
function refineMetadata(mesetadata, sizeDiff, info) {
    var duration = info.duration, clusterPtrs = info.clusterPtrs, cues = info.cues;
    var _metadata = mesetadata.slice(0);
    if (typeof duration === "number") {
        // duration を追加する
        var overwrited_1 = false;
        _metadata.forEach(function (elm) {
            if (elm.type === "f" && elm.name === "Duration") {
                overwrited_1 = true;
                elm.data = createFloatBuffer(duration, 8);
            }
        });
        if (!overwrited_1) {
            insertTag(_metadata, "Info", [{ name: "Duration", type: "f", data: createFloatBuffer(duration, 8) }]);
        }
    }
    if (Array.isArray(cues)) {
        insertTag(_metadata, "Cues", create_cue(cues, sizeDiff));
    }
    var seekhead_children = [];
    if (Array.isArray(clusterPtrs)) {
        console.warn("append cluster pointers to seekhead is deprecated. please use cues");
        seekhead_children = create_seek_from_clusters(clusterPtrs, sizeDiff);
    }
    // i cannot calcurate ptr diff because i am tired.
    // seekhead_children = seekhead_children.concat(create_seekhead(_metadata, sizeDiff))
    insertTag(_metadata, "SeekHead", seekhead_children, true);
    return _metadata;
}
function create_seekhead(metadata, sizeDiff) {
    var seeks = [];
    ["Info", "Tracks", "Cues"].forEach(function (tagName) {
        var tagStarts = metadata.filter(function (elm) { return elm.type === "m" && elm.name === tagName && elm.isEnd === false; }).map(function (elm) { return elm["tagStart"]; });
        var tagStart = tagStarts[0];
        if (typeof tagStart !== "number") {
            return;
        }
        seeks.push({ name: "Seek", type: "m", isEnd: false });
        switch (tagName) {
            case "Info":
                seeks.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x15, 0x49, 0xA9, 0x66]) });
                break;
            case "Tracks":
                seeks.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x16, 0x54, 0xAE, 0x6B]) });
                break;
            case "Cues":
                seeks.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x1C, 0x53, 0xBB, 0x6B]) });
                break;
        }
        seeks.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(tagStart + sizeDiff) });
        seeks.push({ name: "Seek", type: "m", isEnd: true });
    });
    return seeks;
}
function create_seek_from_clusters(clusterPtrs, sizeDiff) {
    var seeks = [];
    clusterPtrs.forEach(function (start) {
        seeks.push({ name: "Seek", type: "m", isEnd: false });
        // [0x1F, 0x43, 0xB6, 0x75] で Cluster 意
        seeks.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x1F, 0x43, 0xB6, 0x75]) });
        seeks.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(start + sizeDiff) });
        seeks.push({ name: "Seek", type: "m", isEnd: true });
    });
    return seeks;
}
function create_cue(cueInfos, sizeDiff) {
    var cues = [];
    cueInfos.forEach(function (_a) {
        var CueTrack = _a.CueTrack, CueClusterPosition = _a.CueClusterPosition, CueTime = _a.CueTime;
        cues.push({ name: "CuePoint", type: "m", isEnd: false });
        cues.push({ name: "CueTime", type: "u", data: createUIntBuffer(CueTime) });
        cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
        cues.push({ name: "CueTrack", type: "u", data: createUIntBuffer(CueTrack) }); // video track
        cues.push({ name: "CueClusterPosition", type: "u", data: createUIntBuffer(CueClusterPosition + sizeDiff) });
        cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
        cues.push({ name: "CuePoint", type: "m", isEnd: true });
    });
    return cues;
}
function insertTag(_metadata, tagName, children, insertHead) {
    if (insertHead === void 0) { insertHead = false; }
    // find the tagname from _metadata
    var idx = -1;
    for (var i = 0; i < _metadata.length; i++) {
        var elm = _metadata[i];
        if (elm.type === "m" && elm.name === tagName && elm.isEnd === false) {
            idx = i;
            break;
        }
    }
    if (idx >= 0) {
        // insert [<CuePoint />] to <Cues />
        Array.prototype.splice.apply(_metadata, [idx + 1, 0].concat(children));
    }
    else if (insertHead) {
        [].concat([{ name: tagName, type: "m", isEnd: false }], children, [{ name: tagName, type: "m", isEnd: true }]).reverse().forEach(function (elm) { _metadata.unshift(elm); });
    }
    else {
        // metadata 末尾に <Cues /> を追加
        // insert <Cues />
        _metadata.push({ name: tagName, type: "m", isEnd: false });
        children.forEach(function (elm) { _metadata.push(elm); });
        _metadata.push({ name: tagName, type: "m", isEnd: true });
    }
}
// alter Buffer.concat - https://github.com/feross/buffer/issues/154
function concat(list) {
    //return Buffer.concat.apply(Buffer, list);
    var i = 0;
    var length = 0;
    for (; i < list.length; ++i) {
        length += list[i].length;
    }
    var buffer = exports.Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
}
exports.concat = concat;
function encodeValueToBuffer(elm) {
    var data = new exports.Buffer(0);
    if (elm.type === "m") {
        return elm;
    }
    switch (elm.type) {
        case "u":
            data = createUIntBuffer(elm.value);
            break;
        case "i":
            data = createIntBuffer(elm.value);
            break;
        case "f":
            data = createFloatBuffer(elm.value);
            break;
        case "s":
            data = new exports.Buffer(elm.value, 'ascii');
            break;
        case "8":
            data = new exports.Buffer(elm.value, 'utf8');
            break;
        case "b":
            data = elm.value;
            break;
        case "d":
            data = new int64_buffer_1.Int64BE(elm.value).toBuffer();
            break;
    }
    return Object.assign({}, elm, { data: data });
}
exports.encodeValueToBuffer = encodeValueToBuffer;
function createUIntBuffer(value) {
    // Big-endian, any size from 1 to 8
    // but js number is float64, so max 6 bit octets
    var bytes = 1;
    for (; value >= Math.pow(2, 8 * bytes); bytes++) { }
    if (bytes >= 7) {
        console.warn("7bit or more bigger uint not supported.");
        return new int64_buffer_1.Uint64BE(value).toBuffer();
    }
    var data = new exports.Buffer(bytes);
    data.writeUIntBE(value, 0, bytes);
    return data;
}
exports.createUIntBuffer = createUIntBuffer;
function createIntBuffer(value) {
    // Big-endian, any size from 1 to 8 octets
    // but js number is float64, so max 6 bit
    var bytes = 1;
    for (; value >= Math.pow(2, 8 * bytes); bytes++) { }
    if (bytes >= 7) {
        console.warn("7bit or more bigger uint not supported.");
        return new int64_buffer_1.Int64BE(value).toBuffer();
    }
    var data = new exports.Buffer(bytes);
    data.writeIntBE(value, 0, bytes);
    return data;
}
exports.createIntBuffer = createIntBuffer;
function createFloatBuffer(value, bytes) {
    if (bytes === void 0) { bytes = 8; }
    // Big-endian, defined for 4 and 8 octets (32, 64 bits)
    // js number is float64 so 8 bytes.
    if (bytes === 8) {
        // 64bit
        var data = new exports.Buffer(8);
        data.writeDoubleBE(value, 0);
        return data;
    }
    else if (bytes === 4) {
        // 32bit
        var data = new exports.Buffer(4);
        data.writeFloatBE(value, 0);
        return data;
    }
    else {
        throw new Error("float type bits must 4bytes or 8bytes");
    }
}
exports.createFloatBuffer = createFloatBuffer;
function convertEBMLDateToJSDate(int64str) {
    if (int64str instanceof Date) {
        return int64str;
    }
    return new Date(new Date("2001-01-01T00:00:00.000Z").getTime() + (Number(int64str) / 1000 / 1000));
}
exports.convertEBMLDateToJSDate = convertEBMLDateToJSDate;
