import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, MapPin, User, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { ModitLogo } from "@/components/ModitLogo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  "Products",
  "Categories",
  "Brands",
  "Bulk Orders",
  "Contractors",
  "Business",
  "About",
];

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-border/60"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <Link to="/" aria-label="MODIT home">
          <ModitLogo variant={scrolled ? "dark" : "light"} />
        </Link>

        {/* Center */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className={cn(
                "text-[0.92rem] font-medium tracking-tight transition-colors",
                scrolled
                  ? "text-foreground/80 hover:text-foreground"
                  : "text-white/85 hover:text-white",
              )}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="Search"
            className={cn(
              "hidden h-9 w-9 items-center justify-center rounded-full transition-colors sm:flex",
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
            )}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <button
            className={cn(
              "hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors md:flex",
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-white/90 hover:bg-white/10",
            )}
          >
            <MapPin className="h-[15px] w-[15px] text-primary" />
            <span>Bengaluru</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>

          <button
            aria-label="Account"
            className={cn(
              "hidden h-9 w-9 items-center justify-center rounded-full transition-colors md:flex",
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
            )}
          >
            <User className="h-[18px] w-[18px]" />
          </button>

          <button
            aria-label="Cart"
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
            )}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              2
            </span>
          </button>

          <button className="ml-2 hidden h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5 lg:flex">
            Download App
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:hidden",
              scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
              >
                {item}
              </a>
            ))}
            <button className="mt-2 flex h-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              Download App
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
