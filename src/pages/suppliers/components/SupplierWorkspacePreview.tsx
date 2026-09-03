import SectionHeading from "@/components/base/SectionHeading";
import { supplierWorkspacePreviewCards } from "@/data/supplierContent";

export default function SupplierWorkspacePreview() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Supplier workspace — planned functionality"
          heading="A preview of the supplier experience"
          supporting="These tools are being designed to support suppliers after their products are listed. All features shown are planned and will be built after the core marketplace is operational."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supplierWorkspacePreviewCards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-dashed border-foreground-200/20 bg-background-100 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground-200/5">
                  <i className={`${card.icon} text-sm text-foreground-400`} />
                </div>
                <span className="rounded-full border border-foreground-200/20 px-2 py-0.5 text-[10px] font-medium text-foreground-500">
                  Planned
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground-300">{card.title}</h3>
              <p className="text-xs leading-relaxed text-foreground-500">{card.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-foreground-500">
          Supplier workspace preview — planned functionality. The dashboard, reporting and management tools shown here are planned and will be available in a future platform phase.
        </p>
      </div>
    </section>
  );
}