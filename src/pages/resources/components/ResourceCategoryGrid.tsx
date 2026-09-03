import { useNavigate } from "react-router-dom";
import { resourceCategories } from "@/data/resources";

const statusColors: Record<string, string> = {
  "Demonstration documentation": "bg-foreground-200/10 text-foreground-400",
  Planned: "bg-secondary-100 text-secondary-700",
  Draft: "bg-foreground-200/10 text-foreground-500",
  "Concept preview": "bg-accent-100 text-accent-700",
};

export default function ResourceCategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Browse by topic
          </h2>
          <p className="mt-3 text-sm text-foreground-400">
            Explore demonstration documentation organised by category.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resourceCategories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => navigate(`/resources/${cat.slug}`)}
              className="flex flex-col rounded-lg border border-foreground-200/10 bg-background-100 p-5 text-left transition hover:border-primary-400/30 hover:bg-background-100/80 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm font-semibold text-foreground-200">{cat.title}</h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${statusColors[cat.status] || "bg-foreground-200/10 text-foreground-500"}`}>
                  {cat.status}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-foreground-500 flex-1">{cat.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-foreground-600">{cat.audience}</span>
                <i className="ri-arrow-right-line text-xs text-foreground-500" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}