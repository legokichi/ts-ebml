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
  * @param end - if end === false then length is unknown
  */
export declare function encodeTag(tagId: Buffer, tagData: Buffer, unknownSize?: boolean): Buffer;
/**
 * @return - SimpleBlock to WebP Filter
 */
export declare function WebPFrameFilter(elms: EBML.EBMLElementDetail[]): Blob[];
/**
 * WebP ファイルにできる SimpleBlock の パスフィルタ
 */
export declare function WebPBlockFilter(elms: EBML.EBMLElementDetail[]): (EBML.BinaryElement & EBML.ElementDetail & {
    data: Buffer;
})[];
/**
 * @param frame - VP8 BitStream のうち startcode をもつ frame
 * @return - WebP ファイルの ArrayBuffer
 */
export declare function VP8BitStreamToRiffWebPBuffer(frame: Buffer): Buffer;
/**
 * RIFF データチャンクを作る
 */
export declare function createRIFFChunk(FourCC: string, chunk: Buffer): Buffer;
/**
 * convert the metadata from a streaming webm bytestream to a seekable file by inserting Duration, Seekhead and Cues
 * @param originalMetadata - orginal metadata (everything before the clusters start) from media recorder
 * @param duration - Duration (TimecodeScale)
 * @param cues - cue points for clusters
 */
export declare function makeMetadataSeekable(originalMetadata: EBML.EBMLElementDetail[], duration: number, cuesInfo: {
    CueTrack: number;
    CueClusterPosition: number;
    CueTime: number;
}[]): ArrayBuffer;
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
export declare function removeElement(idName: string, metadata: EBML.EBMLElementBuffer[]): void;
/**
 * extract the first occurance of an EBML tag from a flattened array of EBML data.
 * If it's a MasterElement you will also get the content. (everything between start and end)
 * @param idName - name of the EBML Element to extract.
 * @param metadata - array of EBML elements to search
 */
export declare function extractElement(idName: string, metadata: EBML.EBMLElementBuffer[]): EBML.EBMLElementBuffer[];
/**
 * @deprecated
 * metadata に対して duration と seekhead を追加した metadata を返す
 * @param metadata - 変更前の webm における ファイル先頭から 最初の Cluster 要素までの 要素
 * @param duration - Duration (TimecodeScale)
 * @param cues - cue points for clusters
 * @deprecated @param clusterPtrs - 変更前の webm における SeekHead に追加する Cluster 要素 への start pointer
 * @deprecated @param cueInfos - please use cues.
 */
export declare function putRefinedMetaData(metadata: EBML.EBMLElementDetail[], info: {
    duration?: number;
    cues?: {
        CueTrack: number;
        CueClusterPosition: number;
        CueTime: number;
    }[];
    clusterPtrs?: number[];
    cueInfos?: {
        CueTrack: number;
        CueClusterPosition: number;
        CueTime: number;
    }[];
}): ArrayBuffer;
export declare function concat(list: Buffer[]): Buffer;
export declare function encodeValueToBuffer(elm: EBML.MasterElement): EBML.MasterElement;
export declare function encodeValueToBuffer(elm: EBML.ChildElementsValue): EBML.ChildElementBuffer;
export declare function createUIntBuffer(value: number): Buffer;
export declare function createIntBuffer(value: number): Buffer;
export declare function createFloatBuffer(value: number, bytes?: 4 | 8): Buffer;
export declare function convertEBMLDateToJSDate(int64str: number | string | Date): Date;
