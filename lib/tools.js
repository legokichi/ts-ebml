"use strict";
var Buffer = require("buffer/").Buffer;
exports.ebmlBlock = require("ebml-block");
/**
 * @return - Complete WebP File Buffer
 */
function WebPFrameFilter(elms) {
    return WebPBlockFilter(elms).reduce(function (lst, elm) {
        var o = exports.ebmlBlock(elm.data);
        return o.frames.reduce(function (lst, frame) {
            // https://developers.Blob.com/speed/webp/docs/riff_container
            var webpBuf = VP8BitStreamToRiffWebPBuffer(frame);
            var webp = new Blob([webpBuf.buffer], { type: "image/webp" });
            return lst.concat(webp);
        }, lst);
    }, []);
}
exports.WebPFrameFilter = WebPFrameFilter;
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
function VP8BitStreamToRiffWebPBuffer(frame) {
    var VP8Chunk = createRIFFChunk("VP8 ", frame);
    var WebPChunk = Buffer.concat([
        new Buffer("WEBP", "ascii"),
        VP8Chunk
    ]);
    return createRIFFChunk("RIFF", WebPChunk);
}
exports.VP8BitStreamToRiffWebPBuffer = VP8BitStreamToRiffWebPBuffer;
function createRIFFChunk(FourCC, chunk) {
    var chunkSize = new Buffer(4);
    chunkSize.writeUInt32LE(chunk.byteLength, 0);
    return Buffer.concat([
        new Buffer(FourCC.substr(0, 4), "ascii"),
        chunkSize,
        chunk,
        new Buffer(chunk.byteLength % 2 === 0 ? 0 : 1) // padding
    ]);
}
exports.createRIFFChunk = createRIFFChunk;
