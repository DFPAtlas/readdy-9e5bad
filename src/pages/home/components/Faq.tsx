import FaqAccordion from "@/components/base/FaqAccordion";
import SectionHeading from "@/components/base/SectionHeading";

const faqItems = [
  {
    question: "What is DataHarbour?",
    answer: "DataHarbour is a compliance-led B2B data intelligence marketplace that helps approved organisations discover structured data packages, commercial intelligence, audience segments, verification products, reports, APIs and controlled data feeds. It is not an unrestricted people-search service. Products are structured for defined business purposes and may use aggregated, licensed, public, derived, inferred or appropriately controlled information.",
  },
  {
    question: "Can anyone purchase a data package?",
    answer: "No. Access to many products requires organisation verification, intended-use review and package-specific approvals. Access is not automatically granted simply because a product is listed on the marketplace.",
  },
  {
    question: "Does DataHarbour sell personal dossiers?",
    answer: "No. DataHarbour does not sell or facilitate the sale of personal dossiers, private investigation reports or unauthorised individual profiles. Products are structured data packages designed for defined commercial and analytical purposes.",
  },
  {
    question: "How are suppliers reviewed?",
    answer: "Suppliers complete a structured onboarding process that includes identity verification, business registration checks and documentation of data sourcing practices. This review is designed to assess whether a supplier's products can be responsibly listed on the marketplace.",
  },
  {
    question: "What does data provenance mean?",
    answer: "Provenance refers to the documented origin and composition of data. DataHarbour supports classification including directly supplied, publicly sourced, licensed, observed, derived, inferred, aggregated and anonymised or de-identified information. This helps buyers understand what they are accessing before making a decision.",
  },
  {
    question: "How does package access work?",
    answer: "Buyers browse listed packages, compare provenance and delivery details, and submit access requests. Suppliers review each request against the package's permitted-use rules and may ask additional questions. Approved access can be delivered through APIs, dashboards, secure feeds or controlled downloads.",
  },
  {
    question: "Can data be used for credit or insurance decisions?",
    answer: "Many packages explicitly restrict use for credit, employment, housing and insurance decisions. Buyers must review each package's permitted-use rules before requesting access and remain responsible for ensuring their use complies with applicable law and the agreed terms.",
  },
  {
    question: "How are data-subject requests handled?",
    answer: "DataHarbour provides processes designed to support subject access, correction and deletion requests. Each buyer and supplier retains independent responsibility for responding to requests that relate to information they hold or process.",
  },
  {
    question: "Does DataHarbour guarantee legal compliance?",
    answer: "No. DataHarbour is designed to help organisations manage responsible data access, but it does not guarantee legal compliance. Each buyer remains responsible for establishing and documenting its own lawful basis, permissions and permitted use. DataHarbour does not replace legal advice, a Data Protection Officer or a Data Protection Impact Assessment.",
  },
  {
    question: "What delivery formats are supported?",
    answer: "Products may be delivered through secure RESTful APIs, scheduled data feeds, interactive dashboards, aggregated reports, audience exports, event notifications and controlled file downloads. Supported formats vary by package. Clean-room analytics arrangements may be available for approved enterprise agreements.",
  },
];

export default function Faq() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          heading="Frequently Asked Questions"
          supporting="Common questions about DataHarbour, data provenance, access controls and responsible use."
        />
        <div className="mt-12">
          <FaqAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}