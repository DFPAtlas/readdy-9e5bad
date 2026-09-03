import { useNavigate } from "react-router-dom";
import { solutions } from "@/data/solutions";

interface RelatedSolutionsProps {
  relatedSlugs: string[];
  currentSlug: string;
}

export default function RelatedSolutions({ relatedSlugs, currentSlug }: RelatedSolutionsProps) {
  const navigate = useNavigate();

  const related = solutions
    .filter((s) => relatedSlugs.includes(s.slug) && s.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-background-50" id="related" aria-labelledby="related-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="related-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Related solutions
        </h2>
        <p className="mb-8 text-sm text-foreground-400">Other solution areas that may complement your workflow.</p>

        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((sol) => (
            <button
              key={sol.slug}
              type="button"
              onClick={() => navigate(`/solutions/${sol.slug}`)}
              className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 text-left transition hover:border-foreground-200/20 cursor-pointer"
            >
              <p className="mb-1 text-[10px] font-semibold tracking-[0.15em] text-foreground-500 uppercase">{sol.eyebrow}</p>
              <h3 className="mb-2 text-sm font-semibold text-foreground-200">{sol.name}</h3>
              <p className="text-[11px] leading-relaxed text-foreground-400 line-clamp-2">{sol.shortDescription}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}