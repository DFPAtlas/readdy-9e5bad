import { useState, useCallback } from "react";
import type { SupplierApplicationDraft, SourceCategory, RefreshFrequency, SourceItem } from "@/data/supplierApplicationTypes";
import { SOURCE_CATEGORY_LABELS, REFRESH_LABELS } from "@/data/supplierApplicationTypes";
import { createEmptySource } from "@/data/supplierApplicationDefaults";

interface Stage5Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const sourceCats: SourceCategory[] = ["first_party", "public", "licensed_third_party", "derived", "modelled", "aggregated", "mixed"];
const refreshOpts: RefreshFrequency[] = ["real_time", "hourly", "daily", "weekly", "monthly", "quarterly", "annually", "ad_hoc", "one_off", "other"];

const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

export default function Stage5Provenance({ draft, setDraft }: Stage5Props) {
  const p = draft.provenance;
  const [editingSource, setEditingSource] = useState<SourceItem | null>(null);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const update = (field: keyof typeof p, value: unknown) => {
    setDraft({ ...draft, provenance: { ...p, [field]: value } });
  };

  const toggleSourceCat = (cat: SourceCategory) => {
    const current = [...p.sourceCategories];
    const idx = current.indexOf(cat);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(cat);
    update("sourceCategories", current);
  };

  const addSource = useCallback(() => {
    const newSrc = createEmptySource();
    setDraft({
      ...draft,
      provenance: { ...p, sources: [...p.sources, newSrc] },
    });
    setEditingSource(newSrc);
  }, [draft, setDraft, p]);

  const saveSource = useCallback(
    (src: SourceItem) => {
      const idx = p.sources.findIndex((s) => s.id === src.id);
      const updated = [...p.sources];
      if (idx >= 0) {
        updated[idx] = src;
      } else {
        updated.push(src);
      }
      setDraft({ ...draft, provenance: { ...p, sources: updated } });
      setEditingSource(null);
      setIsAddingSource(false);
    },
    [draft, setDraft, p],
  );

  const deleteSource = useCallback(
    (id: string) => {
      setDraft({
        ...draft,
        provenance: { ...p, sources: p.sources.filter((s) => s.id !== id) },
      });
      setShowDeleteConfirm(null);
      if (editingSource?.id === id) {
        setEditingSource(null);
        setIsAddingSource(false);
      }
    },
    [draft, setDraft, p, editingSource],
  );

  const updateEditingSource = (field: keyof SourceItem, value: string) => {
    if (!editingSource) return;
    setEditingSource({ ...editingSource, [field]: value });
  };

  return (
    <div className="space-y-5">
      {/* Source categories */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Source categories</legend>
        <p className="mb-3 text-[11px] leading-relaxed text-foreground-500">Select all categories that apply to your product&apos;s data sources.</p>
        <div id="field-sourceCategories" className="flex flex-wrap gap-2">
          {sourceCats.map((cat) => {
            const selected = p.sourceCategories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleSourceCat(cat)}
                className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  selected
                    ? "border-primary-400/40 bg-primary-500/10 text-primary-400"
                    : "border-foreground-200/15 bg-background-50 text-foreground-500 hover:border-foreground-200/30"
                }`}
              >
                {SOURCE_CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Source overview */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Source overview</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="sourceDescription" className={labelCls}>Source description</label>
            <textarea id="sourceDescription" rows={3} value={p.sourceDescription} onChange={(e) => update("sourceDescription", e.target.value)} className={`${inputCls} resize-y`} placeholder="Describe the overall data sources..." />
          </div>
          <div id="field-collectionMethod">
            <label htmlFor="collectionMethod" className={labelCls}>Collection or acquisition method <span className="text-[#ff2e88]">*</span></label>
            <input id="collectionMethod" type="text" value={p.collectionMethod} onChange={(e) => update("collectionMethod", e.target.value)} className={inputCls} />
          </div>
          <div id="field-geographicOrigin">
            <label htmlFor="geographicOrigin" className={labelCls}>Geographic origin <span className="text-[#ff2e88]">*</span></label>
            <input id="geographicOrigin" type="text" value={p.geographicOrigin} onChange={(e) => update("geographicOrigin", e.target.value)} className={inputCls} placeholder="e.g. United Kingdom" />
          </div>
          <div>
            <label htmlFor="historicalPeriod" className={labelCls}>Historical period</label>
            <input id="historicalPeriod" type="text" value={p.historicalPeriod} onChange={(e) => update("historicalPeriod", e.target.value)} className={inputCls} />
          </div>
          <div id="field-refreshFrequency">
            <label htmlFor="refreshFrequency" className={labelCls}>Refresh frequency <span className="text-[#ff2e88]">*</span></label>
            <select id="refreshFrequency" value={p.refreshFrequency} onChange={(e) => update("refreshFrequency", e.target.value)} className={inputCls}>
              <option value="">Select frequency</option>
              {refreshOpts.map((r) => (
                <option key={r} value={r}>{REFRESH_LABELS[r]}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="transformationProcess" className={labelCls}>Transformation, matching or aggregation</label>
            <textarea id="transformationProcess" rows={2} value={p.transformationProcess} onChange={(e) => update("transformationProcess", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="subSuppliers" className={labelCls}>Sub-suppliers or upstream providers</label>
            <textarea id="subSuppliers" rows={2} value={p.subSuppliers} onChange={(e) => update("subSuppliers", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
        </div>
      </fieldset>

      {/* Repeatable sources */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Data sources</legend>
        <p className="mb-4 text-[11px] leading-relaxed text-foreground-500">
          Add at least one data source. Describe each source&apos;s origin, provider, rights, geography and refresh pattern.
        </p>

        <div id="field-sources" className="space-y-3">
          {p.sources.map((src, i) => (
            <div key={src.id} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground-200 truncate">{src.name || `Source ${i + 1}`}</p>
                  <p className="mt-0.5 text-[11px] text-foreground-500">
                    {src.sourceCategory && SOURCE_CATEGORY_LABELS[src.sourceCategory]} {src.provider ? `— ${src.provider}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSource({ ...src });
                      setIsAddingSource(false);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground-200/15 text-foreground-500 transition hover:border-foreground-200/30 hover:text-foreground-200 cursor-pointer"
                    aria-label={`Edit ${src.name || `Source ${i + 1}`}`}
                  >
                    <i className="ri-pencil-line text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(src.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ff2e88]/20 text-foreground-500 transition hover:border-[#ff2e88]/40 hover:text-[#ff2e88] cursor-pointer"
                    aria-label={`Delete ${src.name || `Source ${i + 1}`}`}
                  >
                    <i className="ri-delete-bin-line text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {p.sources.length === 0 && (
            <p className="rounded-lg border border-dashed border-foreground-200/15 bg-background-50 px-4 py-6 text-center text-xs text-foreground-500">
              No sources added yet. Add at least one data source.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={addSource}
          className="mt-4 flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
        >
          <i className="ri-add-line" />
          Add source
        </button>
      </fieldset>

      {/* Additional provenance */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Additional information</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="publicReferences" className={labelCls}>Public references</label>
            <input id="publicReferences" type="text" value={p.publicReferences} onChange={(e) => update("publicReferences", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="knownGaps" className={labelCls}>Known provenance gaps</label>
            <input id="knownGaps" type="text" value={p.knownGaps} onChange={(e) => update("knownGaps", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="availableEvidence" className={labelCls}>Available evidence</label>
            <textarea id="availableEvidence" rows={2} value={p.availableEvidence} onChange={(e) => update("availableEvidence", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="sourceChangeProcess" className={labelCls}>Process when sources change</label>
            <textarea id="sourceChangeProcess" rows={2} value={p.sourceChangeProcess} onChange={(e) => update("sourceChangeProcess", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="dataSubjectExplanation" className={labelCls}>Data-subject source explanation</label>
            <textarea id="dataSubjectExplanation" rows={2} value={p.dataSubjectExplanation} onChange={(e) => update("dataSubjectExplanation", e.target.value)} className={`${inputCls} resize-y`} placeholder="How would you explain the source to a data subject?" />
          </div>
        </div>
      </fieldset>

      {/* Source editor modal */}
      {(editingSource || isAddingSource) && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 pt-16">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setEditingSource(null); setIsAddingSource(false); }} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-label={editingSource?.name ? `Edit ${editingSource.name}` : "Add source"}>
            <h3 className="mb-5 text-sm font-semibold text-foreground-200">
              {editingSource?.name ? `Edit source: ${editingSource.name}` : "Add data source"}
            </h3>
            {editingSource && (
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Name <span className="text-[#ff2e88]">*</span></label>
                  <input type="text" value={editingSource.name} onChange={(e) => updateEditingSource("name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Source category</label>
                  <select value={editingSource.sourceCategory} onChange={(e) => updateEditingSource("sourceCategory", e.target.value)} className={inputCls}>
                    {sourceCats.map((c) => (<option key={c} value={c}>{SOURCE_CATEGORY_LABELS[c]}</option>))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Provider <span className="text-[#ff2e88]">*</span></label>
                  <input type="text" value={editingSource.provider} onChange={(e) => updateEditingSource("provider", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Rights summary</label>
                  <input type="text" value={editingSource.rightsSummary} onChange={(e) => updateEditingSource("rightsSummary", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Geography <span className="text-[#ff2e88]">*</span></label>
                  <input type="text" value={editingSource.geography} onChange={(e) => updateEditingSource("geography", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Refresh</label>
                  <select value={editingSource.refresh} onChange={(e) => updateEditingSource("refresh", e.target.value)} className={inputCls}>
                    {refreshOpts.map((r) => (<option key={r} value={r}>{REFRESH_LABELS[r]}</option>))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Transformation</label>
                  <textarea rows={2} value={editingSource.transformation} onChange={(e) => updateEditingSource("transformation", e.target.value)} className={`${inputCls} resize-y`} />
                </div>
                <div>
                  <label className={labelCls}>Restrictions</label>
                  <textarea rows={2} value={editingSource.restrictions} onChange={(e) => updateEditingSource("restrictions", e.target.value)} className={`${inputCls} resize-y`} />
                </div>
                <div>
                  <label className={labelCls}>Evidence</label>
                  <input type="text" value={editingSource.evidence} onChange={(e) => updateEditingSource("evidence", e.target.value)} className={inputCls} />
                </div>
              </div>
            )}
            <div className="mt-6 flex gap-2.5">
              <button type="button" onClick={() => { setEditingSource(null); setIsAddingSource(false); }} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 cursor-pointer">
                Cancel
              </button>
              <button type="button" onClick={() => editingSource && saveSource(editingSource)} className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-3 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                Save source
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
            <p className="text-sm font-semibold text-foreground-200 mb-2">Delete this source?</p>
            <p className="text-xs text-foreground-500">This action cannot be undone.</p>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setShowDeleteConfirm(null)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={() => deleteSource(showDeleteConfirm)} className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-3 py-2 text-xs font-medium text-white cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}