"use client";

import { useRef, useState } from "react";
import type * as fabric from "fabric";
import CanvasDesigner from "@/components/CanvasDesigner";
import BlockSelector from "@/components/design/BlockSelector";
import MeasurementControls from "@/components/design/MeasurementControls";
import TexturePicker from "@/components/design/TexturePicker";
import ExportPanel from "@/components/design/ExportPanel";

export default function DesignPage() {
    const [selection, setSelection] = useState({
        garment: "shirt",
        sleeve: "sleeve-short.svg",
        collar: "collar-round.svg",
    });
    const [measurements, setMeasurements] = useState({ width_cm: 60, height_cm: 80 });
    const [texture, setTexture] = useState<string | undefined>();
    const canvasRef = useRef<fabric.Canvas | null>(null);

    const setCanvas = (canvas: fabric.Canvas | null) => {
        canvasRef.current = canvas;
    };

    const exportPNG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL({ format: "png" });
        const link = document.createElement("a");
        link.download = "aff-design.png";
        link.href = dataUrl;
        link.click();
    };

    const exportSVG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const svg = canvas.toSVG();
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "aff-design.svg";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportJSON = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const json = canvas.toJSON(["metadata", "anchors"]);
        const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "aff-design.json";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0a05] via-[#140f0b] to-[#0a0604] text-white">
            <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-amber-100/70 uppercase tracking-[0.16em]">AFF Design Studio</p>
                    <h1 className="text-3xl font-semibold">Attach anchors, scale measurements, export patterns.</h1>
                    <p className="text-amber-100/80 max-w-2xl">
                        This MVP canvas snaps sleeves and collars to a shirt base using anchor metadata.
                        Adjust measurements, apply textures, and export PNG/SVG/JSON with preserved anchors.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
                    <div className="space-y-4">
                        <BlockSelector value={selection} onChange={setSelection} />
                        <MeasurementControls value={measurements} onChange={setMeasurements} />
                        <TexturePicker onApply={setTexture} />
                        <ExportPanel onExportPNG={exportPNG} onExportSVG={exportSVG} onExportJSON={exportJSON} />
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <CanvasDesigner
                            selection={selection}
                            measurements={measurements}
                            textureUrl={texture}
                            onExport={{ setCanvas }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
