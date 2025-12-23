"use client";

import { useCallback, useEffect, useRef } from "react";
import * as fabric from "fabric";
import { PX_PER_CM, HUMAN_HEIGHT_CM, HUMAN_WIDTH_CM } from "@/lib/measurements/xxl";
import { CANVAS_HEIGHT_SCALE, CANVAS_WIDTH_SCALE } from "@/lib/measurements/canvasScale";
import { createCanvas, addMidlines } from "@/design/canvas/canvasManager";
import { loadBlock } from "@/design/canvas/objectLoader";
import { attachBlock } from "@/design/canvas/anchorEngine";
import { scaleBlock, type MeasurementInput } from "@/design/canvas/measurementEngine";
import { applyTexture } from "@/design/canvas/textureEngine";

type Selection = {
    garment: string;
    sleeve?: string;
    collar?: string;
};

type CanvasDesignerProps = {
    selection: Selection;
    measurements: MeasurementInput;
    textureUrl?: string;
    onExport: {
        setCanvas: (canvas: fabric.Canvas | null) => void;
    };
};

async function loadImageElement(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

export default function CanvasDesigner({ selection, measurements, textureUrl, onExport }: CanvasDesignerProps) {
    const canvasElRef = useRef<HTMLCanvasElement | null>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    const humanHeightPx = HUMAN_HEIGHT_CM * PX_PER_CM;
    const humanWidthPx = HUMAN_WIDTH_CM * PX_PER_CM;
    const canvasHeight = humanHeightPx * CANVAS_HEIGHT_SCALE;
    const canvasWidth = humanWidthPx * CANVAS_WIDTH_SCALE;

    const renderSelection = useCallback(async () => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        canvas.clear();
        addMidlines(canvas);

        const base = await loadBlock({
            patternPath: `/assets/patterns/${selection.garment}/base.svg`,
            metadataPath: `/assets/metadata/${selection.garment}/base.json`,
        });

        scaleBlock(base.group, base.metadata, measurements);
        // center base after scaling so the garment is balanced on the canvas
        const baseWidth = base.group.getScaledWidth();
        const baseHeight = base.group.getScaledHeight();
        base.group.set({
            left: (canvasWidth - baseWidth) / 2,
            top: (canvasHeight - baseHeight) / 2 - 40,
        });
        base.group.setCoords();
        if (textureUrl) {
            const img = await loadImageElement(textureUrl);
            applyTexture(base.group, img);
        }
        canvas.add(base.group);

        if (selection.sleeve) {
            const sleeve = await loadBlock({
                patternPath: `/assets/patterns/${selection.garment}/${selection.sleeve}`,
                metadataPath: `/assets/metadata/${selection.garment}/${selection.sleeve.replace(".svg", ".json")}`,
            });
            sleeve.group.scaleX = base.group.scaleX;
            sleeve.group.scaleY = base.group.scaleY;
            attachBlock(base, sleeve, canvas, { baseAnchor: "attach_left", childAnchor: "attach_left" });
            canvas.add(sleeve.group);
        }

        if (selection.collar) {
            const collar = await loadBlock({
                patternPath: `/assets/patterns/${selection.garment}/${selection.collar}`,
                metadataPath: `/assets/metadata/${selection.garment}/${selection.collar.replace(".svg", ".json")}`,
            });
            collar.group.scaleX = base.group.scaleX;
            collar.group.scaleY = base.group.scaleY;
            attachBlock(base, collar, canvas, { baseAnchor: "collar", childAnchor: "attach" });
            // Treat collar as a cutout (negative space) by erasing with destination-out
            collar.group.set({
                globalCompositeOperation: "destination-out",
                selectable: false,
                evented: false,
            });
            canvas.add(collar.group);
        }

        canvas.renderAll();
    }, [measurements, selection.collar, selection.garment, selection.sleeve, textureUrl]);

    useEffect(() => {
        if (!canvasElRef.current) return;
        const canvas = createCanvas(canvasElRef.current, canvasWidth, canvasHeight);
        fabricCanvasRef.current = canvas;
        onExport.setCanvas(canvas);
        addMidlines(canvas);

        (async () => {
            await renderSelection();
        })();

        return () => {
            canvas.dispose();
            fabricCanvasRef.current = null;
            onExport.setCanvas(null);
        };
    }, [canvasHeight, canvasWidth, onExport, renderSelection]);

    useEffect(() => {
        (async () => {
            if (!fabricCanvasRef.current) return;
            await renderSelection();
        })();
    }, [renderSelection, textureUrl]);

    return (
        <div className="w-full flex justify-center border border-white/10 rounded-2xl bg-white/5 p-3">
            <canvas ref={canvasElRef} />
        </div>
    );
}
