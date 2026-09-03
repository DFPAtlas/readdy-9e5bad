import { useState, useEffect } from 'react';
import { validateSecurityStage, DOCUMENT_TYPE_LABELS, generateLocalId } from '@/data/accessRequestTypes';
import type { AccessRequestDraft, AccessRequestDocument, DocumentType } from '@/data/accessRequestTypes';

interface Stage9SecurityProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SECURITY_CONTROLS: [string, keyof AccessRequestDraft, boolean][] = [
  ['Multi-factor authentication (MFA)', 'hasMfa', true],
  ['Role-based access control (RBAC)', 'hasRbac', true],
  ['Encryption in transit', 'hasEncryptionTransit', true],
  ['Encryption at rest', 'hasEncryptionRest', true],
  ['Logging and monitoring', 'hasLogging', true],
  ['Key management', 'hasKeyManagement', false],
  ['Secure development practices', 'hasSecureDevelopment', false],
  ['Vulnerability management', 'hasVulnerabilityManagement', false],
  ['Incident response', 'hasIncidentResponse', false],
  ['Backup and recovery', 'hasBackupRecovery', false],
  ['Staff confidentiality agreements', 'hasStaffConfidentiality', false],
  ['Data deletion process', 'hasDeletionProcess', false],
  ['Processor controls', 'hasProcessorControls', false],
];

const DOC_TYPES: DocumentType[] = ['internal_policy', 'security_overview', 'dpia_assessment', 'architecture_diagram', 'data_flow', 'retention_schedule', 'processor_list', 'other'];

