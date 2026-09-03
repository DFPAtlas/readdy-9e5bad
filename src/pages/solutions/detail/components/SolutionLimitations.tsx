interface SolutionLimitationsProps {
  limitations: string[];
}

export default function SolutionLimitations({ limitations }: SolutionLimitationsProps) {
  return (
    <section className="bg-background-100" id="limitations" aria-labelledby="lim-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="lim-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          What this solution does not do
        </h2>
        <p className="mb-6 text-sm text-foreground-400">Important limitations to set realistic expectations about governed data products in this area.</p>

        <div className="grid gap-3 sm:grid-cols-2">
          {limitations.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground-200/10 flex-shrink-0">
                <i className="ri-close-line text-[11px] text-foreground-400" aria-hidden="true" />
              </div>
              <p className="text-xs leading-relaxed text-foreground-400">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}