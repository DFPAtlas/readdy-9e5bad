import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/base/SectionHeading";
import { supplierFaqs } from "@/data/supplierContent";

export default function SupplierFaq() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Supplier FAQ"
          heading="Questions suppliers often ask"
          supporting="If your question is not answered here, contact the supplier team for more information."
        />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-foreground-200/10">
          {supplierFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground-200 pr-4">{faq.question}</span>
                  <i
                    className={`ri-arrow-down-s-line shrink-0 text-sm text-foreground-500 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-3 text-xs leading-relaxed text-foreground-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate("/contact?type=supplier")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer"
          >
            Ask a supplier question
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}