import { useNavigate } from "react-router-dom";

interface SolutionComplianceSectionProps {
  considerations: string[];
}

export default function SolutionComplianceSection({ considerations }: SolutionComplianceSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50" id="compliance" aria-labelledby="sol-comp-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="sol-comp-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Compliance considerations
        </h2>
        <p className="mb-6 text-sm text-foreground-400">
          Data-protection, governance and responsible-use points to consider before accessing products in this solution area. This content is general information and not legal advice.
        </p>

        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {considerations.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/10 flex-shrink-0">
                <i className="ri-shield-check-line text-[11px] text-accent-400" aria-hidden="true" />
              </div>
              <p className="text-xs leading-relaxed text-foreground-300">{item}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/compliance")}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
        >
          Visit Compliance Centre
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}