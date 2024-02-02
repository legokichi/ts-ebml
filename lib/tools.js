"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEBMLDateToJSDate = exports.createFloatBuffer = exports.createIntBuffer = exports.createUIntBuffer = exports.encodeValueToBuffer = exports.concat = exports.putRefinedMetaData = exports.extractElement = exports.removeElement = exports.makeMetadataSeekable = exports.createRIFFChunk = exports.VP8BitStreamToRiffWebPBuffer = exports.WebPBlockFilter = exports.WebPFrameFilter = exports.encodeTag = exports.readBlock = exports.ebmlBlock = exports.writeVint = exports.readVint = exports.Buffer = void 0;
/// <reference types="node"/>
var int64_buffer_1 = require("int64-buffer");
var EBMLEncoder_1 = require("./EBMLEncoder");
var _Buffer = require("buffer/");
var _tools = require("ebml/lib/ebml/tools");
var _block = require("ebml-block");
exports.Buffer = _Buffer.Buffer;
exports.readVint = _tools.readVint;
exports.writeVint = _tools.writeVint;
exports.ebmlBlock = _block;
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
/* Original Metadata

 m  0	EBML
 u  1	  EBMLVersion 1
 u  1	  EBMLReadVersion 1
 u  1	  EBMLMaxIDLength 4
 u  1	  EBMLMaxSizeLength 8
 s  1	  DocType webm
 u  1	  DocTypeVersion 4
 u  1	  DocTypeReadVersion 2
 m  0	Segment
 m  1	  Info                                segmentContentStartPos, all CueClusterPositions provided in info.cues will be relative to here and will need adjusted
 u  2	    TimecodeScale 1000000
 8  2	    MuxingApp Chrome
 8  2	    WritingApp Chrome
 m  1	  Tracks                              tracksStartPos
 m  2	    TrackEntry
 u  3	      TrackNumber 1
 u  3	      TrackUID 31790271978391090
 u  3	      TrackType 2
 s  3	      CodecID A_OPUS
 b  3	      CodecPrivate <Buffer 19>
 m  3	      Audio
 f  4	        SamplingFrequency 48000
 u  4	        Channels 1
 m  2	    TrackEntry
 u  3	      TrackNumber 2
 u  3	      TrackUID 24051277436254136
 u  3	      TrackType 1
 s  3	      CodecID V_VP8
 m  3	      Video
 u  4	        PixelWidth 1024
 u  4	        PixelHeight 576
 m  1	  Cluster                             clusterStartPos
 u  2	    Timecode 0
 b  2	    SimpleBlock track:2 timecode:0	keyframe:true	invisible:false	discardable:false	lacing:1
*/
/* Desired Metadata

 m	0 EBML
 u	1   EBMLVersion 1
 u	1   EBMLReadVersion 1
 u	1   EBMLMaxIDLength 4
 u	1   EBMLMaxSizeLength 8
 s	1   DocType webm
 u	1   DocTypeVersion 4
 u	1   DocTypeReadVersion 2
 m	0 Segment
 m	1   SeekHead                            -> This is SeekPosition 0, so all SeekPositions can be calculated as (bytePos - segmentContentStartPos), which is 44 in this case
 m	2     Seek
 b	3       SeekID                          -> Buffer([0x15, 0x49, 0xA9, 0x66])  Info
 u	3       SeekPosition                    -> infoStartPos =
 m	2     Seek
 b	3       SeekID                          -> Buffer([0x16, 0x54, 0xAE, 0x6B])  Tracks
 u	3       SeekPosition { tracksStartPos }
 m	2     Seek
 b	3       SeekID                          -> Buffer([0x1C, 0x53, 0xBB, 0x6B])  Cues
 u	3       SeekPosition { cuesStartPos }
 m	1   Info
 f	2     Duration 32480                    -> overwrite, or insert if it doesn't exist
 u	2     TimecodeScale 1000000
 8	2     MuxingApp Chrome
 8	2     WritingApp Chrome
 m	1   Tracks
 m	2     TrackEntry
 u	3       TrackNumber 1
 u	3       TrackUID 31790271978391090
 u	3       TrackType 2
 s	3       CodecID A_OPUS
 b	3       CodecPrivate <Buffer 19>
 m	3       Audio
 f	4         SamplingFrequency 48000
 u	4         Channels 1
 m	2     TrackEntry
 u	3       TrackNumber 2
 u	3       TrackUID 24051277436254136
 u	3       TrackType 1
 s	3       CodecID V_VP8
 m	3       Video
 u	4         PixelWidth 1024
 u	4         PixelHeight 576
 m  1   Cues                                -> cuesStartPos
 m  2     CuePoint
 u  3       CueTime 0
 m  3       CueTrackPositions
 u  4         CueTrack 1
 u  4         CueClusterPosition 3911
 m  2     CuePoint
 u  3       CueTime 600
 m  3       CueTrackPositions
 u  4         CueTrack 1
 u  4         CueClusterPosition 3911
 m  1   Cluster
 u  2     Timecode 0
 b  2     SimpleBlock track:2 timecode:0	keyframe:true	invisible:false	discardable:false	lacing:1
*/
/**
 * convert the metadata from a streaming webm bytestream to a seekable file by inserting Duration, Seekhead and Cues
 * @param originalMetadata - orginal metadata (everything before the clusters start) from media recorder
 * @param duration - Duration (TimecodeScale)
 * @param cues - cue points for clusters
 */
