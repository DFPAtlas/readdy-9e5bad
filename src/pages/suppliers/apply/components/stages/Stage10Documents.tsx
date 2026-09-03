import { useState, useCallback } from "react";
import type { SupplierApplicationDraft, DocumentMetadataItem, DocumentType, ConfidentialityClassification } from "@/data/supplierApplicationTypes";
import { DOCUMENT_TYPE_LABELS } from "@/data/supplierApplicationTypes";
import { createEmptyDocument } from "@/data/supplierApplicationDefaults";

interface Stage10Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const docTypes: DocumentType[] = [
  "organisation_evidence", "rights_licence_evidence", "provenance_document",
  "data_dictionary", "sample_schema", "quality_policy", "security_overview",
  "incident_response_summary", "insurance_evidence", "certification_evidence", "other",
];

const classifications: ConfidentialityClassification[] = ["none", "confidential", "strictly_confidential"];
const classLabels: Record<ConfidentialityClassification, string> = {
  none: "None",
  confidential: "Confidential",
  strictly_confidential: "Strictly confidential",
};

const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

const declFields: { field: keyof SupplierApplicationDraft["declarations"]; label: string }[] = [
  { field: "infoAccurate", label: "Information is accurate to the representative's knowledge" },
  { field: "authorityToDiscuss", label: "The organisation has authority to discuss the product" },
  { field: "noStolenData", label: "No stolen, leaked or unlawfully obtained data is proposed" },
  { field: "restrictionsDisclosed", label: "Restrictions and limitations are disclosed" },
  { field: "willReportChanges", label: "Material changes will be reported" },
  { field: "noGuaranteedAcceptance", label: "Submission does not guarantee acceptance" },
  { field: "mayRequestMoreInfo", label: "DataHarbour may request more information" },
  { field: "finalTermsSeparate", label: "Final terms require separate agreement" },
  { field: "demoDataBrowserOnly", label: "Demonstration data remains in this browser only" },
];

