const industries = [
  {
    name: "Retail",
    icon: "ri-store-2-line",
    workflow:
      "May use footfall data, demographic profiles and high-street-vacancy tracking to evaluate new-site viability and understand catchment-area characteristics.",
  },
  {
    name: "Property",
    icon: "ri-building-4-line",
    workflow:
      "May combine planning-application feeds, property-transaction data, transport-accessibility scores and demographic trends for development-pipeline and investment analysis.",
  },
  {
    name: "Financial Services",
    icon: "ri-bank-line",
    workflow:
      "May integrate business-registry data, identity-verification signals, risk indicators and address validation into customer-due-diligence and credit-assessment workflows.",
  },
  {
    name: "Professional Services",
    icon: "ri-briefcase-line",
    workflow:
      "May access market-research dashboards, registry-enrichment APIs and risk-intelligence data to support client advisory, due-diligence and strategy engagements.",
  },
  {
    name: "Logistics",
    icon: "ri-truck-line",
    workflow:
      "May incorporate address validation, premises classification, transport-accessibility data and geocoding into route-planning and network-strategy analysis.",
  },
  {
    name: "Hospitality",
    icon: "ri-hotel-line",
    workflow:
      "May use footfall indices, catchment demographics, competitor-density analysis and location-opportunity reports for site-selection and market-entry decisions.",
  },
  {
    name: "Technology",
    icon: "ri-computer-line",
    workflow:
      "May leverage technology-adoption signals, B2B company intelligence, audience-segment data and market-research dashboards for go-to-market and partner-ecosystem strategy.",
  },
  {
    name: "Public-interest Research",
    icon: "ri-government-line",
    workflow:
      "May access open-catalogue demographic data, property-transaction records, planning-activity feeds and transport-accessibility datasets for evidence-based policy research.",
  },
];

export default function IndustryExampleCard() {
  return (
    <section className="bg-background-100" aria-labelledby="ind-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2
            id="ind-heading"
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            How organisations may use governed data
          </h2>
          <p className="text-sm text-foreground-400">
            General example workflows. These are illustrative and do not represent actual customers, endorsements or guaranteed outcomes.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <div key={ind.name} className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-background-200/60">
                <i className={`${ind.icon} text-base text-foreground-300`} aria-hidden="true" />
              </div>
              <h4 className="mb-2 text-sm font-medium text-foreground-200">{ind.name}</h4>
              <p className="text-[11px] leading-relaxed text-foreground-500">{ind.workflow}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}