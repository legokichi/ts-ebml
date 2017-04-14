import {Int64BE} from "int64-buffer";
import * as EBML from "./EBML";
import Encoder from "./EBMLEncoder";


export const Buffer: typeof global.Buffer = require("buffer/").Buffer;

export const readVint: (buffer: Buffer, start: number)=> null | ({length: number; value: number; }) = require("ebml/lib/ebml/tools").readVint;
export const writeVint: (val: number)=> Buffer = require("ebml/lib/ebml/tools").writeVint;

export const ebmlBlock: (buf: Buffer)=> EBML.SimpleBlock = require("ebml-block");
export function readBlock(buf: ArrayBuffer): EBML.SimpleBlock {
  return ebmlBlock(new Buffer(buf));
}

/**
 * @return - SimpleBlock to WebP Filter
 */
export function WebPFrameFilter(elms: EBML.EBMLElementDetail[]): Blob[] {
  return WebPBlockFilter(elms).reduce<Blob[]>((lst, elm)=>{
    const o = ebmlBlock(elm.data);
    return o.frames.reduce<Blob[]>((lst, frame)=>{
      // https://developers.Blob.com/speed/webp/docs/riff_container
      const  webpBuf = VP8BitStreamToRiffWebPBuffer(frame);
      const webp = new Blob([webpBuf], {type: "image/webp"});
      return lst.concat(webp);
    }, lst);
  }, []);
}

/**
 * WebP ファイルにできる SimpleBlock の パスフィルタ
 */
export function WebPBlockFilter(elms: EBML.EBMLElementDetail[]): (EBML.BinaryElement & EBML.ElementDetail & {data: Buffer})[] {
  return elms.reduce<(EBML.BinaryElement & EBML.ElementDetail & {data: Buffer})[]>((lst, elm)=>{
    if(elm.type !== "b"){ return lst; }
    if(elm.name !== "SimpleBlock"){ return lst; }
    const o = ebmlBlock(elm.data);
    const hasWebP = o.frames.some((frame)=>{
      // https://tools.ietf.org/html/rfc6386#section-19.1
      const startcode = frame.slice(3, 6).toString("hex");
      return startcode === "9d012a";
    });
    if(!hasWebP){ return lst; }
    return lst.concat(elm);
  }, []);
}

/**
 * @param frame - VP8 BitStream のうち startcode をもつ frame
 * @return - WebP ファイルの ArrayBuffer
 */
export function VP8BitStreamToRiffWebPBuffer(frame: Buffer): Buffer {
  const VP8Chunk = createRIFFChunk("VP8 ", frame);
  const WebPChunk = concat([
    new Buffer("WEBP", "ascii"),
    VP8Chunk
  ]);
  return createRIFFChunk("RIFF", WebPChunk);
}

/**
 * RIFF データチャンクを作る
 */
export function createRIFFChunk(FourCC: string, chunk: Buffer): Buffer {
  const chunkSize = new Buffer(4);
  chunkSize.writeUInt32LE(chunk.byteLength , 0);
  return concat([
    new Buffer(FourCC.substr(0, 4), "ascii"),
    chunkSize,
    chunk,
    new Buffer(chunk.byteLength % 2 === 0 ? 0 : 1) // padding
  ]);
}

/**
 * metadata に対して duration と seekhead を追加した metadata を返す
 * @param metadata - 変更前の webm における ファイル先頭から 最初の Cluster 要素までの 要素
 * @param clusterPtrs - 変更前の webm における SeekHead に追加する Cluster 要素 への start pointer
 * @param duration - Duration に記載する値
 */
