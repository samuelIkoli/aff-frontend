import type * as fabric from "fabric";
import type { BlockMetadata } from "./types";

export type MeasurementInput = {
    width_cm?: number;
    height_cm?: number;
};

function getBaseline(metadata: BlockMetadata): { width: number; height: number } {
    const baseline =
        metadata.baseline ??
        metadata.measurements?.baseline ?? {
            width_cm: metadata.measurements?.base_width_cm ?? 60,
            height_cm: metadata.measurements?.base_height_cm ?? 80,
        };

    return {
        width: baseline.width_cm ?? metadata.measurements?.base_width_cm ?? 60,
        height: baseline.height_cm ?? metadata.measurements?.base_height_cm ?? 80,
    };
}

/**
 * Apply parametric scaling to a fabric group using provided measurements.
 */
export function scaleBlock(
    group: fabric.Group,
    metadata: BlockMetadata,
    user: MeasurementInput
) {
    const baseline = getBaseline(metadata);
    const scaleX = user.width_cm ? user.width_cm / baseline.width : 1;
    const scaleY = user.height_cm ? user.height_cm / baseline.height : 1;

    group.scaleX = scaleX;
    group.scaleY = scaleY;
    group.setCoords();

    return { scaleX, scaleY };
}
