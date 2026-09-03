import PricingCard from "@/components/base/PricingCard";
import SectionHeading from "@/components/base/SectionHeading";

const plans = [
  {
    name: "Explorer",
    priceLabel: "Free to Explore",
    features: [
      "Marketplace browsing",
      "Package comparison",
      "Saved packages",
      "Sample schemas",
      "Access requests",
    ],
  },
  {
    name: "Professional",
    priceLabel: "Contact Sales",
    features: [
      "Explorer features",
      "API access",
      "Scheduled feeds",
      "Usage dashboard",
      "Team access",
      "Compliance records",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    priceLabel: "Custom",
    features: [
      "Custom contracts",
      "Enhanced review",
      "Private packages",
      "Advanced access controls",
      "Custom retention settings",
      "Dedicated support",
    ],
  },
  {
    name: "Supplier",
    priceLabel: "Apply to Join",
    features: [
      "Package listings",
      "Supplier profile",
      "Buyer request management",
      "Version management",
      "Product analytics",
      "Revenue reporting placeholder",
    ],
  },
];

export default function PricingPreview() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          heading="Pricing Preview"
          supporting="Choose the access level that matches your organisation's needs."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-foreground-500">
          Individual packages may have separate subscription, usage or licence charges.
        </p>
      </div>
    </section>
  );
}