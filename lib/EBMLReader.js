"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var tools = require("./tools");
/**
 * This is an informal code for reference.
 * EBMLReader is a class for getting information to enable seeking Webm recorded by MediaRecorder.
 * So please do not use for regular WebM files.
 */
var EBMLReader = /** @class */ (function (_super) {
    __extends(EBMLReader, _super);
    function EBMLReader() {
        var _this = _super.call(this) || this;
        _this.logGroup = "";
        _this.hasLoggingStarted = false;
        _this.metadataloaded = false;
        _this.chunks = [];
        _this.stack = [];
        _this.segmentOffset = 0;
        _this.last2SimpleBlockVideoTrackTimecode = [0, 0];
        _this.last2SimpleBlockAudioTrackTimecode = [0, 0];
        _this.lastClusterTimecode = 0;
        _this.lastClusterPosition = 0;
        _this.timecodeScale = 1000000; // webm default TimecodeScale is 1ms
        _this.metadataSize = 0;
        _this.metadatas = [];
        _this.cues = [];
        _this.firstVideoBlockRead = false;
        _this.firstAudioBlockRead = false;
        _this.currentTrack = { TrackNumber: -1, TrackType: -1, DefaultDuration: null, CodecDelay: null };
        _this.trackTypes = [];
        _this.trackDefaultDuration = [];
        _this.trackCodecDelay = [];
        _this.trackInfo = { type: "nothing" };
        _this.ended = false;
        _this.logging = false;
        _this.use_duration_every_simpleblock = false;
        _this.use_webp = false;
        _this.use_segment_info = true;
        _this.drop_default_duration = true;
        return _this;
    }
    /**
     * emit final state.
     */
    EBMLReader.prototype.stop = function () {
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
    };
    /**
     * emit chunk info
     */
    EBMLReader.prototype.emit_segment_info = function () {
        var data = this.chunks;
        this.chunks = [];
        if (!this.metadataloaded) {
            this.metadataloaded = true;
            this.metadatas = data;
            var videoTrackNum = this.trackTypes.indexOf(1); // find first video track
            var audioTrackNum = this.trackTypes.indexOf(2); // find first audio track
            this.trackInfo = videoTrackNum >= 0 && audioTrackNum >= 0 ? { type: "both", trackNumber: videoTrackNum }
                : videoTrackNum >= 0 ? { type: "video", trackNumber: videoTrackNum }
                    : audioTrackNum >= 0 ? { type: "audio", trackNumber: audioTrackNum }
                        : { type: "nothing" };
            if (!this.use_segment_info) {
                return;
            }
            this.emit("metadata", { data: data, metadataSize: this.metadataSize });
        }
        else {
            if (!this.use_segment_info) {
                return;
            }
            var timecode = this.lastClusterTimecode;
            var duration = this.duration;
            var timecodeScale = this.timecodeScale;
            var ended = this.ended;
            this.emit("cluster", { timecode: timecode, data: data, timecodeScale: timecodeScale, duration: duration, ended: ended });
            this.emit("duration", { timecodeScale: timecodeScale, duration: duration });
        }
    };
    EBMLReader.prototype.read = function (elm) {
        var _this = this;
        var drop = false;
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
                var parent_1 = this.stack[this.stack.length - 1];
                if (parent_1 != null && parent_1.level >= elm.level) {
                    // 閉じタグなしでレベルが下がったら閉じタグを挿入
                    this.stack.pop();
                    // From http://w3c.github.io/media-source/webm-byte-stream-format.html#webm-media-segments
                    // This fixes logging for webm streams with Cluster of unknown length and no Cluster closing elements.
                    if (this.logging) {
                        console.groupEnd();
                    }
                    parent_1.dataEnd = elm.dataEnd;
                    parent_1.dataSize = elm.dataEnd - parent_1.dataStart;
                    parent_1.unknownSize = false;
                    var o = Object.assign({}, parent_1, { name: parent_1.name, type: parent_1.type, isEnd: true });
                    this.chunks.push(o);
                }
                this.stack.push(elm);
            }
        }
        if (elm.type === "m" && elm.name == "Segment") {
            if (this.segmentOffset != 0) {
                console.warn("Multiple segments detected!");
            }
            this.segmentOffset = elm.dataStart;
            this.emit("segment_offset", this.segmentOffset);
        }
        else if (elm.type === "b" && elm.name === "SimpleBlock") {
            var _a = tools.ebmlBlock(elm.data), timecode = _a.timecode, trackNumber = _a.trackNumber, frames_1 = _a.frames;
            if (this.trackTypes[trackNumber] === 1) { // trackType === 1 => video track
                if (!this.firstVideoBlockRead) {
                    this.firstVideoBlockRead = true;
                    if (this.trackInfo.type === "both" || this.trackInfo.type === "video") {
                        var CueTime = this.lastClusterTimecode + timecode;
                        this.cues.push({ CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: CueTime });
                        this.emit("cue_info", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: this.lastClusterTimecode });
                        this.emit("cue", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: CueTime });
                    }
                }
                this.last2SimpleBlockVideoTrackTimecode = [this.last2SimpleBlockVideoTrackTimecode[1], timecode];
            }
            else if (this.trackTypes[trackNumber] === 2) { // trackType === 2 => audio track
                if (!this.firstAudioBlockRead) {
                    this.firstAudioBlockRead = true;
                    if (this.trackInfo.type === "audio") {
                        var CueTime = this.lastClusterTimecode + timecode;
                        this.cues.push({ CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: CueTime });
                        this.emit("cue_info", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: this.lastClusterTimecode });
                        this.emit("cue", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: CueTime });
                    }
                }
                this.last2SimpleBlockAudioTrackTimecode = [this.last2SimpleBlockAudioTrackTimecode[1], timecode];
            }
            if (this.use_duration_every_simpleblock) {
                this.emit("duration", { timecodeScale: this.timecodeScale, duration: this.duration });
            }
            if (this.use_webp) {
                frames_1.forEach(function (frame) {
                    var startcode = frame.slice(3, 6).toString("hex");
                    if (startcode !== "9d012a") {
                        return;
                    }
                    ; // VP8 の場合
                    var webpBuf = tools.VP8BitStreamToRiffWebPBuffer(frame);
                    var webp = new Blob([webpBuf], { type: "image/webp" });
                    var currentTime = _this.duration;
                    _this.emit("webp", { currentTime: currentTime, webp: webp });
                });
            }
        }
        else if (elm.type === "m" && elm.name === "Cluster" && elm.isEnd === false) {
            this.firstVideoBlockRead = false;
            this.firstAudioBlockRead = false;
            this.emit_segment_info();
            this.emit("cluster_ptr", elm.tagStart);
            this.lastClusterPosition = elm.tagStart;
        }
        else if (elm.type === "u" && (elm.name === "Timecode" || elm.name === "Timestamp")) {
            this.lastClusterTimecode = elm.value;
        }
        else if (elm.type === "u" && (elm.name === "TimecodeScale" || elm.name === "TimestampScale")) {
            this.timecodeScale = elm.value;
        }
        else if (elm.type === "m" && elm.name === "TrackEntry") {
            if (elm.isEnd) {
                this.trackTypes[this.currentTrack.TrackNumber] = this.currentTrack.TrackType;
                this.trackDefaultDuration[this.currentTrack.TrackNumber] = this.currentTrack.DefaultDuration;
                this.trackCodecDelay[this.currentTrack.TrackNumber] = this.currentTrack.CodecDelay;
            }
            else {
                this.currentTrack = { TrackNumber: -1, TrackType: -1, DefaultDuration: null, CodecDelay: null };
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
    };
    Object.defineProperty(EBMLReader.prototype, "duration", {
        /**
         * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
         * 単位 timecodeScale
         *
         * !!! if you need duration with seconds !!!
         * ```js
         * const nanosec = reader.duration * reader.timecodeScale;
         * const sec = nanosec / 1000 / 1000 / 1000;
         * ```
         */
        get: function () {
            if (this.trackInfo.type === "nothing") {
                console.warn("no video, no audio track");
                return 0;
            }
            // defaultDuration は 生の nano sec
            var defaultDuration = 0;
            // nanoseconds
            var codecDelay = 0;
            var lastTimecode = 0;
            var _defaultDuration = this.trackDefaultDuration[this.trackInfo.trackNumber];
            if (typeof _defaultDuration === "number") {
                defaultDuration = _defaultDuration;
            }
            else {
                // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
                // default duration がないときに使う delta
                if (this.trackInfo.type === "both") {
                    if (this.last2SimpleBlockAudioTrackTimecode[1] > this.last2SimpleBlockVideoTrackTimecode[1]) {
                        // audio diff
                        defaultDuration = (this.last2SimpleBlockAudioTrackTimecode[1] - this.last2SimpleBlockAudioTrackTimecode[0]) * this.timecodeScale;
                        // audio delay
                        var delay = this.trackCodecDelay[this.trackTypes.indexOf(2)]; // 2 => audio
                        if (typeof delay === "number") {
                            codecDelay = delay;
                        }
                        // audio timecode
                        lastTimecode = this.last2SimpleBlockAudioTrackTimecode[1];
                    }
                    else {
                        // video diff
                        defaultDuration = (this.last2SimpleBlockVideoTrackTimecode[1] - this.last2SimpleBlockVideoTrackTimecode[0]) * this.timecodeScale;
                        // video delay
                        var delay = this.trackCodecDelay[this.trackTypes.indexOf(1)]; // 1 => video
                        if (typeof delay === "number") {
                            codecDelay = delay;
                        }
                        // video timecode
                        lastTimecode = this.last2SimpleBlockVideoTrackTimecode[1];
                    }
                }
                else if (this.trackInfo.type === "video") {
                    defaultDuration = (this.last2SimpleBlockVideoTrackTimecode[1] - this.last2SimpleBlockVideoTrackTimecode[0]) * this.timecodeScale;
                    var delay = this.trackCodecDelay[this.trackInfo.trackNumber]; // 2 => audio
                    if (typeof delay === "number") {
                        codecDelay = delay;
                    }
                    lastTimecode = this.last2SimpleBlockVideoTrackTimecode[1];
                }
                else if (this.trackInfo.type === "audio") {
                    defaultDuration = (this.last2SimpleBlockAudioTrackTimecode[1] - this.last2SimpleBlockAudioTrackTimecode[0]) * this.timecodeScale;
                    var delay = this.trackCodecDelay[this.trackInfo.trackNumber]; // 1 => video
                    if (typeof delay === "number") {
                        codecDelay = delay;
                    }
                    lastTimecode = this.last2SimpleBlockAudioTrackTimecode[1];
                } // else { not reached }
            }
            // convert to timecodescale
            var duration_nanosec = ((this.lastClusterTimecode + lastTimecode) * this.timecodeScale) + defaultDuration - codecDelay;
            var duration = duration_nanosec / this.timecodeScale;
            return Math.floor(duration);
        },
        enumerable: false,
        configurable: true
    });
    EBMLReader.prototype.addListener = function (event, listener) {
        return _super.prototype.addListener.call(this, event, listener);
    };
    EBMLReader.prototype.put = function (elm) {
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
            //console.log(elm.name, elm.type, o.trackNumber, o.timecode);
            //}else{
            console.log(elm.name, elm.type);
            //}
        }
        else {
            console.log(elm.name, elm.tagStart, elm.type, elm.value);
        }
    };
    return EBMLReader;
}(events_1.EventEmitter));
exports.default = EBMLReader;
;
;
;
;
