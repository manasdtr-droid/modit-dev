# MODIT — Everything for Building. Delivered in Hours.

Premium, conversion-focused landing page for **MODIT**, India's quick-commerce platform for construction materials. Designed to feel like the Apple of construction commerce — cinematic hero, scroll-snap product rails, frosted-glass nav, and a custom amber/black design system.

## Stack

- **Framework:** TanStack Start v1 (React 19 + Vite 7, SSR-ready)
- **Styling:** Tailwind CSS v4 (native `@theme` tokens in `src/styles.css`)
- **UI primitives:** shadcn/ui + Lucide icons
- **Fonts:** Space Grotesk (display) + Inter (body)
- **Runtime target:** Cloudflare Workers / edge

## Getting Started

```bash
bun install
bun dev          # http://localhost:8080
bun run build    # production build
```

Node 18+ or Bun 1.1+ recommended.

## Project Structure

```
src/
  routes/
    __root.tsx          # shell, fonts, meta
    index.tsx           # landing page composition
  components/
    landing/            # Hero, StickyNav, Categories, FeaturedProducts, …
    ui/                 # shadcn primitives
  hooks/use-reveal.ts   # IntersectionObserver fade-up
  styles.css            # design tokens + utilities
```

## Design System

Semantic OKLCH tokens defined in `src/styles.css`:

| Token       | Value     | Use                         |
| ----------- | --------- | --------------------------- |
| `primary`   | `#FFC107` | Amber CTAs, accents         |
| `secondary` | `#111111` | Footer, dark surfaces       |
| `background`| `#FAFAFA` | Page background             |
| `success`   | `#34C759` | Stock / delivery indicators |

Never hardcode hex/utility colors in components — use the tokens.

## Deployment

Built on Lovable. Push to the connected GitHub repo and Lovable auto-syncs both ways. The published build is served from the project's Lovable URL or any custom domain configured in project settings.

## License

MIT — see [LICENSE](./LICENSE).
