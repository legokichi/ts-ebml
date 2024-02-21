import * as EBML from "./EBML";
export default class EBMLDecoder {
    private _buffer;
    private _tag_stack;
    private _state;
    /**
     * Position from the beginning of _buffer
     */
    private _cursor;
    /**
     * pointer in the whole
     */
    private _total;
    private _schema;
    private _result;
    constructor();
    decode(chunk: ArrayBuffer): EBML.EBMLElementDetail[];
    private readChunk;
    private getSchemaInfo;
    /**
     * parsing vint-ed tag
     * @return - return false when waiting for more data
     */
    private readTag;
    /**
     * Reads the size of the vint-ed current tag content
     * @return - return false when waiting for more data
     */
    private readSize;
    private readContent;
}
