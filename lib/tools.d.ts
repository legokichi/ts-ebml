/// <reference types="node" />
import * as EBML from "./EBML";
export declare const Buffer: typeof global.Buffer;
export declare const readVint: (buffer: Buffer, start: number) => null | ({
    length: number;
    value: number;
});
export declare const writeVint: (val: number) => Buffer;
export declare const ebmlBlock: (buf: Buffer) => EBML.SimpleBlock;
export declare function readBlock(buf: ArrayBuffer): EBML.SimpleBlock;
/**
 * @return - SimpleBlock to WebP Filter
 */
export declare function WebPFrameFilter(elms: EBML.EBMLElementDetail[]): Blob[];
/**
 * SimpleBlock path filter that can be used for WebP files.
 */
export declare function WebPBlockFilter(elms: EBML.EBMLElementDetail[]): (EBML.BinaryElement & EBML.ElementDetail & {
    data: Buffer;
})[];
/**
 * @param frame - VP8 BitStream frame with startcode
 * @return - ArrayBuffer of WebP file
 */
export declare function VP8BitStreamToRiffWebPBuffer(frame: Buffer): Buffer;
/**
 * Make a RIFF data chunk.
 */
export declare function createRIFFChunk(FourCC: string, chunk: Buffer): Buffer;
/**
 * Return metadata which added duration and seekhead to metadata.
 * @param metadata - Elements from the beginning of the file to the first Cluster element in webm before change
 * @param clusterPtrs - Start pointer to the Cluster element to be added to SeekHead in webm before change.
 * @param duration - Segment > Info > Duration
 */
export declare function putRefinedMetaData(metadata: EBML.EBMLElementDetail[], clusterPtrs: number[], duration?: number): EBML.EBMLElementBuffer[];
export declare function concat(list: Buffer[]): Buffer;
export declare function encodeValueToBuffer(elm: EBML.MasterElement): EBML.MasterElement;
export declare function encodeValueToBuffer(elm: EBML.ChildElementsValue): EBML.ChildElementBuffer;