export function putRefinedMetaData(
  metadata: EBML.EBMLElementDetail[],
  clusterPtrs: number[],
  duration?: number
): EBML.EBMLElementBuffer[] {
  const lastmetadata = metadata[metadata.length-1];
  if(lastmetadata == null){ throw new Error("metadata not found"); }
  if(lastmetadata.dataEnd < 0){ throw new Error("metadata does not have size"); } // metadata が 不定サイズ
  const metadataSize = lastmetadata.dataEnd; // 書き換える前の metadata のサイズ
  const refineMetadata = (sizeDiff=0): EBML.EBMLElementBuffer[] =>{
    let _metadata: EBML.EBMLElementBuffer[] = metadata.slice(0);
    if(typeof duration === "number"){
      // duration を追加する
      for(let i=0; i<_metadata.length; i++){
        const elm = _metadata[i];
        if(elm.type === "m" && elm.name === "Info" && elm.isEnd){
          const durBuf = new Buffer(4);
          durBuf.writeFloatBE(duration, 0);
          const durationElm: EBML.ChildElementBuffer = {name: "Duration", type: "f", data: durBuf };
          _metadata.splice(i, 0, durationElm); // </Info> 前に <Duration /> を追加
          i++; // <duration /> 追加した分だけインクリメント
        }
      }
    }
    const seekHead: EBML.EBMLElementBuffer[] = [];
    seekHead.push({name: "SeekHead", type: "m"});
    clusterPtrs.forEach((start)=>{
      seekHead.push({name: "Seek", type: "m"});
      // [0x1F, 0x43, 0xB6, 0x75] で Cluster 意
      seekHead.push({name: "SeekID", type: "b", data: new Buffer([0x1F, 0x43, 0xB6, 0x75]) });
      const posBuf = new Buffer(4); // 実際可変長 int なので 4byte 固定という実装は良くない
      // しかし ms 単位だとすれば 0xFFFFFFFF は 49 日もの時間を記述できるので実用上問題ない
      // 64bit や 可変長 int を js で扱うの面倒
      const offset = start +  sizeDiff;
      posBuf.writeUInt32BE(offset, 0);
      seekHead.push({name: "SeekPosition", type: "u", data: posBuf});
      seekHead.push({name: "Seek", type: "m", isEnd: true});
    });
    seekHead.push({name: "SeekHead", type: "m", isEnd: true});
    _metadata = _metadata.concat(seekHead); // metadata 末尾に <SeekHead /> を追加
    return _metadata;
  };
  const encorder = new Encoder();
  // 一旦 seekhead を作って自身のサイズを調べる
  const bufs = refineMetadata(0).reduce<ArrayBuffer[]>((lst, elm)=> lst.concat(encorder.encode([elm])), []);
  const totalByte = bufs.reduce((o, buf)=> o + buf.byteLength, 0);
  // 自分自身のサイズを考慮した seekhead を再構成する
  //console.log("sizeDiff", totalByte - metadataSize);
  return refineMetadata(totalByte - metadataSize);
}

// alter Buffer.concat
export function concat(list: Buffer[]): Buffer {
  let i;
  let length = 0;
  for (i = 0; i < list.length; ++i) {
    length += list[i].length;
  }

  let buffer = Buffer.allocUnsafe(length);
  let pos = 0;
  for (i = 0; i < list.length; ++i) {
    let buf = list[i];
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
}

export function encodeValueToBuffer(elm: EBML.MasterElement): EBML.MasterElement;
export function encodeValueToBuffer(elm: EBML.ChildElementsValue): EBML.ChildElementBuffer;
export function encodeValueToBuffer(elm: EBML.EBMLElementValue): EBML.EBMLElementBuffer {
  let data = new Buffer(0);
  if(elm.type === "m"){ return elm; }
  switch(elm.type){
    // 実際可変長 int なので 4byte 固定という設計は良くない
    case "u": data = new Buffer(4); data.writeUInt32BE(elm.value, 0); break;
    case "i": data = new Buffer(4); data.writeInt32BE(elm.value, 0); break;
    case "f": data = new Buffer(8); data.writeFloatBE(elm.value, 0); break; // 64bit
    case "s": data = new Buffer(elm.value, 'ascii'); break;
    case "8": data = new Buffer(elm.value, 'utf8'); break;
    case "b": data = elm.value; break;
    case "d": data = new Int64BE(elm.value).toBuffer(); break;
  }
  return Object.assign({}, elm, {data});
}