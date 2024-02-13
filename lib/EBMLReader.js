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
const events_1 = require("events");
const tools = __importStar(require("./tools"));
/**
 * This is an informal code for reference.
 * EBMLReader is a class for getting information to enable seeking Webm recorded by MediaRecorder.
 * So please do not use for regular WebM files.
 */
class EBMLReader extends events_1.EventEmitter {
    constructor() {
        super();
        this.logGroup = "";
        this.hasLoggingStarted = false;
        this.metadataloaded = false;
        this.chunks = [];
        this.stack = [];
        this.segmentOffset = 0;
        this.last2SimpleBlockVideoTrackTimestamp = [0, 0];
        this.last2SimpleBlockAudioTrackTimestamp = [0, 0];
        this.lastClusterTimestamp = 0;
        this.lastClusterPosition = 0;
        // webm default TimestampScale is 1ms
        this.timestampScale = 1000000;
        this.metadataSize = 0;
        this.metadatas = [];
        this.cues = [];
        this.firstVideoBlockRead = false;
        this.firstAudioBlockRead = false;
        this.currentTrack = {
            TrackNumber: -1,
            TrackType: -1,
            DefaultDuration: null,
            CodecDelay: null
        };
        this.trackTypes = [];
        this.trackDefaultDuration = [];
        this.trackCodecDelay = [];
        this.trackInfo = { type: "nothing" };
        this.ended = false;
        this.logging = false;
        this.use_duration_every_simpleblock = false;
        this.use_webp = false;
        this.use_segment_info = true;
        this.drop_default_duration = true;
    }
    /**
     * emit final state.
     */
    stop() {
        this.ended = true;
        this.emit_segment_info();
        // clean up any unclosed Master Elements at the end of the stream.
        while (this.stack.length) {
            this.stack.pop();
            if (this.logging) {
                console.groupEnd();
            }
        }
        // close main group if set, logging is enabled, and has actually logged anything.
        if (this.logging && this.hasLoggingStarted && this.logGroup) {
            console.groupEnd();
        }
    }
    /**
     * emit chunk info
     */
    emit_segment_info() {
        const data = this.chunks;
        this.chunks = [];
        if (!this.metadataloaded) {
            this.metadataloaded = true;
            this.metadatas = data;
            // find first video track
            const videoTrackNum = this.trackTypes.indexOf(1);
            // find first audio track
            const audioTrackNum = this.trackTypes.indexOf(2);
            this.trackInfo =
                videoTrackNum >= 0 && audioTrackNum >= 0
                    ? { type: "both", trackNumber: videoTrackNum }
                    : videoTrackNum >= 0
                        ? { type: "video", trackNumber: videoTrackNum }
                        : audioTrackNum >= 0
                            ? { type: "audio", trackNumber: audioTrackNum }
                            : { type: "nothing" };
            if (!this.use_segment_info) {
                return;
            }
            this.emit("metadata", { data, metadataSize: this.metadataSize });
        }
        else {
            if (!this.use_segment_info) {
                return;
            }
            const timestamp = this.lastClusterTimestamp;
            const duration = this.duration;
            const timestampScale = this.timestampScale;
            this.emit("cluster", { timestamp, data });
            this.emit("duration", { timestampScale, duration });
        }
    }
    read(elm) {
        let drop = false;
        if (this.ended) {
            // reader is finished
            return;
        }
        if (elm.type === "m") {
            // 閉じタグの自動挿入
            if (elm.isEnd) {
                this.stack.pop();
            }
            else {
                const parent = this.stack[this.stack.length - 1];
                if (parent != null && parent.level >= elm.level) {
                    // 閉じタグなしでレベルが下がったら閉じタグを挿入
                    this.stack.pop();
                    // From http://w3c.github.io/media-source/webm-byte-stream-format.html#webm-media-segments
                    // This fixes logging for webm streams with Cluster of unknown length and no Cluster closing elements.
                    if (this.logging) {
                        console.groupEnd();
                    }
                    parent.dataEnd = elm.dataEnd;
                    parent.dataSize = elm.dataEnd - parent.dataStart;
                    parent.unknownSize = false;
                    const o = Object.assign({}, parent, {
                        name: parent.name,
                        type: parent.type,
                        isEnd: true
                    });
                    this.chunks.push(o);
                }
                this.stack.push(elm);
            }
        }
        if (elm.type === "m" && elm.name === "Segment") {
            if (this.segmentOffset !== 0) {
                console.warn("Multiple segments detected!");
            }
            this.segmentOffset = elm.dataStart;
            this.emit("segment_offset", this.segmentOffset);
        }
        else if (elm.type === "b" && elm.name === "SimpleBlock") {
            const { timecode: timestamp, trackNumber, frames } = tools.ebmlBlock(elm.data);
            if (this.trackTypes[trackNumber] === 1) {
                // trackType === 1 => video track
                if (!this.firstVideoBlockRead) {
                    this.firstVideoBlockRead = true;
                    if (this.trackInfo.type === "both" ||
                        this.trackInfo.type === "video") {
                        const CueTime = this.lastClusterTimestamp + timestamp;
                        this.cues.push({
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                        this.emit("cue_info", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime: this.lastClusterTimestamp
                        });
                        this.emit("cue", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                    }
                }
                this.last2SimpleBlockVideoTrackTimestamp = [
                    this.last2SimpleBlockVideoTrackTimestamp[1],
                    timestamp
                ];
            }
            else if (this.trackTypes[trackNumber] === 2) {
                // trackType === 2 => audio track
                if (!this.firstAudioBlockRead) {
                    this.firstAudioBlockRead = true;
                    if (this.trackInfo.type === "audio") {
                        const CueTime = this.lastClusterTimestamp + timestamp;
                        this.cues.push({
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                        this.emit("cue_info", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime: this.lastClusterTimestamp
                        });
                        this.emit("cue", {
                            CueTrack: trackNumber,
                            CueClusterPosition: this.lastClusterPosition,
                            CueTime
                        });
                    }
                }
                this.last2SimpleBlockAudioTrackTimestamp = [
                    this.last2SimpleBlockAudioTrackTimestamp[1],
                    timestamp
                ];
            }
            if (this.use_duration_every_simpleblock) {
                this.emit("duration", {
                    timestampScale: this.timestampScale,
                    duration: this.duration
                });
            }
            if (this.use_webp) {
                for (const frame of frames) {
                    const startcode = frame.subarray(3, 6).toString("hex");
                    // this is not a good way to detect VP8
                    // see rfc6386 -- VP8 Data Format and Decoding Guide
                    if (startcode !== "9d012a") {
                        break;
                    }
                    const webpBuf = tools.VP8BitStreamToRiffWebPBuffer(frame);
                    const webp = new Blob([webpBuf], { type: "image/webp" });
                    const currentTime = this.duration;
                    this.emit("webp", { currentTime, webp });
                }
            }
        }
        else if (elm.type === "m" && elm.name === "Cluster" && !elm.isEnd) {
            this.firstVideoBlockRead = false;
            this.firstAudioBlockRead = false;
            this.emit_segment_info();
            this.emit("cluster_ptr", elm.tagStart);
            this.lastClusterPosition = elm.tagStart;
        }
        else if (elm.type === "u" && elm.name === "Timestamp") {
            this.lastClusterTimestamp = elm.value;
        }
        else if (elm.type === "u" && elm.name === "TimestampScale") {
            this.timestampScale = elm.value;
        }
        else if (elm.type === "m" && elm.name === "TrackEntry") {
            if (elm.isEnd) {
                this.trackTypes[this.currentTrack.TrackNumber] =
                    this.currentTrack.TrackType;
                this.trackDefaultDuration[this.currentTrack.TrackNumber] =
                    this.currentTrack.DefaultDuration;
                this.trackCodecDelay[this.currentTrack.TrackNumber] =
                    this.currentTrack.CodecDelay;
            }
            else {
                this.currentTrack = {
                    TrackNumber: -1,
                    TrackType: -1,
                    DefaultDuration: null,
                    CodecDelay: null
                };
            }
        }
        else if (elm.type === "u" && elm.name === "TrackType") {
            this.currentTrack.TrackType = elm.value;
        }
        else if (elm.type === "u" && elm.name === "TrackNumber") {
            this.currentTrack.TrackNumber = elm.value;
        }
        else if (elm.type === "u" && elm.name === "CodecDelay") {
            this.currentTrack.CodecDelay = elm.value;
        }
        else if (elm.type === "u" && elm.name === "DefaultDuration") {
            // media source api は DefaultDuration を計算するとバグる。
            // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
            // chrome 58 ではこれを回避するために DefaultDuration 要素を抜き取った。
            // chrome 58 以前でもこのタグを抜き取ることで回避できる
            if (this.drop_default_duration) {
                console.warn("DefaultDuration detected!, remove it");
                drop = true;
            }
            else {
                this.currentTrack.DefaultDuration = elm.value;
            }
        }
        else if (elm.name === "unknown") {
            console.warn(elm);
        }
        if (!this.metadataloaded && elm.dataEnd > 0) {
            this.metadataSize = elm.dataEnd;
        }
        if (!drop) {
            this.chunks.push(elm);
        }
        if (this.logging) {
            this.put(elm);
        }
    }
    /**
     * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
     * 単位 timestampScale
     *
     * !!! if you need duration with seconds !!!
     * ```js
     * const nanosec = reader.duration * reader.timestampScale;
     * const sec = nanosec / 1000 / 1000 / 1000;
     * ```
     */
    get duration() {
        if (this.trackInfo.type === "nothing") {
            console.warn("no video, no audio track");
            return 0;
        }
        // defaultDuration は 生の nano sec
        let defaultDuration = 0;
        // nanoseconds
        let codecDelay = 0;
        let lastTimestamp = 0;
        const _defaultDuration = this.trackDefaultDuration[this.trackInfo.trackNumber];
        if (typeof _defaultDuration === "number") {
            defaultDuration = _defaultDuration;
        }
        else {
            // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
            // default duration がないときに使う delta
            if (this.trackInfo.type === "both") {
                if (this.last2SimpleBlockAudioTrackTimestamp[1] >
                    this.last2SimpleBlockVideoTrackTimestamp[1]) {
                    // audio diff
                    defaultDuration =
                        (this.last2SimpleBlockAudioTrackTimestamp[1] -
                            this.last2SimpleBlockAudioTrackTimestamp[0]) *
                            this.timestampScale;
                    // audio delay
                    // 2 => audio
                    const delay = this.trackCodecDelay[this.trackTypes.indexOf(2)];
                    if (typeof delay === "number") {
                        codecDelay = delay;
                    }
                    // audio timestamp
                    lastTimestamp = this.last2SimpleBlockAudioTrackTimestamp[1];
                }
                else {
                    // video diff
                    defaultDuration =
                        (this.last2SimpleBlockVideoTrackTimestamp[1] -
                            this.last2SimpleBlockVideoTrackTimestamp[0]) *
                            this.timestampScale;
                    // video delay
                    // 1 => video
                    const delay = this.trackCodecDelay[this.trackTypes.indexOf(1)];
                    if (typeof delay === "number") {
                        codecDelay = delay;
                    }
                    // video timestamp
                    lastTimestamp = this.last2SimpleBlockVideoTrackTimestamp[1];
                }
            }
            else if (this.trackInfo.type === "video") {
                defaultDuration =
                    (this.last2SimpleBlockVideoTrackTimestamp[1] -
                        this.last2SimpleBlockVideoTrackTimestamp[0]) *
                        this.timestampScale;
                const delay = this.trackCodecDelay[this.trackInfo.trackNumber];
                if (typeof delay === "number") {
                    codecDelay = delay;
                }
                lastTimestamp = this.last2SimpleBlockVideoTrackTimestamp[1];
            }
            else if (this.trackInfo.type === "audio") {
                defaultDuration =
                    (this.last2SimpleBlockAudioTrackTimestamp[1] -
                        this.last2SimpleBlockAudioTrackTimestamp[0]) *
                        this.timestampScale;
                const delay = this.trackCodecDelay[this.trackInfo.trackNumber];
                if (typeof delay === "number") {
                    codecDelay = delay;
                }
                lastTimestamp = this.last2SimpleBlockAudioTrackTimestamp[1];
            }
            // else { never }
        }
        // convert to timestampscale
        const duration_nanosec = (this.lastClusterTimestamp + lastTimestamp) * this.timestampScale +
            defaultDuration -
            codecDelay;
        const duration = duration_nanosec / this.timestampScale;
        return Math.floor(duration);
    }
    addListener(event, listener) {
        return super.addListener(event, listener);
    }
    put(elm) {
        if (!this.hasLoggingStarted) {
            this.hasLoggingStarted = true;
            if (this.logging && this.logGroup) {
                console.groupCollapsed(this.logGroup);
            }
        }
        if (elm.type === "m") {
            if (elm.isEnd) {
                console.groupEnd();
            }
            else {
                console.group(elm.name + ":" + elm.tagStart);
            }
        }
        else if (elm.type === "b") {
            // for debug
            //if(elm.name === "SimpleBlock"){
            //const o = EBML.tools.ebmlBlock(elm.value);
            //console.log(elm.name, elm.type, o.trackNumber, o.timestamp);
            //}else{
            console.log(elm.name, elm.type);
            //}
        }
        else {
            console.log(elm.name, elm.tagStart, elm.type, elm.value);
        }
    }
}
exports.default = EBMLReader;
