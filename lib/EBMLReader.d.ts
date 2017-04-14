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
    addListener(event: "cluster_ptr", listener: (ev: number) => void): this;
    addListener(event: "duration", listener: (ev: DurationInfo) => void): this;
    addListener(event: "metadata", listener: (ev: EBMLInfo) => void): this;
    addListener(event: "cluster", listener: (ev: EBMLInfo & {
        timecode: number;
    }) => void): this;
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