function makeMetadataSeekable(originalMetadata, duration, cuesInfo) {
    // extract the header, we can reuse this as-is
    var header = extractElement("EBML", originalMetadata);
    var headerSize = encodedSizeOfEbml(header);
    //console.error("Header size: " + headerSize);
    //printElementIds(header);
    // After the header comes the Segment open tag, which in this implementation is always 12 bytes (4 byte id, 8 byte 'unknown length')
    // After that the segment content starts. All SeekPositions and CueClusterPosition must be relative to segmentContentStartPos
    var segmentContentStartPos = headerSize + 12;
    //console.error("segmentContentStartPos: " + segmentContentStartPos);    
    // find the original metadata size, and adjust it for header size and Segment start element so we can keep all positions relative to segmentContentStartPos
    var originalMetadataSize = originalMetadata[originalMetadata.length - 1].dataEnd - segmentContentStartPos;
    //console.error("Original Metadata size: " + originalMetadataSize);
    //printElementIds(originalMetadata);
    // extract the segment info, remove the potentially existing Duration element, and add our own one.
    var info = extractElement("Info", originalMetadata);
    removeElement("Duration", info);
    info.splice(1, 0, { name: "Duration", type: "f", data: createFloatBuffer(duration, 8) });
    var infoSize = encodedSizeOfEbml(info);
    //console.error("Info size: " + infoSize);
    //printElementIds(info);  
    // extract the track info, we can re-use this as is
    var tracks = extractElement("Tracks", originalMetadata);
    var tracksSize = encodedSizeOfEbml(tracks);
    //console.error("Tracks size: " + tracksSize);
    //printElementIds(tracks);  
    var seekHeadSize = 47; // Initial best guess, but could be slightly larger if the Cues element is huge.
    var seekHead = [];
    var cuesSize = 5 + cuesInfo.length * 15; // very rough initial approximation, depends a lot on file size and number of CuePoints                   
    var cues = [];
    var lastSizeDifference = -1; // 
    // The size of SeekHead and Cues elements depends on how many bytes the offsets values can be encoded in.
    // The actual offsets in CueClusterPosition depend on the final size of the SeekHead and Cues elements
    // We need to iteratively converge to a stable solution.
    var maxIterations = 10;
    var _loop_1 = function (i) {
        // SeekHead starts at 0
        var infoStart = seekHeadSize; // Info comes directly after SeekHead
        var tracksStart = infoStart + infoSize; // Tracks comes directly after Info
        var cuesStart = tracksStart + tracksSize; // Cues starts directly after 
        var newMetadataSize = cuesStart + cuesSize; // total size of metadata  
        // This is the offset all CueClusterPositions should be adjusted by due to the metadata size changing.
        var sizeDifference = newMetadataSize - originalMetadataSize;
        // console.error(`infoStart: ${infoStart}, infoSize: ${infoSize}`);
        // console.error(`tracksStart: ${tracksStart}, tracksSize: ${tracksSize}`);
        // console.error(`cuesStart: ${cuesStart}, cuesSize: ${cuesSize}`);
        // console.error(`originalMetadataSize: ${originalMetadataSize}, newMetadataSize: ${newMetadataSize}, sizeDifference: ${sizeDifference}`); 
        // create the SeekHead element
        seekHead = [];
        seekHead.push({ name: "SeekHead", type: "m", isEnd: false });
        seekHead.push({ name: "Seek", type: "m", isEnd: false });
        seekHead.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x15, 0x49, 0xA9, 0x66]) }); // Info
        seekHead.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(infoStart) });
        seekHead.push({ name: "Seek", type: "m", isEnd: true });
        seekHead.push({ name: "Seek", type: "m", isEnd: false });
        seekHead.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x16, 0x54, 0xAE, 0x6B]) }); // Tracks
        seekHead.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(tracksStart) });
        seekHead.push({ name: "Seek", type: "m", isEnd: true });
        seekHead.push({ name: "Seek", type: "m", isEnd: false });
        seekHead.push({ name: "SeekID", type: "b", data: new exports.Buffer([0x1C, 0x53, 0xBB, 0x6B]) }); // Cues
        seekHead.push({ name: "SeekPosition", type: "u", data: createUIntBuffer(cuesStart) });
        seekHead.push({ name: "Seek", type: "m", isEnd: true });
        seekHead.push({ name: "SeekHead", type: "m", isEnd: true });
        seekHeadSize = encodedSizeOfEbml(seekHead);
        //console.error("SeekHead size: " + seekHeadSize);
        //printElementIds(seekHead);  
        // create the Cues element
        cues = [];
        cues.push({ name: "Cues", type: "m", isEnd: false });
        cuesInfo.forEach(function (_a) {
            var CueTrack = _a.CueTrack, CueClusterPosition = _a.CueClusterPosition, CueTime = _a.CueTime;
            cues.push({ name: "CuePoint", type: "m", isEnd: false });
            cues.push({ name: "CueTime", type: "u", data: createUIntBuffer(CueTime) });
            cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
            cues.push({ name: "CueTrack", type: "u", data: createUIntBuffer(CueTrack) });
            //console.error(`CueClusterPosition: ${CueClusterPosition}, Corrected to: ${CueClusterPosition - segmentContentStartPos}  , offset by ${sizeDifference} to become ${(CueClusterPosition - segmentContentStartPos) + sizeDifference - segmentContentStartPos}`);
            // EBMLReader returns CueClusterPosition with absolute byte offsets. The Cues section expects them as offsets from the first level 1 element of the Segment, so we need to adjust it.
            CueClusterPosition -= segmentContentStartPos;
            // We also need to adjust to take into account the change in metadata size from when EBMLReader read the original metadata.
            CueClusterPosition += sizeDifference;
            cues.push({ name: "CueClusterPosition", type: "u", data: createUIntBuffer(CueClusterPosition) });
            cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
            cues.push({ name: "CuePoint", type: "m", isEnd: true });
        });
        cues.push({ name: "Cues", type: "m", isEnd: true });
        cuesSize = encodedSizeOfEbml(cues);
        //console.error("Cues size: " + cuesSize);   
        //console.error("Cue count: " + cuesInfo.length);
        //printElementIds(cues);      
        // If the new MetadataSize is not the same as the previous iteration, we need to run once more.
        if (lastSizeDifference !== sizeDifference) {
            lastSizeDifference = sizeDifference;
            if (i === maxIterations - 1) {
                throw new Error("Failed to converge to a stable metadata size");
            }
        }
        else {
            return "break";
        }
    };
    for (var i = 0; i < maxIterations; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
            break;
    }
    var finalMetadata = [].concat.apply([], [
        header,
        { name: "Segment", type: "m", isEnd: false, unknownSize: true },
        seekHead,
        info,
        tracks,
        cues
    ]);
    var result = new EBMLEncoder_1.default().encode(finalMetadata);
    //printElementIds(finalMetadata);
    //console.error(`Final metadata buffer size: ${result.byteLength}`);
    //console.error(`Final metadata buffer size without header and segment: ${result.byteLength-segmentContentStartPos}`);
    return result;
}
exports.makeMetadataSeekable = makeMetadataSeekable;
/**
 * print all element id names in a list

 * @param metadata - array of EBML elements to print
 *
export function printElementIds(metadata: EBML.EBMLElementBuffer[]) {

  let result: EBML.EBMLElementBuffer[] = [];
  let start: number = -1;

  for (let i = 0; i < metadata.length; i++) {
    console.error("\t id: " + metadata[i].name);
  }
}
*/
/**
 * remove all occurances of an EBML element from an array of elements
 * If it's a MasterElement you will also remove the content. (everything between start and end)
 * @param idName - name of the EBML Element to remove.
 * @param metadata - array of EBML elements to search
 */
