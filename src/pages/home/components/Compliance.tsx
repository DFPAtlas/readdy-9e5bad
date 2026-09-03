import { useNavigate } from "react-router-dom";
import FeatureCard from "@/components/base/FeatureCard";
import SectionHeading from "@/components/base/SectionHeading";

const features = [
  {
    icon: "ri-user-search-line",
    title: "Supplier Due Diligence",
    description: "Suppliers complete a structured onboarding process with review of data sourcing practices and documentation.",
  },
  {
    icon: "ri-building-line",
    title: "Buyer Verification",
    description: "Organisation identity and business registration checks are completed before access requests are processed.",
  },
  {
    icon: "ri-file-list-2-line",
    title: "Intended-Use Review",
    description: "Buyers declare their purpose and answer package-specific questions before access can be granted.",
  },
  {
    icon: "ri-forbid-line",
    title: "Package Restrictions",
    description: "Individual packages may carry permitted-use rules that are communicated before and after access.",
  },
  {
    icon: "ri-timer-line",
    title: "Retention Controls",
    description: "Configurable data retention settings allow suppliers to specify how long data may be held.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Data-Subject Rights",
    description: "Processes designed to support subject access, correction and deletion requests across participating suppliers.",
  },
  {
    icon: "ri-survey-line",
    title: "Audit Logging",
    description: "Access, delivery and usage events can be recorded to support internal governance and external review.",
  },
  {
    icon: "ri-close-circle-line",
    title: "Access Revocation",
    description: "Access can be suspended or withdrawn when terms change, compliance issues arise or agreements end.",
  },
];

export default function Compliance() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          label="Responsible Access"
          heading="Controls should travel with the data."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-accent-400/20 bg-accent-500/5 px-6 py-5">
          <p className="text-xs leading-relaxed text-foreground-400">
            <i className="ri-information-line mr-1.5 align-middle text-accent-400" />
            DataHarbour is designed to help organisations manage responsible data access. Each buyer remains responsible for establishing and documenting its own lawful basis, permissions and permitted use. DataHarbour does not replace legal advice, a Data Protection Officer, a compliance assessment or a Data Protection Impact Assessment.
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate("/compliance")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
          >
            Explore the Compliance Centre
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}