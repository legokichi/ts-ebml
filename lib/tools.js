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
 * SimpleBlock path filter that can be used for WebP files.
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
 * @param frame - VP8 BitStream frame with startcode
 * @return - ArrayBuffer of WebP file
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
 * Make a RIFF data chunk.
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
 * Return metadata which added duration and seekhead to metadata.
 * @param metadata - Elements from the beginning of the file to the first Cluster element in webm before change
 * @param clusterPtrs - Start pointer to the Cluster element to be added to SeekHead in webm before change.
 * @param duration - Segment > Info > Duration
 */
function putRefinedMetaData(metadata, clusterPtrs, duration) {
    var lastmetadata = metadata[metadata.length - 1];
    if (lastmetadata == null) {
        throw new Error("metadata not found");
    }
    if (lastmetadata.dataEnd < 0) {
        throw new Error("metadata does not have size");
    } // Metadata is indefinite size.
    var metadataSize = lastmetadata.dataEnd; // Size of metadata before rewriting
    var refineMetadata = function (sizeDiff) {
        if (sizeDiff === void 0) { sizeDiff = 0; }
        var _metadata = metadata.slice(0);
        if (typeof duration === "number") {
            // add duration
            for (var i = 0; i < _metadata.length; i++) {
                var elm = _metadata[i];
                if (elm.type === "m" && elm.name === "Info" && elm.isEnd) {
                    var durBuf = new exports.Buffer(4);
                    durBuf.writeFloatBE(duration, 0);
                    var durationElm = { name: "Duration", type: "f", data: durBuf };
                    _metadata.splice(i, 0, durationElm); // <Duration /> was added before </Info>
                    i++; // Increment as much as added <duration /> 
                }
            }
        }
        var seekHead = [];
        seekHead.push({ name: "SeekHead", type: "m" });
        clusterPtrs.forEach(function (start) {
            seekHead.push({ name: "Seek", type: "m" });
            // [0x1F, 0x43, 0xB6, 0x75] means Cluster element
            seekHead.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x1F, 0x43, 0xB6, 0x75]) });
            var posBuf = new exports.Buffer(4); // As it is actually a variable length int, implementation of 4 byte fixed is not good.
            // However, assuming that it is in milliseconds, 0xFFFFFFFF can describe as much as 49 days, so there is no practical problem.
            // Troublesome handling of 64 bit and variable length int with js.
            var offset = start + sizeDiff;
            posBuf.writeUInt32BE(offset, 0);
            seekHead.push({ name: "SeekPosition", type: "u", data: posBuf });
            seekHead.push({ name: "Seek", type: "m", isEnd: true });
        });
        seekHead.push({ name: "SeekHead", type: "m", isEnd: true });
        _metadata = _metadata.concat(seekHead); // Add <SeekHead /> at the end of metadata
        return _metadata;
    };
    var encorder = new EBMLEncoder_1.default();
    // Once you seekhead and check your own size
    var bufs = refineMetadata(0).reduce(function (lst, elm) { return lst.concat(encorder.encode([elm])); }, []);
    var totalByte = bufs.reduce(function (o, buf) { return o + buf.byteLength; }, 0);
    // Reconstruct seekhead considering its own size.
    //console.log("sizeDiff", totalByte - metadataSize);
    return refineMetadata(totalByte - metadataSize);
}
exports.putRefinedMetaData = putRefinedMetaData;
// alter Buffer.concat
function concat(list) {
    var i;
    var length = 0;
    for (i = 0; i < list.length; ++i) {
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
        // As it is actually a variable length int, the design of 4 byte fixed is not good
        case "u":
            data = new exports.Buffer(4);
            data.writeUInt32BE(elm.value, 0);
            break;
        case "i":
            data = new exports.Buffer(4);
            data.writeInt32BE(elm.value, 0);
            break;
        case "f":
            data = new exports.Buffer(8);
            data.writeFloatBE(elm.value, 0);
            break; // 64bit
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
