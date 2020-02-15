import * as EBML from "./EBML";
export default class EBMLEncoder {
    private _buffers;
    private _stack;
    private _schema;
    constructor();
    encode(elms: EBML.EBMLElementBuffer[]): ArrayBuffer;
    private encodeChunk;
    private flush;
    private getSchemaInfo;
    private writeTag;
    private startTag;
    private endTag;
}
