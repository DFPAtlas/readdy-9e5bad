export default function ComplianceWarning() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 md:px-6 md:pt-6">
      <div className="rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 px-4 py-3 flex items-start gap-3">
        <i className="ri-information-line mt-0.5 shrink-0 text-sm text-[#ff2e88]" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-foreground-400">
          This information explains DataHarbour&apos;s planned governance approach and is not legal advice. Final policies, contracts and operational procedures must be reviewed before the service launches.
        </p>
      </div>
    </div>
  );
}