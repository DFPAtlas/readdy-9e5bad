interface SolutionOutcomeGridProps {
  outcomes: string[];
}

export default function SolutionOutcomeGrid({ outcomes }: SolutionOutcomeGridProps) {
  return (
    <section className="bg-background-100" id="outcomes" aria-labelledby="outcomes-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="outcomes-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Supported outcomes
        </h2>
        <p className="mb-8 text-sm text-foreground-400">What governed data products in this solution area may help your organisation achieve.</p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/10 flex-shrink-0">
                <i className="ri-check-line text-[11px] text-accent-400" aria-hidden="true" />
              </div>
              <p className="text-xs leading-relaxed text-foreground-300">{outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}