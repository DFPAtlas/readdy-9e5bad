import type { ComplianceChecklistItem } from "@/data/compliancePages";

interface Props {
  items: ComplianceChecklistItem[];
  title?: string;
}

export default function ComplianceChecklist({ items, title = "Checklist" }: Props) {
  return (
    <section className="bg-background-100" id="checklist" aria-labelledby="cl-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="cl-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {title}
        </h2>
        <p className="mb-8 text-sm text-foreground-400">
          Use this checklist to review your organisation&apos;s readiness against each expectation.
        </p>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-lg border border-foreground-200/10 bg-background-50/60 px-4 py-3"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-foreground-200/20 bg-background-100">
                <i className="ri-check-line hidden text-[10px] text-accent-400" aria-hidden="true" />
              </div>
              <span className="text-sm text-foreground-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}