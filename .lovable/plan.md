# MODIT — Premium Landing Page

A single, immersive marketing landing page for MODIT — India's premium quick-commerce platform for construction materials. The tone is "Apple of construction commerce": minimal, heavy typography, generous whitespace, soft shadows, subtle glass, yellow (#FFC107) on black (#111) with a near-white canvas (#FAFAFA). Reference image is treated as inspiration only — the final design will be significantly more premium and less Shopify/Amazon-like than the reference.

## Scope

One route: `/` (replace the placeholder in `src/routes/index.tsx`). Marketing only — no auth, no cart logic, no backend. Buttons are presentational.

## Design system (in `src/styles.css`)

- Color tokens (oklch equivalents of):
  - `--background` #FAFAFA, `--foreground` #121212
  - `--surface` #FFFFFF, `--muted-foreground` #666
  - `--primary` #FFC107 / `--primary-foreground` #111
  - `--accent` #FFB300, `--secondary` #111111
  - `--success` #34C759, `--border` #ECECEC
- Gradients: `--gradient-amber` (FFC107 → FFB300), `--gradient-dark` (#0B0B0B → #1A1A1A radial), subtle `--gradient-glow`
- Shadows: `--shadow-soft`, `--shadow-lift` (large soft drop), `--shadow-amber` (color-mixed glow)
- Type: Geometric sans via `<link>` in `__root.tsx` head — Inter Tight (display) + Inter (body); registered as `--font-display` / `--font-sans`. Tight tracking, heavy weights (700–900) for headlines.
- Animation utilities: `fade-up`, `scale-in`, `shimmer`, `marquee`, `pulse-dot`, `hover-lift`. IntersectionObserver hook (`useReveal`) toggles a `data-revealed` attribute for on-scroll fades.

## Logo

Custom inline SVG component `<ModitLogo />` — abstract geometric "M" formed by two upward chevrons + a forward-leaning arrow notch (suggesting speed/delivery), amber on black or black on light. Flat, single color, app-icon ready. Used in nav and footer. No houses, roofs, or tools.

## Page structure (all in `src/routes/index.tsx`, sections as components in `src/components/landing/`)

1. **StickyNav** — transparent over hero, becomes frosted white (`backdrop-blur`) on scroll. Left: logo. Center: Products, Categories, Brands, Bulk Orders, Contractors, Business, About. Right: search icon, location pill (Bengaluru ▾), Login, Cart, primary "Download App" button. Mobile: hamburger → Sheet.

2. **Hero** — full-viewport. Dark warehouse photo (AI-generated, cinematic, moody amber rim light on a delivery truck inside a modern fulfillment hub) with radial gradient overlay. Massive 2-line display headline "Everything for Building. / Delivered in Hours." (second line in amber). Subhead. Large pill search with amber submit. Two CTAs: "Shop Now" (amber) + "Download App" (ghost). Floating glass cards (small, subtle) for "45 min Delivery", "20,000+ Products", "350+ Brands", "Live Inventory", "Verified". Scroll indicator at bottom. Animated delivery tracker chip (dot pulsing along a line).

3. **Logo marquee** — quiet strip of trusted brand wordmarks (UltraTech, Asian Paints, Polycab, Kajaria, Havells, Bosch, Supreme, Dr Fixit, Hettich, Jaquar) auto-scrolling.

4. **Categories** — "Shop by Category". 12 large rounded cards (4×3 desktop, 2-col mobile) with AI-generated product hero imagery on soft gradient backdrops. Hover: lift + image zoom + amber underline.

5. **Featured Products** — "Top Picks". 6 premium product cards in a horizontal scroll-snap rail with arrow controls. Each card: large image, brand, name, price, strikethrough MRP, discount badge, ETA chip ("45 min"), rating, Add to Cart, wishlist heart, quick-view icon.

6. **Trust counters** — white band. Animated count-up: 20,000+ Products, 350+ Brands, 1M+ Orders, 99% Satisfaction, 45 min Avg Delivery. IntersectionObserver triggers count.

7. **Why MODIT** — 3×3 grid of premium icon cards (Lucide icons in amber circle): Fast Delivery, Original Products, Best Pricing, Bulk Discounts, Easy Returns, Live Inventory, GST Billing, Contractor Support, Secure Payments.

8. **MODIT AI** — dark section, futuristic. Left: heading "Meet MODIT AI" + description + 6 feature pills (Material Estimator, Project Calculator, Voice Ordering, Smart Recommendations, Budget Planning, Photo Search). Right: AI illustration (AI-generated abstract amber-glow visual, not a chatbot mock).

9. **Contractor / Bulk** — split section, image left, copy right. "Built for contractors and builders" with GST invoicing, credit lines, dedicated manager bullets.

10. **App section** — black premium band. AI-generated render of two floating phones with MODIT app UI mockups (orders, tracking screens). QR code + App Store + Google Play buttons.

11. **Footer** — dark, minimal. Columns: Company, Products, Support, Contractor, Business, Careers. Newsletter input. Socials. Logo + tagline + copyright + legal links.

12. **Mobile floating bottom bar** — only on `<md`: Home, Categories, Search, Cart, Account. Sticky with backdrop blur.

## Assets

Generate with `imagegen` (premium tier for hero, standard for others):
- `hero-warehouse.jpg` — cinematic dark warehouse w/ delivery truck, amber rim light
- `cat-cement.jpg`, `cat-paint.jpg`, `cat-electrical.jpg`, `cat-plumbing.jpg`, `cat-tiles.jpg`, `cat-hardware.jpg`, `cat-powertools.jpg`, `cat-wood.jpg`, `cat-steel.jpg`, `cat-safety.jpg`, `cat-lighting.jpg`, `cat-waterproofing.jpg` — clean product still-lifes on soft neutral gradients
- 6 product images for the rail
- `ai-visual.jpg` — abstract amber glow neural visual
- `app-phones.png` — two floating phones with MODIT UI (transparent)
- `contractor.jpg` — site contractor on premium build site

Brand wordmarks rendered as styled text (not real logos) to avoid trademark issues.

## SEO

Update `index.tsx` route `head()`: title "MODIT — Everything for Building. Delivered in Hours.", meta description, og/twitter tags, single H1 in hero.

## Out of scope

No cart state, no auth, no product detail pages, no backend, no Cloud enablement. Pure presentational landing.

## Technical notes

- Tailwind v4 tokens via `@theme inline` mapping to `:root` CSS variables.
- Fonts loaded in `__root.tsx` `head.links` (Google Fonts `<link>`), never `@import` in CSS.
- All colors via semantic tokens — no hardcoded hex in components.
- Reveal-on-scroll via a small `useReveal` hook + CSS keyframes; no Motion/GSAP dependency added.
- Components split per section under `src/components/landing/` for readability.
