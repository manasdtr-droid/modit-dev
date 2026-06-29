import { useRef } from "react";
import { ArrowLeft, ArrowRight, Heart, Plus, Star, Clock } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import prodCement from "@/assets/prod-cement.jpg";
import prodPaint from "@/assets/prod-paint.jpg";
import prodPipe from "@/assets/prod-pipe.jpg";
import prodWire from "@/assets/prod-wire.jpg";
import prodTile from "@/assets/prod-tile.jpg";
import prodTap from "@/assets/prod-tap.jpg";

const PRODUCTS = [
  {
    image: prodCement,
    brand: "UltraTech",
    name: "OPC 53 Grade Cement — 50 Kg",
    price: 415,
    mrp: 460,
    rating: 4.8,
    reviews: 1240,
    eta: "45 min",
    badge: "Bestseller",
  },
  {
    image: prodPaint,
    brand: "Asian Paints",
    name: "Apex Ultima Exterior — 20 L",
    price: 4299,
    mrp: 4799,
    rating: 4.7,
    reviews: 860,
    eta: "60 min",
    badge: "10% OFF",
  },
  {
    image: prodPipe,
    brand: "Supreme",
    name: "uPVC Pipe 3 inch × 6 m",
    price: 285,
    mrp: 320,
    rating: 4.6,
    reviews: 540,
    eta: "45 min",
  },
  {
    image: prodWire,
    brand: "Polycab",
    name: "FRLS Wire 1.5 sq.mm × 90 m",
    price: 1299,
    mrp: 1525,
    rating: 4.9,
    reviews: 2100,
    eta: "45 min",
    badge: "15% OFF",
  },
  {
    image: prodTile,
    brand: "Kajaria",
    name: "Vitrified Tile 600×600 mm",
    price: 899,
    mrp: 999,
    rating: 4.7,
    reviews: 410,
    eta: "2 hrs",
  },
  {
    image: prodTap,
    brand: "Jaquar",
    name: "Continental Bib Cock — Long Body",
    price: 475,
    mrp: 540,
    rating: 4.8,
    reviews: 720,
    eta: "45 min",
  },
];

export function FeaturedProducts() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const ref = useReveal<HTMLDivElement>();

  const scroll = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  };

  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Top picks
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Loved by 2L+ contractors
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-muted"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="mx-auto flex max-w-[100vw] snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:gap-5 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Spacer to align first card with max-w-7xl edge on large screens */}
        <div className="hidden shrink-0 lg:block" style={{ width: "max(0px, calc((100vw - 80rem) / 2))" }} />
        {PRODUCTS.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
        <div className="shrink-0 pr-2" />
      </div>
    </section>
  );
}

function ProductCard(p: (typeof PRODUCTS)[number]) {
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  return (
    <article className="group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all hover:border-foreground/20 hover-lift sm:w-[340px]">
      <div className="relative aspect-square bg-muted/40">
        {p.badge && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            {p.badge}
          </div>
        )}
        <button
          aria-label="Wishlist"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-foreground backdrop-blur transition-colors hover:text-destructive"
        >
          <Heart className="h-4 w-4" />
        </button>
        <img
          src={p.image}
          alt={p.name}
          width={768}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-soft backdrop-blur">
          <Clock className="h-3 w-3 text-success" />
          {p.eta}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {p.brand}
        </div>
        <h3 className="font-display text-base font-bold leading-snug tracking-tight">{p.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="font-semibold text-foreground">{p.rating}</span>
          <span>· {p.reviews.toLocaleString("en-IN")} reviews</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold tracking-tight">
                ₹{p.price.toLocaleString("en-IN")}
              </span>
              {off > 0 && (
                <span className="text-xs font-medium text-muted-foreground line-through">
                  ₹{p.mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {off > 0 && (
              <div className="text-[11px] font-semibold text-success">{off}% off</div>
            )}
          </div>
          <button className="flex h-10 items-center gap-1.5 rounded-full bg-secondary px-4 text-xs font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
