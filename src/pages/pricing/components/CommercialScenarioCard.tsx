import { useState } from "react";
import type { CommercialScenario } from "@/data/pricing";

interface CommercialScenarioCardProps {
  scenario: CommercialScenario;
  index: number;
}

export default function CommercialScenarioCard({ scenario, index }: CommercialScenarioCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-50 transition hover:border-foreground-200/20">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left cursor-pointer"
        aria-expanded={expanded}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100/60 text-xs font-semibold text-accent-700">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground-200">{scenario.title}</h4>
          <p className="mt-0.5 text-xs leading-relaxed text-foreground-500 line-clamp-2">{scenario.need}</p>
        </div>
        <i
          className={`ri-arrow-down-s-line shrink-0 text-sm text-foreground-500 transition ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="border-t border-foreground-200/10 px-5 pb-5 pt-4 space-y-4">
          <div>
            <p className="mb-2 text-[11px] font-medium text-foreground-300">Organisation need</p>
            <p className="text-xs leading-relaxed text-foreground-400">{scenario.need}</p>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-medium text-foreground-300">Potential pricing layers</p>
            <ul className="space-y-1.5">
              {scenario.pricingLayers.map((layer) => (
                <li key={layer} className="flex items-start gap-2 text-xs text-foreground-400">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground-500" />
                  {layer}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-medium text-foreground-300">What remains subject to review</p>
            <ul className="space-y-1.5">
              {scenario.subjectToReview.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-foreground-500">
                  <i className="ri-information-line mt-0.5 shrink-0 text-xs" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-foreground-200/10 bg-background-100/40 px-3.5 py-2.5">
            <p className="text-[11px] leading-relaxed text-foreground-500">{scenario.whyVaries}</p>
          </div>
        </div>
      )}
    </div>
  );
}