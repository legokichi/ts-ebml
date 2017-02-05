"use strict";
var Buffer = require("buffer/").Buffer;
var EBMLEncoder_1 = require("./EBMLEncoder");
var EBMLDecoder_1 = require("./EBMLDecoder");
var EBMLMetaDataRefiner = (function () {
    function EBMLMetaDataRefiner() {
        this.clusters = [];
        this.segments = [];
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
            if (elm.type === "m" && elm.name === "Segment") {
                //console.log(`Segment: `, elm.start);
                _this.segments.push(elm);
                return;
            }
            if (elm.type === "m" && elm.name === "Cluster") {
                if (!_this.reachFirstCluster) {
                    _this.metadata.pop(); // Cluster を取り除く
                    _this.reachFirstCluster = true;
                }
                if (!elm.isEnd) {
                    //console.log(`Cluster: `, elm.start);
                    _this.clusters.push(elm);
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
                var _a = EBMLDecoder_1.default.readBlock(elm.data), timecode = _a.timecode, trackNumber = _a.trackNumber;
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
            return this._duration + (defaultDuration / this.timecodeScale);
        },
        enumerable: true,
        configurable: true
    });
    EBMLMetaDataRefiner.prototype.putRefinedMetaData = function () {
        var _this = this;
        var fstSgm = this.segments[0];
        if (fstSgm == null) {
            return [];
        } // まだ Segment まで読んでない
        if (!this.reachFirstCluster) {
            return [];
        } // まだ Cluster に到達していない => metadata 全部読めてない
        var lastmetadata = this.metadata[this.metadata.length - 1];
        if (lastmetadata == null) {
            return [];
        }
        if (lastmetadata.dataEnd < 0) {
            throw new Error("metadata does not have size");
        } // metadata が 不定サイズ
        var metadataSize = lastmetadata.dataEnd; // 書き換える前の metadata のサイズ
        var create = function (sizeDiff) {
            if (sizeDiff === void 0) { sizeDiff = 0; }
            var metadata = _this.metadata.slice(0);
            for (var i = 0; i < metadata.length; i++) {
                var elm = metadata[i];
                if (elm.type === "m" && elm.name === "Info" && elm.isEnd) {
                    var durBuf = new Buffer(4);
                    durBuf.writeFloatBE(_this.duration, 0);
                    var durationElm = { name: "Duration", type: "f", data: durBuf };
                    metadata.splice(i, 0, durationElm); // </Info> 前に <Duration /> を追加
                    i++; // <duration /> 追加した分だけインクリメント
                }
            }
            var seekHead = [];
            seekHead.push({ name: "SeekHead", type: "m" });
            _this.clusters.forEach(function (cluster) {
                seekHead.push({ name: "Seek", type: "m" });
                // [0x1F, 0x43, 0xB6, 0x75] で Cluster の意
                seekHead.push({ name: "SeekID", type: "b", data: new Buffer([0x1F, 0x43, 0xB6, 0x75]) });
                var posBuf = new Buffer(4); // 実際可変長 int なので 4byte 固定という実装は良くない
                // しかし ms 単位だとすれば 0xFFFFFFFF は 49 日もの時間を記述できるので実用上問題ない
                // 64bit や 可変長 int を js で扱うの面倒
                var start = cluster.start;
                var offset = start + sizeDiff;
                posBuf.writeUInt32BE(offset, 0);
                seekHead.push({ name: "SeekPosition", type: "u", data: posBuf });
                seekHead.push({ name: "Seek", type: "m", isEnd: true });
            });
            seekHead.push({ name: "SeekHead", type: "m", isEnd: true });
            metadata = metadata.concat(seekHead); // metadata 末尾に <SeekHead /> を追加
            return metadata;
        };
        var encorder = new EBMLEncoder_1.default();
        // 一旦 seekhead を作って自身のサイズを調べる
        var bufs = create(0).reduce(function (lst, elm) { return lst.concat(encorder.encode([elm])); }, []);
        var totalByte = bufs.reduce(function (o, buf) { return o + buf.byteLength; }, 0);
        // 自分自身のサイズを考慮した seekhead を再構成する
        //console.log("sizeDiff", totalByte - metadataSize);
        return create(totalByte - metadataSize);
    };
    return EBMLMetaDataRefiner;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EBMLMetaDataRefiner;