export default function Stage10Documents({ draft, setDraft }: Stage10Props) {
  const docs = draft.supportingDocuments;
  const decl = draft.declarations;
  const [editingDoc, setEditingDoc] = useState<DocumentMetadataItem | null>(null);
  const [showDeleteDoc, setShowDeleteDoc] = useState<string | null>(null);

  const updateDocs = (documents: DocumentMetadataItem[]) => {
    setDraft({ ...draft, supportingDocuments: { documents } });
  };

  const addDoc = useCallback(() => {
    const doc = createEmptyDocument();
    updateDocs([...docs.documents, doc]);
    setEditingDoc(doc);
  }, [docs]);

  const saveDoc = useCallback(
    (doc: DocumentMetadataItem) => {
      const idx = docs.documents.findIndex((d) => d.id === doc.id);
      const updated = [...docs.documents];
      if (idx >= 0) updated[idx] = doc;
      else updated.push(doc);
      updateDocs(updated);
      setEditingDoc(null);
    },
    [docs],
  );

  const deleteDoc = useCallback(
    (id: string) => {
      updateDocs(docs.documents.filter((d) => d.id !== id));
      setShowDeleteDoc(null);
      if (editingDoc?.id === id) setEditingDoc(null);
    },
    [docs, editingDoc],
  );

  const updateDecl = (field: keyof typeof decl, value: boolean) => {
    setDraft({ ...draft, declarations: { ...decl, [field]: value } });
  };

  const updateEditingDoc = (field: keyof DocumentMetadataItem, value: string | boolean) => {
    if (!editingDoc) return;
    setEditingDoc({ ...editingDoc, [field]: value });
  };

  return (
    <div className="space-y-5">
      {/* Documents */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Supporting documents</legend>
        <p className="mb-4 text-[11px] leading-relaxed text-foreground-500">
          Record the documents you can provide. Actual file uploads will be connected in a later backend phase.
        </p>

        <div className="mb-4 rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 p-3">
          <p className="text-xs leading-relaxed text-foreground-500">
            Secure document upload will be connected in a later backend phase. For now, record document metadata only.
          </p>
        </div>

        <div className="space-y-3">
          {docs.documents.map((doc, i) => (
            <div key={doc.id} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground-200 truncate">{doc.displayFilename || `Document ${i + 1}`}</p>
                    <span className="inline-block rounded-full bg-foreground-200/10 px-2 py-0.5 text-[10px] font-medium text-foreground-500">{DOCUMENT_TYPE_LABELS[doc.documentType]}</span>
                    {doc.readyToProvide && (
                      <span className="inline-block rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] font-medium text-primary-400">Ready</span>
                    )}
                  </div>
                  {doc.description && <p className="mt-1 text-[11px] text-foreground-500 line-clamp-1">{doc.description}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" onClick={() => setEditingDoc({ ...doc })} className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground-200/15 text-foreground-500 transition hover:border-foreground-200/30 hover:text-foreground-200 cursor-pointer" aria-label={`Edit ${doc.displayFilename || `Document ${i + 1}`}`}>
                    <i className="ri-pencil-line text-xs" />
                  </button>
                  <button type="button" onClick={() => setShowDeleteDoc(doc.id)} className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ff2e88]/20 text-foreground-500 transition hover:border-[#ff2e88]/40 hover:text-[#ff2e88] cursor-pointer" aria-label={`Delete ${doc.displayFilename || `Document ${i + 1}`}`}>
                    <i className="ri-delete-bin-line text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {docs.documents.length === 0 && (
            <p className="rounded-lg border border-dashed border-foreground-200/15 bg-background-50 px-4 py-6 text-center text-xs text-foreground-500">
              No documents recorded yet. Add document metadata to describe what you can provide.
            </p>
          )}
        </div>
        <button type="button" onClick={addDoc} className="mt-4 flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
          <i className="ri-add-line" /> Add document
        </button>
      </fieldset>

      {/* Declarations */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Required declarations</legend>
        <p className="mb-4 text-[11px] leading-relaxed text-foreground-500">
          All declarations must be confirmed before this application can be submitted.
        </p>
        <div className="space-y-3">
          {declFields.map(({ field, label }) => (
            <label key={field} id={`field-${field}`} className="flex items-start gap-3 cursor-pointer rounded-md bg-background-50 p-3">
              <input
                type="checkbox"
                checked={decl[field]}
                onChange={(e) => updateDecl(field, e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500"
              />
              <span className={`text-xs leading-relaxed ${decl[field] ? "text-foreground-300" : "text-foreground-500"}`}>
                {label} {!decl[field] && <span className="text-[#ff2e88]">(required)</span>}
              </span>
            </label>
          ))}
        </div>
        {declFields.some((f) => !decl[f.field]) && (
          <p className="mt-4 text-xs text-[#ff2e88]">
            All declarations must be confirmed before submission. {declFields.filter((f) => !decl[f.field]).length} remaining.
          </p>
        )}
      </fieldset>

      {/* Document editor modal */}
      {editingDoc && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 pt-16">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingDoc(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-label={editingDoc.displayFilename ? `Edit ${editingDoc.displayFilename}` : "Add document"}>
            <h3 className="mb-5 text-sm font-semibold text-foreground-200">{editingDoc.displayFilename ? `Edit document` : "Add document"}</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Document type</label>
                <select value={editingDoc.documentType} onChange={(e) => updateEditingDoc("documentType", e.target.value)} className={inputCls}>
                  {docTypes.map((t) => (<option key={t} value={t}>{DOCUMENT_TYPE_LABELS[t]}</option>))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Display filename</label>
                <input type="text" value={editingDoc.displayFilename} onChange={(e) => updateEditingDoc("displayFilename", e.target.value)} className={inputCls} placeholder="e.g. certificate_of_incorporation.pdf" />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea rows={2} value={editingDoc.description} onChange={(e) => updateEditingDoc("description", e.target.value)} className={`${inputCls} resize-y`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Document date</label>
                  <input type="text" value={editingDoc.documentDate} onChange={(e) => updateEditingDoc("documentDate", e.target.value)} className={inputCls} placeholder="DD/MM/YYYY" />
                </div>
                <div>
                  <label className={labelCls}>Expiry date</label>
                  <input type="text" value={editingDoc.expiryDate} onChange={(e) => updateEditingDoc("expiryDate", e.target.value)} className={inputCls} placeholder="DD/MM/YYYY or N/A" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Classification</label>
                <select value={editingDoc.classification} onChange={(e) => updateEditingDoc("classification", e.target.value)} className={inputCls}>
                  {classifications.map((c) => (<option key={c} value={c}>{classLabels[c]}</option>))}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={editingDoc.readyToProvide} onChange={(e) => updateEditingDoc("readyToProvide", e.target.checked)} className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500" />
                <span className="text-xs text-foreground-400">Ready to provide</span>
              </label>
            </div>
            <div className="mt-6 flex gap-2.5">
              <button type="button" onClick={() => setEditingDoc(null)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={() => saveDoc(editingDoc)} className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-3 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">Save document</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteDoc && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteDoc(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
            <p className="text-sm font-semibold text-foreground-200 mb-2">Delete this document record?</p>
            <p className="text-xs text-foreground-500">This action cannot be undone.</p>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setShowDeleteDoc(null)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={() => deleteDoc(showDeleteDoc)} className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-3 py-2 text-xs font-medium text-white cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}