import { supplierCommercialOptions } from "@/data/pricing";
import SectionHeading from "@/components/base/SectionHeading";

const statusStyles: Record<string, string> = {
  "Subject to agreement": "border-foreground-200/15 text-foreground-500",
  Planned: "border-foreground-200/15 text-foreground-500",
  "Contact sales": "border-accent-300/40 text-accent-600",
};

export default function SupplierCommercialModels() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="For Suppliers"
          heading="Supplier commercial arrangements"
          supporting="A separate overview so buyer and supplier pricing are not confused. All terms are agreed during supplier onboarding."
        />

        <div className="mx-auto mt-10 max-w-4xl space-y-3">
          {supplierCommercialOptions.map((opt) => (
            <div
              key={opt.id}
              className="flex flex-col gap-3 rounded-lg border border-foreground-200/10 bg-background-100/60 px-5 py-4 transition hover:border-foreground-200/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h4 className="text-sm font-medium text-foreground-200">{opt.name}</h4>
                  <span
                    className={`shrink-0 rounded border px-1.5 py-px text-[10px] ${
                      statusStyles[opt.status] || "border-foreground-200/15 text-foreground-500"
                    }`}
                  >
                    {opt.status}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-foreground-500">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-4xl rounded-lg border border-foreground-200/10 bg-background-100/40 px-5 py-4">
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2 text-xs text-foreground-500">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground-500" />
              Commercial terms are agreed during supplier onboarding.
            </li>
            <li className="flex items-start gap-2 text-xs text-foreground-500">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground-500" />
              Acceptance does not guarantee sales.
            </li>
            <li className="flex items-start gap-2 text-xs text-foreground-500">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground-500" />
              DataHarbour does not publish unconfirmed commission percentages.
            </li>
            <li className="flex items-start gap-2 text-xs text-foreground-500">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground-500" />
              Payment schedules, refunds, taxes and liabilities require contract terms.
            </li>
            <li className="flex items-start gap-2 text-xs text-foreground-500">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground-500" />
              Supplier dashboards and revenue reports are planned features.
            </li>
          </ul>
        </div>

        <div className="mx-auto mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/suppliers"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
          >
            Review supplier proposition
            <i className="ri-arrow-right-line" />
          </a>
          <a
            href="/contact?type=supplier&topic=commercial"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
          >
            Ask a supplier commercial question
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}