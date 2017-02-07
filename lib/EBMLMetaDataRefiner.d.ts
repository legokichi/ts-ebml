import * as EBML from "./EBML";
export default class EBMLMetaDataRefiner {
    /**
     * SeekHead に記載すべき Cluster Element
     */
    private clusters;
    private segments;
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
    _duration: number;
    private reachFirstCluster;
    private metadata;
    clusterStartPos: number;
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
    private readonly duration;
    putRefinedMetaData(): EBML.EBMLElementBuffer[];
}
