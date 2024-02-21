import { Int64BE, Uint64BE } from "int64-buffer";
import * as EBML from "./EBML";
import Encoder from "./EBMLEncoder";
const { tools: _tools } = require("ebml");
const _block = require("ebml-block");

export const readVint: (
  buffer: Buffer,
  start: number
) => null | { length: number; value: number } = _tools.readVint;
export const writeVint: (val: number) => Buffer = _tools.writeVint;

export const ebmlBlock: (buf: Buffer) => EBML.SimpleBlock = _block;
export function readBlock(buf: ArrayBuffer): EBML.SimpleBlock {
  return ebmlBlock(Buffer.from(buf));
}

/**
 * @param end - if end === false then length is unknown
 */
export function encodeTag(
  tagId: Buffer,
  tagData: Buffer,
  unknownSize = false
): Buffer {
  return concat([
    tagId,
    unknownSize
      ? Buffer.from("01ffffffffffffff", "hex")
      : writeVint(tagData.length),
    tagData
  ]);
}

/**
 * @return - SimpleBlock to WebP Filter
 */
export function WebPFrameFilter(elms: EBML.EBMLElementDetail[]): Blob[] {
  return WebPBlockFilter(elms).reduce<Blob[]>((lst, elm) => {
    const o = ebmlBlock(elm.data);
    return o.frames.reduce<Blob[]>((lst, frame) => {
      // https://developers.Blob.com/speed/webp/docs/riff_container
      const webpBuf = VP8BitStreamToRiffWebPBuffer(frame);
      const webp = new Blob([webpBuf], { type: "image/webp" });
      return lst.concat(webp);
    }, lst);
  }, []);
}

/**
 * WebP ファイルにできる SimpleBlock の パスフィルタ
 */
export function WebPBlockFilter(
  elms: EBML.EBMLElementDetail[]
): (EBML.BinaryElement & EBML.ElementDetail & { data: Buffer })[] {
  return elms.reduce<
    (EBML.BinaryElement & EBML.ElementDetail & { data: Buffer })[]
  >((lst, elm) => {
    if (elm.type !== "b") {
      return lst;
    }
    if (elm.name !== "SimpleBlock") {
      return lst;
    }
    const o = ebmlBlock(elm.data);
    const hasWebP = o.frames.some((frame) => {
      // https://tools.ietf.org/html/rfc6386#section-19.1
      const startcode = frame.subarray(3, 6).toString("hex");
      return startcode === "9d012a";
    });
    if (!hasWebP) {
      return lst;
    }
    return lst.concat(elm);
  }, []);
}

/**
 * @param frame - VP8 BitStream のうち startcode をもつ frame
 * @return - WebP ファイルの ArrayBuffer
 */
export function VP8BitStreamToRiffWebPBuffer(frame: Buffer): Buffer {
  const VP8Chunk = createRIFFChunk("VP8 ", frame);
  const WebPChunk = concat([Buffer.from("WEBP", "ascii"), VP8Chunk]);
  return createRIFFChunk("RIFF", WebPChunk);
}

/**
 * RIFF データチャンクを作る
 */
export function createRIFFChunk(FourCC: string, chunk: Buffer): Buffer {
  const chunkSize = Buffer.alloc(4);
  chunkSize.writeUInt32LE(chunk.byteLength, 0);
  return concat([
    Buffer.from(FourCC.substring(0, 4), "ascii"),
    chunkSize,
    chunk,
    // padding
    Buffer.alloc(chunk.byteLength % 2 === 0 ? 0 : 1)
  ]);
}

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
 m  1	  Info                                segmentContentStartPos, all CueClusterPositions provided in
                                              info.cues will be relative to here and will need adjusted
 u  2	    TimestampScale 1000000
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
 u  2	    Timestamp 0
 b  2	    SimpleBlock track:2 timestamp:0	keyframe:true	invisible:false	discardable:false	lacing:1
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
 m	1   SeekHead                            -> This is SeekPosition 0, so all SeekPositions can be calculated as
                                               (bytePos - segmentContentStartPos), which is 44 in this case
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
 u	2     TimestampScale 1000000
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
 u  2     Timestamp 0
 b  2     SimpleBlock track:2 timestamp:0	keyframe:true	invisible:false	discardable:false	lacing:1
