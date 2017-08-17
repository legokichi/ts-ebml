import * as EBML from "./EBML";
import * as tools from "./tools";
import {Buffer, readVint, ebmlBlock} from "./tools";
import {Int64BE} from "int64-buffer";
import schema = require("matroska/lib/schema");
const {byEbmlID}: {byEbmlID: { [key: number]: EBML.Schema } } = schema;



interface DataTree {
  tagId: Buffer;
  elm: EBML.EBMLElementBuffer;
  children: DataTree[];
  data: Buffer | null;
}

export default class EBMLEncoder {
  private _buffers: Buffer[];
  private _stack: DataTree[];
  private _schema: {[key: number]: EBML.Schema};

  constructor(){
    this._schema = byEbmlID;
    this._buffers = [];
    this._stack = [];
  }

  encode(elms: EBML.EBMLElementBuffer[]): ArrayBuffer {
    return tools.concat(
      elms.reduce<Buffer[]>((lst, elm)=>
        lst.concat(this.encodeChunk(elm)), [])).buffer;
  }

  private encodeChunk(elm: EBML.EBMLElementBuffer): Buffer[] {
    if(elm.type === "m"){
      if(!elm.isEnd){
        this.startTag(elm);
      }else{
        this.endTag(elm);
      }
    }else{
      this.writeTag(elm);
    }
    return this.flush();
  }

  private flush(): Buffer[] {
    const ret = this._buffers;
    this._buffers = [];
    return ret;
  }

  private getSchemaInfo(tagName: string): Buffer | null {
    const tagNums = Object.keys(this._schema).map(Number);
    for (let i = 0; i < tagNums.length; i++) {
      let tagNum = tagNums[i];
      if (this._schema[tagNum].name === tagName) {
        return new Buffer(tagNum.toString(16), 'hex');
      }
    }
    return null;
  }

  private writeTag(elm: EBML.ChildElementBuffer) {
    const tagName = elm.name;
    const tagId = this.getSchemaInfo(tagName);

    const tagData = elm.data;

    if (tagId == null) {
      throw new Error('No schema entry found for ' + tagName);
    }

    const data = tools.encodeTag(tagId, tagData);
    /**
     * 親要素が閉じタグあり(isEnd)なら閉じタグが来るまで待つ(children queに入る)
     */
    if(this._stack.length > 0) {
      const last = this._stack[this._stack.length - 1];
      last.children.push({
        tagId,
        elm,
        children: <DataTree[]>[],
        data
      });
      return;
    }
    this._buffers = this._buffers.concat(data);
    return;
  }

  private startTag(elm: EBML.MasterElement){
    const tagName = elm.name;
    const tagId = this.getSchemaInfo(tagName);
    if (tagId == null) {
      throw new Error('No schema entry found for ' + tagName);
    }

    /**
     * 閉じタグ不定長の場合はスタックに積まずに即時バッファに書き込む
     */
    if(elm.unknownSize){
      const data = tools.encodeTag(tagId, new Buffer(0), elm.unknownSize);
      this._buffers = this._buffers.concat(data);
      return;
    }

    const tag: DataTree = {
      tagId,
      elm,
      children: <DataTree[]>[],
      data: null
    };

    if(this._stack.length > 0) {
        this._stack[this._stack.length - 1].children.push(tag);
    }
    this._stack.push(tag);
  }

  private endTag(elm: EBML.MasterElement){
    const tagName = elm.name;
    const tag = this._stack.pop();
    if(tag == null){ throw new Error("EBML structure is broken"); }
    if(tag.elm.name !== elm.name){ throw new Error("EBML structure is broken"); }

    const childTagDataBuffers = tag.children.reduce<Buffer[]>((lst, child)=>{
      if(child.data === null){ throw new Error("EBML structure is broken"); }
      return lst.concat(child.data);
    }, []);
    const childTagDataBuffer = tools.concat(childTagDataBuffers);
    if(tag.elm.type === "m"){
      tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer, tag.elm.unknownSize);  
    }else{
      tag.data = tools.encodeTag(tag.tagId, childTagDataBuffer);
    }
  
    if (this._stack.length < 1) {
      this._buffers = this._buffers.concat(tag.data);
    }
  }
}




