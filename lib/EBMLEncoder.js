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
const tools = __importStar(require("./tools"));
const schema = require("matroska-schema");
const { byEbmlID } = schema;
class EBMLEncoder {
    constructor() {
        this._schema = byEbmlID;
        this._buffers = [];
        this._stack = [];
    }
    encode(elms) {
        return tools.concat(elms.reduce((lst, elm) => lst.concat(this.encodeChunk(elm)), [])).buffer;
    }
    encodeChunk(elm) {
        if (elm.type === "m") {
            if (!elm.isEnd) {
                this.startTag(elm);
            }
            else {
                this.endTag(elm);
            }
        }
        else {
            // ensure that we are working with an internal `Buffer` instance
            elm.data = Buffer.from(elm.data);
            this.writeTag(elm);
        }
        return this.flush();
    }
    flush() {
        const ret = this._buffers;
        this._buffers = [];
        return ret;
    }
    getSchemaInfo(tagName) {
        for (const [tagNum, tagVal] of Object.entries(this._schema)) {
            if (tagVal.name === tagName) {
                return Buffer.from(Number(tagNum).toString(16), "hex");
            }
        }
        return null;
    }
    writeTag(elm) {
        const tagName = elm.name;
        const tagId = this.getSchemaInfo(tagName);
        const tagData = elm.data;
        if (tagId == null) {
            throw new Error("No schema entry found for " + tagName);
        }
        const data = tools.encodeTag(tagId, tagData);
        // 親要素が閉じタグあり(isEnd)なら閉じタグが来るまで待つ(children queに入る)
        if (this._stack.length > 0) {
            const last = this._stack[this._stack.length - 1];
            last.children.push({
                tagId,
                elm,
                children: [],
                data
            });
            return;
        }
        this._buffers = this._buffers.concat(data);
        return;
    }
    startTag(elm) {
        const tagName = elm.name;
        const tagId = this.getSchemaInfo(tagName);
        if (tagId == null) {
            throw new Error("No schema entry found for " + tagName);
        }
        // 閉じタグ不定長の場合はスタックに積まずに即時バッファに書き込む
        if (elm.unknownSize) {
            const data = tools.encodeTag(tagId, Buffer.alloc(0), elm.unknownSize);
            this._buffers = this._buffers.concat(data);
            return;
        }
        const tag = {
            tagId,
            elm,
            children: [],
            data: null
        };
        if (this._stack.length > 0) {
            this._stack[this._stack.length - 1].children.push(tag);
        }
        this._stack.push(tag);
    }
    endTag(elm) {
        const tag = this._stack.pop();
        if (tag == null) {
            throw new Error("EBML structure is broken");
        }
        if (tag.elm.name !== elm.name) {
            throw new Error("EBML structure is broken");
        }
        const childTagDataBuffers = tag.children.reduce((lst, child) => {
            if (child.data === null) {
                throw new Error("EBML structure is broken");
            }
            return lst.concat(child.data);
        }, []);
        const childTagDataBuffer = tools.concat(childTagDataBuffers);
        if (tag.elm.type === "m") {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer, tag.elm.unknownSize);
        }
        else {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer);
        }
        if (this._stack.length < 1) {
            this._buffers = this._buffers.concat(tag.data);
        }
    }
}
exports.default = EBMLEncoder;
