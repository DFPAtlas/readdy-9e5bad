import { billingPrinciples, billingGlossaryTerms } from "@/data/pricing";
import SectionHeading from "@/components/base/SectionHeading";
import { useState } from "react";

function PricingGlossary() {
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  return (
    <div>
      <h3 className="mb-6 text-center text-sm font-medium text-foreground-300">Key commercial terms</h3>
      <div className="mx-auto max-w-2xl divide-y divide-foreground-200/10">
        {billingGlossaryTerms.map((term) => {
          const isOpen = openTerm === term.term;
          return (
            <div key={term.term} className="py-3.5">
              <button
                type="button"
                onClick={() => setOpenTerm(isOpen ? null : term.term)}
                className="flex w-full items-center justify-between gap-3 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-foreground-200">{term.term}</span>
                <i
                  className={`ri-arrow-down-s-line shrink-0 text-sm text-foreground-500 transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-2 text-xs leading-relaxed text-foreground-500 pr-8">{term.definition}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BillingPrinciples() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Billing & Terms"
          heading="Billing principles"
          supporting="Planned commercial principles, not final contract language."
        />

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-foreground-200/10 bg-background-100/60 p-5 md:p-7">
          <div className="grid gap-3 sm:grid-cols-2">
            {billingPrinciples.map((principle, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <i className="ri-check-line mt-0.5 shrink-0 text-xs text-accent-500" />
                <span className="text-xs leading-relaxed text-foreground-400">{principle}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14">
          <PricingGlossary />
        </div>
      </div>
    </section>
  );
}