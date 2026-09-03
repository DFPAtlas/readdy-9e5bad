import HeroSection from "./components/HeroSection";
import TrustStrip from "./components/TrustStrip";
import MarketplaceIntro from "./components/MarketplaceIntro";
import FeaturedPackages from "./components/FeaturedPackages";
import ProductFormats from "./components/ProductFormats";
import HowItWorks from "./components/HowItWorks";
import ClearProvenance from "./components/ClearProvenance";
import Compliance from "./components/Compliance";
import BuyersSuppliers from "./components/BuyersSuppliers";
import ApiPreview from "./components/ApiPreview";
import PricingPreview from "./components/PricingPreview";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import PublicFooter from "@/components/feature/PublicFooter";

export default function Home() {
  return (
    <main className="bg-background-50 text-foreground-950">
      <HeroSection />
      <TrustStrip />
      <MarketplaceIntro />
      <FeaturedPackages />
      <ProductFormats />
      <HowItWorks />
      <ClearProvenance />
      <Compliance />
      <BuyersSuppliers />
      <ApiPreview />
      <PricingPreview />
      <Faq />
      <FinalCta />
      <PublicFooter />
    </main>
  );
}