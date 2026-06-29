import { Home, Grid3x3, Search, ShoppingBag, User } from "lucide-react";

const ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Grid3x3, label: "Categories" },
  { icon: Search, label: "Search" },
  { icon: ShoppingBag, label: "Cart" },
  { icon: User, label: "Account" },
];

export function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 lg:hidden">
      <nav className="glass flex items-center gap-1 rounded-full border border-border/60 px-2 py-1.5 shadow-[var(--shadow-lift)]">
        {ITEMS.map((item, i) => (
          <button
            key={item.label}
            aria-label={item.label}
            className={
              i === 0
                ? "flex h-11 items-center gap-2 rounded-full bg-secondary px-4 text-secondary-foreground"
                : "grid h-11 w-11 place-items-center rounded-full text-foreground/70 hover:bg-muted"
            }
          >
            <item.icon className="h-[18px] w-[18px]" />
            {i === 0 && <span className="text-xs font-semibold">Home</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
