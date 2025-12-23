"use client";

type BlockSelectorProps = {
    value: { garment: string; sleeve?: string; collar?: string };
    onChange: (next: BlockSelectorProps["value"]) => void;
};

const garmentOptions = [
    { label: "Shirt base", value: "shirt" },
    { label: "Dress (coming soon)", value: "dress", disabled: true },
    { label: "Trousers (coming soon)", value: "trousers", disabled: true },
];

const sleeveOptions = [
    { label: "Short sleeve", value: "sleeve-short.svg" },
    { label: "Long sleeve", value: "sleeve-long.svg" },
];

const collarOptions = [
    { label: "Round collar", value: "collar-round.svg" },
    { label: "V-neck", value: "collar-vneck.svg" },
];

export default function BlockSelector({ value, onChange }: BlockSelectorProps) {
    return (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-amber-100">Blocks</div>
            <label className="flex flex-col text-sm text-amber-100/80 gap-1">
                Garment
                <select
                    value={value.garment}
                    onChange={(e) => onChange({ ...value, garment: e.target.value })}
                    className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
                >
                    {garmentOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col text-sm text-amber-100/80 gap-1">
                Sleeve
                <select
                    value={value.sleeve}
                    onChange={(e) => onChange({ ...value, sleeve: e.target.value })}
                    className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
                >
                    {sleeveOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col text-sm text-amber-100/80 gap-1">
                Collar
                <select
                    value={value.collar}
                    onChange={(e) => onChange({ ...value, collar: e.target.value })}
                    className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
                >
                    {collarOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}