function removeElement(idName, metadata) {
    var result = [];
    var start = -1;
    for (var i = 0; i < metadata.length; i++) {
        var element = metadata[i];
        if (element.name === idName) {
            // if it's a Master element, extract the start and end element, and everything in between
            if (element.type === "m") {
                if (!element.isEnd) {
                    start = i;
                }
                else {
                    // we've reached the end, extract the whole thing
                    if (start == -1)
                        throw new Error("Detected " + idName + " closing element before finding the start");
                    metadata.splice(start, i - start + 1);
                    return;
                }
            }
            else {
                // not a Master element, so we've found what we're looking for.
                metadata.splice(i, 1);
                return;
            }
        }
    }
}
exports.removeElement = removeElement;
/**
 * extract the first occurance of an EBML tag from a flattened array of EBML data.
 * If it's a MasterElement you will also get the content. (everything between start and end)
 * @param idName - name of the EBML Element to extract.
 * @param metadata - array of EBML elements to search
 */
function extractElement(idName, metadata) {
    var result = [];
    var start = -1;
    for (var i = 0; i < metadata.length; i++) {
        var element = metadata[i];
        if (element.name === idName) {
            // if it's a Master element, extract the start and end element, and everything in between
            if (element.type === "m") {
                if (!element.isEnd) {
                    start = i;
                }
                else {
                    // we've reached the end, extract the whole thing
                    if (start == -1)
                        throw new Error("Detected " + idName + " closing element before finding the start");
                    result = metadata.slice(start, i + 1);
                    break;
                }
            }
            else {
                // not a Master element, so we've found what we're looking for.
                result.push(metadata[i]);
                break;
            }
        }
    }
    return result;
}
exports.extractElement = extractElement;
/**
 * @deprecated
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
    // |               |        |^inf |                              |
    // |               +segmentSiz(12)+                              |
    // +-ebmlSize(36)--+        |     +-payloadSize(137)-------------+offsetEndDiff+
    //                 |        |     +-newPayloadSize(??)-------------------------+
    //                 |        |     |                                            |
    //                 [Segment][size][Info][size][Duration][size]....[size][value][Cluster]
    //                           ^                                                 |
    //                           |                                                 *??=newPayloadOffsetEnd
    //                           inf
    if (!(payload[payload.length - 1].dataEnd > 0)) {
        throw new Error("metadata dataEnd has wrong number");
    }
    var originalPayloadOffsetEnd = payload[payload.length - 1].dataEnd; // = first cluster ptr
    var ebmlSize = ebml[ebml.length - 1].dataEnd; // = first segment ptr
    var refinedEBMLSize = new EBMLEncoder_1.default().encode(ebml).byteLength;
    var offsetDiff = refinedEBMLSize - ebmlSize;
    var payloadSize = originalPayloadOffsetEnd - payload[0].tagStart;
    var segmentSize = payload[0].tagStart - ebmlSize;
    var segmentOffset = payload[0].tagStart;
    var segmentTagBuf = new exports.Buffer([0x18, 0x53, 0x80, 0x67]); // Segment
    var segmentSizeBuf = new exports.Buffer('01ffffffffffffff', 'hex'); // Segmentの最後の位置は無数の Cluster 依存なので。 writeVint(newPayloadSize).byteLength ではなく、 infinity.
    var _segmentSize = segmentTagBuf.byteLength + segmentSizeBuf.byteLength; // == segmentSize
    var newPayloadSize = payloadSize;
    // We need the size to be stable between two refinements in order for our offsets to be correct
    // Bound the number of possible refinements so we can't go infinate if something goes wrong
    var i;
    for (i = 1; i < 20; i++) {
        var newPayloadOffsetEnd = ebmlSize + _segmentSize + newPayloadSize;
        var offsetEndDiff = newPayloadOffsetEnd - originalPayloadOffsetEnd;
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
    // remove seek info
    /*
    _metadata = _metadata.filter((elm)=> !(
      elm.name === "Seek" ||
      elm.name === "SeekID" ||
      elm.name === "SeekPosition") );
    */
    // working on progress
    //seekhead_children = seekhead_children.concat(create_seekhead(_metadata));
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
function concat(list) {
    return exports.Buffer.concat(list);
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
            data = new int64_buffer_1.Int64BE(elm.value.getTime().toString()).toBuffer();
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
