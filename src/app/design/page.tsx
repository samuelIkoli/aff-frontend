"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function HomePage() {
    const canvasRef = useRef<fabric.Canvas | null>(null);



    useEffect(() => {
        const canvas = new fabric.Canvas("design-canvas", {
            height: 500,
            width: 400,
            backgroundColor: "#f9f9f9",
        });
        canvasRef.current = canvas;



        // Base shirt body (rectangle placeholder)
        const body = new fabric.Rect({
            left: 120,
            top: 100,
            fill: "#e0dcdc",
            width: 160,
            height: 250,
            selectable: false,
        });
        body.set({ id: "body" });
        canvas.add(body);

        // Default short sleeves (symmetrical)
        addSleeves(canvas, "short");

        // Default round neck
        addNeck(canvas, "round");

        return () => {
            canvas.dispose();
        };
    }, []);

    // Function to add sleeves
    const addSleeves = (canvas: fabric.Canvas, type: "short" | "long") => {
        const sleeveHeight = type === "short" ? 80 : 160;

        // Left sleeve
        const leftSleeve = new fabric.Rect({
            left: 80,
            top: 100,
            fill: "#e0dcdc",
            width: 40,
            height: sleeveHeight,
            selectable: false,
        });
        leftSleeve.set({ id: "leftSleeve" });

        // Right sleeve
        const rightSleeve = new fabric.Rect({
            left: 280, // placed symmetrically to the right of body
            top: 100,
            fill: "#e0dcdc",
            width: 40,
            height: sleeveHeight,
            selectable: false,
        });
        rightSleeve.set({ id: "rightSleeve" });

        canvas.add(leftSleeve, rightSleeve);
    };

    // Update sleeves
    const updateSleeves = (type: "short" | "long") => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Remove old sleeves
        canvas.getObjects().forEach(obj => {
            if ((obj as any).id === "leftSleeve" || (obj as any).id === "rightSleeve") {
                canvas.remove(obj);
            }
        });

        // Add new sleeves
        addSleeves(canvas, type);
        canvas.renderAll();
    };

    // Function to add necklines
    const addNeck = (canvas: fabric.Canvas, type: "round" | "vneck") => {
        let neck: fabric.Object;

        if (type === "round") {
            neck = new fabric.Circle({
                left: 170,
                top: 70,
                radius: 30,
                fill: "#f9f9f9",
                selectable: false,
            });
        } else {
            // Proper V-neck using path
            neck = new fabric.Path("M 160 70 L 190 110 L 220 70 Z", {
                fill: "#f9f9f9",
                selectable: false,
            });
        }

        neck.set({ id: "neck" });
        canvas.add(neck);
    };

    // Update neckline
    const updateNeck = (type: "round" | "vneck") => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Remove old neck
        const oldNeck = canvas.getObjects().find(obj => (obj as any).id === "neck");
        if (oldNeck) canvas.remove(oldNeck);

        // Add new
        addNeck(canvas, type);
        canvas.renderAll();
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <h1 className="text-2xl font-bold">AFF Design Studio (MVP)</h1>
            <canvas id="design-canvas" className="border rounded shadow" />

            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => updateSleeves("short")}
                    className="px-4 py-2 bg-[#c8a369] text-white rounded"
                >
                    Short Sleeve
                </button>
                <button
                    onClick={() => updateSleeves("long")}
                    className="px-4 py-2 bg-[#5c4033] text-white rounded"
                >
                    Long Sleeve
                </button>
            </div>

            <div className="flex gap-4 mt-2">
                <button
                    onClick={() => updateNeck("round")}
                    className="px-4 py-2 bg-[#fab75b] text-white rounded"
                >
                    Round Neck
                </button>
                <button
                    onClick={() => updateNeck("vneck")}
                    className="px-4 py-2 bg-[#5c4033] text-white rounded"
                >
                    V-Neck
                </button>
            </div>
        </div>
    );
}