*/

/**
 * convert the metadata from a streaming webm bytestream to a seekable file by inserting Duration, Seekhead and Cues
 * @param originalMetadata - orginal metadata (everything before the clusters start) from media recorder
 * @param duration - Duration (TimestampScale)
 * @param cuesInfo - cue points for clusters
 * @param cuesOffset - extra space to leave before cue points
 * @param cuesPosition - location for cue points (if zero, put after tracks metadata)
 */
export function makeMetadataSeekable(
  originalMetadata: EBML.EBMLElementDetail[],
  duration: number,
  cuesInfo: { CueTrack: number; CueClusterPosition: number; CueTime: number }[],
  cuesOffset: number = 0,
  cuesPosition: number = 0
): ArrayBuffer {
  // extract the header, we can reuse this as-is
  const header = extractElement("EBML", originalMetadata);
  const headerSize = encodedSizeOfEbml(header);
  //console.error("Header size: " + headerSize);
  //printElementIds(header);

  // After the header comes the Segment open tag, which in this implementation is always 12 bytes (4 byte id, 8 byte 'unknown length')
  // After that the segment content starts. All SeekPositions and CueClusterPosition must be relative to segmentContentStartPos
  const segmentContentStartPos = headerSize + 12;
  //console.error("segmentContentStartPos: " + segmentContentStartPos);

  // find the original metadata size, and adjust it for header size and Segment start element
  // so we can keep all positions relative to segmentContentStartPos

  const originalMetadataSize =
    originalMetadata[originalMetadata.length - 1].dataEnd -
    segmentContentStartPos;
  //console.error("Original Metadata size: " + originalMetadataSize);
  //printElementIds(originalMetadata);

  // extract the segment info, remove the potentially existing Duration element, and add our own one.
  const info: EBML.EBMLElementBuffer[] = extractElement(
    "Info",
    originalMetadata
  );
  removeElement("Duration", info);
  info.splice(1, 0, {
    name: "Duration",
    type: "f",
    data: createFloatBuffer(duration, 8)
  });
  const infoSize = encodedSizeOfEbml(info);
  //console.error("Info size: " + infoSize);
  //printElementIds(info);

  // extract the track info, we can re-use this as is
  const tracks = extractElement("Tracks", originalMetadata);
  const tracksSize = encodedSizeOfEbml(tracks);
  //console.error("Tracks size: " + tracksSize);
  //printElementIds(tracks);

  // Initial best guess, but could be slightly larger if the Cues element is huge.
  let seekHeadSize = 47;
  let seekHead: EBML.EBMLElementBuffer[] = [];

  // very rough initial approximation,
  let cuesSize = 5 + cuesInfo.length * 15;
  // depends a lot on file size and number of CuePoints
  let cues: EBML.EBMLElementBuffer[] = [];

  let lastSizeDifference = -1;

  // The size of SeekHead and Cues elements depends on how many bytes the offsets values can be encoded in.
  // The actual offsets in CueClusterPosition depend on the final size of the SeekHead and Cues elements
  // We need to iteratively converge to a stable solution.

  const maxIterations = 10;
  for (let i = 0; i < maxIterations; i++) {
    // SeekHead starts at 0
    // Info comes directly after SeekHead
    const infoStart = seekHeadSize;
    // Tracks comes directly after Info
    const tracksStart = infoStart + infoSize;
    let cuesStart = 0;
    let newMetadataSize = 0;
    if (cuesPosition) {
      // Cues position is before segment open tag
      cuesStart = cuesPosition - segmentContentStartPos;
      // Cues outside initial metadata
      newMetadataSize = tracksStart + tracksSize;
    } else {
      // Cues starts directly after
      cuesStart = tracksStart + tracksSize;
      // total size of metadata
      newMetadataSize = cuesStart + cuesSize;
    }

    // This is the offset all CueClusterPositions should be adjusted by due to the metadata size changing.
    const sizeDifference = newMetadataSize - originalMetadataSize;
    // console.error(`infoStart: ${infoStart}, infoSize: ${infoSize}`);
    // console.error(`tracksStart: ${tracksStart}, tracksSize: ${tracksSize}`);
    // console.error(`cuesStart: ${cuesStart}, cuesSize: ${cuesSize}`);
    // tslint:disable-next-line:max-line-length
    // console.error(`originalMetadataSize: ${originalMetadataSize}, ` + `newMetadataSize: ${newMetadataSize}, sizeDifference: ${sizeDifference}`);

    // create the SeekHead element
    seekHead = [];
    seekHead.push({ name: "SeekHead", type: "m", isEnd: false });
    seekHead.push({ name: "Seek", type: "m", isEnd: false });
    // Info
    seekHead.push({
      name: "SeekID",
      type: "b",
      data: Buffer.from([0x15, 0x49, 0xa9, 0x66])
    });
    seekHead.push({
      name: "SeekPosition",
      type: "u",
      data: createUIntBuffer(infoStart)
    });
    seekHead.push({ name: "Seek", type: "m", isEnd: true });
    seekHead.push({ name: "Seek", type: "m", isEnd: false });
    // Tracks
    seekHead.push({
      name: "SeekID",
      type: "b",
      data: Buffer.from([0x16, 0x54, 0xae, 0x6b])
    });
    seekHead.push({
      name: "SeekPosition",
      type: "u",
      data: createUIntBuffer(tracksStart)
    });
    seekHead.push({ name: "Seek", type: "m", isEnd: true });
    seekHead.push({ name: "Seek", type: "m", isEnd: false });
    // Cues
    seekHead.push({
      name: "SeekID",
      type: "b",
      data: Buffer.from([0x1c, 0x53, 0xbb, 0x6b])
    });
    seekHead.push({
      name: "SeekPosition",
      type: "u",
      data: createUIntBuffer(cuesStart)
    });
    seekHead.push({ name: "Seek", type: "m", isEnd: true });
    seekHead.push({ name: "SeekHead", type: "m", isEnd: true });

    seekHeadSize = encodedSizeOfEbml(seekHead);
    //console.error("SeekHead size: " + seekHeadSize);
    //printElementIds(seekHead);

    // create the Cues element
    cues = [];
    cues.push({ name: "Cues", type: "m", isEnd: false });
    for (const { CueTrack, CueClusterPosition, CueTime } of cuesInfo) {
      cues.push({ name: "CuePoint", type: "m", isEnd: false });
      cues.push({
        name: "CueTime",
        type: "u",
        data: createUIntBuffer(CueTime)
      });
      cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
      cues.push({
        name: "CueTrack",
        type: "u",
        data: createUIntBuffer(CueTrack)
      });
      // tslint:disable-next-line:max-line-length
      //console.error(`CueClusterPosition: ${CueClusterPosition}, Corrected to: ${CueClusterPosition - segmentContentStartPos}  , offset by ${sizeDifference} to become ${(CueClusterPosition - segmentContentStartPos) + sizeDifference - segmentContentStartPos}`);
      // EBMLReader returns CueClusterPosition with absolute byte offsets.
      // The Cues section expects them as offsets from the first level 1 element of the Segment, so we need to adjust it.
      let _CueClusterPosition = CueClusterPosition - segmentContentStartPos;
      if (cuesOffset) {
        // Leave space before cues.
        _CueClusterPosition += cuesOffset;
      } else {
        // We also need to adjust to take into account the change in metadata size from when EBMLReader read the original metadata.
        _CueClusterPosition += sizeDifference;
      }
      cues.push({
        name: "CueClusterPosition",
        type: "u",
        data: createUIntBuffer(_CueClusterPosition)
      });
      cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
      cues.push({ name: "CuePoint", type: "m", isEnd: true });
    }
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
    } else {
      // We're done! Construct the new metadata from all individual components and return.
      //console.error(`Final size: ${newMetadataSize}, difference: ${sizeDifference}`);
      break;
    }
  }

  const finalMetadata: EBML.EBMLElementDetail[] = [].concat.apply([], [
    header,
    { name: "Segment", type: "m", isEnd: false, unknownSize: true },
    seekHead,
    info,
    tracks,
    cuesPosition ? [] : cues
  ] as Array<any>);

  const result = new Encoder().encode(finalMetadata);
  //printElementIds(finalMetadata);
  //console.error(`Final metadata buffer size: ${result.byteLength}`);
  //console.error(`Final metadata buffer size without header and segment: ${result.byteLength-segmentContentStartPos}`);
  return result;
}

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
export function removeElement(
  idName: string,
  metadata: EBML.EBMLElementBuffer[]
) {
  // const result: EBML.EBMLElementBuffer[] = [];
  let start: number = -1;

  for (let i = 0; i < metadata.length; i++) {
    const element = metadata[i];

    if (element.name === idName) {
      // if it's a Master element, extract the start and end element, and everything in between
      if (element.type === "m") {
        if (!element.isEnd) {
          start = i;
        } else {
          // we've reached the end, extract the whole thing
          if (start === -1) {
            throw new Error(
              `Detected ${idName} closing element before finding the start`
            );
          }

          metadata.splice(start, i - start + 1);
          return;
        }
      } else {
        // not a Master element, so we've found what we're looking for.
        metadata.splice(i, 1);
        return;
      }
    }
  }
}

