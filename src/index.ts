export * from "./EBML";
import Decoder from "./EBMLDecoder";
import Encoder from "./EBMLEncoder";
import Reader from "./EBMLReader";
import * as tools from "./tools";

const version = require("../package.json").version as string;

export { version, Decoder, Encoder, Reader, tools };
