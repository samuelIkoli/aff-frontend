"use client";

import { useState } from "react";
import CanvasDesigner from "@/components/CanvasDesigner";
import AssetControls from "@/components/AssetControls";
import AssetDrawer, { AssetItem } from "@/components/AssetDrawer";

const placeImage = "data:image/jpeg;base64,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"

export default function DesignPage() {
    const [selection, setSelection] = useState({
        garment: "shirt",
        sleeve: "sleeve-short.svg",
        collar: "collar-round.svg",
    });

    //Asset Drawer Logic
    const [drawerOpen, setDrawerOpen] = useState(false);
    const assets: AssetItem[] = [
        {
            id: "base-shirt",
            label: "Base Shirt",
            category: "bases",
            thumbSrc: placeImage,
            payload: { type: "base", garment: "shirt" },
        },
        {
            id: "sleeve-long",
            label: "Long Sleeve",
            category: "sleeves",
            thumbSrc: placeImage,
            payload: { type: "sleeve", variant: "long" },
        },
        {
            id: "collar-v",
            label: "V-Neck",
            category: "collars",
            thumbSrc: placeImage,
            payload: { type: "collar", variant: "v-neck" },
        },
        // …add more
    ];

    const handleSelect = (item: AssetItem) => {
        // Wire into your selection state → update CanvasDesigner props
        console.log("Selected:", item);
        setDrawerOpen(false);
    };

    return (
        <>
            <div className="flex gap-2">
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="px-3 py-2 rounded-md bg-[#fab75b] text-white hover:brightness-95"
                >
                    Choose Pattern
                </button>
            </div>
            <div className="flex flex-col items-center p-6">
                <h1 className="text-xl font-bold mb-4">AFF Designer</h1>

                {/* Row container */}
                <div className="flex w-full gap-4">
                    {/* AssetControls: left half */}
                    <div className="w-1/2">
                        <AssetControls selection={selection} setSelection={setSelection} />
                    </div>

                    {/* CanvasDesigner: right half */}
                    <div>
                        <CanvasDesigner selection={selection} />
                    </div>
                </div>
            </div>
            <AssetDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                side="right"
                assets={assets}
                onSelect={handleSelect}
            />
        </>


    );
}
