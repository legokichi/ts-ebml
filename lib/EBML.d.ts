/// <reference types="node" />
export declare type ChildElementsValue = NumberElement | StringElement | BinaryElement | DateElement;
export declare type EBMLElementValue = MasterElement | ChildElementsValue;
export declare type ChildElementBuffer = ChildElement & {
    data: Buffer;
};
export declare type EBMLElementBuffer = MasterElement | ChildElementBuffer;
export declare type EBMLElementBufferValue = MasterElement | (ChildElementsValue & {
    data: Buffer;
});
export declare type EBMLElementDetail = (MasterElement & {
    isEnd: boolean;
} | (ChildElementsValue & {
    data: Buffer;
})) & ElementDetail;
export interface IElement {
    name: string;
    type: "m" | "u" | "i" | "f" | "s" | "8" | "b" | "d";
}
export interface ChildElement extends IElement {
    type: "u" | "i" | "f" | "s" | "8" | "b" | "d";
}
export interface MasterElement extends IElement {
    type: "m";
    isEnd?: boolean;
    unknownSize?: boolean;
}
export interface ChildElementValue extends ChildElement {
    value: any;
}
export interface NumberElement extends ChildElementValue {
    type: "u" | "i" | "f";
    value: number;
}
export interface StringElement extends ChildElementValue {
    type: "s" | "8";
    value: string;
}
export interface BinaryElement extends ChildElementValue {
    type: "b";
    value: Buffer;
}
export interface DateElement extends ChildElementValue {
    type: "d";
    value: string;
}
export interface ElementDetail {
    schema: Schema;
    /**
     * hex EBML ID
     */
    EBML_ID: string;
    /**
     * The level within an EBML tree that the element may occur at. + is for a recursive level (can be its own child). g: global element (can be found at any level)
     */
    level: number;
    /**
     * このタグのバッファ全体における開始オフセット位置
     */
    start: number;
    /**
     * このタグのバッファ全体における終了オフセット位置
     */
    end: number;
    /**
     * 要素の中身の開始位置
     */
    dataStart: number;
    /**
     * 要素の中身の終了位置
     */
    dataEnd: number;
    /**
     * dataEnd - dataStart
     */
    dataSize: number;
}
export interface SimpleBlock {
    discardable: boolean;
    frames: Buffer[];
    invisible: boolean;
    keyframe: boolean;
    timecode: number;
    trackNumber: number;
}
export interface Schema {
    name: string;
    level: number;
    type: string;
    description: string;
}
