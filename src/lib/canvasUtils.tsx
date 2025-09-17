import * as fabric from "fabric";

/**
 * Align part relative to base using anchor metadata
 * Example metadata: { anchor: { x: 50, y: 20 } }
 */
export function alignByAnchor(
    obj: fabric.Object,
    base: fabric.Object,
    metadata: { anchor: { x: number; y: number } }
) {
    const baseLeft = base.left ?? 0;
    const baseTop = base.top ?? 0;

    obj.set({
        left: baseLeft + metadata.anchor.x,
        top: baseTop + metadata.anchor.y,
        originX: "left",
        originY: "top",
    });

    obj.setCoords();
}
