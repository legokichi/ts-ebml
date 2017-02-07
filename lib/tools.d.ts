/// <reference types="node" />
import * as EBML from "./EBML";
export declare const ebmlBlock: (buf: Buffer) => EBML.SimpleBlock;
/**
 * @return - Complete WebP File Buffer
 */
export declare function WebPFrameFilter(elms: EBML.EBMLElementDetail[]): Blob[];
export declare function WebPBlockFilter(elms: EBML.EBMLElementDetail[]): (EBML.BinaryElement & EBML.ElementDetail & {
    data: Buffer;
})[];
export declare function VP8BitStreamToRiffWebPBuffer(frame: Buffer): Buffer;
export declare function createRIFFChunk(FourCC: string, chunk: Buffer): Buffer;
