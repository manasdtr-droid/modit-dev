import {
  Zap,
  ShieldCheck,
  Tag,
  Layers,
  RefreshCw,
  Radar,
  FileText,
  HardHat,
  Lock,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const REASONS = [
  { icon: Zap, title: "Lightning Delivery", body: "On-site in under an hour across serviced pin codes." },
  { icon: ShieldCheck, title: "100% Genuine", body: "Sourced directly from authorized brand distributors." },
  { icon: Tag, title: "Best Pricing", body: "Transparent, contractor-grade pricing on every SKU." },
  { icon: Layers, title: "Bulk Discounts", body: "Slabbed pricing that scales with your project size." },
  { icon: RefreshCw, title: "Easy Returns", body: "No-questions returns within 7 days of delivery." },
  { icon: Radar, title: "Live Inventory", body: "See real-time stock across every fulfillment hub." },
  { icon: FileText, title: "GST Invoicing", body: "Compliant invoices for every order, instantly emailed." },
  { icon: HardHat, title: "Contractor Support", body: "Dedicated relationship manager for active builders." },
  { icon: Lock, title: "Secure Payments", body: "UPI, cards, COD and credit lines — all PCI-DSS secure." },
];

export function WhyModit() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Why MODIT
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Engineered for builders.
            <br className="hidden sm:block" /> Built for trust.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.title} className="group bg-surface p-8 transition-colors hover:bg-muted/40">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
