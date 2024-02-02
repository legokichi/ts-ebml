"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tools = exports.Reader = exports.Encoder = exports.Decoder = exports.version = void 0;
__exportStar(require("./EBML"), exports);
var EBMLDecoder_1 = require("./EBMLDecoder");
exports.Decoder = EBMLDecoder_1.default;
var EBMLEncoder_1 = require("./EBMLEncoder");
exports.Encoder = EBMLEncoder_1.default;
var EBMLReader_1 = require("./EBMLReader");
exports.Reader = EBMLReader_1.default;
var tools = require("./tools");
exports.tools = tools;
var version = require("../package.json").version;
exports.version = version;
