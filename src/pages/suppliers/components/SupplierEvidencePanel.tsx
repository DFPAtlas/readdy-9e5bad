import { useNavigate } from "react-router-dom";

export default function SupplierEvidencePanel() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-center text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            Evidence before publication
          </p>
          <h2 className="text-center text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Provenance isn&apos;t optional — it&apos;s the price of entry
          </h2>
          <div className="mt-10 rounded-lg border border-foreground-200/10 bg-background-50 p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Original data source or sources",
                "Collection or acquisition method",
                "Licensing rights and permissions",
                "Transformations and aggregations applied",
                "Geographic scope and coverage",
                "Refresh process and frequency",
                "Sub-supplier and third-party data relationships",
                "Usage restrictions and permitted-use conditions",
                "Known limitations and quality caveats",
                "Data-subject support arrangements where relevant",
                "Evidence-change notification process",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/10 mt-0.5">
                    <i className="ri-check-line text-xs text-primary-400" />
                  </div>
                  <span className="text-xs text-foreground-400">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-foreground-200/10 pt-6">
              <p className="text-xs leading-relaxed text-foreground-500 max-w-lg">
                DataHarbour review does not remove the supplier&apos;s responsibility for the accuracy of its declarations, product rights or ongoing obligations.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/compliance/provenance")}
                  className="whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-4 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer"
                >
                  Provenance standards
                  <i className="ri-arrow-right-line ml-1.5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/compliance/supplier-standards")}
                  className="whitespace-nowrap rounded-lg border border-foreground-300/30 bg-transparent px-4 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200 hover:text-foreground-100 cursor-pointer"
                >
                  Supplier standards
                  <i className="ri-arrow-right-line ml-1.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}