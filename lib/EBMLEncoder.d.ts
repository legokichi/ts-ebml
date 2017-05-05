import * as EBML from "./EBML";
export default class EBMLEncoder {
    private _buffers;
    private _stack;
    private _schema;
    constructor();
    encode(elms: EBML.EBMLElementBuffer[]): ArrayBuffer;
    private encodeChunk(elm);
    private flush();
    private getSchemaInfo(tagName);
    private writeTag(elm);
    private startTag(elm);
    private endTag(elm);
}
