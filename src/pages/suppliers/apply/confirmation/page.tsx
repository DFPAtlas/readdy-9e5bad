import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "@/components/feature/PublicHeader";
import PublicFooter from "@/components/feature/PublicFooter";
import type { SupplierApplicationDraft } from "@/data/supplierApplicationTypes";
import { LOCAL_STATUS_LABELS } from "@/data/supplierApplicationTypes";
import { loadDraft, saveDraft, createRevisedDraft } from "@/utils/applicationStorage";
import { formatDate } from "@/data/supplierApplicationDefaults";

export default function ApplicationConfirmation() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SupplierApplicationDraft | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = loadDraft();
    if (!loaded || loaded.metadata.localStatus !== "demonstration_submitted") {
      navigate("/suppliers/apply");
      return;
    }
    setDraft(loaded);
    setLoading(false);
    // Scroll to top
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleCreateRevised = () => {
    if (!draft) return;
    const revised = createRevisedDraft(draft);
    saveDraft(revised);
    navigate("/suppliers/apply");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !draft) {
    return (
      <>
        <PublicHeader />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-foreground-500">Loading...</p>
        </div>
      </>
    );
  }

  const m = draft.metadata;
  const o = draft.organisation;
  const p = draft.product;

  return (
    <>
      <PublicHeader />

      {/* Breadcrumb */}
      <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs">
            <li><button type="button" onClick={() => navigate("/suppliers")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Suppliers</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li><button type="button" onClick={() => navigate("/suppliers/apply")} className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Apply</button></li>
            <li className="text-foreground-600" aria-hidden="true">/</li>
            <li className="text-foreground-300">Confirmation</li>
          </ol>
        </div>
      </nav>

      {/* Confirmation content */}
      <section className="bg-background-50">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 md:px-6 md:pt-18 md:pb-18">
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10 border border-primary-400/20">
                <i className="ri-check-line text-3xl text-primary-400" />
              </div>
            </div>

            <h1 className="text-3xl text-foreground-50 md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
              Demonstration submission created
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-foreground-400">
              Your supplier application demonstration has been saved as a local record. DataHarbour has not received this application.
            </p>

            {/* Reference card */}
            <div className="mt-8 rounded-xl border border-primary-400/20 bg-primary-500/5 p-6 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-400">Demonstration reference</p>
              <p className="mt-2 text-2xl font-mono text-foreground-100 tracking-wider">{m.demonstrationReference}</p>
              <p className="mt-1 text-[11px] text-foreground-500">Created: {formatDate(m.submissionDate)}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Organisation</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{o.legalName || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Product</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{p.productName || "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Local status</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground-200">{LOCAL_STATUS_LABELS[m.localStatus]}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-500">Application ID</p>
                  <p className="mt-0.5 text-xs font-mono text-foreground-400">{m.localAppId}</p>
                </div>
              </div>
            </div>

            {/* Important notice */}
            <div className="mt-8 rounded-lg border border-[#ff2e88]/20 bg-[#ff2e88]/5 p-5 text-left">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff2e88]/10 mt-0.5">
                  <i className="ri-information-line text-sm text-[#ff2e88]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-200">Important: demonstration only</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground-500">
                    This reference exists only in this browser. DataHarbour has not received this application. No review process has been triggered, no reviewer has been assigned, and no response should be expected.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-500">
                    In a live environment, DataHarbour would acknowledge receipt, assign a reference, and begin a human review against published supplier standards. Submission does not guarantee acceptance, publication, buyer access or revenue.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={() => navigate("/suppliers/application-status")} className="whitespace-nowrap rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                View demonstration status
              </button>
              <button type="button" onClick={handlePrint} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-6 py-3 text-sm font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
                Print application
              </button>
              <button type="button" onClick={handleCreateRevised} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-6 py-3 text-sm font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
                Create revised draft
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button type="button" onClick={() => navigate("/suppliers")} className="text-xs text-foreground-500 underline transition hover:text-foreground-300 cursor-pointer">Return to Suppliers</button>
              <button type="button" onClick={() => navigate("/contact?type=supplier")} className="text-xs text-foreground-500 underline transition hover:text-foreground-300 cursor-pointer">Contact supplier team</button>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  );
}