import { trustModelSteps } from "@/data/compliancePages";

export default function TrustModel() {
  return (
    <section className="bg-background-50" id="trust-model" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="trust-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Trust model
        </h2>
        <p className="mb-10 text-sm text-foreground-400 max-w-2xl">
          DataHarbour&apos;s governance model follows a structured sequence — from supplier evidence through to ongoing oversight — designed to ensure that every data product is accessed for a declared, lawful and proportionate purpose.
        </p>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-foreground-200/10 hidden md:block" aria-hidden="true" />

          <div className="space-y-0">
            {trustModelSteps.map((step, i) => (
              <div key={step.step} className="relative flex flex-col gap-4 pb-8 md:flex-row md:gap-8 md:pb-10">
                {/* Step number */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent-500/40 bg-background-50">
                  <span className="text-sm font-semibold text-accent-400">{step.step}</span>
                </div>

                <div className="flex-1 rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
                  <h3 className="mb-3 text-base font-medium text-foreground-100">{step.title}</h3>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <span className="text-[11px] font-medium tracking-wide text-foreground-500 uppercase">What is reviewed</span>
                      <p className="mt-1 text-foreground-300">{step.whatIsReviewed}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium tracking-wide text-foreground-500 uppercase">Who is responsible</span>
                      <p className="mt-1 text-foreground-300">{step.whoIsResponsible}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium tracking-wide text-foreground-500 uppercase">Possible outcomes</span>
                      <p className="mt-1 text-foreground-300">{step.possibleOutcomes}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium tracking-wide text-foreground-500 uppercase">Limitation</span>
                      <p className="mt-1 text-foreground-400 text-xs">{step.limitation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}