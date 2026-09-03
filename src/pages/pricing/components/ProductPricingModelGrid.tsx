import { useState } from "react";
import { productPricingModels } from "@/data/pricing";

export default function ProductPricingModelGrid() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {productPricingModels.map((model) => {
        const isOpen = expanded === model.id;
        return (
          <div
            key={model.id}
            className="rounded-lg border border-foreground-200/10 bg-background-50 transition hover:border-foreground-200/20"
          >
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : model.id)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <h4 className="text-sm font-medium text-foreground-200">{model.name}</h4>
              <i
                className={`ri-arrow-down-s-line shrink-0 text-sm text-foreground-500 transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-foreground-200/10 px-5 pb-5 pt-4 space-y-3">
                <div>
                  <p className="mb-0.5 text-[11px] font-medium text-foreground-300">What is charged</p>
                  <p className="text-xs leading-relaxed text-foreground-500">{model.whatIsCharged}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-[11px] font-medium text-foreground-300">Typical use</p>
                  <p className="text-xs leading-relaxed text-foreground-500">{model.typicalUse}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-[11px] font-medium text-foreground-300">Billing frequency</p>
                  <p className="text-xs leading-relaxed text-foreground-500">{model.billingFrequency}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-[11px] font-medium text-foreground-300">Common variables</p>
                  <p className="text-xs leading-relaxed text-foreground-500">{model.commonVariables}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-[11px] font-medium text-foreground-300">Questions to ask</p>
                  <p className="text-xs leading-relaxed text-foreground-500">{model.questionsToAsk}</p>
                </div>
                <div className="rounded-lg border border-foreground-200/10 bg-background-100/40 px-3 py-2.5">
                  <p className="mb-1 text-[10px] font-medium text-foreground-400">Example</p>
                  <p className="text-[11px] leading-relaxed text-foreground-500 italic">{model.exampleDisplay}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}