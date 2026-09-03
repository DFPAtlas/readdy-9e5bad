export default function ComparisonConsiderations() {
  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground-100">Before Choosing a Package</h3>
      <ul className="space-y-2.5">
        {[
          {
            icon: "ri-file-search-line",
            text: "Confirm the intended business purpose and ensure it aligns with the package's permitted uses.",
          },
          {
            icon: "ri-shield-check-line",
            text: "Review provenance details, permitted uses and prohibited uses for each package.",
          },
          {
            icon: "ri-plug-line",
            text: "Consider delivery methods, integration requirements and onboarding timelines.",
          },
          {
            icon: "ri-time-line",
            text: "Review data-retention guidance and sharing restrictions.",
          },
          {
            icon: "ri-bank-card-line",
            text: "Understand the pricing basis — subscription, per-request and per-record models are not directly comparable on display price alone.",
          },
          {
            icon: "ri-user-star-line",
            text: "Complete organisation verification and compliance review where required before access is granted.",
          },
          {
            icon: "ri-scales-line",
            text: "Seek professional legal or compliance advice for high-risk data-processing activities.",
          },
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[11px] leading-relaxed text-foreground-400">
            <i className={`${item.icon} mt-0.5 flex-shrink-0 text-accent-400`} aria-hidden="true" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-3 border-t border-foreground-200/10">
        <a
          href="/compliance"
          className="inline-flex items-center gap-1.5 text-[11px] text-accent-400 transition hover:text-accent-300"
        >
          <i className="ri-external-link-line" aria-hidden="true" />
          Learn more about compliance and governance at DataHarbour
        </a>
      </div>
    </div>
  );
}