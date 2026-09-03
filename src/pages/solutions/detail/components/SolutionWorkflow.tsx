import type { SolutionWorkflowStep } from "@/data/solutions";

interface SolutionWorkflowProps {
  steps: SolutionWorkflowStep[];
}

export default function SolutionWorkflow({ steps }: SolutionWorkflowProps) {
  return (
    <section className="bg-background-50" id="workflow" aria-labelledby="workflow-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="workflow-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          How it works
        </h2>
        <p className="mb-8 text-sm text-foreground-400">A typical workflow for using governed data products within this solution area.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+22px)] top-6 hidden h-0.5 w-[calc(100%-44px)] bg-background-200/40 lg:block" aria-hidden="true" />
              )}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-400/40 bg-primary-500/10">
                <span className="text-xs font-semibold text-primary-400">{step.step}</span>
              </div>
              <h4 className="mb-1 text-sm font-medium text-foreground-200">{step.title}</h4>
              <p className="text-[11px] leading-relaxed text-foreground-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}