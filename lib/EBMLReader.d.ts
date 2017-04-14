/// <reference types="node" />
import { EventEmitter } from "events";
import * as EBML from './EBML';
export default class EBMLReader extends EventEmitter {
    private metadataloaded;
    private stack;
    private chunks;
    private lastSimpleBlockVideoTrackTimecode;
    private lastClusterTimecode;
    private deltaDuration;
    private timecodeScale;
    private currentTrack;
    private trackTypes;
    private trackDefaultDuration;
    private _duration;
    private ended;
    use_webp: boolean;
    emit_duration_every_simpleblock: boolean;
    logging: boolean;
    constructor();
    stop(): void;
    private flush();
    read(elm: EBML.EBMLElementDetail): void;
    /**
     * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
     * 単位 timecodeScale
     */
    private readonly duration;
    /** emit on every cluster element start */
    addListener(event: "cluster_ptr", listener: (ev: number) => void): this;
    /** latest EBML > Info > TimecodeScale and EBML > Info > Duration */
    addListener(event: "duration", listener: (ev: DurationInfo) => void): this;
    /** EBML header without Cluster Element */
    addListener(event: "metadata", listener: (ev: EBMLInfo) => void): this;
    /** emit every Cluster Element and its children */
    addListener(event: "cluster", listener: (ev: EBMLInfo & {
        timecode: number;
    }) => void): this;
    /** for thumbnail */
    addListener(event: "webp", listener: (ev: ThumbnailInfo) => void): this;
}
export interface EBMLInfo {
    data: EBML.EBMLElementBufferValue[];
}
export interface DurationInfo {
    duration: number;
    timecodeScale: number;
}
export interface ThumbnailInfo {
    webp: Blob;
    currentTime: number;
}
export declare function put(elm: EBML.EBMLElementDetail): void;
