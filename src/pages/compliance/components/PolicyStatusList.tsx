import { useNavigate } from "react-router-dom";
import { policyStatuses } from "@/data/compliancePages";

export default function PolicyStatusList() {
  const navigate = useNavigate();

  return (
    <section className="bg-background-50" id="documents" aria-labelledby="docs-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="docs-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Document and policy status
        </h2>
        <p className="mb-10 text-sm text-foreground-400 max-w-2xl">
          DataHarbour&apos;s governance documents are being developed alongside the platform. This page shows which documents are available, which are planned and where to find them.
        </p>

        <div className="overflow-hidden rounded-lg border border-foreground-200/10">
          <div className="hidden sm:grid sm:grid-cols-3 border-b border-foreground-200/10 bg-background-100/60 px-5 py-3">
            <span className="text-[11px] font-semibold tracking-wide text-foreground-400 uppercase">Document</span>
            <span className="text-[11px] font-semibold tracking-wide text-foreground-400 uppercase">Status</span>
            <span className="text-[11px] font-semibold tracking-wide text-foreground-400 uppercase">Action</span>
          </div>

          {policyStatuses.map((doc) => (
            <div
              key={doc.name}
              className="flex flex-col gap-2 border-b border-foreground-200/10 px-5 py-3.5 sm:grid sm:grid-cols-3 sm:gap-0 last:border-b-0"
            >
              <span className="text-sm text-foreground-200">{doc.name}</span>
              <span>
                {doc.status === "Available" ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent-500/20 bg-accent-500/10 px-2 py-0.5 text-[10px] font-medium text-accent-400">
                    <i className="ri-check-line text-[9px]" aria-hidden="true" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-secondary-500/20 bg-secondary-500/10 px-2 py-0.5 text-[10px] font-medium text-secondary-400">
                    <i className="ri-time-line text-[9px]" aria-hidden="true" />
                    Planned
                  </span>
                )}
              </span>
              <span>
                {doc.route ? (
                  <button
                    type="button"
                    onClick={() => navigate(doc.route)}
                    className="inline-flex items-center gap-1 text-xs text-accent-400 hover:underline cursor-pointer"
                  >
                    View
                    <i className="ri-arrow-right-up-line text-[10px]" aria-hidden="true" />
                  </button>
                ) : (
                  <span className="text-xs text-foreground-500">Not yet available</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}