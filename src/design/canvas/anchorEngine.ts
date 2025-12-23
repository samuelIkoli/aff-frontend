import * as fabric from "fabric";
import type { AnchorPoint, LoadedBlock } from "./types";

function getMetadataAnchors(obj: fabric.Object): Record<string, AnchorPoint> | null {
    const metadata = (obj as any).metadata;
    if (!metadata || !metadata.anchors) return null;
    return metadata.anchors;
}

export function getAnchorPosition(obj: fabric.Object, key: string): AnchorPoint | null {
    const anchors = getMetadataAnchors(obj);
    if (!anchors || !anchors[key]) return null;
    const anchor = anchors[key];

    const scaleX = obj.scaleX ?? 1;
    const scaleY = obj.scaleY ?? 1;
    const left = obj.left ?? 0;
    const top = obj.top ?? 0;

    return {
        x: left + anchor.x * scaleX,
        y: top + anchor.y * scaleY,
    };
}

type AttachOptions = {
    baseAnchor: string;
    childAnchor: string;
    rotateChild?: boolean;
};

/**
 * Move child so that anchor points overlap (pixel-accurate snapping).
 */
export function attachBlock(
    base: LoadedBlock,
    child: LoadedBlock,
    canvas: fabric.Canvas,
    options: AttachOptions
) {
    const basePos = getAnchorPosition(base.group, options.baseAnchor);
    const childPos = getAnchorPosition(child.group, options.childAnchor);
    if (!basePos || !childPos) return;

    const dx = basePos.x - childPos.x;
    const dy = basePos.y - childPos.y;

    child.group.set({
        left: (child.group.left ?? 0) + dx,
        top: (child.group.top ?? 0) + dy,
    });

    if (options.rotateChild) {
        child.group.rotate(base.group.angle ?? 0);
    }

    child.group.setCoords();
    canvas.renderAll();
}
