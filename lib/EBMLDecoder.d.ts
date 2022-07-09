import * as EBML from "./EBML";
export default class EBMLDecoder {
    private _buffer;
    private _tag_stack;
    private _state;
    /**
     * _buffer の先頭からの位置
     */
    private _cursor;
    /**
     * 全体におけるポインタ
     */
    private _total;
    private _schema;
    private _result;
    constructor();
    decode(chunk: ArrayBuffer): EBML.EBMLElementDetail[];
    private readChunk;
    private getSchemaInfo;
    /**
     * vint された parsing tag
     * @return - return false when waiting for more data
     */
    private readTag;
    /**
     * vint された現在のタグの内容の大きさを読み込む
     * @return - return false when waiting for more data
     */
    private readSize;
    /**
     * データ読み込み
     */
    private readContent;
}
