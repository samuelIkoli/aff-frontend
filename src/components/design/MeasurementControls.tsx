"use client";

type MeasurementState = {
    width_cm: number;
    height_cm: number;
};

type MeasurementControlsProps = {
    value: MeasurementState;
    onChange: (next: MeasurementState) => void;
};

export default function MeasurementControls({ value, onChange }: MeasurementControlsProps) {
    const update = (key: keyof MeasurementState, val: number) => {
        onChange({ ...value, [key]: val });
    };

    return (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-amber-100">Measurements (cm)</div>
            <div className="grid grid-cols-2 gap-3 text-sm text-amber-100/80">
                <label className="flex flex-col gap-1">
                    Chest/width
                    <input
                        type="number"
                        value={value.width_cm}
                        onChange={(e) => update("width_cm", Number(e.target.value))}
                        className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    Height
                    <input
                        type="number"
                        value={value.height_cm}
                        onChange={(e) => update("height_cm", Number(e.target.value))}
                        className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
                    />
                </label>
            </div>
            <p className="text-xs text-amber-100/60">
                Blocks scale proportionally from their baseline width/height. Anchors stay aligned.
            </p>
        </div>
    );
}
