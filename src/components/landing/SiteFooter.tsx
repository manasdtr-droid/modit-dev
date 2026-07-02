import { Instagram, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { ModitLogo } from "@/components/ModitLogo";

const COLUMNS = [
  {
    title: "Company",
    links: ["About", "Press", "Careers", "Blog", "Contact"],
  },
  {
    title: "Products",
    links: ["All Categories", "Top Brands", "New Arrivals", "Deals", "Gift Cards"],
  },
  {
    title: "Support",
    links: ["Help Center", "Order Tracking", "Returns", "Shipping", "Warranty"],
  },
  {
    title: "Business",
    links: ["Contractor Program", "Bulk Orders", "Builders", "API", "Partners"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <ModitLogo variant="light" />
            <p className="mt-5 max-w-sm text-sm text-white/60">
              Everything for Building. Delivered in Hours. India&apos;s premium construction
              commerce platform.
            </p>

            {/* Newsletter */}
            <div className="mt-8 max-w-sm">
              <div className="flex h-12 items-center rounded-full border border-white/15 bg-white/5 pl-5 pr-1 backdrop-blur focus-within:border-primary">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-sm placeholder:text-white/40 focus:outline-none"
                />
                <button className="flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground">
                  Subscribe <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-3 text-xs text-white/40">
                Weekly drops, contractor tips and pricing updates. No spam.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/90">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} MODIT Technologies Pvt. Ltd. · Made in India.
          </div>
          <div className="flex items-center gap-1">
            {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
