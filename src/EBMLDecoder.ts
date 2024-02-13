import { toBigIntBE } from "bigint-buffer";
import { readVint, convertEBMLDateToJSDate } from "./tools";
import * as EBML from "./EBML";
import * as tools from "./tools";
const schema: any = require("matroska-schema");
const { byEbmlID }: { byEbmlID: { [key: number]: EBML.Schema } } = schema;

enum State {
  STATE_TAG = 1,
  STATE_SIZE = 2,
  STATE_CONTENT = 3
}

export default class EBMLDecoder {
  private _buffer: Buffer;
  private _tag_stack: EBML.EBMLElementDetail[];
  private _state: State;
  /**
   * Position from the beginning of _buffer
   */
  private _cursor: number;
  /**
   * pointer in the whole
   */
  private _total: number;
  private _schema: { [key: number]: EBML.Schema };
  private _result: EBML.EBMLElementDetail[];

  constructor() {
    this._buffer = Buffer.alloc(0);
    this._tag_stack = [];
    this._state = State.STATE_TAG;
    this._cursor = 0;
    this._total = 0;
    this._schema = byEbmlID;
    this._result = [];
  }

  decode(chunk: ArrayBuffer): EBML.EBMLElementDetail[] {
    this.readChunk(chunk);
    const diff = this._result;
    this._result = [];
    return diff;
  }

  private readChunk(chunk: ArrayBuffer): void {
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

  private getSchemaInfo(tagNum: number): EBML.Schema {
    if (this._schema[tagNum] != null) {
      return this._schema[tagNum];
    } else {
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
  private readTag(): boolean {
    // tag.length is out of the buffer
    if (this._cursor >= this._buffer.length) {
      return false;
    }

    // read ebml id vint without first byte
    const tag = readVint(this._buffer, this._cursor);

    // cannot parse tag
    if (tag == null) {
      return false;
    }

    // read tag id
    // Hacks to avoid using parseInt
    //const tagStr = this._buffer.toString("hex", this._cursor, this._cursor + tag.length);
    //const tagNum = parseInt(tagStr, 16);
    const buf = this._buffer.subarray(this._cursor, this._cursor + tag.length);
    const tagNum = buf.reduce(
      (o, v, i, arr) => o + v * Math.pow(16, 2 * (arr.length - 1 - i)),
      0
    );

    const schema = this.getSchemaInfo(tagNum);

    const tagObj: EBML.EBMLElementDetail = {
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
    } as any;
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
  private readSize(): boolean {
    // tag.length is outside the buffer
    if (this._cursor >= this._buffer.length) {
      return false;
    }

    // read ebml datasize vint without first byte
    const size = readVint(this._buffer, this._cursor);

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
    } else {
      tagObj.dataEnd = tagObj.sizeEnd + size.value;
    }

    // advance the pointer
    this._cursor += size.length;
    this._total += size.length;

    this._state = State.STATE_CONTENT;

    return true;
  }

  private readContent(): boolean {
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
    const data = this._buffer.subarray(
      this._cursor,
      this._cursor + tagObj.dataSize
    );

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
          tagObj.value = Number(toBigIntBE(data));
        } else {
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
        } else if (tagObj.dataSize === 8) {
          tagObj.value = data.readDoubleBE(0);
        } else {
          console.warn(
            `cannot read ${tagObj.dataSize} octets float. failback to 0`
          );
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
        tagObj.value = convertEBMLDateToJSDate(Number(toBigIntBE(data)));
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
