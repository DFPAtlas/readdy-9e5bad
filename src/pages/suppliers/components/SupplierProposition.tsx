import SectionHeading from "@/components/base/SectionHeading";
import { supplierBenefits } from "@/data/supplierContent";

export default function SupplierProposition() {
  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Why supply through DataHarbour"
          heading="A marketplace designed for responsible data providers"
          supporting="DataHarbour is being built to connect credible suppliers with verified organisational buyers — not to be an open data dump. Every feature is designed to support controlled, documented and accountable data distribution."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supplierBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-lg border border-foreground-200/10 bg-background-50 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground-200">{benefit.title}</h3>
                {benefit.status === "Planned" && (
                  <span className="shrink-0 rounded-full border border-foreground-200/20 px-2 py-0.5 text-[10px] font-medium text-foreground-500">
                    Planned
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-foreground-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}