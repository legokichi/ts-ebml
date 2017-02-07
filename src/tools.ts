
import * as EBML from "./EBML";

const Buffer: typeof global.Buffer = require("buffer/").Buffer;

export const ebmlBlock: (buf: Buffer)=> EBML.SimpleBlock = require("ebml-block");

/**
 * @return - Complete WebP File Buffer
 */
export function WebPFrameFilter(elms: EBML.EBMLElementDetail[]): Blob[] {
  return WebPBlockFilter(elms).reduce<Blob[]>((lst, elm)=>{
    const o = ebmlBlock(elm.data);
    return o.frames.reduce<Blob[]>((lst, frame)=>{
      // https://developers.Blob.com/speed/webp/docs/riff_container
      const  webpBuf = VP8BitStreamToRiffWebPBuffer(frame);
      const webp = new Blob([webpBuf.buffer], {type: "image/webp"});
      return lst.concat(webp);
    }, lst);
  }, []);
}

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

export function VP8BitStreamToRiffWebPBuffer(frame: Buffer): Buffer {
  const VP8Chunk = createRIFFChunk("VP8 ", frame);
  const WebPChunk = Buffer.concat([
    new Buffer("WEBP", "ascii"),
    VP8Chunk
  ]);
  return createRIFFChunk("RIFF", WebPChunk);
}


export function createRIFFChunk(FourCC: string, chunk: Buffer): Buffer {
  const chunkSize = new Buffer(4);
  chunkSize.writeUInt32LE(chunk.byteLength , 0);
  return Buffer.concat([
    new Buffer(FourCC.substr(0, 4), "ascii"),
    chunkSize,
    chunk,
    new Buffer(chunk.byteLength % 2 === 0 ? 0 : 1) // padding
  ]);
}