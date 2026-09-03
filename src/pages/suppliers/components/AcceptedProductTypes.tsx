import { useState } from "react";
import SectionHeading from "@/components/base/SectionHeading";
import { acceptedProductTypes } from "@/data/supplierContent";

export default function AcceptedProductTypes() {
  const [expandedType, setExpandedType] = useState<string | null>(null);

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Accepted product types"
          heading="What you can supply through DataHarbour"
          supporting="Each product type has specific expectations around format, evidence, update model and access controls. Submitting a product that clearly matches one of these types helps the review process."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acceptedProductTypes.map((type) => {
            const isExpanded = expandedType === type.id;
            return (
              <div
                key={type.id}
                className="rounded-lg border border-foreground-200/10 bg-background-50 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedType(isExpanded ? null : type.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div>
                    <h3 className="text-sm font-semibold text-foreground-200">{type.name}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground-500">{type.description}</p>
                  </div>
                  <i
                    className={`ri-arrow-down-s-line shrink-0 mt-0.5 text-sm text-foreground-500 transition ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-3 border-t border-foreground-200/10 pt-4">
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Typical format</span>
                      <p className="mt-1 text-xs text-foreground-500">{type.typicalFormat}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Possible buyer use</span>
                      <p className="mt-1 text-xs text-foreground-500">{type.possibleBuyerUse}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Expected update model</span>
                      <p className="mt-1 text-xs text-foreground-500">{type.updateModel}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Key evidence required</span>
                      <p className="mt-1 text-xs text-foreground-500">{type.evidenceRequired}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Access-control expectation</span>
                      <p className="mt-1 text-xs text-foreground-500">{type.accessControlExpectation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}