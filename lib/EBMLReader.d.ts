/// <reference types="node" />
import { EventEmitter } from "events";
import * as EBML from './EBML';
/**
 * This is an informal code for reference.
 * EBMLReader is a class for getting information to enable seeking Webm recorded by MediaRecorder.
 * So please do not use for regular WebM files.
 */
export default class EBMLReader extends EventEmitter {
    private metadataloaded;
    private stack;
    private chunks;
    private segmentOffset;
    private last2SimpleBlockVideoTrackTimecode;
    private last2SimpleBlockAudioTrackTimecode;
    private lastClusterTimecode;
    private lastClusterPosition;
    private firstVideoBlockRead;
    private firstAudioBlockRead;
    timecodeScale: number;
    metadataSize: number;
    metadatas: EBML.EBMLElementDetail[];
    private currentTrack;
    private trackTypes;
    private trackDefaultDuration;
    private trackCodecDelay;
    private first_video_simpleblock_of_cluster_is_loaded;
    private ended;
    trackInfo: {
        type: "video" | "audio" | "both";
        trackNumber: number;
    } | {
        type: "nothing";
    };
    /**
     * usefull for thumbnail creation.
     */
    use_webp: boolean;
    use_duration_every_simpleblock: boolean;
    logging: boolean;
    logGroup: string;
    private hasLoggingStarted;
    /**
     * usefull for recording chunks.
     */
    use_segment_info: boolean;
    /** see: https://bugs.chromium.org/p/chromium/issues/detail?id=606000#c22 */
    drop_default_duration: boolean;
    cues: {
        CueTrack: number;
        CueClusterPosition: number;
        CueTime: number;
    }[];
    constructor();
    /**
     * emit final state.
     */
    stop(): void;
    /**
     * emit chunk info
     */
    private emit_segment_info;
    read(elm: EBML.EBMLElementDetail): void;
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
    get duration(): number;
    /**
     * @deprecated
     * emit on every segment
     * https://www.matroska.org/technical/specs/notes.html#Position_References
    */
    addListener(event: "segment_offset", listener: (ev: number) => void): this;
    /**
     * @deprecated
     * emit on every cluster element start.
     * Offset byte from __file start__. It is not an offset from the Segment element.
     */
    addListener(event: "cluster_ptr", listener: (ev: number) => void): this;
    /** @deprecated
     * emit on every cue point for cluster to create seekable webm file from MediaRecorder
     * */
    addListener(event: "cue_info", listener: (ev: CueInfo) => void): this;
    /** emit on every cue point for cluster to create seekable webm file from MediaRecorder */
    addListener(event: "cue", listener: (ev: CueInfo) => void): this;
    /** latest EBML > Info > TimecodeScale and EBML > Info > Duration to create seekable webm file from MediaRecorder */
    addListener(event: "duration", listener: (ev: DurationInfo) => void): this;
    /** EBML header without Cluster Element for recording metadata chunk */
    addListener(event: "metadata", listener: (ev: SegmentInfo & {
        metadataSize: number;
    }) => void): this;
    /** emit every Cluster Element and its children for recording chunk */
    addListener(event: "cluster", listener: (ev: SegmentInfo & {
        timecode: number;
    }) => void): this;
    /** for thumbnail */
    addListener(event: "webp", listener: (ev: ThumbnailInfo) => void): this;
    put(elm: EBML.EBMLElementDetail): void;
}
/** CueClusterPosition: Offset byte from __file start__. It is not an offset from the Segment element. */
export interface CueInfo {
    CueTrack: number;
    CueClusterPosition: number;
    CueTime: number;
}
export interface SegmentInfo {
    data: EBML.EBMLElementDetail[];
}
export interface DurationInfo {
    duration: number;
    timecodeScale: number;
}
export interface ThumbnailInfo {
    webp: Blob;
    currentTime: number;
}
