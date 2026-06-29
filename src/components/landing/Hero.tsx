import { Search, ArrowRight, Truck, Package, ShieldCheck, Zap, Boxes } from "lucide-react";
import heroWarehouse from "@/assets/hero-warehouse.jpg";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-secondary text-white">
      {/* Background image */}
      <img
        src={heroWarehouse}
        alt="MODIT delivery truck inside a modern construction materials warehouse"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "var(--gradient-glow)" }}
      />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-soft rounded-full bg-primary" />
              <span className="relative rounded-full bg-primary" />
            </span>
            Now live in Bengaluru
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-balance">
            Everything for Building.
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Delivered in Hours.
            </span>
          </h1>

          {/* Subhead */}
          <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
            India&apos;s fastest platform for construction materials, hardware, plumbing,
            electricals and power tools. Genuine brands. Live inventory. On-site in hours.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <div className="group relative flex h-14 items-center rounded-full border border-white/10 bg-white/95 pl-5 pr-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur transition-all focus-within:bg-white">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cement, paint, tiles, pipes, plywood…"
                className="ml-3 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
              />
              <button
                aria-label="Search"
                className="ml-2 flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5">
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
              Download App
            </button>
          </div>

          {/* Floating glass cards */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s, i) => (
              <div
                key={s.value + s.label}
                className="glass-dark rounded-2xl p-3.5"
                style={{ animation: `fade-up 0.7s ${0.1 + i * 0.08}s cubic-bezier(0.16,1,0.3,1) both` }}
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[0.95rem] font-bold leading-tight text-white">{s.value}</div>
                    <div className="truncate text-[11px] uppercase tracking-wider text-white/55">
                      {s.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated delivery tracker */}
      <div className="pointer-events-none absolute bottom-6 right-4 hidden lg:block">
        <DeliveryTracker />
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

const STATS = [
  { icon: Zap, value: "45 min", label: "Delivery" },
  { icon: Boxes, value: "20,000+", label: "Products" },
  { icon: Package, value: "350+", label: "Brands" },
  { icon: Truck, value: "Live", label: "Inventory" },
  { icon: ShieldCheck, value: "Verified", label: "Products" },
];

function DeliveryTracker() {
  return (
    <div className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Truck className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs font-medium text-white/60">Order MOD-4821 · Out for delivery</div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="relative h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
          <span className="text-[11px] font-semibold text-primary">12 min</span>
        </div>
      </div>
    </div>
  );
}
