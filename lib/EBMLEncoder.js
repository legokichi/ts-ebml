"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tools = require("./tools");
var tools_1 = require("./tools");
var schema = require("matroska/lib/schema");
var byEbmlID = schema.byEbmlID;
var EBMLEncoder = /** @class */ (function () {
    function EBMLEncoder() {
        this._schema = byEbmlID;
        this._buffers = [];
        this._stack = [];
    }
    EBMLEncoder.prototype.encode = function (elms) {
        var _this = this;
        return tools.concat(elms.reduce(function (lst, elm) {
            return lst.concat(_this.encodeChunk(elm));
        }, [])).buffer;
    };
    EBMLEncoder.prototype.encodeChunk = function (elm) {
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
            elm.data = tools_1.Buffer.from(elm.data);
            this.writeTag(elm);
        }
        return this.flush();
    };
    EBMLEncoder.prototype.flush = function () {
        var ret = this._buffers;
        this._buffers = [];
        return ret;
    };
    EBMLEncoder.prototype.getSchemaInfo = function (tagName) {
        var tagNums = Object.keys(this._schema).map(Number);
        for (var i = 0; i < tagNums.length; i++) {
            var tagNum = tagNums[i];
            if (this._schema[tagNum].name === tagName) {
                return new tools_1.Buffer(tagNum.toString(16), 'hex');
            }
        }
        return null;
    };
    EBMLEncoder.prototype.writeTag = function (elm) {
        var tagName = elm.name;
        var tagId = this.getSchemaInfo(tagName);
        var tagData = elm.data;
        if (tagId == null) {
            throw new Error('No schema entry found for ' + tagName);
        }
        var data = tools.encodeTag(tagId, tagData);
        /**
         * 親要素が閉じタグあり(isEnd)なら閉じタグが来るまで待つ(children queに入る)
         */
        if (this._stack.length > 0) {
            var last = this._stack[this._stack.length - 1];
            last.children.push({
                tagId: tagId,
                elm: elm,
                children: [],
                data: data
            });
            return;
        }
        this._buffers = this._buffers.concat(data);
        return;
    };
    EBMLEncoder.prototype.startTag = function (elm) {
        var tagName = elm.name;
        var tagId = this.getSchemaInfo(tagName);
        if (tagId == null) {
            throw new Error('No schema entry found for ' + tagName);
        }
        /**
         * 閉じタグ不定長の場合はスタックに積まずに即時バッファに書き込む
         */
        if (elm.unknownSize) {
            var data = tools.encodeTag(tagId, new tools_1.Buffer(0), elm.unknownSize);
            this._buffers = this._buffers.concat(data);
            return;
        }
        var tag = {
            tagId: tagId,
            elm: elm,
            children: [],
            data: null
        };
        if (this._stack.length > 0) {
            this._stack[this._stack.length - 1].children.push(tag);
        }
        this._stack.push(tag);
    };
    EBMLEncoder.prototype.endTag = function (elm) {
        var tagName = elm.name;
        var tag = this._stack.pop();
        if (tag == null) {
            throw new Error("EBML structure is broken");
        }
        if (tag.elm.name !== elm.name) {
            throw new Error("EBML structure is broken");
        }
        var childTagDataBuffers = tag.children.reduce(function (lst, child) {
            if (child.data === null) {
                throw new Error("EBML structure is broken");
            }
            return lst.concat(child.data);
        }, []);
        var childTagDataBuffer = tools.concat(childTagDataBuffers);
        if (tag.elm.type === "m") {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer, tag.elm.unknownSize);
        }
        else {
            tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer);
        }
        if (this._stack.length < 1) {
            this._buffers = this._buffers.concat(tag.data);
        }
    };
    return EBMLEncoder;
}());
exports.default = EBMLEncoder;
