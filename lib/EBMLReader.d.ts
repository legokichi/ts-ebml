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
    addListener(event: "duration", listener: (ev: CustomEvent & {
        detail: DurationInfo;
    }) => void): this;
    addListener(event: "metadata", listener: (ev: CustomEvent & {
        detail: EBMLInfo;
    }) => void): this;
    addListener(event: "cluster", listener: (ev: CustomEvent & {
        detail: EBMLInfo & {
            timecode: number;
        };
    }) => void): this;
    addListener(event: "webp", listener: (ev: CustomEvent & {
        detail: ThumbnailInfo;
    }) => void): this;
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
