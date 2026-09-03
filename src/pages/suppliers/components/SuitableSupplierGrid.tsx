import SectionHeading from "@/components/base/SectionHeading";
import { suitableSupplierCards, notSuitableItems } from "@/data/supplierContent";

export default function SuitableSupplierGrid() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Who DataHarbour is for"
          heading="A marketplace for credible, rights-holding data providers"
          supporting="DataHarbour is selective. It is designed for organisations that can document their data, demonstrate their rights and support responsible commercial use. Not every data product belongs on a governed marketplace."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suitableSupplierCards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-foreground-200/10 bg-background-100 p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/10">
                  <i className="ri-check-line text-xs text-primary-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground-200">{card.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-foreground-500">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-[#ff2e88]/20 bg-[#ff2e88]/5 p-6 md:p-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff2e88]/10 mt-0.5">
              <i className="ri-close-line text-sm text-[#ff2e88]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground-200">Not suitable for DataHarbour</h3>
              <p className="mt-1 text-xs text-foreground-500">
                The following types of data, organisations or products are not compatible with DataHarbour&apos;s governed marketplace model and will not be accepted.
              </p>
            </div>
          </div>
          <ul className="space-y-2.5">
            {notSuitableItems.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground-500">
                <i className="ri-close-circle-line mt-0.5 shrink-0 text-sm text-[#ff2e88]/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}