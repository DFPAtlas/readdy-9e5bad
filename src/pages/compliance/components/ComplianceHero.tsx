import { useNavigate } from "react-router-dom";

export default function ComplianceHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-accent-400 uppercase">Trust and Governance</p>
          <h1
            className="mb-4 text-3xl text-foreground-100 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Controlled access starts with a clear purpose
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-foreground-400 md:text-base">
            Explore how DataHarbour plans to review suppliers, verify buyers, document provenance, restrict use and support accountable data delivery across the marketplace.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("trust-model");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              <i className="ri-shield-check-line" aria-hidden="true" />
              Explore the trust framework
            </button>
            <button
              type="button"
              onClick={() => navigate("/compliance/prohibited-uses")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-6 py-3 text-sm text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
            >
              <i className="ri-forbid-line" aria-hidden="true" />
              Review prohibited uses
            </button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-5 md:mt-12">
          {[
            { icon: "ri-user-star-line", label: "Buyer verification" },
            { icon: "ri-shield-user-line", label: "Supplier due diligence" },
            { icon: "ri-draft-line", label: "Provenance review" },
            { icon: "ri-lock-line", label: "Usage controls" },
            { icon: "ri-file-list-3-line", label: "Auditability" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-foreground-200/10 bg-background-50/60 px-3 py-3 text-center"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/10">
                <i className={`${item.icon} text-sm text-accent-400`} aria-hidden="true" />
              </div>
              <span className="text-[11px] text-foreground-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}