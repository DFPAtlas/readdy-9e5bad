import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/base/SectionHeading";
import { supplierCommercialModels } from "@/data/supplierContent";

export default function CommercialModelGrid() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Commercial models"
          heading="Flexible pricing for different products and buyers"
          supporting="DataHarbour supports several commercial models. You choose the model that fits your product and your business. Commercial terms are agreed during onboarding."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supplierCommercialModels.map((model) => {
            const isExpanded = expandedId === model.id;
            return (
              <div
                key={model.id}
                className="rounded-lg border border-foreground-200/10 bg-background-50 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : model.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground-200">{model.name}</h3>
                      {model.contactSalesRequired && (
                        <span className="shrink-0 rounded-full border border-foreground-200/20 px-2 py-0.5 text-[10px] font-medium text-foreground-500">
                          Contact sales
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground-500">{model.description}</p>
                  </div>
                  <i
                    className={`ri-arrow-down-s-line shrink-0 mt-0.5 text-sm text-foreground-500 transition ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-3 border-t border-foreground-200/10 pt-4">
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">When it fits</span>
                      <p className="mt-1 text-xs text-foreground-500">{model.whenItFits}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Billing basis</span>
                      <p className="mt-1 text-xs text-foreground-500">{model.billingBasis}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Supplier responsibility</span>
                      <p className="mt-1 text-xs text-foreground-500">{model.supplierResponsibility}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Buyer expectation</span>
                      <p className="mt-1 text-xs text-foreground-500">{model.buyerExpectation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-foreground-500">
          Specific commercial terms, including any commission or revenue-share arrangements, are discussed during supplier onboarding.{' '}
          <button type="button" onClick={() => navigate("/contact?type=supplier")} className="text-primary-400 hover:text-primary-300 transition cursor-pointer">
            Contact the supplier team
          </button>
          {' '}for more information.
        </p>
      </div>
    </section>
  );
}