import { useNavigate } from "react-router-dom";

export default function BuyerSupplierOverview() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50" id="buyer-supplier" aria-labelledby="bs-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="bs-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Buyers and suppliers
        </h2>
        <p className="mb-10 text-sm text-foreground-400 max-w-2xl">
          Every participant in the DataHarbour marketplace has defined responsibilities. Buyers must be verified and declare their purpose. Suppliers must document provenance and rights.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Buyer panel */}
          <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10">
              <i className="ri-user-star-line text-lg text-primary-400" aria-hidden="true" />
            </div>
            <h3 className="mb-1 text-lg text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              For buyers
            </h3>
            <p className="mb-5 text-sm text-foreground-400">
              Organisation verification, intended-use declaration, security expectations and ongoing accountability.
            </p>
            <ul className="mb-6 space-y-2">
              {[
                "Organisation verification",
                "Authorised representative",
                "Intended-use declaration",
                "Security expectations",
                "Licence acceptance",
                "Retention and sharing commitments",
                "Periodic review where required",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground-300">
                  <i className="ri-check-line mt-0.5 shrink-0 text-xs text-primary-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate("/compliance/buyer-standards")}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
            >
              Buyer Standards
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </button>
          </div>

          {/* Supplier panel */}
          <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500/10">
              <i className="ri-shield-user-line text-lg text-secondary-400" aria-hidden="true" />
            </div>
            <h3 className="mb-1 text-lg text-foreground-50" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              For suppliers
            </h3>
            <p className="mb-5 text-sm text-foreground-400">
              Company verification, rights and licensing evidence, provenance documentation and quality-assurance processes.
            </p>
            <ul className="mb-6 space-y-2">
              {[
                "Company verification",
                "Rights and licensing evidence",
                "Source documentation",
                "Collection or acquisition explanation",
                "Quality and update processes",
                "Security and incident arrangements",
                "Package-specific restrictions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground-300">
                  <i className="ri-check-line mt-0.5 shrink-0 text-xs text-secondary-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/compliance/supplier-standards")}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
              >
                Supplier Standards
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/suppliers")}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2 text-xs text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
              >
                Supplier Information
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}