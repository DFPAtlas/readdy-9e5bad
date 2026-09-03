import type { VersionHistoryEntry } from "@/data/marketplacePackages";
import PackageBadge from "@/pages/marketplace/components/PackageBadge";

interface PackageVersionHistoryProps {
  currentVersion: string;
  history: VersionHistoryEntry[];
}

export default function PackageVersionHistory({ currentVersion, history }: PackageVersionHistoryProps) {
  if (history.length === 0) return null;

  return (
    <section id="versions" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Version History
      </h2>

      <div className="space-y-0">
        {history.map((v, i) => {
          const isCurrentVersion = v.status === "Current";
          return (
            <div key={v.version} className={`relative ${i < history.length - 1 ? "pb-4" : ""}`}>
              {/* Timeline line */}
              {i < history.length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-0 w-px bg-foreground-200/10" aria-hidden="true" />
              )}
              <div className="flex gap-3">
                {/* Dot */}
                <div className={`relative z-10 mt-1 flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  isCurrentVersion
                    ? "border-accent-400 bg-accent-500/20"
                    : v.status === "Previous"
                    ? "border-foreground-200/30 bg-background-100"
                    : "border-foreground-200/10 bg-background-200/40"
                }`}>
                  <div className={`h-2 w-2 rounded-full ${
                    isCurrentVersion ? "bg-accent-400" : "bg-foreground-200/30"
                  }`} aria-hidden="true" />
                </div>
                {/* Content */}
                <div className="flex-1 rounded-lg border border-foreground-200/10 bg-background-100/60 p-4">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-foreground-200">
                      v{isCurrentVersion ? currentVersion : v.version}
                    </span>
                    <PackageBadge
                      label={v.status}
                      variant={isCurrentVersion ? "supplier" : "default"}
                    />
                    {v.schemaImpact !== "None" && (
                      <span className="text-[10px] text-foreground-500">
                        · Schema: {v.schemaImpact}
                      </span>
                    )}
                  </div>
                  <p className="mb-1.5 text-xs text-foreground-400 leading-relaxed">{v.changeSummary}</p>
                  <span className="text-[10px] text-foreground-500">
                    Released {new Date(v.releaseDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}