import { useNavigate } from "react-router-dom";
import { complianceHubFaqs } from "@/data/compliancePages";

export default function ComplianceHubFaq() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100" id="faq-preview" aria-labelledby="faqpre-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              id="faqpre-heading"
              className="text-2xl text-foreground-100 md:text-3xl"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Compliance FAQs
            </h2>
            <p className="mt-1 text-sm text-foreground-400">Common questions about DataHarbour&apos;s governance framework.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/compliance/faqs")}
            className="hidden whitespace-nowrap text-xs text-accent-400 hover:underline sm:inline-flex items-center gap-1 cursor-pointer"
          >
            View all FAQs
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {complianceHubFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-foreground-200/10 bg-background-50/60"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 px-5 py-3.5 text-sm font-medium text-foreground-200 list-none">
                {faq.question}
                <i className="ri-add-line shrink-0 text-foreground-500 transition group-open:hidden" aria-hidden="true" />
                <i className="ri-subtract-line shrink-0 text-foreground-500 transition hidden group-open:block" aria-hidden="true" />
              </summary>
              <div className="px-5 pb-4 text-xs leading-relaxed text-foreground-400">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <button
            type="button"
            onClick={() => navigate("/compliance/faqs")}
            className="inline-flex items-center gap-1 text-xs text-accent-400 hover:underline cursor-pointer"
          >
            View all FAQs
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}