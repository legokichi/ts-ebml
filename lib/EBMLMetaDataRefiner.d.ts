import * as EBML from "./EBML";
export default class EBMLMetaDataRefiner {
    /**
     * SeekHead に記載すべき Cluster Element の start
     */
    private clusters;
    private currentTrack;
    private trackTypes;
    /**
     * Number of nanoseconds (not scaled via TimecodeScale) per frame ('frame' in the Matroska sense -- one Element put into a (Simple)Block).
     */
    private trackDefaultDuration;
    private timecodeScale;
    private clusterTimecode;
    /**
      * based on timecodescale
      */
    private _duration;
    private reachFirstCluster;
    private metadata;
    constructor();
    /**
     * SeekHead および Info > Duration 構成のための情報を集める
     * Cluster と KeyFrame を探す
     */
    read(elms: EBML.EBMLElementDetail[]): void;
    /**
     * DefaultDuration が定義されている場合は最後のフレームのdurationも考慮する
     * 単位 timecodeScale
     */
    readonly duration: number;
    putRefinedMetaData(): {
        metadata: ArrayBuffer;
        clusterStartPos: number;
    };
}
