import { commercialScenarios } from "@/data/pricing";
import PricingHero from "./components/PricingHero";
import PricingStructure from "./components/PricingStructure";
import BuyerMembershipPlans from "./components/BuyerMembershipPlans";
import ProductPricingModelGrid from "./components/ProductPricingModelGrid";
import UsageCalculator from "./components/UsageCalculator";
import CommercialScenarioCard from "./components/CommercialScenarioCard";
import EnterprisePricing from "./components/EnterprisePricing";
import SupplierCommercialModels from "./components/SupplierCommercialModels";
import BillingPrinciples from "./components/BillingPrinciples";
import PricingEnquiry from "./components/PricingEnquiry";
import PricingFaq from "./components/PricingFaq";
import FinalCta from "./components/FinalCta";
import SectionHeading from "@/components/base/SectionHeading";

function ProductChargesSection() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Product Charges"
          heading="Marketplace product pricing models"
          supporting="Each marketplace package may use its own commercial model. Expand any model for details, examples and questions to ask."
        />
        <div className="mt-10">
          <ProductPricingModelGrid />
        </div>
        <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-foreground-200/10 bg-background-100/40 px-5 py-4">
          <p className="text-xs leading-relaxed text-foreground-500">
            <i className="ri-information-line mr-1.5 align-middle text-sm" />
            All examples above are illustrative. Products may use different currencies, tax treatments and minimum commitments. Final pricing is confirmed before agreement.
          </p>
        </div>
      </div>
    </section>
  );
}

function CommercialScenariosSection() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Examples"
          heading="Sample commercial scenarios"
          supporting="Fictional illustrations only — no real customer names, testimonials or savings claims."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {commercialScenarios.map((scenario, i) => (
            <CommercialScenarioCard key={scenario.id} scenario={scenario} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <>
      <PricingHero />
      <PricingStructure />
      <BuyerMembershipPlans />
      <ProductChargesSection />
      <UsageCalculator />
      <CommercialScenariosSection />
      <div id="enterprise">
        <EnterprisePricing />
      </div>
      <SupplierCommercialModels />
      <BillingPrinciples />
      <PricingEnquiry />
      <PricingFaq />
      <FinalCta />
    </>
  );
}