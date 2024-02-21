"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bigint_buffer_1 = require("bigint-buffer");
const tools_1 = require("./tools");
const tools = __importStar(require("./tools"));
const schema = require("matroska-schema");
const { byEbmlID } = schema;
var State;
(function (State) {
    State[State["STATE_TAG"] = 1] = "STATE_TAG";
    State[State["STATE_SIZE"] = 2] = "STATE_SIZE";
    State[State["STATE_CONTENT"] = 3] = "STATE_CONTENT";
})(State || (State = {}));
class EBMLDecoder {
    constructor() {
        this._buffer = Buffer.alloc(0);
        this._tag_stack = [];
        this._state = State.STATE_TAG;
        this._cursor = 0;
        this._total = 0;
        this._schema = byEbmlID;
        this._result = [];
    }
    decode(chunk) {
        this.readChunk(chunk);
        const diff = this._result;
        this._result = [];
        return diff;
    }
    readChunk(chunk) {
        // Re-read the _buffer that was unreadable and the new chunk together.
        // console.log(this._buffer, Buffer.from(chunk));
        this._buffer = tools.concat([this._buffer, Buffer.from(chunk)]);
        while (this._cursor < this._buffer.length) {
            // console.log(this._state, this._cursor, this._total, this._tag_stack);
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
    }
    getSchemaInfo(tagNum) {
        if (this._schema[tagNum] != null) {
            return this._schema[tagNum];
        }
        else {
            return {
                name: "unknown",
                level: -1,
                type: "unknown",
                description: "unknown"
            };
        }
    }
    /**
     * parsing vint-ed tag
     * @return - return false when waiting for more data
     */
    readTag() {
        // tag.length is out of the buffer
        if (this._cursor >= this._buffer.length) {
            return false;
        }
        // read ebml id vint without first byte
        const tag = (0, tools_1.readVint)(this._buffer, this._cursor);
        // cannot parse tag
        if (tag == null) {
            return false;
        }
        // read tag id
        // Hacks to avoid using parseInt
        //const tagStr = this._buffer.toString("hex", this._cursor, this._cursor + tag.length);
        //const tagNum = parseInt(tagStr, 16);
        const buf = this._buffer.subarray(this._cursor, this._cursor + tag.length);
        const tagNum = buf.reduce((o, v, i, arr) => o + v * Math.pow(16, 2 * (arr.length - 1 - i)), 0);
        const schema = this.getSchemaInfo(tagNum);
        const tagObj = {
            EBML_ID: tagNum.toString(16),
            schema,
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
        // +-----------+------------+--------------------+
        // | tag: vint | size: vint | data: Buffer(size) |
        // +-----------+------------+--------------------+
        this._tag_stack.push(tagObj);
        // advance the pointer
        this._cursor += tag.length;
        this._total += tag.length;
        // change read status
        this._state = State.STATE_SIZE;
        return true;
    }
    /**
     * Reads the size of the vint-ed current tag content
     * @return - return false when waiting for more data
     */
    readSize() {
        // tag.length is outside the buffer
        if (this._cursor >= this._buffer.length) {
            return false;
        }
        // read ebml datasize vint without first byte
        const size = (0, tools_1.readVint)(this._buffer, this._cursor);
        // still can't read it.
        if (size == null) {
            return false;
        }
        // decide data size for current tag
        const tagObj = this._tag_stack[this._tag_stack.length - 1];
        if (tagObj == null) {
            return false;
        }
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
        // advance the pointer
        this._cursor += size.length;
        this._total += size.length;
        this._state = State.STATE_CONTENT;
        return true;
    }
    readContent() {
        const tagObj = this._tag_stack[this._tag_stack.length - 1];
        if (tagObj == null) {
            return false;
        }
        // master element does not have raw data buffer
        // because it has child elements
        if (tagObj.type === "m") {
            // console.log('content should be tags');
            tagObj.isEnd = false;
            this._result.push(tagObj);
            this._state = State.STATE_TAG;
            // if this Mastert Element empty
            if (tagObj.dataSize === 0) {
                // then add the end tag immediately
                const elm = Object.assign({}, tagObj, { isEnd: true });
                this._result.push(elm);
                // pop out the tag from tag stack
                this._tag_stack.pop();
            }
            return true;
        }
        // waiting for more data
        if (this._buffer.length < this._cursor + tagObj.dataSize) {
            return false;
        }
        // raw data of tag content
        const data = this._buffer.subarray(this._cursor, this._cursor + tagObj.dataSize);
        // 読み終わったバッファを捨てて読み込んでいる部分のバッファのみ残す
        this._buffer = this._buffer.subarray(this._cursor + tagObj.dataSize);
        tagObj.data = data;
        switch (tagObj.type) {
            // case "m": {
            //   // Master-Element - contains other EBML sub-elements of the next lower level
            //   throw new Error("never");
            // }
            case "u": {
                // Unsigned Integer - Big-endian, any size from 1 to 8 octets
                if (data.length > 6) {
                    // feross/buffer shim can read over 7 octets
                    // but nodejs buffer only can read under 6 octets
                    // so use bigint-buffer
                    tagObj.value = Number((0, bigint_buffer_1.toBigIntBE)(data));
                }
                else {
                    tagObj.value = data.readUIntBE(0, data.length);
                }
                break;
            }
            case "i": {
                // Signed Integer - Big-endian, any size from 1 to 8 octets
                tagObj.value = data.readIntBE(0, data.length);
                break;
            }
            case "f": {
                // Float - Big-endian, defined for 4 and 8 octets (32, 64 bits)
                if (tagObj.dataSize === 4) {
                    tagObj.value = data.readFloatBE(0);
                }
                else if (tagObj.dataSize === 8) {
                    tagObj.value = data.readDoubleBE(0);
                }
                else {
                    console.warn(`cannot read ${tagObj.dataSize} octets float. failback to 0`);
                    tagObj.value = 0;
                }
                break;
            }
            case "s": {
                //  Printable ASCII (0x20 to 0x7E), zero-padded when needed
                tagObj.value = data.toString("ascii");
                break;
            }
            case "8": {
                //  Unicode string, zero padded when needed (RFC 2279)
                tagObj.value = data.toString("utf8");
                break;
            }
            case "b": {
                // Binary - not interpreted by the parser
                tagObj.value = data;
                break;
            }
            case "d": {
                // nano second; Date.UTC(2001,1,1,0,0,0,0) === 980985600000
                // Date - signed 8 octets integer in nanoseconds with 0 indicating
                // the precise beginning of the millennium (at 2001-01-01T00:00:00,000000000 UTC)
                tagObj.value = (0, tools_1.convertEBMLDateToJSDate)(Number((0, bigint_buffer_1.toBigIntBE)(data)));
                break;
            }
        }
        if (tagObj.value === null) {
            throw new Error("unknown tag type:" + tagObj.type);
        }
        this._result.push(tagObj);
        // advance the pointer
        this._total += tagObj.dataSize;
        // change state to waiting next tag
        this._state = State.STATE_TAG;
        this._cursor = 0;
        // remove the object from the stack
        this._tag_stack.pop();
        while (this._tag_stack.length > 0) {
            const topEle = this._tag_stack[this._tag_stack.length - 1];
            if (topEle == null) {
                return false;
            }
            // 親が不定長サイズなので閉じタグは期待できない
            if (topEle.dataEnd < 0) {
                // remove parent tag
                this._tag_stack.pop();
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
            const elm = Object.assign({}, topEle, { isEnd: true });
            this._result.push(elm);
            this._tag_stack.pop();
        }
        return true;
    }
}
exports.default = EBMLDecoder;
