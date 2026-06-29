import { useReveal } from "@/hooks/use-reveal";
import { CountUp } from "./CountUp";

const STATS = [
  { value: 20000, suffix: "+", label: "Products" },
  { value: 350, suffix: "+", label: "Brands" },
  { value: 1, suffix: "M+", label: "Orders Delivered" },
  { value: 99, suffix: "%", label: "Satisfied Customers" },
  { value: 45, suffix: " min", label: "Avg. Delivery" },
];

export function TrustCounters() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="border-y border-border bg-background py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Built on trust
        </p>
        <h2 className="mx-auto max-w-3xl text-center font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
          The numbers behind India&apos;s fastest construction commerce platform.
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
