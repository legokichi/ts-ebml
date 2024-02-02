"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = require("./tools");
var int64_buffer_1 = require("int64-buffer");
var tools = require("./tools");
var schema = require("matroska/lib/schema");
var byEbmlID = schema.byEbmlID;
// https://www.matroska.org/technical/specs/index.html
var State;
(function (State) {
    State[State["STATE_TAG"] = 1] = "STATE_TAG";
    State[State["STATE_SIZE"] = 2] = "STATE_SIZE";
    State[State["STATE_CONTENT"] = 3] = "STATE_CONTENT";
})(State || (State = {}));
var EBMLDecoder = /** @class */ (function () {
    function EBMLDecoder() {
        this._buffer = new tools_1.Buffer(0);
        this._tag_stack = [];
        this._state = State.STATE_TAG;
        this._cursor = 0;
        this._total = 0;
        this._schema = byEbmlID;
        this._result = [];
    }
    EBMLDecoder.prototype.decode = function (chunk) {
        this.readChunk(chunk);
        var diff = this._result;
        this._result = [];
        return diff;
    };
    EBMLDecoder.prototype.readChunk = function (chunk) {
        // 読みかけの(読めなかった) this._buffer と 新しい chunk を合わせて読み直す
        this._buffer = tools.concat([this._buffer, new tools_1.Buffer(chunk)]);
        while (this._cursor < this._buffer.length) {
            // console.log(this._cursor, this._total, this._tag_stack);
            if (this._state === State.STATE_TAG && !this.readTag()) {
                break;
            }
            if (this._state === State.STATE_SIZE && !this.readSize()) {
                break;
            }
            if (this._state === State.STATE_CONTENT && !this.readContent()) {
                break;
            }
        }
    };
    EBMLDecoder.prototype.getSchemaInfo = function (tagNum) {
        return this._schema[tagNum] || {
            name: "unknown",
            level: -1,
            type: "unknown",
            description: "unknown"
        };
    };
    /**
     * vint された parsing tag
     * @return - return false when waiting for more data
     */
    EBMLDecoder.prototype.readTag = function () {
        // tag.length が buffer の外にある
        if (this._cursor >= this._buffer.length) {
            return false;
        }
        // read ebml id vint without first byte
        var tag = tools_1.readVint(this._buffer, this._cursor);
        // tag が読めなかった
        if (tag == null) {
            return false;
        }
        // >>>>>>>>>
        // tag 識別子
        //const tagStr = this._buffer.toString("hex", this._cursor, this._cursor + tag.length);
        //const tagNum = parseInt(tagStr, 16);
        // 上と等価
        var buf = this._buffer.slice(this._cursor, this._cursor + tag.length);
        var tagNum = buf.reduce(function (o, v, i, arr) { return o + v * Math.pow(16, 2 * (arr.length - 1 - i)); }, 0);
        var schema = this.getSchemaInfo(tagNum);
        var tagObj = {
            EBML_ID: tagNum.toString(16),
            schema: schema,
            type: schema.type,
            name: schema.name,
            level: schema.level,
            tagStart: this._total,
            tagEnd: this._total + tag.length,
            sizeStart: this._total + tag.length,
            sizeEnd: null,
            dataStart: null,
            dataEnd: null,
            dataSize: null,
            data: null
        };
        // | tag: vint | size: vint | data: Buffer(size) |
        this._tag_stack.push(tagObj);
        // <<<<<<<<
        // ポインタを進める
        this._cursor += tag.length;
        this._total += tag.length;
        // 読み込み状態変更
        this._state = State.STATE_SIZE;
        return true;
    };
    /**
     * vint された現在のタグの内容の大きさを読み込む
     * @return - return false when waiting for more data
     */
    EBMLDecoder.prototype.readSize = function () {
        // tag.length が buffer の外にある
        if (this._cursor >= this._buffer.length) {
            return false;
        }
        // read ebml datasize vint without first byte
        var size = tools_1.readVint(this._buffer, this._cursor);
        // まだ読めない
        if (size == null) {
            return false;
        }
        // >>>>>>>>>
        // current tag の data size 決定
        var tagObj = this._tag_stack[this._tag_stack.length - 1];
        tagObj.sizeEnd = tagObj.sizeStart + size.length;
        tagObj.dataStart = tagObj.sizeEnd;
        tagObj.dataSize = size.value;
        if (size.value === -1) {
            // unknown size
            tagObj.dataEnd = -1;
            if (tagObj.type === "m") {
                tagObj.unknownSize = true;
            }
        }
        else {
            tagObj.dataEnd = tagObj.sizeEnd + size.value;
        }
        // <<<<<<<<
        // ポインタを進める
        this._cursor += size.length;
        this._total += size.length;
        this._state = State.STATE_CONTENT;
        return true;
    };
    /**
     * データ読み込み
     */
    EBMLDecoder.prototype.readContent = function () {
        var tagObj = this._tag_stack[this._tag_stack.length - 1];
        // master element は子要素を持つので生データはない
        if (tagObj.type === 'm') {
            // console.log('content should be tags');
            tagObj.isEnd = false;
            this._result.push(tagObj);
            this._state = State.STATE_TAG;
            // この Mastert Element は空要素か
            if (tagObj.dataSize === 0) {
                // 即座に終了タグを追加
                var elm = Object.assign({}, tagObj, { isEnd: true });
                this._result.push(elm);
                this._tag_stack.pop(); // スタックからこのタグを捨てる
            }
            return true;
        }
        // waiting for more data
        if (this._buffer.length < this._cursor + tagObj.dataSize) {
            return false;
        }
        // タグの中身の生データ
        var data = this._buffer.slice(this._cursor, this._cursor + tagObj.dataSize);
        // 読み終わったバッファを捨てて読み込んでいる部分のバッファのみ残す
        this._buffer = this._buffer.slice(this._cursor + tagObj.dataSize);
        tagObj.data = data;
        // >>>>>>>>>
        switch (tagObj.type) {
            //case "m": break;
            // Master-Element - contains other EBML sub-elements of the next lower level
            case "u":
                tagObj.value = data.readUIntBE(0, data.length);
                break;
            // Unsigned Integer - Big-endian, any size from 1 to 8 octets
            case "i":
                tagObj.value = data.readIntBE(0, data.length);
                break;
            // Signed Integer - Big-endian, any size from 1 to 8 octets
            case "f":
                tagObj.value = tagObj.dataSize === 4 ? data.readFloatBE(0) :
                    tagObj.dataSize === 8 ? data.readDoubleBE(0) :
                        (console.warn("cannot read " + tagObj.dataSize + " octets float. failback to 0"), 0);
                break;
            // Float - Big-endian, defined for 4 and 8 octets (32, 64 bits)
            case "s":
                tagObj.value = data.toString("ascii");
                break; // ascii
            //  Printable ASCII (0x20 to 0x7E), zero-padded when needed
            case "8":
                tagObj.value = data.toString("utf8");
                break;
            //  Unicode string, zero padded when needed (RFC 2279)
            case "b":
                tagObj.value = data;
                break;
            // Binary - not interpreted by the parser
            case "d":
                tagObj.value = tools_1.convertEBMLDateToJSDate(new int64_buffer_1.Int64BE(data).toNumber());
                break;
            // nano second; Date.UTC(2001,1,1,0,0,0,0) === 980985600000
            // Date - signed 8 octets integer in nanoseconds with 0 indicating 
            // the precise beginning of the millennium (at 2001-01-01T00:00:00,000000000 UTC)
        }
        if (tagObj.value === null) {
            throw new Error("unknown tag type:" + tagObj.type);
        }
        this._result.push(tagObj);
        // <<<<<<<<
        // ポインタを進める
        this._total += tagObj.dataSize;
        // タグ待ちモードに変更
        this._state = State.STATE_TAG;
        this._cursor = 0;
        this._tag_stack.pop(); // remove the object from the stack
        while (this._tag_stack.length > 0) {
            var topEle = this._tag_stack[this._tag_stack.length - 1];
            // 親が不定長サイズなので閉じタグは期待できない
            if (topEle.dataEnd < 0) {
                this._tag_stack.pop(); // 親タグを捨てる
                return true;
            }
            // 閉じタグの来るべき場所まで来たかどうか
            if (this._total < topEle.dataEnd) {
                break;
            }
            // 閉じタグを挿入すべきタイミングが来た
            if (topEle.type !== "m") {
                throw new Error("parent element is not master element");
            }
            var elm = Object.assign({}, topEle, { isEnd: true });
            this._result.push(elm);
            this._tag_stack.pop();
        }
        return true;
    };
    return EBMLDecoder;
}());
exports.default = EBMLDecoder;
