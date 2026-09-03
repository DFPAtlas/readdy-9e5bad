import { quickStartSteps } from "@/data/resources";

export default function QuickStartJourney() {
  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Quick-start journey
          </h2>
          <p className="mt-3 text-sm text-foreground-400">
            A six-step demonstration of the planned integration workflow.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="relative pl-8 border-l-2 border-foreground-200/10 space-y-8">
            {quickStartSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background-100 border-foreground-200/20">
                  <span className="text-xs font-semibold text-foreground-300">{i + 1}</span>
                </div>
                <div className="flex items-start gap-2">
                  <h3 className="text-sm font-semibold text-foreground-200">{step.label}</h3>
                  {step.planned && (
                    <span className="shrink-0 rounded-full bg-secondary-100 px-2 py-0.5 text-[10px] font-medium text-secondary-700 whitespace-nowrap">
                      Planned
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}