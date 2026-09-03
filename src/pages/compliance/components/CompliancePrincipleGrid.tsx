import { useNavigate } from "react-router-dom";
import { complianceHubPrinciples } from "@/data/compliancePages";

export default function CompliancePrincipleGrid() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100" id="principles" aria-labelledby="principles-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="principles-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Core principles
        </h2>
        <p className="mb-10 text-sm text-foreground-400 max-w-2xl">
          Six principles underpin DataHarbour&apos;s approach to governed data access. Each principle is embedded in buyer terms, supplier standards and platform operations.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {complianceHubPrinciples.map((principle) => (
            <button
              key={principle.title}
              type="button"
              onClick={() => navigate(`/compliance/${principle.detailSlug}`)}
              className="group rounded-lg border border-foreground-200/10 bg-background-50/60 p-5 text-left transition hover:border-accent-500/20 cursor-pointer"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent-500/10">
                <i className="ri-check-double-line text-sm text-accent-400" aria-hidden="true" />
              </div>
              <h3 className="mb-1.5 text-sm font-medium text-foreground-100">{principle.title}</h3>
              <p className="mb-3 text-xs leading-relaxed text-foreground-400">{principle.description}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-400 group-hover:underline">
                Learn more
                <i className="ri-arrow-right-line text-[10px]" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}