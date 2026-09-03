import { useNavigate } from "react-router-dom";

export default function FinalCta() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center rounded-lg border border-foreground-200/10 bg-background-100/50 px-6 py-14 text-center backdrop-blur-sm md:px-12 md:py-20">
          <h2
            className="max-w-2xl text-3xl text-foreground-50 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Find trusted data without losing sight of responsibility.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground-400">
            Explore structured intelligence products with clearer sourcing, controlled access and package-specific usage rules.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Explore Data Packages
            </button>
            <button
              type="button"
              onClick={() => navigate("/suppliers")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              Apply as a Supplier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}