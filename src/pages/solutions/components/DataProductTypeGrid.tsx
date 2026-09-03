const productTypes = [
  {
    icon: "ri-code-s-slash-line",
    name: "APIs",
    description:
      "Programmatic access to structured data for real-time integration into your applications, onboarding platforms, CRM systems and analytical tools.",
  },
  {
    icon: "ri-download-line",
    name: "Secure Downloads",
    description:
      "One-off or regularly refreshed CSV and JSON file downloads delivered through encrypted channels with audit logging.",
  },
  {
    icon: "ri-time-line",
    name: "Scheduled Feeds",
    description:
      "Automated recurring data deliveries at daily, weekly, monthly or quarterly intervals with change-detection and notification capabilities.",
  },
  {
    icon: "ri-dashboard-line",
    name: "Dashboards",
    description:
      "Interactive web-based dashboards for exploring data, visualising trends, filtering segments and exporting aggregated results.",
  },
  {
    icon: "ri-file-chart-line",
    name: "Research Reports",
    description:
      "Analyst-produced reports combining multiple data sources into structured findings with methodology documentation and supporting commentary.",
  },
  {
    icon: "ri-user-settings-line",
    name: "Audience Segments",
    description:
      "Pre-built, statistically representative consumer and business segments for campaign planning, market sizing and strategic analysis.",
  },
  {
    icon: "ri-pie-chart-line",
    name: "Aggregated Datasets",
    description:
      "Large-scale aggregated statistical datasets for advanced analytics, modelling and research with clear provenance and methodology documentation.",
  },
  {
    icon: "ri-shield-check-line",
    name: "Clean-room Analysis",
    description:
      "Controlled environments where multiple datasets may be analysed together under strict governance, without raw data leaving the secure environment.",
  },
];

export default function DataProductTypeGrid() {
  return (
    <section className="bg-background-50" aria-labelledby="dpt-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2
            id="dpt-heading"
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            How solutions deliver intelligence
          </h2>
          <p className="text-sm text-foreground-400">
            Solutions may draw on multiple data-product types. Availability varies by solution and package — not every format is available for every use case.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productTypes.map((type) => (
            <div key={type.name} className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent-500/10">
                <i className={`${type.icon} text-base text-accent-400`} aria-hidden="true" />
              </div>
              <h4 className="mb-1.5 text-sm font-medium text-foreground-200">{type.name}</h4>
              <p className="text-[11px] leading-relaxed text-foreground-500">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}