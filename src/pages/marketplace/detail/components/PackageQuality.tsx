import type { QualityCheck } from "@/data/marketplacePackages";

interface PackageQualityProps {
  checks: QualityCheck[];
}

const scoreColour = (score: number): string => {
  if (score >= 95) return "text-accent-400";
  if (score >= 85) return "text-accent-400/80";
  return "text-foreground-400";
};

export default function PackageQuality({ checks }: PackageQualityProps) {
  if (checks.length === 0) return null;

  return (
    <section id="quality" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Data Quality
      </h2>

      <div className="space-y-3">
        {checks.map((check) => (
          <div key={check.name} className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-foreground-200">{check.name}</h3>
              <span className={`inline-flex items-center gap-1 text-sm font-medium ${scoreColour(check.score)}`}>
                {check.score}
                <span className="text-[10px] text-foreground-500">/100</span>
              </span>
            </div>
            {/* Score bar */}
            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-background-200/60">
              <div
                className={`h-full rounded-full transition-all duration-500 ${check.score >= 95 ? "bg-accent-500/60" : check.score >= 85 ? "bg-accent-500/40" : "bg-foreground-200/40"}`}
                style={{ width: `${check.score}%` }}
              />
            </div>
            <p className="text-[11px] text-foreground-400 leading-relaxed">{check.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] text-foreground-500">
        All quality scores shown are demonstration indicators only. They reflect the data supplier&apos;s self-assessed quality metrics and should not be interpreted as independently verified scores.
      </p>
    </section>
  );
}