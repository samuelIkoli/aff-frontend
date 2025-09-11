"use client";

export default function AssetControls({ selection, setSelection }: any) {
    return (
        <div className="flex gap-4 mb-4">
            <select
                value={selection.sleeve}
                onChange={(e) => setSelection({ ...selection, sleeve: e.target.value })}
            >
                <option value="sleeve-short.svg">Short Sleeve</option>
                <option value="sleeve-long.svg">Long Sleeve</option>
            </select>

            <select
                value={selection.collar}
                onChange={(e) => setSelection({ ...selection, collar: e.target.value })}
            >
                <option value="collar-round.svg">Round</option>
                <option value="collar-vneck.svg">V-Neck</option>
            </select>
        </div>
    );
}
