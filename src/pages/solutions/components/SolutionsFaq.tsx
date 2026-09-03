import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What is a DataHarbour solution?",
    answer:
      "A DataHarbour solution describes how governed data products may support a specific business workflow — such as marketing intelligence, business verification or location planning. Solutions help you understand which data categories, products and access conditions may be relevant to your business challenge. They do not grant automatic access to any listed product.",
  },
  {
    question: "Does selecting a solution grant me access to the data products shown?",
    answer:
      "No. Solutions are informational only. Access to any listed data product requires a separate access request, which may involve organisation verification, supplier approval or compliance review depending on the product\u2019s access level and your declared purpose.",
  },
  {
    question: "How are packages identified for each solution?",
    answer:
      "Packages are identified based on their data category, geographic coverage, delivery format and permitted-use conditions. The featured packages shown for each solution are illustrative examples. The full marketplace catalogue may contain additional relevant products.",
  },
  {
    question: "Can one data package support several solutions?",
    answer:
      "Yes. A single data product may be relevant to multiple business workflows. For example, an address-validation API may support customer data enrichment, fraud prevention and business verification. Always check the product\u2019s permitted-use terms for each intended application.",
  },
  {
    question: "What happens when a compliance review is required?",
    answer:
      "Products labelled \u2018Compliance Review\u2019 require the buyer to demonstrate a lawful and appropriate purpose before access is granted. The review considers the declared business purpose, the sensitivity of the data requested and the buyer\u2019s organisational safeguards. This process will be available in a future platform phase.",
  },
  {
    question: "Are all the examples shown live products?",
    answer:
      "All package listings on DataHarbour are currently fictional demonstration listings illustrating the planned marketplace. Live products, verified suppliers and access requests will be available in a future platform phase.",
  },
];

function FaqItemComponent({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
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

export default function SolutionsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background-50" aria-labelledby="sfaq-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2
            id="sfaq-heading"
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Frequently asked questions
          </h2>
        </div>
        <div className="mx-auto max-w-3xl">
          {faqItems.map((item, i) => (
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