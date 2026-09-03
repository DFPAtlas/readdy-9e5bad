import SectionHeading from "@/components/base/SectionHeading";
import ProvenanceBadge from "@/components/base/ProvenanceBadge";
import DemoDataNotice from "@/components/base/DemoDataNotice";

const classificationTypes = [
  "Directly Supplied",
  "Publicly Sourced",
  "Licensed",
  "Observed",
  "Derived",
  "Inferred",
  "Aggregated",
  "Anonymised or De-identified",
];

const flowSteps = [
  { label: "Original Source", icon: "ri-database-2-line" },
  { label: "Supplier Review", icon: "ri-search-eye-line" },
  { label: "Field Classification", icon: "ri-price-tag-3-line" },
  { label: "Package Approval", icon: "ri-shield-check-line" },
  { label: "Controlled Delivery", icon: "ri-send-plane-line" },
  { label: "Usage Audit", icon: "ri-file-list-3-line" },
];

export default function ClearProvenance() {
  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Clear Provenance"
          heading="Know where the data came from and how it was created."
          supporting="DataHarbour can classify information using multiple provenance categories, helping buyers understand data origin and composition before making access decisions."
        />

        {/* Classification tags */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {classificationTypes.map((type) => (
            <ProvenanceBadge key={type} label={type} />
          ))}
        </div>

        {/* Flow */}
        <div className="mt-14">
          <div className="flex flex-wrap items-start justify-center gap-3 md:gap-4">
            {flowSteps.map((step, index) => (
              <div key={step.label} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/10">
                  <i className={`${step.icon} text-lg text-accent-400`} />
                </div>
                <span className="mt-2 text-center text-[10px] font-medium text-foreground-400">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Example panel */}
        <div className="mt-14 rounded-lg border border-foreground-200/10 bg-background-100/50 p-6 backdrop-blur-sm">
          <h4 className="mb-4 text-sm font-semibold text-foreground-100">Example: UK Retail Interest Index</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] font-medium text-foreground-400 uppercase">Supplier</p>
              <p className="text-sm text-foreground-200">Northbridge Insights Ltd</p>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-medium text-foreground-400 uppercase">Source Classifications</p>
              <div className="flex flex-wrap gap-1.5">
                <ProvenanceBadge label="Licensed" variant="active" />
                <ProvenanceBadge label="Aggregated" variant="active" />
                <ProvenanceBadge label="Derived" variant="active" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-medium text-foreground-400 uppercase">Permitted Purpose</p>
              <p className="text-sm text-foreground-200">Market analysis and campaign planning</p>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-medium text-foreground-400 uppercase">Restriction</p>
              <p className="text-sm text-foreground-200">Not approved for credit, employment, housing or insurance decisions.</p>
            </div>
          </div>
          <div className="mt-5">
            <DemoDataNotice />
          </div>
        </div>
      </div>
    </section>
  );
}