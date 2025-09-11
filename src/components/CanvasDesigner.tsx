"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { loadSVGAsGroup } from "@/lib/fabricLoader";

type Selection = {
    garment: string;         // e.g. "shirt"
    sleeve?: string;         // e.g. "sleeve-long.svg"
    collar?: string;         // e.g. "collar-vneck.svg"
    fitWidth?: number;       // optional: target width for scaling (px)
    left?: number;           // optional: x position
    top?: number;            // optional: y position
};

function scaleGroupToWidth(group: fabric.Group, targetWidth: number) {
    const bounds = group.getBoundingRect();
    const scale = targetWidth / bounds.width;
    group.scale(scale);
    group.setCoords();
}

function placeGroup(group: fabric.Group, left: number, top: number) {
    group.set({ left, top });
    group.setCoords();
}

async function renderSelection(canvas: fabric.Canvas, selection: Selection) {
    canvas.clear();
    // canvas.backgroundColor("#fff", () => { });

    const {
        garment,
        sleeve,
        collar,
        fitWidth = 320, // default fit width
        left = 140,
        top = 60,
    } = selection;

    // 1) Base
    const base = await loadSVGAsGroup(`/assets/patterns/${garment}/base.svg`);
    base.set({ originX: "left", originY: "top", selectable: false });
    scaleGroupToWidth(base, fitWidth);
    placeGroup(base, left, top);
    canvas.add(base);

    // 2) Sleeve (optional)
    if (sleeve) {
        const sleeveGroup = await loadSVGAsGroup(`/assets/patterns/${garment}/${sleeve}`);
        sleeveGroup.set({ originX: "left", originY: "top", selectable: false });
        // scale + position sleeve to match base
        sleeveGroup.scale(base.scaleX ?? 1);
        placeGroup(sleeveGroup, left, top);
        canvas.add(sleeveGroup);
    }

    // 3) Collar (optional)
    if (collar) {
        const collarGroup = await loadSVGAsGroup(`/assets/patterns/${garment}/${collar}`);
        collarGroup.set({ originX: "left", originY: "top", selectable: false });
        collarGroup.scale(base.scaleX ?? 1);
        placeGroup(collarGroup, left, top);
        canvas.add(collarGroup);
    }

    canvas.renderAll();
}

export default function CanvasDesigner({ selection }: { selection: Selection }) {
    const canvasElRef = useRef<HTMLCanvasElement | null>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    // init once
    useEffect(() => {
        if (!canvasElRef.current) return;

        const canvas = new fabric.Canvas(canvasElRef.current, {
            width: 600,
            height: 640,
            backgroundColor: "#fff",
        });
        fabricCanvasRef.current = canvas;

        // initial paint
        (async () => {
            await renderSelection(canvas, selection);
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
            await renderSelection(canvas, selection);
        })();
    }, [selection]);

    return (
        <div className="w-full flex justify-center">
            <canvas ref={canvasElRef} />
        </div>
    );
}
