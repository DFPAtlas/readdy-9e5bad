import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoPackageReviews, PACKAGE_STATUS_LABELS, generateAdminRef } from '@/data/adminData';
import type { AdminNote } from '@/data/adminData';
import { getAdminSession, addAuditEvent } from '@/utils/adminStorage';

export default function AdminPackageDetail() {
  const { packageId } = useParams<{ packageId: string }>();
  const pkg = demoPackageReviews.find(p => p.id === packageId);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [localNotes, setLocalNotes] = useState<AdminNote[]>([]);
  const session = getAdminSession();

  if (!pkg) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <h1 className="text-lg font-semibold text-foreground-950 mb-2">Package not found</h1>
          <Link to="/admin/packages" className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer">Return to packages</Link>
        </div>
      </AdminLayout>
    );
  }

  function handleAction() {
    if (!actionType || !actionReason.trim()) return;
    addAuditEvent({
      id: generateAdminRef('AE'), timestamp: new Date().toISOString(),
      actor: session?.displayName || 'Administrator', action: 'package_review', entity: 'Package', entityRef: pkg!.slug,
      previousValue: PACKAGE_STATUS_LABELS[pkg!.status], newValue: actionType, reason: actionReason, environment: 'demonstration', isDemo: true,
    });
    setLocalNotes(prev => [...prev, {
      id: `n-${Date.now()}`, author: session?.displayName || 'Administrator',
      body: `Action: ${actionType}. Reason: ${actionReason}. Not sent — local demonstration action.`,
      isInternal: true, createdAt: new Date().toISOString(),
    }]);
    setActionDialog(false); setActionType(''); setActionReason('');
  }

  const allNotes = [...(pkg.notes || []), ...localNotes];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="flex items-center gap-1.5 text-xs text-foreground-500 mb-4">
          <Link to="/admin" className="hover:text-foreground-700 cursor-pointer">Admin</Link><span>/</span>
          <Link to="/admin/packages" className="hover:text-foreground-700 cursor-pointer">Packages</Link><span>/</span>
          <span className="text-foreground-950 font-medium">{pkg.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-foreground-950">{pkg.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs text-foreground-500">{pkg.supplierName}</span>
              <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary-100 text-secondary-900">{PACKAGE_STATUS_LABELS[pkg.status]}</span>
            </div>
          </div>
          <button onClick={() => setActionDialog(true)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-check-double-line text-sm"></i> Review action
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <CompletionBadge label="Coverage" status={pkg.coverageCompleteness} />
          <CompletionBadge label="Schema" status={pkg.schemaCompleteness} />
          <CompletionBadge label="Provenance" status={pkg.provenanceCompleteness} />
          <CompletionBadge label="Quality" status={pkg.qualityCompleteness} />
          <CompletionBadge label="Restrictions" status={pkg.restrictionsCompleteness} />
          <CompletionBadge label="Delivery" status={pkg.deliveryCompleteness} />
          <CompletionBadge label="Pricing" status={pkg.pricingCompleteness} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Section title="Package details">
              <Field label="Slug" value={pkg.slug} mono />
              <Field label="Category" value={pkg.category} />
              <Field label="Access level" value={pkg.accessLevel} />
              <Field label="Version" value={pkg.version} />
              <Field label="Supplier" value={pkg.supplierName} />
              <Field label="Supplier ref" value={pkg.supplierRef} mono />
            </Section>
            {pkg.conditions.length > 0 && (
              <Section title="Conditions">
                <ul className="list-disc list-inside text-sm text-foreground-600 space-y-1">
                  {pkg.conditions.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </Section>
            )}
            <Section title="History">
              {pkg.history.map(h => (
                <div key={h.id} className="text-xs mb-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-foreground-700">{h.actor}</span>
                    <span className="text-foreground-400">{new Date(h.createdAt).toLocaleString('en-GB')}</span>
                  </div>
                  <p className="text-foreground-600">{h.detail}</p>
                </div>
              ))}
            </Section>
          </div>
          <div className="space-y-4">
            <Section title="Review info">
              <Field label="Reviewer" value={pkg.reviewer} />
              <Field label="Submitted" value={new Date(pkg.submittedAt).toLocaleDateString('en-GB')} />
              {pkg.publishedAt && <Field label="Published" value={new Date(pkg.publishedAt).toLocaleDateString('en-GB')} />}
            </Section>
            {allNotes.length > 0 && (
              <Section title="Notes">
                {allNotes.map(n => (
                  <div key={n.id} className="bg-background-50 rounded-md p-2 text-xs mb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-foreground-700">{n.author}</span>
                      <span className="text-foreground-400">{new Date(n.createdAt).toLocaleString('en-GB')}</span>
                    </div>
                    <p className="text-foreground-600">{n.body}</p>
                  </div>
                ))}
              </Section>
            )}
          </div>
        </div>
      </div>

      {actionDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setActionDialog(false)}>
          <div className="bg-white rounded-lg border border-background-200/70 shadow-lg max-w-md w-full p-5" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2 className="text-sm font-semibold text-foreground-950 mb-3">Package review action — demonstration</h2>
            <select value={actionType} onChange={e => setActionType(e.target.value)} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer mb-3">
              <option value="">Select action...</option>
              <option value="Request Changes — demo">Request changes</option>
              <option value="Approved — demo">Approve</option>
              <option value="Approved with conditions — demo">Approve with conditions</option>
              <option value="Declined — demo">Decline</option>
              <option value="Paused — demo">Pause</option>
              <option value="Archived — demo">Archive</option>
              <option value="Published — demo">Publish</option>
            </select>
            <textarea value={actionReason} onChange={e => setActionReason(e.target.value)} placeholder="Reason (required)..." rows={2} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none resize-none mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setActionDialog(false)} className="px-3 py-2 text-xs font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
              <button onClick={handleAction} disabled={!actionType || !actionReason.trim()} className="px-3 py-2 text-xs font-medium bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 disabled:opacity-50 cursor-pointer whitespace-nowrap">Confirm — local action</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function CompletionBadge({ label, status }: { label: string; status: string }) {
  const isComplete = status === 'Complete';
  return (
    <div className={`border rounded-lg p-3 ${isComplete ? 'border-accent-200/60 bg-accent-50/50' : 'border-background-200/70 bg-white'}`}>
      <div className="flex items-center gap-2">
        <span className={`w-4 h-4 flex items-center justify-center ${isComplete ? 'text-accent-700' : 'text-foreground-400'}`}>
          <i className={`text-xs ${isComplete ? 'ri-checkbox-circle-fill' : 'ri-indeterminate-circle-line'}`}></i>
        </span>
        <span className="text-xs font-medium text-foreground-700 whitespace-nowrap">{label}</span>
      </div>
      <p className={`text-[11px] mt-1 ml-6 ${isComplete ? 'text-accent-700' : 'text-foreground-500'}`}>{status}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-background-200/70 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="mb-2">
      <p className="text-[11px] font-medium text-foreground-400">{label}</p>
      <p className={`text-sm text-foreground-950 ${mono ? 'font-mono' : ''}`}>{value || '—'}</p>
    </div>
  );
}