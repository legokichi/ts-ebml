"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var EBMLReader = (function (_super) {
    __extends(EBMLReader, _super);
    function EBMLReader() {
        var _this = _super.call(this) || this;
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
        _this.currentTrack = { TrackNumber: -1, TrackType: -1, DefaultDuration: null, CodecDelay: null };
        _this.trackTypes = [];
        _this.trackDefaultDuration = [];
        _this.trackCodecDelay = [];
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
        if (this.logging) {
            // Valid only for chrome
            console.groupEnd(); // </Cluster>
            console.groupEnd(); // </Segment>
            console.groupEnd(); // ?
        }
    };
    /**
     * emit chunk info
     */
    EBMLReader.prototype.emit_segment_info = function () {
        if (!this.use_segment_info) {
            return;
        }
        var data = this.chunks;
        this.chunks = [];
        if (!this.metadataloaded) {
            this.metadataloaded = true;
            this.metadatas = data;
            this.emit("metadata", { data: data, metadataSize: this.metadataSize });
        }
        else {
            var timecode = this.lastClusterTimecode;
            var duration = this.duration;
            var timecodeScale = this.timecodeScale;
            this.emit("cluster", { timecode: timecode, data: data });
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
            if (this.trackTypes[trackNumber] === 1) {
                if (!this.firstVideoBlockRead) {
                    this.firstVideoBlockRead = true;
                    var CueTime = this.lastClusterTimecode + timecode;
                    this.cues.push({ CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: CueTime });
                    this.emit("cue_info", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: this.lastClusterTimecode });
                    this.emit("cue", { CueTrack: trackNumber, CueClusterPosition: this.lastClusterPosition, CueTime: CueTime });
                }
                this.last2SimpleBlockVideoTrackTimecode = [this.last2SimpleBlockVideoTrackTimecode[1], timecode];
            }
            else if (this.trackTypes[trackNumber] === 2) {
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
            this.emit_segment_info();
            this.emit("cluster_ptr", elm.tagStart);
            this.lastClusterPosition = elm.tagStart;
        }
        else if (elm.type === "u" && elm.name === "Timecode") {
            this.lastClusterTimecode = elm.value;
        }
        else if (elm.type === "u" && elm.name === "TimecodeScale") {
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
            put(elm);
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
            var videoTrackNum = this.trackTypes.indexOf(1); // find first video track
            if (videoTrackNum < 0) {
                return 0;
            }
            // defaultDuration は 生の nano sec
            var defaultDuration = this.trackDefaultDuration[videoTrackNum];
            if (typeof defaultDuration !== "number") {
                // https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22
                // default duration がないときに使う delta
                if (this.last2SimpleBlockAudioTrackTimecode[1] > this.last2SimpleBlockVideoTrackTimecode[1]) {
                    // audio diff
                    defaultDuration = (this.last2SimpleBlockAudioTrackTimecode[1] - this.last2SimpleBlockAudioTrackTimecode[0]) * this.timecodeScale;
                }
                else {
                    // video diff
                    defaultDuration = (this.last2SimpleBlockVideoTrackTimecode[1] - this.last2SimpleBlockVideoTrackTimecode[0]) * this.timecodeScale;
                }
            }
            // nanoseconds
            var codecDelay = 0;
            if (this.last2SimpleBlockAudioTrackTimecode[1] > this.last2SimpleBlockVideoTrackTimecode[1]) {
                // audio
                var delay = this.trackCodecDelay[this.trackTypes.indexOf(2)]; // 2 => audio
                if (typeof delay === "number") {
                    codecDelay = delay;
                }
            }
            else {
                // video
                var delay = this.trackCodecDelay[this.trackTypes.indexOf(1)]; // 1 => video
                if (typeof delay === "number") {
                    codecDelay = delay;
                }
            }
            var lastTimecode = 0;
            if (this.last2SimpleBlockAudioTrackTimecode[1] > this.last2SimpleBlockVideoTrackTimecode[1]) {
                // audio
                lastTimecode = this.last2SimpleBlockAudioTrackTimecode[1];
            }
            else {
                // video
                lastTimecode = this.last2SimpleBlockVideoTrackTimecode[1];
            }
            // convert to timecodescale
            var duration_nanosec = ((this.lastClusterTimecode + lastTimecode) * this.timecodeScale) + defaultDuration - codecDelay;
            var duration = duration_nanosec / this.timecodeScale;
            return Math.floor(duration);
        },
        enumerable: true,
        configurable: true
    });
    EBMLReader.prototype.addListener = function (event, listener) {
        return _super.prototype.addListener.call(this, event, listener);
    };
    return EBMLReader;
}(events_1.EventEmitter));
exports.default = EBMLReader;
;
;
;
;
function put(elm) {
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
}
exports.put = put;
