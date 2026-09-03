import { useNavigate } from "react-router-dom";

const steps = [
  {
    step: 1,
    label: "Define purpose",
    description: "Clarify your business objective and the specific intelligence question you need to answer.",
  },
  {
    step: 2,
    label: "Discover products",
    description: "Browse governed data products, APIs, feeds and reports that may support your workflow.",
  },
  {
    step: 3,
    label: "Review provenance",
    description: "Examine source types, collection methods, quality indicators and permitted-use conditions.",
  },
  {
    step: 4,
    label: "Request access",
    description: "Complete verification, agree to licence terms and integrate data securely into your systems.",
  },
  {
    step: 5,
    label: "Use within agreed controls",
    description: "Apply data within declared purposes, respect retention terms and monitor quality over time.",
  },
];

export default function BusinessNeedsOverview() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100" aria-labelledby="bno-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2
            id="bno-heading"
            className="mb-2 text-2xl text-foreground-50 md:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            From business need to governed insight
          </h2>
          <p className="text-sm text-foreground-400">
            DataHarbour connects business challenges, governed data products and controlled access in a structured, auditable process.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+24px)] top-7 hidden h-0.5 w-[calc(100%-48px)] bg-background-200/40 lg:block" aria-hidden="true" />
              )}
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-400/40 bg-primary-500/10">
                <span className="text-sm font-semibold text-primary-400">{s.step}</span>
              </div>
              <h4 className="mb-1.5 text-sm font-medium text-foreground-200">{s.label}</h4>
              <p className="text-[11px] leading-relaxed text-foreground-500">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            Browse Marketplace
          </button>
          <button
            type="button"
            onClick={() => navigate("/compliance")}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
          >
            Visit Compliance Centre
          </button>
        </div>
      </div>
    </section>
  );
}