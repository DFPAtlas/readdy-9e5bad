import SectionHeading from "@/components/base/SectionHeading";
import { supplierDeliveryOptions } from "@/data/supplierContent";

export default function SupplierDeliveryOptions() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Delivery options"
          heading="How buyers receive your data"
          supporting="DataHarbour supports multiple delivery methods. Choose the format that fits your product and your buyers' integration requirements."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supplierDeliveryOptions.map((option) => (
            <div
              key={option.id}
              className="rounded-lg border border-foreground-200/10 bg-background-100 p-5 flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-foreground-200">{option.name}</h3>
              <p className="text-xs leading-relaxed text-foreground-500">{option.description}</p>
              <div className="mt-auto space-y-2 pt-2 border-t border-foreground-200/10">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider shrink-0 w-24">Updates</span>
                  <span className="text-[10px] text-foreground-500">{option.updateFrequency}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider shrink-0 w-24">Security</span>
                  <span className="text-[10px] text-foreground-500">{option.secureTransfer}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider shrink-0 w-24">Schema</span>
                  <span className="text-[10px] text-foreground-500">{option.schemaDocumentation}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider shrink-0 w-24">Versioning</span>
                  <span className="text-[10px] text-foreground-500">{option.versioning}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-foreground-500">
          Developer documentation and API reference materials are planned and will be available before the platform becomes operational.
        </p>
      </div>
    </section>
  );
}