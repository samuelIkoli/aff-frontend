"use client";

import { useState } from "react";

type TexturePickerProps = {
    onApply: (url: string) => void;
};

// Small inline SVG patterns to avoid missing assets
const swatches = [
    {
        label: "Gold weave",
        url: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><rect width='12' height='12' fill='%23f3b23a'/><path d='M0 6h12M6 0v12' stroke='%23d18a16' stroke-width='2' opacity='0.6'/></svg>`,
    },
    {
        label: "Indigo dots",
        url: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' fill='%23122c46'/><circle cx='2' cy='2' r='1.5' fill='%23c5d7f2' opacity='0.8'/><circle cx='7' cy='7' r='1.5' fill='%23c5d7f2' opacity='0.8'/></svg>`,
    },
    {
        label: "Wax zigzag",
        url: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='16' height='16' fill='%23fef3c7'/><path d='M0 12 L4 4 L8 12 L12 4 L16 12' stroke='%23f97316' stroke-width='2' fill='none'/></svg>`,
    },
];

export default function TexturePicker({ onApply }: TexturePickerProps) {
    const [customUrl, setCustomUrl] = useState("");
    return (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-amber-100">Fabric / texture</div>
            <div className="flex flex-wrap gap-2">
                {swatches.map((swatch) => (
                    <button
                        key={swatch.url}
                        onClick={() => onApply(swatch.url)}
                        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white hover:bg-white/15"
                    >
                        {swatch.label}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 text-sm text-amber-100/80">
                <input
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Paste image URL"
                    className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
                />
                <button
                    onClick={() => customUrl && onApply(customUrl)}
                    className="px-3 py-2 rounded-lg bg-amber-400 text-black font-semibold"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}
