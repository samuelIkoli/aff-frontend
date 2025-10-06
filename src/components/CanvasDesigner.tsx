"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
// import { loadSVGAsGroup } from "@/lib/fabricLoader";
import { alignByAnchor } from "@/lib/canvasUtils";
import {
    PX_PER_CM,
    HUMAN_HEIGHT_CM, HUMAN_WIDTH_CM
} from "@/lib/measurements/xxl";
import { CANVAS_HEIGHT_SCALE, CANVAS_WIDTH_SCALE } from "@/lib/measurements/canvasScale";

type Selection = {
    garment: string; // e.g. "shirt"
    sleeve?: string; // e.g. "sleeve-long.svg"
    collar?: string; // e.g. "collar-vneck.svg"
    fitWidth?: number; // optional: target width for scaling (px)
    left?: number; // optional: x position
    top?: number; // optional: y position
};

/**
 * Scale the base group to a target width
 */
function scaleGroupToWidth(group: fabric.Group, targetWidth: number) {
    const bounds = group.getBoundingRect();
    const scale = targetWidth / bounds.width;
    group.scale(scale);
    group.setCoords();
}

/**
 * Place group at specific coordinates
 */
function placeGroup(group: fabric.Group, left: number, top: number) {
    group.set({ left, top });
    group.setCoords();
}

// async function renderSelection(canvas: fabric.Canvas, selection: Selection) {
//     canvas.clear();

//     const {
//         garment,
//         sleeve,
//         collar,
//         fitWidth = 320, // default fit width
//         left = 140,
//         top = 60,
//     } = selection;

//     // 1) Load metadata for this garment
//     const metadata: Record<string, { anchor: { x: number; y: number } }> =
//         await fetch(`/assets/metadata/${garment}.json`).then((res) => res.json());

//     // 2) Base
//     const base = await loadSVGAsGroup(`/assets/patterns/${garment}/base.svg`);
//     base.set({ originX: "left", originY: "top", selectable: false });
//     scaleGroupToWidth(base, fitWidth);
//     placeGroup(base, left, top);
//     canvas.add(base);

//     // 3) Sleeve (optional, aligned by anchor)
//     if (sleeve) {
//         const sleeveGroup = await loadSVGAsGroup(`/assets/patterns/${garment}/${sleeve}`);
//         sleeveGroup.set({ originX: "left", originY: "top", selectable: false });

//         if (metadata[sleeve]) {
//             alignByAnchor(sleeveGroup, base, metadata[sleeve]);
//             // apply same scaling as base
//             sleeveGroup.scale(base.scaleX ?? 1);
//         }

//         canvas.add(sleeveGroup);
//     }

//     // 4) Collar (optional, aligned by anchor)
//     if (collar) {
//         const collarGroup = await loadSVGAsGroup(`/assets/patterns/${garment}/${collar}`);
//         collarGroup.set({ originX: "left", originY: "top", selectable: false });

//         if (metadata[collar]) {
//             alignByAnchor(collarGroup, base, metadata[collar]);
//             collarGroup.scale(base.scaleX ?? 1);
//         }

//         canvas.add(collarGroup);
//     }

//     canvas.renderAll();
// }

export default function CanvasDesigner({ selection }: { selection: Selection }) {
    const canvasElRef = useRef<HTMLCanvasElement | null>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    const humanHeightCm = HUMAN_HEIGHT_CM
    const humanWidthCm = HUMAN_WIDTH_CM
    const humanHeightPx = humanHeightCm * PX_PER_CM;
    const humanWidthPx = humanWidthCm * PX_PER_CM;

    const canvasHeight = humanHeightPx * CANVAS_HEIGHT_SCALE;   // extra 20% space
    const canvasWidth = humanWidthPx * CANVAS_WIDTH_SCALE;


    // init once
    useEffect(() => {
        if (!canvasElRef.current) return;

        const canvas = new fabric.Canvas(canvasElRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: "#fff",
        });


        fabricCanvasRef.current = canvas;
        // Track tooltip object so we don't create duplicates
        let tooltip: fabric.Text | null = null;

        canvas.on("mouse:move", (opt) => {
            const pointer = canvas.getPointer(opt.e);
            const x = Math.round(pointer.x);
            const y = Math.round(pointer.y);

            // If tooltip doesn't exist, create it
            if (!tooltip) {
                tooltip = new fabric.Text(`${x}, ${y}`, {
                    left: x + 10,
                    top: y + 10,
                    fontSize: 12,
                    fill: "black",
                    backgroundColor: "white",
                    selectable: false,
                    evented: false,
                });
                canvas.add(tooltip);
            } else {
                // Update existing tooltip
                tooltip.set({ text: `${x}, ${y}`, left: x + 10, top: y + 10 });
            }

            // Horizontal line
            const hLine = new fabric.Line([0, canvas.height / 2, canvas.width, canvas.height / 2], {
                stroke: "#dadada",
                selectable: false,
                evented: false,
            });

            // Vertical line
            const vLine = new fabric.Line([canvas.width / 2, 0, canvas.width / 2, canvas.height], {
                stroke: "#dadada",
                selectable: false,
                evented: false,
            });

            canvas.add(hLine);
            canvas.add(vLine);
            canvas.sendObjectBackwards(hLine);
            canvas.sendObjectBackwards(vLine);

            canvas.renderAll();
        });


        (async () => {
            // await renderSelection(canvas, selection);
        })();

        return () => {
            canvas.dispose();
            fabricCanvasRef.current = null;
        };
    }, []);

    // re-render when selection changes
    useEffect(() => {
        (async () => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return;
            // await renderSelection(canvas, selection);
        })();
    }, [selection]);

    return (
        <div className="w-full flex justify-center border-2 border-gray-400 rounded-md">
            <canvas ref={canvasElRef} />
        </div>
    );
}
