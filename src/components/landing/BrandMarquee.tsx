const BRANDS = [
  "UltraTech",
  "Asian Paints",
  "Polycab",
  "Kajaria",
  "Havells",
  "Bosch",
  "Supreme",
  "Dr Fixit",
  "Hettich",
  "Jaquar",
  "Pidilite",
  "Saint-Gobain",
];

export function BrandMarquee() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <section className="border-y border-border bg-surface py-10">
      <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Trusted by India&apos;s most respected brands
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent"
          aria-hidden
        />
        <div className="flex w-max animate-marquee items-center gap-14">
          {items.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-2xl font-bold tracking-[-0.03em] text-foreground/40 transition-colors hover:text-foreground/80"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
