"use client";

import { useState } from "react";
import CanvasDesigner from "@/components/CanvasDesigner";
import AssetControls from "@/components/AssetControls";

export default function DesignPage() {
    const [selection, setSelection] = useState({
        garment: "shirt",
        sleeve: "sleeve-short.svg",
        collar: "collar-round.svg",
    });

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-xl font-bold mb-4">AFF Designer</h1>
            <AssetControls selection={selection} setSelection={setSelection} />
            <div className="border-2 border-gray-400 rounded-md">
                <CanvasDesigner selection={selection} />
            </div>
        </div>
    );
}
