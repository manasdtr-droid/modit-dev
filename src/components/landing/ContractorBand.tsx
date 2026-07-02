import { Check, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import contractor from "@/assets/contractor.jpg";

const POINTS = [
  "Dedicated relationship manager",
  "Net-30 credit lines on approval",
  "GST-compliant bulk invoicing",
  "Project-based price negotiation",
  "Priority same-day dispatch",
];

export function ContractorBand() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-background py-24 sm:py-32">
      <div ref={ref} className="reveal mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2.5rem] ring-1 ring-border">
            <img
              src={contractor}
              alt="Contractor reviewing build plans on a tablet"
              width={1280}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            For contractors & builders
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            A platform that respects how you actually build.
          </h2>
          <p className="mt-5 max-w-lg text-base text-muted-foreground">
            Whether you&apos;re finishing one apartment or scaling a township, MODIT moves at your
            pace — with the paperwork, pricing and people that contractors expect.
          </p>
          <ul className="mt-8 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] font-medium">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                {p}
              </li>
            ))}
          </ul>
          <button className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5">
            Join Contractor Program <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
