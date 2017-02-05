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
    /**
     * @param end - if end === false then length is unknown
     */
    private _encodeTag(tagId, tagData, unknownSize?);
    private writeTag(elm);
    private startTag(elm);
    private endTag(elm);
    static encodeValueToBuffer(elm: EBML.EBMLElementValue): EBML.EBMLElementBuffer;
}
