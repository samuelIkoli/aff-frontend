import type * as fabric from "fabric";

export type AnchorPoint = {
    x: number;
    y: number;
};

export type AnchorMap = Record<string, AnchorPoint>;

export type BlockMetadata = {
    type: "collar" | "sleeve" | "torso" | "skirt" | string;
    anchors: AnchorMap;
    measurements?: {
        base_width_cm?: number;
        base_height_cm?: number;
        baseline?: {
            width_cm?: number;
            height_cm?: number;
        };
    };
    baseline?: {
        width_cm?: number;
        height_cm?: number;
    };
};

export type LoadedBlock = {
    group: fabric.Group;
    metadata: BlockMetadata;
};
