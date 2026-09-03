import SectionHeading from "@/components/base/SectionHeading";

const layers = [
  {
    step: 1,
    title: "Organisation membership",
    description: "Supports account, team and platform features. A membership unlocks the workspace but does not automatically include any data products.",
    icon: "ri-building-line",
  },
  {
    step: 2,
    title: "Marketplace product charge",
    description: "Set for each dataset, API, feed, report or service. Product pricing reflects the supplier's commercial model, delivery method and licence scope.",
    icon: "ri-shopping-bag-line",
  },
  {
    step: 3,
    title: "Usage or delivery charge",
    description: "May depend on records, requests, files, volume, refresh frequency or support tier. Not all products have usage-based components.",
    icon: "ri-dashboard-line",
  },
  {
    step: 4,
    title: "Enterprise services",
    description: "May include bespoke licensing, procurement support, integration assistance, clean-room analysis or custom support arrangements.",
    icon: "ri-briefcase-line",
  },
];

const flowSteps = [
  "Choose membership",
  "Select product",
  "Complete access review",
  "Agree product terms",
  "Begin controlled delivery",
];

export default function PricingStructure() {
  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Pricing Structure"
          heading="How DataHarbour pricing is structured"
          supporting="A membership does not automatically include every product. Four distinct layers work together."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer) => (
            <div
              key={layer.step}
              className="rounded-lg border border-foreground-200/10 bg-background-50 p-5 transition hover:border-foreground-200/20"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent-100/60">
                <i className={`${layer.icon} text-base text-accent-600`} />
              </div>
              <div className="mb-1.5 text-xs font-semibold tracking-[0.15em] text-foreground-400 uppercase">
                Layer {layer.step}
              </div>
              <h3 className="mb-2 text-sm font-medium text-foreground-200">
                {layer.title}
              </h3>
              <p className="text-xs leading-relaxed text-foreground-500">
                {layer.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h3 className="mb-5 text-center text-sm font-medium text-foreground-300">
            How it fits together
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {flowSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <span className="flex h-10 items-center gap-2 rounded-full border border-foreground-200/15 bg-background-50 px-4 text-xs font-medium text-foreground-300 whitespace-nowrap">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-100/70 text-[10px] font-semibold text-accent-700">
                    {i + 1}
                  </span>
                  {step}
                </span>
                {i < flowSteps.length - 1 && (
                  <i className="ri-arrow-right-line shrink-0 text-xs text-foreground-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}