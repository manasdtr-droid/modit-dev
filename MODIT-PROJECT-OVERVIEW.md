# MODIT TanStack Project - Complete Overview

## Project Location
`R:\Modit Admin\fly-home-finder-main\fly-home-finder-main\`

## How to Run
```bash
cd "R:\Modit Admin\fly-home-finder-main\fly-home-finder-main"
npm install
npm run dev           # opens at http://localhost:8080
```

## Project Structure

```
src/
  routes/
    __root.tsx         # App shell (fonts, meta, QueryClient, Error/404 pages)
    index.tsx          # Landing page - composes all sections
  components/
    landing/
      StickyNav.tsx    # Scroll-aware nav, frosted glass on scroll, mobile sheet menu
      Hero.tsx         # Full-screen warehouse photo, search bar, CTAs, glass stat cards, delivery tracker
      BrandMarquee.tsx # Auto-scrolling brand names (UltraTech, Asian Paints, etc.)
      Categories.tsx   # 12 photo-rich cards in responsive grid (Cement, Paint, Electrical...)
      FeaturedProducts.tsx # Horizontal scroll-snap rail with 6 product cards, arrow controls
      TrustCounters.tsx    # Animated count-up via IntersectionObserver (20K+, 350+, 1M+, 99%)
      WhyModit.tsx     # 9 feature icon cards (Lightning Delivery, 100% Genuine, Best Pricing...)
      ModitAi.tsx      # Split layout: AI image + 6 feature pills (Material Estimator, Voice Ordering...)
      ContractorBand.tsx # Photo + checklist targeting contractors (credit lines, bulk pricing)
      AppSection.tsx   # Two floating phone mockups, App Store / Google Play, QR code
      SiteFooter.tsx   # Newsletter input, 4 link columns, social icons, legal
      MobileBottomBar.tsx # Floating glass nav pill (Home, Categories, Search, Cart, Account)
      CountUp.tsx      # Reusable animated counter with cubic ease-out
    ModitLogo.tsx      # SVG "M" logo with two variants (dark/light)
    ui/                # 38 shadcn/ui components (button, card, dialog, sheet, carousel, etc.)
  hooks/
    use-reveal.ts      # IntersectionObserver fade-up hook
    use-mobile.ts      # Mobile detection hook
  lib/
    utils.ts           # cn() utility (clsx + tailwind-merge)
    error-capture.ts   # SSR error handling
    error-page.ts      # Error page renderer
    lovable-error-reporting.ts # Lovable error reporter
  assets/              # 22 images
    hero-warehouse.jpg (213 KB), cat-*.jpg (12 categories), prod-*.jpg (6 products),
    ai-visual.jpg, app-phones.png, contractor.jpg
  styles.css           # Design tokens (oklch), Tailwind v4 @theme, animations, utilities
```

## Design System
- **Fonts:** Space Grotesk (headings) + Inter (body)
- **Colors:** oklch tokens - primary (amber #FFC107), secondary (#111), success (#34C759)
- **Shadows:** shadow-soft, shadow-lift, shadow-amber
- **Animations:** fade-up, marquee, float, pulse-soft, shimmer
- **Utilities:** glass, glass-dark, hover-lift, reveal

## Current State
- Single route (`/`) - marketing landing page only
- Fully reactive with scroll animations
- All images from Lovable's AI generation

## To Add (E-commerce Pages)
If you want full e-commerce, these routes need to be added:
- `/shop` - Product listing with filters
- `/product/:id` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/about` - About page
- `/contact` - Contact page
