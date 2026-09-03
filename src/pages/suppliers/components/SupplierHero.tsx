import { useNavigate } from "react-router-dom";

export default function SupplierHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-6 md:pb-20 md:pt-18">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            Supply Trusted Data Products
          </p>
          <h1 className="text-3xl text-foreground-50 md:text-4xl lg:text-5xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Bring governed data products to verified business buyers
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-foreground-400 md:text-base">
            DataHarbour is being designed for suppliers that can explain where their data comes from, demonstrate their rights, maintain quality and support controlled commercial use.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigate("/suppliers/apply")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
            >
              Start a supplier application
              <i className="ri-arrow-right-line" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/suppliers/standards")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 focus:outline-none focus:ring-2 focus:ring-foreground-300/20 cursor-pointer"
            >
              Review supplier standards
            </button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-foreground-500">
            <span className="flex items-center gap-1.5">
              <i className="ri-file-search-line text-sm text-foreground-400" />
              Provenance evidence
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-user-search-line text-sm text-foreground-400" />
              Human review
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-lock-line text-sm text-foreground-400" />
              Controlled access
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-git-branch-line text-sm text-foreground-400" />
              Version management
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-bar-chart-line text-sm text-foreground-400" />
              Commercial reporting
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}