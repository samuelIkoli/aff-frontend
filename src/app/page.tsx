import Link from "next/link";

const featureCards = [
  {
    title: "Anchor alignment",
    desc: "Snap sleeves, collars, cuffs, and skirts using pixel-accurate anchor metadata.",
  },
  {
    title: "Parametric blocks",
    desc: "Scale width, height, and sleeve length from real measurements without losing anchors.",
  },
  {
    title: "Fabrics & textures",
    desc: "Drop in swatches, repeat patterns, and export with embedded fabric metadata.",
  },
  {
    title: "Exports",
    desc: "PNG, SVG, or JSON with anchors, texture refs, and baseline measurements intact.",
  },
];

const stats = [
  { label: "Blocks", value: "150+", hint: "SVG garments & trims" },
  { label: "Anchors", value: "Precise", hint: "sub-pixel snapping" },
  { label: "Fabrics", value: "Upload", hint: "repeat, scale, rotate" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a05] via-[#140f0b] to-[#0a0604] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-amber-200/80">
              <span className="h-1 w-7 bg-amber-400" aria-hidden />
              African Fashion Forge · Design Studio
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Build garments with anchors, fabric textures, and parametric measurements.
            </h1>
            <p className="text-lg text-amber-100/80 max-w-2xl">
              A Fabric.js powered pattern lab for designers and tailors. Snap blocks together,
              adjust measurements in real-time, and export production-ready assets without losing
              anchor metadata.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/design"
                className="px-5 py-3 rounded-full bg-amber-400 text-black font-semibold shadow-lg shadow-amber-500/30 hover:brightness-95"
              >
                Open Design Studio
              </Link>
              <a
                href="/docs/aff_design_studio_context.md"
                className="px-5 py-3 rounded-full border border-amber-200/40 text-amber-100 hover:bg-white/10"
              >
                Read the spec
              </a>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 w-full lg:w-[320px] bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur">
            <div className="flex items-center justify-between text-sm text-amber-100/70">
              <span>Design modes</span>
              <span className="px-2 py-1 rounded-full bg-amber-400/20 text-amber-100">2D parametric</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-xl font-semibold text-amber-100">{s.value}</div>
                  <div className="text-xs text-amber-100/70">{s.label}</div>
                  <div className="text-[11px] text-amber-100/60">{s.hint}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 text-sm text-amber-100/70 space-y-1">
              <p>Anchor-aware exports</p>
              <p>JSON + SVG + PNG</p>
              <p>Fabric metadata preserved</p>
            </div>
          </div>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-[0_15px_50px_-25px_rgba(0,0,0,0.45)]"
            >
              <h3 className="text-xl font-semibold text-amber-50 mb-2">{card.title}</h3>
              <p className="text-amber-100/75 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 bg-amber-50 text-stone-900 rounded-3xl p-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">How the studio works</h2>
            <p className="text-base text-stone-700">
              Load SVG garment blocks with anchor metadata, scale them from human measurements,
              apply textures, then export your pattern stack. Undo/redo, pan, zoom, and save
              sessions are built in.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Anchor snap engine",
                "Parametric scaling",
                "Texture fills",
                "Save/Load JSON",
                "PNG/SVG export",
              ].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full bg-stone-900 text-amber-100 text-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-lg">
            <div className="text-xs font-semibold text-stone-500 uppercase mb-3">Workflow</div>
            <ol className="space-y-3 text-sm text-stone-700">
              <li><strong>1.</strong> Choose base block (shirt, dress, trouser).</li>
              <li><strong>2.</strong> Attach sleeves, collars, cuffs with anchors.</li>
              <li><strong>3.</strong> Input chest, waist, sleeve length to scale.</li>
              <li><strong>4.</strong> Apply fabric textures and trims.</li>
              <li><strong>5.</strong> Export PNG/SVG/JSON or save to your library.</li>
            </ol>
            <Link
              href="/design"
              className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-stone-900 text-amber-100 hover:brightness-95"
            >
              Jump into the canvas
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