/**
 * extract the first occurance of an EBML tag from a flattened array of EBML data.
 * If it's a MasterElement you will also get the content. (everything between start and end)
 * @param idName - name of the EBML Element to extract.
 * @param metadata - array of EBML elements to search
 */
export function extractElement(
  idName: string,
  metadata: EBML.EBMLElementBuffer[]
): EBML.EBMLElementBuffer[] {
  let result: EBML.EBMLElementBuffer[] = [];
  let start: number = -1;

  for (let i = 0; i < metadata.length; i++) {
    const element = metadata[i];

    if (element.name === idName) {
      // if it's a Master element, extract the start and end element, and everything in between
      if (element.type === "m") {
        if (!element.isEnd) {
          start = i;
        } else {
          // we've reached the end, extract the whole thing
          if (start === -1) {
            throw new Error(
              `Detected ${idName} closing element before finding the start`
            );
          }

          result = metadata.slice(start, i + 1);
          break;
        }
      } else {
        // not a Master element, so we've found what we're looking for.
        result.push(metadata[i]);
        break;
      }
    }
  }

  return result;
}

/**
 * @deprecated
 * metadata に対して duration と seekhead を追加した metadata を返す
 * @param metadata - 変更前の webm における ファイル先頭から 最初の Cluster 要素までの 要素
 * @param duration - Duration (TimestampScale)
 * @param cues - cue points for clusters
 * @deprecated @param clusterPtrs - 変更前の webm における SeekHead に追加する Cluster 要素 への start pointer
 * @deprecated @param cueInfos - please use cues.
 */
