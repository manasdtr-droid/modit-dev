import { createFileRoute } from "@tanstack/react-router";
import { StickyNav } from "@/components/landing/StickyNav";
import { Hero } from "@/components/landing/Hero";
import { BrandMarquee } from "@/components/landing/BrandMarquee";
import { Categories } from "@/components/landing/Categories";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { TrustCounters } from "@/components/landing/TrustCounters";
import { WhyModit } from "@/components/landing/WhyModit";
import { ModitAi } from "@/components/landing/ModitAi";
import { ContractorBand } from "@/components/landing/ContractorBand";
import { AppSection } from "@/components/landing/AppSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { MobileBottomBar } from "@/components/landing/MobileBottomBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MODIT — Everything for Building. Delivered in Hours." },
      {
        name: "description",
        content:
          "India's premium quick-commerce platform for construction materials. Cement, paint, plumbing, electrical, tiles, power tools and more — delivered in hours.",
      },
      { property: "og:title", content: "MODIT — Everything for Building. Delivered in Hours." },
      {
        property: "og:description",
        content:
          "India's fastest platform for construction materials. 20,000+ products, 350+ brands, on-site in under an hour.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <StickyNav />
      <Hero />
      <BrandMarquee />
      <Categories />
      <FeaturedProducts />
      <TrustCounters />
      <WhyModit />
      <ModitAi />
      <ContractorBand />
      <AppSection />
      <SiteFooter />
      <MobileBottomBar />
    </main>
  );
}
