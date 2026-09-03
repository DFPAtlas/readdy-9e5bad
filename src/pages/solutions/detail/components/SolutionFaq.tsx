import { useState } from "react";
import type { SolutionFaq as SolutionFaqItem } from "@/data/solutions";

interface SolutionFaqProps {
  faqs: SolutionFaqItem[];
}

function FaqItemComponent({ item, isOpen, onToggle }: { item: SolutionFaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-foreground-200/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground-200 transition hover:text-foreground-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-foreground-300/20 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{item.question}</span>
        <i
          className={`ri-arrow-down-s-line text-lg text-foreground-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-xs leading-relaxed text-foreground-400">{item.answer}</p>
      </div>
    </div>
  );
}

export default function SolutionFaq({ faqs }: SolutionFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background-50" id="faq" aria-labelledby="sol-faq-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="sol-faq-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Frequently asked questions
        </h2>
        <p className="mb-8 text-sm text-foreground-400">Common questions about this solution area.</p>
        <div className="mx-auto max-w-3xl">
          {faqs.map((item, i) => (
            <FaqItemComponent
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}