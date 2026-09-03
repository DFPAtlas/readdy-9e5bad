import { useNavigate } from "react-router-dom";
import { getCompliancePage } from "@/data/compliancePages";

interface Props {
  relatedSlugs: string[];
}

export default function RelatedCompliancePages({ relatedSlugs }: Props) {
  const navigate = useNavigate();
  const related = relatedSlugs.map((s) => getCompliancePage(s)).filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="bg-background-50" id="related" aria-labelledby="rel-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="rel-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Related pages
        </h2>
        <p className="mb-8 text-sm text-foreground-400">Explore other areas of the DataHarbour governance framework.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((page) => (
            <button
              key={page!.slug}
              type="button"
              onClick={() => navigate(`/compliance/${page!.slug}`)}
              className="group rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 text-left transition hover:border-accent-500/20 cursor-pointer"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent-500/10">
                <i className="ri-arrow-right-up-line text-sm text-accent-400" aria-hidden="true" />
              </div>
              <h3 className="mb-1 text-sm font-medium text-foreground-100">{page!.title}</h3>
              <p className="mb-3 text-xs leading-relaxed text-foreground-400 line-clamp-2">{page!.summary}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-400 group-hover:underline">
                Explore
                <i className="ri-arrow-right-line text-[10px]" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}