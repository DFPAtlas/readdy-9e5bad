import { useNavigate } from "react-router-dom";

export default function SolutionsCompliancePanel() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50" aria-labelledby="comp-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl rounded-lg border border-foreground-200/10 bg-background-100/60 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/10">
              <i className="ri-shield-check-line text-lg text-accent-400" aria-hidden="true" />
            </div>
            <h2
              id="comp-heading"
              className="text-xl text-foreground-50 md:text-2xl"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Purpose comes before access
            </h2>
          </div>

          <ul className="mb-6 space-y-2.5">
            {[
              "Buyers may need organisation verification before accessing certain products.",
              "Some data products require supplier approval in addition to buyer verification.",
              "Certain purposes require compliance review to confirm alignment with permitted-use terms.",
              "Licence, retention and sharing terms apply to every governed data product.",
              "High-risk or sensitive uses may require additional assessment and safeguards.",
              "A listing in the marketplace is not permission for every possible use.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <i className="ri-information-line mt-0.5 text-sm text-foreground-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-foreground-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/compliance")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Visit Compliance Centre
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
            >
              Contact DataHarbour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}