import { useNavigate } from "react-router-dom";
import type { Solution } from "@/data/solutions";

interface SolutionHeroProps {
  solution: Solution;
}

export default function SolutionHero({ solution }: SolutionHeroProps) {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary-400 uppercase">
          {solution.eyebrow}
        </p>
        <h1
          className="mb-4 text-3xl text-foreground-50 md:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {solution.name}
        </h1>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-foreground-400 md:text-base">
          {solution.heroDescription}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {solution.relevantCategories.map((cat) => (
            <span key={cat} className="inline-block rounded-full border border-foreground-200/20 bg-background-200/40 px-3 py-1 text-[11px] text-foreground-300">
              {cat}
            </span>
          ))}
        </div>

        <div className="mb-6 rounded-lg border border-accent-400/20 bg-accent-500/5 px-4 py-3">
          <div className="flex items-start gap-2.5">
            <i className="ri-information-line mt-0.5 text-sm text-accent-400 flex-shrink-0" aria-hidden="true" />
            <p className="text-xs text-foreground-400 leading-relaxed">
              Products shown for this solution are illustrative. Availability and permitted use depend on supplier terms, buyer verification and applicable review.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-5 py-2.5 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
          >
            <i className="ri-store-2-line" aria-hidden="true" />
            Browse Marketplace
          </button>
          <a
            href={`/contact?type=buyer&topic=solution&solution=${solution.slug}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
          >
            <i className="ri-mail-line" aria-hidden="true" />
            Contact DataHarbour
          </a>
        </div>
      </div>
    </section>
  );
}