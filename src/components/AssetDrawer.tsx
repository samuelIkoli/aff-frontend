"use client";

import { useMemo, useState } from "react";
import Drawer from "./Drawer/Drawer";
import Image from "next/image";
import { Search, X } from "lucide-react"; // optional if you have lucide installed

export type AssetItem = {
    id: string;              // unique
    label: string;           // e.g. "Long Sleeve"
    category: string;        // e.g. "sleeves" | "collars" | "bases"
    thumbSrc: string;        // small preview (png/svg)
    payload: any;            // whatever you need to return on selection
};

type AssetDrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    side?: "left" | "right";
    title?: string;
    assets: AssetItem[];
    categories?: string[];   // filter tabs; if omitted, derive from assets
    onSelect: (asset: AssetItem) => void;
};

export default function AssetDrawer({
    open,
    onOpenChange,
    side = "right",
    title = "Choose a pattern",
    assets,
    categories,
    onSelect,
}: AssetDrawerProps) {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [q, setQ] = useState("");

    const cats = useMemo(() => {
        const set = new Set<string>(assets.map(a => a.category));
        const arr = Array.from(set);
        return ["all", ...arr];
    }, [assets]);

    const visible = useMemo(() => {
        const needle = q.trim().toLowerCase();
        return assets.filter(a => {
            if (activeCategory !== "all" && a.category !== activeCategory) return false;
            if (!needle) return true;
            return a.label.toLowerCase().includes(needle);
        });
    }, [assets, q, activeCategory]);

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            side={side}
            width={380}
            ariaLabel="Asset picker drawer"
            panelClassName="bg-white"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                    onClick={() => onOpenChange(false)}
                    className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            </div>

            {/* Filters */}
            <div className="px-4 py-3 border-b">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {(categories ?? cats).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={[
                                "px-3 py-1 rounded-full text-sm border",
                                activeCategory === cat
                                    ? "bg-[#fab75b] text-white border-[#fab75b]"
                                    : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700",
                            ].join(" ")}
                        >
                            {cat[0].toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="mt-3 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search patterns…"
                        className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fab75b]"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="p-4 grid grid-cols-2 gap-3 overflow-auto">
                {visible.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="group border rounded-lg hover:shadow-sm active:scale-[0.99] transition bg-white"
                    >
                        <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center">
                            {/* If using SVGs directly, you can use <img> instead of <Image> */}
                            <Image
                                src={item.thumbSrc}
                                alt={item.label}
                                width={160}
                                height={160}
                                className="object-contain"
                            />
                        </div>
                        <div className="p-2 text-sm text-gray-700 group-hover:text-gray-900">
                            {item.label}
                        </div>
                    </button>
                ))}

                {visible.length === 0 && (
                    <div className="col-span-2 text-center text-sm text-gray-500 py-8">
                        No patterns match your filters.
                    </div>
                )}
            </div>
        </Drawer>
    );
}
