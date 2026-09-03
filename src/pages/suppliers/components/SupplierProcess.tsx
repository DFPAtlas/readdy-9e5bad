import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/base/SectionHeading";
import { supplierProcessSteps, supplierProcessOutcomes } from "@/data/supplierContent";

export default function SupplierProcess() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="How it works"
          heading="From application to published product"
          supporting="The supplier journey is designed to be thorough but clear. Every stage exists to protect the integrity of the marketplace and the confidence of buyers."
        />
        <div className="mt-12 space-y-6">
          {supplierProcessSteps.map((s) => (
            <div
              key={s.step}
              className="flex gap-4 rounded-lg border border-foreground-200/10 bg-background-100 p-5 md:p-6"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10">
                <span className="text-sm font-semibold text-primary-400">{s.step}</span>
              </div>
              <div className="min-w-0 space-y-3">
                <h3 className="text-sm font-semibold text-foreground-200">{s.title}</h3>
                <p className="text-xs leading-relaxed text-foreground-500">{s.description}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Responsible</span>
                    <p className="mt-1 text-xs text-foreground-500">{s.whoIsResponsible}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Possible outcomes</span>
                    <ul className="mt-1 space-y-0.5">
                      {s.possibleOutcomes.map((o) => (
                        <li key={o} className="text-xs text-foreground-500 flex items-start gap-1.5">
                          <i className="ri-arrow-right-s-line mt-0.5 shrink-0 text-[10px] text-foreground-600" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">Limitation</span>
                    <p className="mt-1 text-xs text-foreground-500">{s.limitation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-semibold text-foreground-200 text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Possible review outcomes
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {supplierProcessOutcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="rounded-lg border border-foreground-200/10 bg-background-100 p-4"
              >
                <h4 className="text-sm font-semibold text-foreground-200">{outcome.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-500">{outcome.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-foreground-500">
            All publication requires DataHarbour approval. No product is listed without completing the full review process.
          </p>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => navigate("/suppliers/apply")}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 cursor-pointer"
          >
            Start a supplier application
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}