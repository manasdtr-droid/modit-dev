import { Sparkles, Calculator, Mic, Lightbulb, Wallet, Camera, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import aiVisual from "@/assets/ai-visual.jpg";

const FEATURES = [
  { icon: Calculator, label: "Material Estimator" },
  { icon: Sparkles, label: "Project Calculator" },
  { icon: Mic, label: "Voice Ordering" },
  { icon: Lightbulb, label: "Smart Recommendations" },
  { icon: Wallet, label: "Budget Planning" },
  { icon: Camera, label: "Photo Search" },
];

export function ModitAi() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-secondary py-28 text-white sm:py-36">
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden
      />
      <div ref={ref} className="reveal relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            New
          </div>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl text-balance">
            Meet <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MODIT AI</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-white/70">
            Your intelligent construction assistant. Estimate materials, scan blueprints, plan
            budgets, and order with your voice — all from one elegant interface.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur transition-colors hover:border-primary/40 hover:bg-white/[0.08]"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          <button className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5">
            Try MODIT AI <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/10">
            <img
              src={aiVisual}
              alt="Abstract AI visualization"
              width={1280}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </div>
          {/* Floating chat preview */}
          <div className="glass-dark absolute -bottom-6 -left-4 max-w-[280px] rounded-2xl p-4 shadow-2xl sm:-left-8">
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-sm leading-relaxed text-white/85">
                For a 1,200 sq.ft slab, you&apos;ll need
                <span className="text-primary"> 240 bags </span>
                of OPC 53. Add to cart?
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
