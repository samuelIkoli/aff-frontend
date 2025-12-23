"use client";

type ExportPanelProps = {
    onExportPNG: () => void;
    onExportSVG: () => void;
    onExportJSON: () => void;
};

export default function ExportPanel(props: ExportPanelProps) {
    return (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-amber-100">Exports</div>
            <div className="grid grid-cols-3 gap-2 text-sm">
                <button
                    onClick={props.onExportPNG}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15"
                >
                    PNG
                </button>
                <button
                    onClick={props.onExportSVG}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15"
                >
                    SVG
                </button>
                <button
                    onClick={props.onExportJSON}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15"
                >
                    JSON
                </button>
            </div>
            <p className="text-xs text-amber-100/60">
                Exports keep anchor metadata and texture references so downstream tools can rehydrate
                the design.
            </p>
        </div>
    );
}
