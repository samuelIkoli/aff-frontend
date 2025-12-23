import * as fabric from "fabric";

type TextureOptions = {
    repeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
    scaleX?: number;
    scaleY?: number;
    rotate?: number;
};

/**
 * Apply a repeating fabric texture to a group or object.
 */
export function applyTexture(
    target: fabric.Object,
    image: HTMLImageElement,
    options: TextureOptions = {}
) {
    const pattern = new fabric.Pattern({
        source: image,
        repeat: options.repeat ?? "repeat",
    });

    if (options.scaleX) pattern.scaleX = options.scaleX;
    if (options.scaleY) pattern.scaleY = options.scaleY;

    target.set("fill", pattern);
    if (options.rotate) {
        target.rotate(options.rotate);
    }

    target.setCoords();
}
