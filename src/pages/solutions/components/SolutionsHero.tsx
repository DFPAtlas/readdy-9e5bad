import { useNavigate } from "react-router-dom";

export default function SolutionsHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-foreground-200/10 bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            Solutions by Business Need
          </p>
          <h1
            className="mb-5 text-3xl text-foreground-50 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Turn governed data into practical business intelligence
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-foreground-400 md:text-base">
            Explore how trusted data products, APIs, feeds and research may support verification, planning, analysis and responsible commercial decision-making.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#solution-finder"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Explore solutions
              <i className="ri-arrow-down-line" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              Browse the marketplace
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: "ri-lock-line", label: "Controlled access" },
              { icon: "ri-check-double-line", label: "Reviewed provenance" },
              { icon: "ri-file-text-line", label: "Declared purpose" },
              { icon: "ri-shield-check-line", label: "Responsible use" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-500/10">
                  <i className={`${item.icon} text-[11px] text-accent-400`} aria-hidden="true" />
                </div>
                <span className="text-[11px] text-foreground-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}