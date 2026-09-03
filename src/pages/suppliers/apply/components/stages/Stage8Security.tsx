import { useState, useCallback } from "react";
import type { SupplierApplicationDraft, CertificationItem } from "@/data/supplierApplicationTypes";
import { createEmptyCertification } from "@/data/supplierApplicationDefaults";

interface Stage8Props {
  draft: SupplierApplicationDraft;
  setDraft: (d: SupplierApplicationDraft) => void;
}

const inputCls = "w-full rounded-lg border border-foreground-200/15 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-primary-400/40 focus:outline-none focus:ring-1 focus:ring-primary-400/20";
const labelCls = "mb-1.5 block text-xs font-medium text-foreground-300";

const certStatuses = [
  { value: "none", label: "None" },
  { value: "in_progress", label: "In progress" },
  { value: "obtained", label: "Obtained" },
  { value: "expired", label: "Expired" },
] as const;

export default function Stage8Security({ draft, setDraft }: Stage8Props) {
  const s = draft.security;
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [showDeleteCert, setShowDeleteCert] = useState<string | null>(null);

  const update = (field: keyof typeof s, value: string | boolean) => {
    setDraft({ ...draft, security: { ...s, [field]: value } });
  };

  const updateCerts = (certs: CertificationItem[]) => {
    setDraft({ ...draft, security: { ...s, certifications: certs } });
  };

  const addCert = useCallback(() => {
    const cert = createEmptyCertification();
    updateCerts([...s.certifications, cert]);
    setEditingCert(cert);
  }, [s]);

  const saveCert = useCallback(
    (cert: CertificationItem) => {
      const idx = s.certifications.findIndex((c) => c.id === cert.id);
      const updated = [...s.certifications];
      if (idx >= 0) updated[idx] = cert;
      else updated.push(cert);
      updateCerts(updated);
      setEditingCert(null);
    },
    [s],
  );

  const deleteCert = useCallback(
    (id: string) => {
      updateCerts(s.certifications.filter((c) => c.id !== id));
      setShowDeleteCert(null);
      if (editingCert?.id === id) setEditingCert(null);
    },
    [s, editingCert],
  );

  const updateEditingCert = (field: keyof CertificationItem, value: string) => {
    if (!editingCert) return;
    setEditingCert({ ...editingCert, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-[#ff2e88]/15 bg-[#ff2e88]/5 p-4">
        <p className="text-xs leading-relaxed text-foreground-500">
          <strong className="text-foreground-300">Important:</strong> Only report certifications that actually exist. Never mark a claim as verified or make false statements.
        </p>
      </div>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Core security controls</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            { field: "encryptionTransit" as const, label: "Encryption in transit", required: true },
            { field: "encryptionRest" as const, label: "Encryption at rest" },
            { field: "accessControl" as const, label: "Access control", required: true },
            { field: "loggingMonitoring" as const, label: "Logging and monitoring" },
            { field: "secureDevelopment" as const, label: "Secure development" },
            { field: "vulnerabilityManagement" as const, label: "Vulnerability management" },
            { field: "backupRecovery" as const, label: "Backup and recovery" },
            { field: "businessContinuity" as const, label: "Business continuity" },
            { field: "staffConfidentiality" as const, label: "Staff confidentiality" },
            { field: "subprocessorManagement" as const, label: "Subprocessor management" },
            { field: "secureTransfer" as const, label: "Secure transfer" },
            { field: "keySecretManagement" as const, label: "Key and secret management" },
            { field: "dataDeletion" as const, label: "Data deletion" },
          ]).map(({ field, label: fLabel, required }) => (
            <div key={field} id={required ? `field-${field}` : undefined}>
              <label htmlFor={field} className={labelCls}>
                {fLabel} {required ? <span className="text-[#ff2e88]">*</span> : ""}
              </label>
              <input id={field} type="text" value={s[field]} onChange={(e) => update(field, e.target.value)} className={inputCls} placeholder={required ? "Required" : "Describe your controls or plans"} />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-md bg-background-50 p-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={s.mfaEnabled} onChange={(e) => update("mfaEnabled", e.target.checked)} className="h-4 w-4 rounded border-foreground-300/30 bg-background-100 text-primary-500 accent-primary-500" />
            <span className="text-xs text-foreground-400">Multi-factor authentication enabled</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Incident response</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div id="field-incidentResponse" className="sm:col-span-2">
            <label htmlFor="incidentResponse" className={labelCls}>Incident response process <span className="text-[#ff2e88]">*</span></label>
            <textarea id="incidentResponse" rows={3} value={s.incidentResponse} onChange={(e) => update("incidentResponse", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label htmlFor="securityContact" className={labelCls}>Security contact</label>
            <input id="securityContact" type="text" value={s.securityContact} onChange={(e) => update("securityContact", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="notificationProcess" className={labelCls}>Notification process</label>
            <input id="notificationProcess" type="text" value={s.notificationProcess} onChange={(e) => update("notificationProcess", e.target.value)} className={inputCls} />
          </div>
          <div id="field-incidentNotificationScenario" className="sm:col-span-2">
            <label htmlFor="incidentNotificationScenario" className={labelCls}>
              How would you notify DataHarbour of a product-related incident? <span className="text-[#ff2e88]">*</span>
            </label>
            <p className="mb-1.5 text-[11px] leading-relaxed text-foreground-500">Describe the steps you would take to notify DataHarbour if a security incident affected your product.</p>
            <textarea id="incidentNotificationScenario" rows={3} value={s.incidentNotificationScenario} onChange={(e) => update("incidentNotificationScenario", e.target.value)} className={`${inputCls} resize-y`} />
          </div>
        </div>
      </fieldset>

      {/* Certifications */}
      <fieldset className="rounded-lg border border-foreground-200/10 bg-background-100 p-5">
        <legend className="mb-4 text-sm font-semibold text-foreground-200">Certifications (optional)</legend>
        <div className="space-y-3">
          {s.certifications.map((cert, i) => (
            <div key={cert.id} className="rounded-lg border border-foreground-200/10 bg-background-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground-200 truncate">{cert.name || `Certification ${i + 1}`}</p>
                  <p className="mt-0.5 text-[11px] text-foreground-500">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      cert.status === "obtained" ? "bg-primary-500/10 text-primary-400" : cert.status === "in_progress" ? "bg-amber-500/10 text-amber-400" : "bg-foreground-200/10 text-foreground-500"
                    }`}>
                      {cert.status === "none" ? "None" : cert.status === "in_progress" ? "In progress" : cert.status === "obtained" ? "Obtained" : "Expired"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" onClick={() => setEditingCert({ ...cert })} className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground-200/15 text-foreground-500 transition hover:border-foreground-200/30 hover:text-foreground-200 cursor-pointer" aria-label={`Edit ${cert.name || `Certification ${i + 1}`}`}>
                    <i className="ri-pencil-line text-xs" />
                  </button>
                  <button type="button" onClick={() => setShowDeleteCert(cert.id)} className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ff2e88]/20 text-foreground-500 transition hover:border-[#ff2e88]/40 hover:text-[#ff2e88] cursor-pointer" aria-label={`Delete ${cert.name || `Certification ${i + 1}`}`}>
                    <i className="ri-delete-bin-line text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {s.certifications.length === 0 && (
            <p className="rounded-lg border border-dashed border-foreground-200/15 bg-background-50 px-4 py-6 text-center text-xs text-foreground-500">
              No certifications listed. Add any relevant certifications (optional).
            </p>
          )}
        </div>
        <button type="button" onClick={addCert} className="mt-4 flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2 text-xs font-medium text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer">
          <i className="ri-add-line" /> Add certification
        </button>
      </fieldset>

      {/* Certification editor modal */}
      {editingCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingCert(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-sm rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="dialog" aria-modal="true">
            <h3 className="mb-5 text-sm font-semibold text-foreground-200">{editingCert.name ? `Edit: ${editingCert.name}` : "Add certification"}</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Name</label>
                <input type="text" value={editingCert.name} onChange={(e) => updateEditingCert("name", e.target.value)} className={inputCls} placeholder="e.g. ISO 27001" />
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select value={editingCert.status} onChange={(e) => updateEditingCert("status", e.target.value)} className={inputCls}>
                  {certStatuses.map((cs) => (<option key={cs.value} value={cs.value}>{cs.label}</option>))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Expiry date</label>
                <input type="text" value={editingCert.expiryDate} onChange={(e) => updateEditingCert("expiryDate", e.target.value)} className={inputCls} placeholder="DD/MM/YYYY" />
              </div>
            </div>
            <div className="mt-6 flex gap-2.5">
              <button type="button" onClick={() => setEditingCert(null)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={() => saveCert(editingCert)} className="flex-1 whitespace-nowrap rounded-lg bg-primary-500 px-3 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete cert */}
      {showDeleteCert && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteCert(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-xs rounded-xl border border-foreground-200/10 bg-background-100 p-6 shadow-2xl" role="alertdialog" aria-modal="true">
            <p className="text-sm font-semibold text-foreground-200 mb-2">Delete this certification?</p>
            <p className="text-xs text-foreground-500">This action cannot be undone.</p>
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setShowDeleteCert(null)} className="flex-1 whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-3 py-2 text-xs font-medium text-foreground-400 cursor-pointer">Cancel</button>
              <button type="button" onClick={() => deleteCert(showDeleteCert)} className="flex-1 whitespace-nowrap rounded-lg bg-[#ff2e88] px-3 py-2 text-xs font-medium text-white cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}