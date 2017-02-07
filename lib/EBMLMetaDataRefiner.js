"use strict";
var Buffer = require("buffer/").Buffer;
var EBMLEncoder_1 = require("./EBMLEncoder");
var tools = require("./tools");
var EBMLMetaDataRefiner = (function () {
    function EBMLMetaDataRefiner() {
        this.clusters = [];
        this.currentTrack = { TrackNumber: -1, TrackType: -1, DefaultDuration: null };
        this.trackTypes = [];
        this.timecodeScale = 0;
        this.clusterTimecode = 0;
        this._duration = -1;
        this.trackDefaultDuration = [];
        this.reachFirstCluster = false;
        this.metadata = [];
    }
    /**
     * SeekHead および Info > Duration 構成のための情報を集める
     * Cluster と KeyFrame を探す
     */
    EBMLMetaDataRefiner.prototype.read = function (elms) {
        var _this = this;
        elms.forEach(function (elm) {
            if (!_this.reachFirstCluster) {
                _this.metadata.push(elm);
            }
            if (elm.type === "m" && elm.name === "Cluster") {
                if (!_this.reachFirstCluster) {
                    _this.reachFirstCluster = true;
                    _this.metadata.pop(); // Cluster を取り除く
                }
                if (!elm.isEnd) {
                    //console.log(`Cluster: `, elm.start);
                    _this.clusters.push(elm.start);
                }
                return;
            }
            if (elm.type === "m" && elm.name === "TrackEntry") {
                if (elm.isEnd) {
                    _this.trackTypes[_this.currentTrack.TrackNumber] = _this.currentTrack.TrackType;
                    _this.trackDefaultDuration[_this.currentTrack.TrackNumber] = _this.currentTrack.DefaultDuration;
                }
                _this.currentTrack = { TrackNumber: -1, TrackType: -1, DefaultDuration: null };
                return;
            }
            if (elm.type === "b" && elm.name === "SimpleBlock") {
                var _a = tools.ebmlBlock(elm.data), timecode = _a.timecode, trackNumber = _a.trackNumber;
                if (_this.trackTypes[trackNumber] !== 1) {
                    return;
                } // trackType === 1 => video track
                //logger(new Error, "log")(`SimpleBlock: `, elm.dataStart, "keyframe:", keyframe,"(", this.clusterTimecode, "+", timecode ,")*", this.timecodeScale, "nano sec");
                _this._duration = _this.clusterTimecode + timecode;
                return;
            }
            if (elm.type !== "u") {
                return;
            }
            switch (elm.name) {
                case "TimecodeScale":
                    _this.timecodeScale = elm.value;
                    return;
                case "TrackType":
                    _this.currentTrack.TrackType = elm.value;
                    return;
                case "TrackNumber":
                    _this.currentTrack.TrackNumber = elm.value;
                    return;
                case "DefaultDuration":
                    _this.currentTrack.DefaultDuration = elm.value;
                    return;
                case "Timecode":
                    _this.clusterTimecode = elm.value;
                    //logger(new Error, "info")(`Timecode: `, elm.dataStart, this.clusterTimecode);
                    return;
            }
        });
    };
    Object.defineProperty(EBMLMetaDataRefiner.prototype, "duration", {
        /**
         * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
         * 単位 timecodeScale
         */
        get: function () {
            var videoTrackNum = this.trackTypes.indexOf(1); // find first video track
            if (videoTrackNum < 0) {
                return 0;
            }
            var defaultDuration = this.trackDefaultDuration[videoTrackNum];
            if (typeof defaultDuration !== "number") {
                return this._duration;
            }
            // defaultDuration は 生の nano sec
            // this._duration は timecodescale 考慮されている
            var duration_nanosec = (this._duration * this.timecodeScale) + defaultDuration;
            var duration = duration_nanosec / this.timecodeScale;
            return duration | 0;
        },
        enumerable: true,
        configurable: true
    });
    EBMLMetaDataRefiner.prototype.putRefinedMetaData = function () {
        var clusterStartPos = this.clusters[0];
        var metadata = tools.putRefinedMetaData(this.metadata, this.clusters, this.duration);
        var metadataBuf = new EBMLEncoder_1.default().encode(metadata);
        return { metadata: metadataBuf, clusterStartPos: clusterStartPos };
    };
    return EBMLMetaDataRefiner;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EBMLMetaDataRefiner;
