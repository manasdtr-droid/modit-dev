import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import catCement from "@/assets/cat-cement.jpg";
import catPaint from "@/assets/cat-paint.jpg";
import catElectrical from "@/assets/cat-electrical.jpg";
import catPlumbing from "@/assets/cat-plumbing.jpg";
import catTiles from "@/assets/cat-tiles.jpg";
import catHardware from "@/assets/cat-hardware.jpg";
import catPowertools from "@/assets/cat-powertools.jpg";
import catWood from "@/assets/cat-wood.jpg";
import catSteel from "@/assets/cat-steel.jpg";
import catSafety from "@/assets/cat-safety.jpg";
import catLighting from "@/assets/cat-lighting.jpg";
import catWaterproofing from "@/assets/cat-waterproofing.jpg";

const CATEGORIES = [
  { name: "Cement", count: "120+ SKUs", image: catCement },
  { name: "Paint", count: "1,800+ SKUs", image: catPaint },
  { name: "Electrical", count: "2,400+ SKUs", image: catElectrical },
  { name: "Plumbing", count: "1,600+ SKUs", image: catPlumbing },
  { name: "Tiles", count: "3,200+ SKUs", image: catTiles },
  { name: "Hardware", count: "4,500+ SKUs", image: catHardware },
  { name: "Power Tools", count: "900+ SKUs", image: catPowertools },
  { name: "Wood & Ply", count: "640+ SKUs", image: catWood },
  { name: "Steel", count: "210+ SKUs", image: catSteel },
  { name: "Safety", count: "380+ SKUs", image: catSafety },
  { name: "Lighting", count: "1,100+ SKUs", image: catLighting },
  { name: "Waterproofing", count: "270+ SKUs", image: catWaterproofing },
];

export function Categories() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="categories" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Shop the catalog
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Every category. <span className="text-muted-foreground">One platform.</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:gap-2.5 transition-all"
          >
            View all categories <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.name} {...cat} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  name,
  count,
  image,
  delay,
}: {
  name: string;
  count: string;
  image: string;
  delay: number;
}) {
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href="#"
      className="reveal group relative flex aspect-[4/5] flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-border transition-all hover:ring-foreground/20 hover-lift"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative flex-1 overflow-hidden">
        <img
          src={image}
          alt={name}
          width={768}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-foreground opacity-0 backdrop-blur transition-all group-hover:opacity-100 group-hover:translate-x-0 translate-x-1">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold tracking-tight sm:text-lg">{name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{count}</p>
        </div>
      </div>
    </a>
  );
}