export default function Stage9Security({ draft, onUpdate, onNext, onPrev }: Stage9SecurityProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [warnings, setWarnings] = useState<{ field: string; message: string }[]>([]);
  const [editingDoc, setEditingDoc] = useState<AccessRequestDocument | null>(null);

  function handleContinue() {
    const result = validateSecurityStage(draft);
    setErrors(result.errors);
    setWarnings(result.warnings);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function update(f: string, v: string | boolean) { onUpdate({ ...draft, [f]: v }); }
  const ic = 'w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400';

  function addDocument() {
    setEditingDoc({
      id: generateLocalId(),
      docType: 'internal_policy',
      displayFilename: '',
      description: '',
      date: '',
      optionalExpiry: '',
      readiness: 'ready',
      confidentiality: 'internal',
    });
  }

  function saveDocument(doc: AccessRequestDocument) {
    const idx = draft.documents.findIndex((d) => d.id === doc.id);
    const updated = idx >= 0
      ? draft.documents.map((d) => (d.id === doc.id ? doc : d))
      : [...draft.documents, doc];
    onUpdate({ ...draft, documents: updated });
    setEditingDoc(null);
  }

  function removeDocument(id: string) {
    onUpdate({ ...draft, documents: draft.documents.filter((d) => d.id !== id) });
  }

  return (
    <div>
      {/* Security controls grid */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground-900 mb-3">Security controls in place</h3>
        <p className="text-xs text-foreground-500 mb-3">Confirm which controls are in place for accessing and handling this data.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SECURITY_CONTROLS.map(([label, key]) => (
            <label key={key} className="flex items-start gap-2 p-2 rounded-lg border border-background-200/70 hover:bg-background-50 cursor-pointer">
              <input
                type="checkbox"
                checked={draft[key]}
                onChange={(e) => update(key, e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-primary-500 cursor-pointer"
              />
              <span className="text-sm text-foreground-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Security notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground-700 mb-1">Additional security notes</label>
        <textarea
          value={draft.securityNotes}
          onChange={(e) => update('securityNotes', e.target.value)}
          rows={3}
          placeholder="Describe any additional security measures, certifications or frameworks..."
          className={ic}
        />
      </div>

      {/* Documents */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground-900">Supporting documents</h3>
            <p className="text-xs text-foreground-500 mt-0.5">Document metadata only — secure upload will be connected in a later backend phase.</p>
          </div>
          <button onClick={addDocument} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
            <i className="ri-add-line"></i> Add document
          </button>
        </div>

        {draft.documents.length === 0 && (
          <p className="text-sm text-foreground-400 italic py-4 text-center border border-dashed border-background-200/70 rounded-lg">No documents added</p>
        )}

        {draft.documents.map((doc) => (
          <div key={doc.id} className="mb-2 p-3 rounded-lg border border-background-200/70 bg-background-50 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground-800 truncate">{doc.displayFilename || 'Unnamed document'}</p>
              <p className="text-xs text-foreground-500">{DOCUMENT_TYPE_LABELS[doc.docType]} · {doc.readiness} · {doc.confidentiality}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button onClick={() => setEditingDoc(doc)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-100 cursor-pointer text-foreground-500"><i className="ri-edit-line text-sm"></i></button>
              <button onClick={() => removeDocument(doc.id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-accent-50 cursor-pointer text-foreground-500"><i className="ri-delete-bin-line text-sm"></i></button>
            </div>
          </div>
        ))}
      </div>

      {warnings.length > 0 && (
        <div className="mb-3 p-3 rounded-lg bg-secondary-50 border border-secondary-200/60">
          <p className="text-sm font-semibold text-secondary-800 mb-1">Guidance:</p>
          <ul className="space-y-0.5">{warnings.map((w) => (<li key={w.field} className="text-xs text-secondary-700">{w.message}</li>))}</ul>
        </div>
      )}
      {errors.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-accent-50 border border-accent-200/60" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-1">Please fix:</p>
          <ul className="space-y-0.5">{errors.map((e) => (<li key={e.field} className="text-xs text-accent-800">{e.message}</li>))}</ul>
        </div>
      )}

      {/* Edit doc modal */}
      {editingDoc && (
        <DocModal doc={editingDoc} onSave={saveDocument} onCancel={() => setEditingDoc(null)} />
      )}

      <div className="flex items-center justify-between pt-4 border-t border-background-100">
        <button onClick={onPrev} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap"><i className="ri-arrow-left-line"></i> Previous</button>
        <button onClick={handleContinue} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">Continue <i className="ri-arrow-right-line"></i></button>
      </div>
    </div>
  );
}

function DocModal({ doc, onSave, onCancel }: { doc: AccessRequestDocument; onSave: (d: AccessRequestDocument) => void; onCancel: () => void }) {
  const [form, setForm] = useState(doc);
  const ic = 'w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div className="bg-background-50 rounded-xl border border-background-200/70 shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Edit document">
        <div className="p-4 border-b border-background-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground-950">{doc.displayFilename ? 'Edit document' : 'Add document'}</h3>
          <button onClick={onCancel} className="w-7 h-7 flex items-center justify-center rounded hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Document type</label>
            <select value={form.docType} onChange={(e) => setForm({ ...form, docType: e.target.value as DocumentType })} className={`${ic} cursor-pointer`}>
              {DOC_TYPES.map((t) => (<option key={t} value={t}>{DOCUMENT_TYPE_LABELS[t]}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Display filename *</label>
            <input type="text" value={form.displayFilename} onChange={(e) => setForm({ ...form, displayFilename: e.target.value })} placeholder="E.g. Security Overview — Acme Corp Q2 2026" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Description</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Optional expiry</label>
            <input type="date" value={form.optionalExpiry} onChange={(e) => setForm({ ...form, optionalExpiry: e.target.value })} className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Readiness</label>
            <select value={form.readiness} onChange={(e) => setForm({ ...form, readiness: e.target.value as 'ready' | 'in_progress' | 'planned' })} className={`${ic} cursor-pointer`}>
              <option value="ready">Ready to provide</option>
              <option value="in_progress">In progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Confidentiality</label>
            <select value={form.confidentiality} onChange={(e) => setForm({ ...form, confidentiality: e.target.value as 'internal' | 'confidential' | 'restricted' })} className={`${ic} cursor-pointer`}>
              <option value="internal">Internal</option>
              <option value="confidential">Confidential</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>
        </div>
        <div className="p-4 border-t border-background-100 flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-600 hover:bg-background-100 cursor-pointer whitespace-nowrap">Cancel</button>
          <button onClick={() => { if (form.displayFilename.trim()) onSave(form); }} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">Save</button>
        </div>
      </div>
    </div>
  );
}