export function putRefinedMetaData(
  metadata: EBML.EBMLElementDetail[],
  info: {
    duration?: number;
    cues?: { CueTrack: number; CueClusterPosition: number; CueTime: number }[];
    clusterPtrs?: number[];
    cueInfos?: {
      CueTrack: number;
      CueClusterPosition: number;
      CueTime: number;
    }[];
  }
): ArrayBuffer {
  if (Array.isArray(info.cueInfos) && !Array.isArray(info.cues)) {
    console.warn(
      "putRefinedMetaData: info.cueInfos property is deprecated. please use info.cues"
    );
    info.cues = info.cueInfos;
  }
  let ebml: EBML.EBMLElementDetail[] = [];
  let payload: EBML.EBMLElementDetail[] = [];
  for (let i = 0; i < metadata.length; i++) {
    const elm = metadata[i];
    if (elm.type === "m" && elm.name === "Segment") {
      ebml = metadata.slice(0, i);
      payload = metadata.slice(i);
      if (elm.unknownSize) {
        // remove segment tag
        payload.shift();
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
  // first cluster ptr
  const originalPayloadOffsetEnd = payload[payload.length - 1].dataEnd;
  // first segment ptr
  const ebmlSize = ebml[ebml.length - 1].dataEnd;
  const refinedEBMLSize = new Encoder().encode(ebml).byteLength;
  const offsetDiff = refinedEBMLSize - ebmlSize;
  const payloadSize = originalPayloadOffsetEnd - payload[0].tagStart;
  // const segmentSize = payload[0].tagStart - ebmlSize;
  // const segmentOffset = payload[0].tagStart;
  // Segment
  const segmentTagBuf = Buffer.from([0x18, 0x53, 0x80, 0x67]);
  // Segmentの最後の位置は無数の Cluster 依存なので。 writeVint(newPayloadSize).byteLength ではなく、 infinity.
  const segmentSizeBuf = Buffer.from("01ffffffffffffff", "hex");
  // _segmentSize === segmentSize
  const _segmentSize = segmentTagBuf.byteLength + segmentSizeBuf.byteLength;
  let newPayloadSize = payloadSize;
  // We need the size to be stable between two refinements in order for our offsets to be correct
  // Bound the number of possible refinements so we can't go infinate if something goes wrong
  const count = 20;
  for (let i = 1; i < count; i++) {
    const newPayloadOffsetEnd = ebmlSize + _segmentSize + newPayloadSize;
    const offsetEndDiff = newPayloadOffsetEnd - originalPayloadOffsetEnd;
    const sizeDiff = offsetDiff + offsetEndDiff;
    const refined = refineMetadata(payload, sizeDiff, info);
    // 一旦 seekhead を作って自身のサイズを調べる
    const newNewRefinedSize = new Encoder().encode(refined).byteLength;
    if (newNewRefinedSize === newPayloadSize) {
      // Size is stable
      return new Encoder().encode(
        ([] as EBML.EBMLElementBuffer[]).concat(
          ebml,
          [{ type: "m", name: "Segment", isEnd: false, unknownSize: true }],
          refined
        )
      );
    }
    newPayloadSize = newNewRefinedSize;
  }
  throw new Error(
    "unable to refine metadata, stable size could not be found in " +
      count +
      " iterations!"
  );
}
// Given a list of EBMLElementBuffers, returns their encoded size in bytes
function encodedSizeOfEbml(refinedMetaData: EBML.EBMLElementBuffer[]): number {
  const encorder = new Encoder();
  return refinedMetaData
    .reduce<ArrayBuffer[]>((lst, elm) => lst.concat(encorder.encode([elm])), [])
    .reduce((o, buf) => o + buf.byteLength, 0);
}

function refineMetadata(
  mesetadata: EBML.EBMLElementDetail[],
  sizeDiff: number,
  info: {
    duration?: number;
    clusterPtrs?: number[];
    cues?: { CueTrack: number; CueClusterPosition: number; CueTime: number }[];
  }
): EBML.EBMLElementBuffer[] {
  const { duration, clusterPtrs, cues } = info;
  const _metadata: EBML.EBMLElementBuffer[] = mesetadata.slice(0);
  if (typeof duration === "number") {
    // duration を追加する
    let overwrited = false;
    for (const elm of _metadata) {
      if (elm.type === "f" && elm.name === "Duration") {
        overwrited = true;
        elm.data = createFloatBuffer(duration, 8);
      }
    }
    if (!overwrited) {
      insertTag(_metadata, "Info", [
        { name: "Duration", type: "f", data: createFloatBuffer(duration, 8) }
      ]);
    }
  }
  if (Array.isArray(cues)) {
    insertTag(_metadata, "Cues", create_cue(cues, sizeDiff));
  }

  let seekhead_children: EBML.EBMLElementBuffer[] = [];
  if (Array.isArray(clusterPtrs)) {
    console.warn(
      "append cluster pointers to seekhead is deprecated. please use cues"
    );
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
/*
function create_seekhead(
  metadata: (EBML.EBMLElementDetail | EBML.EBMLElementBuffer)[],
  sizeDiff: number
): EBML.EBMLElementBuffer[] {
  const seeks: EBML.EBMLElementBuffer[] = [];
  ["Info", "Tracks", "Cues"].forEach((tagName) => {
    const tagStarts = metadata
      .filter(
        (elm) => elm.type === "m" && elm.name === tagName && elm.isEnd === false
      )
      .map((elm) => elm["tagStart"]);
    const tagStart = tagStarts[0];
    if (typeof tagStart !== "number") {
      return;
    }
    seeks.push({ name: "Seek", type: "m", isEnd: false });
    switch (tagName) {
      case "Info":
        seeks.push({
          name: "SeekID",
          type: "b",
          data: Buffer.from([0x15, 0x49, 0xa9, 0x66])
        });
        break;
      case "Tracks":
        seeks.push({
          name: "SeekID",
          type: "b",
          data: Buffer.from([0x16, 0x54, 0xae, 0x6b])
        });
        break;
      case "Cues":
        seeks.push({
          name: "SeekID",
          type: "b",
          data: Buffer.from([0x1c, 0x53, 0xbb, 0x6b])
        });
        break;
    }
    seeks.push({
      name: "SeekPosition",
      type: "u",
      data: createUIntBuffer(tagStart + sizeDiff)
    });
    seeks.push({ name: "Seek", type: "m", isEnd: true });
  });
  return seeks;
}
*/
function create_seek_from_clusters(
  clusterPtrs: number[],
  sizeDiff: number
): EBML.EBMLElementBuffer[] {
  const seeks: EBML.EBMLElementBuffer[] = [];
  for (const start of clusterPtrs) {
    seeks.push({ name: "Seek", type: "m", isEnd: false });
    // [0x1F, 0x43, 0xB6, 0x75] で Cluster 意
    seeks.push({
      name: "SeekID",
      type: "b",
      data: Buffer.from([0x1f, 0x43, 0xb6, 0x75])
    });
    seeks.push({
      name: "SeekPosition",
      type: "u",
      data: createUIntBuffer(start + sizeDiff)
    });
    seeks.push({ name: "Seek", type: "m", isEnd: true });
  }
  return seeks;
}

function create_cue(
  cueInfos: { CueTrack: number; CueClusterPosition: number; CueTime: number }[],
  sizeDiff: number
): EBML.EBMLElementBuffer[] {
  const cues: EBML.EBMLElementBuffer[] = [];
  for (const { CueTrack, CueClusterPosition, CueTime } of cueInfos) {
    cues.push({ name: "CuePoint", type: "m", isEnd: false });
    cues.push({ name: "CueTime", type: "u", data: createUIntBuffer(CueTime) });
    cues.push({ name: "CueTrackPositions", type: "m", isEnd: false });
    // video track
    cues.push({
      name: "CueTrack",
      type: "u",
      data: createUIntBuffer(CueTrack)
    });
    cues.push({
      name: "CueClusterPosition",
      type: "u",
      data: createUIntBuffer(CueClusterPosition + sizeDiff)
    });
    cues.push({ name: "CueTrackPositions", type: "m", isEnd: true });
    cues.push({ name: "CuePoint", type: "m", isEnd: true });
  }
  return cues;
}

function insertTag(
  _metadata: EBML.EBMLElementBuffer[],
  tagName: string,
  children: EBML.EBMLElementBuffer[],
  insertHead: boolean = false
): void {
  // find the tagname from _metadata
  let idx = -1;
  for (let i = 0; i < _metadata.length; i++) {
    const elm = _metadata[i];
    if (elm.type === "m" && elm.name === tagName && !elm.isEnd) {
      idx = i;
      break;
    }
  }
  if (idx >= 0) {
    // insert [<CuePoint />] to <Cues />
    Array.prototype.splice.apply(
      _metadata,
      ([idx + 1, 0] as Array<any>).concat(children) as any
    );
  } else if (insertHead) {
    const elms = ([] as EBML.EBMLElementBuffer[]).concat(
      [{ name: tagName, type: "m", isEnd: false }],
      children,
      [{ name: tagName, type: "m", isEnd: true }]
    );
    elms.reverse();
    for (const elm of elms) {
      _metadata.unshift(elm);
    }
  } else {
    // metadata 末尾に <Cues /> を追加
    // insert <Cues />
    _metadata.push({ name: tagName, type: "m", isEnd: false });
    for (const elm of children) {
      _metadata.push(elm);
    }
    _metadata.push({ name: tagName, type: "m", isEnd: true });
  }
}

export function concat(list: Buffer[]): Buffer {
  return Buffer.concat(list);
}

export function encodeValueToBuffer(
  elm: EBML.MasterElement
): EBML.MasterElement;
export function encodeValueToBuffer(
  elm: EBML.ChildElementsValue
): EBML.ChildElementBuffer;
export function encodeValueToBuffer(
  elm: EBML.EBMLElementValue
): EBML.EBMLElementBuffer {
  let data = Buffer.alloc(0);
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
      data = Buffer.from(elm.value, "ascii");
      break;
    case "8":
      data = Buffer.from(elm.value, "utf8");
      break;
    case "b":
      data = elm.value;
      break;
    case "d":
      data = new Int64BE(elm.value.getTime().toString()).toBuffer();
      break;
  }
  return Object.assign({}, elm, { data });
}

export function createUIntBuffer(value: number): Buffer {
  // Big-endian, any size from 1 to 8
  // but js number is float64, so max 6 bit octets
  let bytes: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  for (; value >= Math.pow(2, 8 * bytes); bytes++) {
    void 0;
  }
  if (bytes >= 7) {
    console.warn("7bit or more bigger uint not supported.");
    return new Uint64BE(value).toBuffer();
  }
  const data = Buffer.alloc(bytes);
  data.writeUIntBE(value, 0, bytes);
  return data;
}

export function createIntBuffer(value: number): Buffer {
  // Big-endian, any size from 1 to 8 octets
  // but js number is float64, so max 6 bit
  let bytes: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  /* eslint no-empty: off */
  for (; value >= Math.pow(2, 8 * bytes); bytes++) {}
  if (bytes >= 7) {
    console.warn("7bit or more bigger uint not supported.");
    return new Int64BE(value).toBuffer();
  }
  const data = Buffer.alloc(bytes);
  data.writeIntBE(value, 0, bytes);
  return data;
}

export function createFloatBuffer(value: number, bytes: 4 | 8 = 8): Buffer {
  // Big-endian, defined for 4 and 8 octets (32, 64 bits)
  // js number is float64 so 8 bytes.
  if (bytes === 8) {
    // 64bit
    const data = Buffer.alloc(8);
    data.writeDoubleBE(value, 0);
    return data;
  } else if (bytes === 4) {
    // 32bit
    const data = Buffer.alloc(4);
    data.writeFloatBE(value, 0);
    return data;
  } else {
    throw new Error("float type bits must 4bytes or 8bytes");
  }
}

export function convertEBMLDateToJSDate(
  int64str: number | string | Date
): Date {
  if (int64str instanceof Date) {
    return int64str;
  }
  return new Date(
    new Date("2001-01-01T00:00:00.000Z").getTime() +
      Number(int64str) / 1000 / 1000
  );
}
