import * as fabric from "fabric";
import type {
    FabricObject,
    FabricObjectProps,
    SerializedObjectProps,
    ObjectEvents,
} from "fabric";

/** Type guard to keep TS happy and drop nulls */
function isFabricObject(
    x: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents> | null
): x is FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents> {
    return x !== null;
}

/** Load SVG and return a grouped object (Fabric v6) */
export async function loadSVGAsGroup(
    url: string,
    options: Partial<FabricObjectProps> = {}
): Promise<fabric.Group> {
    const { objects, options: svgOptions } = await fabric.loadSVGFromURL(url);

    // Filter out nulls that the parser may produce
    const safeObjects = objects.filter(isFabricObject);

    const group = new fabric.Group(safeObjects, {
        ...(svgOptions ?? {}),
        ...options,
        originX: "left",
        originY: "top",
    });

    return group;
}

/** (Optional) Return ungrouped pieces, with nulls removed */
export async function loadSVGPieces(
    url: string,
    options: Partial<FabricObjectProps> = {}
) {
    const { objects } = await fabric.loadSVGFromURL(url);
    const safeObjects = objects.filter(isFabricObject);
    safeObjects.forEach((o) => o.set(options));
    return safeObjects;
}

/** (Optional) Image loader */
export async function loadImage(
    url: string,
    options: any = {}
): Promise<fabric.Image> {
    return new Promise((resolve, reject) => {
        fabric.FabricImage.fromURL(
            url,
            options,
            (img: any) => (img ? (img.set(options), resolve(img)) : reject(new Error("Image load failed")))
        );
    });
}