import type { SolutionUseCase } from "@/data/solutions";

interface SolutionUseCaseCardProps {
  useCases: SolutionUseCase[];
}

export default function SolutionUseCaseCard({ useCases }: SolutionUseCaseCardProps) {
  return (
    <section className="bg-background-100" id="use-cases" aria-labelledby="usecases-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="usecases-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Example use cases
        </h2>
        <p className="mb-8 text-sm text-foreground-400">
          Fictional scenarios illustrating how organisations may apply governed data products. Organisations, figures and outcomes are illustrative only.
        </p>

        <div className="grid gap-5 lg:grid-cols-2">
          {useCases.map((uc, i) => (
            <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
              <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-foreground-500 uppercase">{uc.organisationType}</p>
              <p className="mb-4 text-sm font-medium text-foreground-200 leading-relaxed">{uc.businessQuestion}</p>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-medium text-foreground-500 uppercase tracking-wide">Data categories considered</span>
                  <p className="mt-0.5 text-[11px] text-foreground-400 leading-relaxed">{uc.dataCategories}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-foreground-500 uppercase tracking-wide">Example workflow</span>
                  <p className="mt-0.5 text-[11px] text-foreground-400 leading-relaxed">{uc.exampleWorkflow}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-foreground-500 uppercase tracking-wide">Operational output</span>
                  <p className="mt-0.5 text-[11px] text-foreground-300 leading-relaxed">{uc.operationalOutput}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-accent-400 uppercase tracking-wide">Compliance checkpoint</span>
                  <p className="mt-0.5 text-[11px] text-foreground-400 leading-relaxed">{uc.complianceCheckpoint}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-foreground-500 uppercase tracking-wide">Limitation</span>
                  <p className="mt-0.5 text-[11px] text-foreground-400 leading-relaxed">{uc.limitation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}