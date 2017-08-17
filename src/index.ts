export * from "./EBML";
import Decoder from "./EBMLDecoder";
import Encoder from "./EBMLEncoder";
import Reader from "./EBMLReader";
import * as tools from "./tools";

const version = <string>require("../package.json").version;

export {
  version,
  Decoder,
  Encoder,
  Reader,
  tools
};
