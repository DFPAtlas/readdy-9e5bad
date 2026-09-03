import { useNavigate } from "react-router-dom";
import type { Solution } from "@/data/solutions";

interface SolutionCardProps {
  solution: Solution;
  isHighlighted: boolean;
  cardRef?: (el: HTMLDivElement | null) => void;
}

export default function SolutionCard({ solution, isHighlighted, cardRef }: SolutionCardProps) {
  const navigate = useNavigate();

  return (
    <div
      ref={cardRef}
      className={`flex flex-col rounded-lg border p-5 transition ${
        isHighlighted
          ? "border-accent-400/40 bg-accent-500/5 ring-1 ring-accent-400/20"
          : "border-foreground-200/10 bg-background-100/60 hover:border-foreground-200/20"
      }`}
      tabIndex={isHighlighted ? 0 : -1}
    >
      <p className="mb-1 text-[10px] font-semibold tracking-[0.15em] text-foreground-500 uppercase">{solution.eyebrow}</p>
      <h3 className="mb-2 text-base font-semibold text-foreground-50">{solution.name}</h3>
      <p className="mb-4 flex-1 text-xs leading-relaxed text-foreground-400">{solution.shortDescription}</p>

      {/* Supported outcomes */}
      <div className="mb-4 space-y-1.5">
        <p className="text-[10px] font-medium text-foreground-500 uppercase tracking-wide">Supported outcomes</p>
        {solution.supportedOutcomes.slice(0, 3).map((outcome, i) => (
          <div key={i} className="flex items-start gap-2">
            <i className="ri-check-line mt-0.5 text-[11px] text-accent-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] leading-relaxed text-foreground-400">{outcome}</span>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {solution.relevantCategories.map((cat) => (
          <span key={cat} className="inline-block rounded bg-background-200/60 px-2 py-0.5 text-[10px] text-foreground-400">
            {cat}
          </span>
        ))}
      </div>

      {/* Users */}
      <p className="mb-4 text-[10px] text-foreground-500">
        <span className="text-foreground-400">For: </span>
        {solution.typicalUsers.slice(0, 3).join(", ")}
        {solution.typicalUsers.length > 3 ? ` +${solution.typicalUsers.length - 3} more` : ""}
      </p>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate(`/solutions/${solution.slug}`)}
          className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          Explore Solution
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </button>
        {solution.featuredPackageSlugs.length > 0 && (
          <button
            type="button"
            onClick={() => navigate(`/marketplace?categories=${encodeURIComponent(solution.relevantCategories.join(","))}`)}
            className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
          >
            <i className="ri-stack-line" aria-hidden="true" />
            Relevant packages
          </button>
        )}
      </div>
    </div>
  );
}