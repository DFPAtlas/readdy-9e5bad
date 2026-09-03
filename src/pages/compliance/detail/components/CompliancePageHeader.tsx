import type { CompliancePage } from "@/data/compliancePages";

interface Props {
  page: CompliancePage;
}

export default function CompliancePageHeader({ page }: Props) {
  const statusBadgeClass =
    page.status === "Planned control"
      ? "bg-secondary-500/10 text-secondary-400 border-secondary-500/20"
      : "bg-accent-500/10 text-accent-400 border-accent-500/20";

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <p className="mb-2 text-xs font-medium tracking-[0.2em] text-accent-400 uppercase">{page.eyebrow}</p>
        <h1
          className="mb-3 text-3xl text-foreground-50 md:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {page.title}
        </h1>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-foreground-400">{page.summary}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusBadgeClass}`}
          >
            {page.status === "Planned control" ? (
              <i className="ri-time-line text-[10px]" aria-hidden="true" />
            ) : (
              <i className="ri-check-line text-[10px]" aria-hidden="true" />
            )}
            {page.status}
          </span>
          <span className="text-xs text-foreground-500">Last reviewed: {page.lastReviewedDisplay}</span>
        </div>
      </div>
    </section>
  );
}