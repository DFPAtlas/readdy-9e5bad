import { useNavigate } from "react-router-dom";
import { featuredGuides } from "@/data/resources";

export default function FeaturedGuides() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-2xl text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Featured guides
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <button
              key={guide.slug}
              type="button"
              onClick={() => navigate(`/resources/${guide.slug}`)}
              className="flex items-start gap-4 rounded-lg border border-foreground-200/10 bg-background-100 p-5 text-left transition hover:border-primary-400/30 cursor-pointer"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-500/10">
                <i className={`${guide.iconClass} text-sm text-primary-400`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground-200">{guide.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-foreground-500">{guide.description}</p>
                <span className="inline-block mt-2 text-[11px] text-foreground-600">{guide.audience}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}