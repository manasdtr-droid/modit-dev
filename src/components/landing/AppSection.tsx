import { Apple, Smartphone } from "lucide-react";
import appPhones from "@/assets/app-phones.png";

export function AppSection() {
  return (
    <section className="relative overflow-hidden bg-secondary py-24 text-white sm:py-32">
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/60">
            On the go
          </p>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl text-balance">
            Faster builds with the <span className="text-primary">MODIT</span> app.
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/70">
            Reorder essentials in two taps. Track every truck in real time. Approve quotes from
            site. Built for one-handed use, even with gloves on.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="inline-flex h-14 items-center gap-3 rounded-2xl bg-white px-5 text-secondary transition-transform hover:-translate-y-0.5">
              <Apple className="h-7 w-7" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider opacity-70">Download on</div>
                <div className="font-display text-base font-bold tracking-tight">App Store</div>
              </div>
            </button>
            <button className="inline-flex h-14 items-center gap-3 rounded-2xl bg-white px-5 text-secondary transition-transform hover:-translate-y-0.5">
              <Smartphone className="h-7 w-7" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider opacity-70">Get it on</div>
                <div className="font-display text-base font-bold tracking-tight">Google Play</div>
              </div>
            </button>
            <div className="ml-2 hidden h-14 w-14 shrink-0 place-items-center rounded-xl bg-white p-2 sm:grid">
              <QrCode />
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute inset-0 -z-10 mx-auto h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-primary), transparent 65%)" }}
            aria-hidden
          />
          <img
            src={appPhones}
            alt="MODIT mobile app shown on two floating phones"
            width={1280}
            height={1024}
            loading="lazy"
            className="mx-auto w-full max-w-lg"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

function QrCode() {
  // Decorative QR-style mark
  const cells = Array.from({ length: 49 }, (_, i) => i);
  return (
    <div className="grid h-full w-full grid-cols-7 gap-[2px]">
      {cells.map((c) => {
        const isOn = (c * 7) % 3 === 0 || c % 5 === 0;
        return <div key={c} className={isOn ? "bg-secondary" : "bg-transparent"} />;
      })}
    </div>
  );
}
