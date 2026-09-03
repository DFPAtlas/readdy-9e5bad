import { useState, useCallback } from "react";
import type { SupplierApplicationDraft, RefreshFrequency, QualityCheckItem } from "@/data/supplierApplicationTypes";
import { REFRESH_LABELS } from "@/data/supplierApplicationTypes";
import { createEmptyQualityCheck } from "@/data/supplierApplicationDefaults";

interface Stage7Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const refreshOpts: RefreshFrequency[] = ["real_time", "hourly", "daily", "weekly", "monthly", "quarterly", "annually", "ad_hoc", "one_off", "other"];

const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

export default function Stage7Quality({ draft, setDraft }: Stage7Props) {
  const q = draft.quality;
  const [editingCheck, setEditingCheck] = useState<QualityCheckItem | null>(null);
  const [showDeleteCheck, setShowDeleteCheck] = useState<string | null>(null);

  const update = (field: keyof typeof q, value: unknown) => {
    setDraft({ ...draft, quality: { ...q, [field]: value } });
  };

  const addCheck = useCallback(() => {
    const item = createEmptyQualityCheck();
    setDraft({ ...draft, quality: { ...q, qualityChecks: [...q.qualityChecks, item] } });
    setEditingCheck(item);
  }, [draft, setDraft, q]);

  const saveCheck = useCallback(
    (item: QualityCheckItem) => {
      const idx = q.qualityChecks.findIndex((c) => c.id === item.id);
      const updated = [...q.qualityChecks];
      if (idx >= 0) updated[idx] = item;
      else updated.push(item);
      setDraft({ ...draft, quality: { ...q, qualityChecks: updated } });
      setEditingCheck(null);
    },
    [draft, setDraft, q],
  );

  const deleteCheck = useCallback(
    (id: string) => {
      setDraft({ ...draft, quality: { ...q, qualityChecks: q.qualityChecks.filter((c) => c.id !== id) } });
      setShowDeleteCheck(null);
      if (editingCheck?.id === id) setEditingCheck(null);
    },
    [draft, setDraft, q, editingCheck],
  );

  const updateEditingCheck = (field: keyof QualityCheckItem, value: string) => {
    if (!editingCheck) return;
    setEditingCheck({ ...editingCheck, [field]: value });
  };

  return (
    <div className="space-y-5">
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Refresh and update</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-refreshFrequency">
            <label htmlFor="refreshFrequency" className={labelCls}>Refresh frequency <span className="text-[#ff2e88]">*</span></label>
            <select id="refreshFrequency" value={q.refreshFrequency} onChange={(e) => update("refreshFrequency", e.target.value)} className={inputCls}>
              <option value="">Select frequency</option>
              {refreshOpts.map((r) => (<option key={r} value={r}>{REFRESH_LABELS[r]}</option>))}
            </select>
          </div>
          <div id="field-updateMethod">
            <label htmlFor="updateMethod" className={labelCls}>Update method <span className="text-[#ff2e88]">*</span></label>
            <input id="updateMethod" type="text" value={q.updateMethod} onChange={(e) => update("updateMethod", e.target.value)} className={inputCls} placeholder="e.g. Full refresh weekly, delta daily" />
          </div>
          <div>
            <label htmlFor="typicalLatency" className={labelCls}>Typical latency</label>
            <input id="typicalLatency" type="text" value={q.typicalLatency} onChange={(e) => update("typicalLatency", e.target.value)} className={inputCls} placeholder="e.g. 24 hours" />
          </div>
          <div>
            <label htmlFor="buyerNotification" className={labelCls}>Buyer notification method</label>
            <input id="buyerNotification" type="text" value={q.buyerNotification} onChange={(e) => update("buyerNotification", e.target.value)} className={inputCls} placeholder="e.g. Email + changelog" />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Validation and completeness</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-completenessMethod">
            <label htmlFor="completenessMethod" className={labelCls}>Completeness and validation method <span className="text-[#ff2e88]">*</span></label>
            <textarea id="completenessMethod" rows={2} value={q.completenessMethod} onChange={(e) => update("completenessMethod", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="duplicateHandling" className={labelCls}>Duplicate handling</label>
            <textarea id="duplicateHandling" rows={2} value={q.duplicateHandling} onChange={(e) => update("duplicateHandling", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="missingValueTreatment" className={labelCls}>Missing-value treatment</label>
            <textarea id="missingValueTreatment" rows={2} value={q.missingValueTreatment} onChange={(e) => update("missingValueTreatment", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="errorCorrectionProcess" className={labelCls}>Error-correction process</label>
            <textarea id="errorCorrectionProcess" rows={2} value={q.errorCorrectionProcess} onChange={(e) => update("errorCorrectionProcess", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
        </div>
      </fieldset>

      {/* Repeatable quality checks */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Quality checks</legend>
        <p className="mb-4 text-[11px] leading-relaxed text-foreground-500">Add quality-control checks with name, frequency, method, failure action and owner.</p>

        <div className="space-y-3">
          {q.qualityChecks.map((qc, i) => (
            <div key={qc.id} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground-200 truncate">{qc.name || `Check ${i + 1}`}</p>
                  <p className="mt-0.5 text-[11px] text-foreground-500">{qc.frequency || "No frequency"} {qc.owner ? `— ${qc.owner}` : ""}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" onClick={() => setEditingCheck({ ...qc })} className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground-200/15 text-foreground-500 transition hover:border-foreground-200/30 hover:text-foreground-200 cursor-pointer" aria-label={`Edit ${qc.name || `Check ${i + 1}`}`}>
                    <i className="ri-pencil-line text-xs" />
                  </button>
                  <button type="button" onClick={() => setShowDeleteCheck(qc.id)} className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ff2e88]/20 text-foreground-500 transition hover:border-[#ff2e88]/40 hover:text-[#ff2e88] cursor-pointer" aria-label={`Delete ${qc.name || `Check ${i + 1}`}`}>
                    <i className="ri-delete-bin-line text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {q.qualityChecks.length === 0 && (
            <p className="rounded-lg border border-dashed border-foreground-200/15 bg-background-50 px-4 py-6 text-center text-xs text-foreground-500">
              No quality checks added yet.
            </p>
          )}
        </div>
        <button type="button" onClick={addCheck} className="mt-4 flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
          <i className="ri-add-line" /> Add quality check
        </button>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Ongoing management</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="coverageMeasurement" className={labelCls}>Coverage measurement</label>
            <input id="coverageMeasurement" type="text" value={q.coverageMeasurement} onChange={(e) => update("coverageMeasurement", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="qualityMonitoring" className={labelCls}>Quality monitoring</label>
            <input id="qualityMonitoring" type="text" value={q.qualityMonitoring} onChange={(e) => update("qualityMonitoring", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="schemaChangeProcess" className={labelCls}>Schema-change process</label>
            <input id="schemaChangeProcess" type="text" value={q.schemaChangeProcess} onChange={(e) => update("schemaChangeProcess", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="versioningProcess" className={labelCls}>Versioning and deprecation notice</label>
            <input id="versioningProcess" type="text" value={q.versioningProcess} onChange={(e) => update("versioningProcess", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="deprecationNotice" className={labelCls}>Deprecation notice period</label>
            <input id="deprecationNotice" type="text" value={q.deprecationNotice} onChange={(e) => update("deprecationNotice", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="knownLimitations" className={labelCls}>Known limitations</label>
            <textarea id="knownLimitations" rows={2} value={q.knownLimitations} onChange={(e) => update("knownLimitations", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="serviceTargets" className={labelCls}>Service targets</label>
            <input id="serviceTargets" type="text" value={q.serviceTargets} onChange={(e) => update("serviceTargets", e.target.value)} className={inputCls} placeholder="e.g. 99.5% uptime" />
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-md bg-background-50 p-4">
          {[
            { field: "sampleAvailable" as const, label: "Sample available" },
            { field: "dataDictionaryAvailable" as const, label: "Data dictionary available" },
            { field: "testEnvironmentAvailable" as const, label: "Test environment available" },
          ].map(({ field, label }) => (
            <label key={field} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q[field]} onChange={(e) => update(field, e.target.checked)} className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500" />
              <span className="text-xs text-foreground-400">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Quality check editor modal */}
      {editingCheck && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 pt-16">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingCheck(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-label={editingCheck.name ? `Edit ${editingCheck.name}` : "Add quality check"}>
            <h3 className="mb-5 text-sm font-semibold text-foreground-200">{editingCheck.name ? `Edit: ${editingCheck.name}` : "Add quality check"}</h3>
            <div className="space-y-4">
              {(["name", "frequency", "method", "failureAction", "owner"] as (keyof QualityCheckItem)[]).map((f) => (
                <div key={f}>
                  <label className={labelCls}>{f === "name" ? "Name" : f === "frequency" ? "Frequency" : f === "method" ? "Method" : f === "failureAction" ? "Failure action" : "Owner"}</label>
                  <input type="text" value={editingCheck[f]} onChange={(e) => updateEditingCheck(f, e.target.value)} className={inputCls} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2.5">
              <button type="button" onClick={() => setEditingCheck(null)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={() => saveCheck(editingCheck)} className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-3 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">Save check</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteCheck && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteCheck(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
            <p className="text-sm font-semibold text-foreground-200 mb-2">Delete this quality check?</p>
            <p className="text-xs text-foreground-500">This action cannot be undone.</p>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setShowDeleteCheck(null)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={() => deleteCheck(showDeleteCheck)} className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-3 py-2 text-xs font-medium text-white cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}