import type { ComplianceRequirement } from "@/data/compliancePages";

interface Props {
  requirements: ComplianceRequirement[];
}

export default function ComplianceRequirementsList({ requirements }: Props) {
  return (
    <section className="bg-background-100" id="requirements" aria-labelledby="req-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="req-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Standards and expectations
        </h2>
        <p className="mb-8 text-sm text-foreground-400 max-w-2xl">
          The following standards apply to organisations participating in the DataHarbour marketplace.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {requirements.map((req) => (
            <div
              key={req.title}
              className="rounded-lg border border-foreground-200/10 bg-background-50/60 p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500/10">
                  <i className="ri-check-line text-xs text-accent-400" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium text-foreground-100">{req.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-foreground-400 pl-9">{req.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}