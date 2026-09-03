import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoAdminAccessRequests, AR_STATUS_LABELS, generateAdminRef } from '@/data/adminData';
import type { AdminNote } from '@/data/adminData';
import { getAdminSession, addAuditEvent } from '@/utils/adminStorage';

export default function AdminAccessRequestDetail() {
  const { requestId } = useParams<{ requestId: string }>();
  const req = demoAdminAccessRequests.find(r => r.id === requestId);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [localNotes, setLocalNotes] = useState<AdminNote[]>([]);
  const session = getAdminSession();

  if (!req) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <h1 className="text-lg font-semibold text-foreground-950 mb-2">Request not found</h1>
          <Link to="/admin/access-requests" className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer">Return to access requests</Link>
        </div>
      </AdminLayout>
    );
  }

  function handleAction() {
    if (!actionType || !actionReason.trim()) return;
    addAuditEvent({
      id: generateAdminRef('AE'), timestamp: new Date().toISOString(),
      actor: session?.displayName || 'Administrator', action: 'access_request_decision', entity: 'Access request', entityRef: req!.reference,
      previousValue: AR_STATUS_LABELS[req!.status], newValue: actionType, reason: actionReason, environment: 'demonstration', isDemo: true,
    });
    setLocalNotes(prev => [...prev, {
      id: `n-${Date.now()}`, author: session?.displayName || 'Administrator',
      body: `Action: ${actionType}. Reason: ${actionReason}. Not sent — local demonstration action.`,
      isInternal: true, createdAt: new Date().toISOString(),
    }]);
    setActionDialog(false); setActionType(''); setActionReason('');
  }

  const allNotes = [...(req.notes || []), ...localNotes];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="flex items-center gap-1.5 text-xs text-foreground-500 mb-4">
          <Link to="/admin" className="hover:text-foreground-700 cursor-pointer">Admin</Link><span>/</span>
          <Link to="/admin/access-requests" className="hover:text-foreground-700 cursor-pointer">Access Requests</Link><span>/</span>
          <span className="text-foreground-950 font-medium">{req.reference}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-foreground-950">{req.packageName}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs font-mono text-foreground-500">{req.reference}</span>
              <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary-100 text-secondary-900">{AR_STATUS_LABELS[req.status]}</span>
            </div>
          </div>
          <button onClick={() => setActionDialog(true)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-check-double-line text-sm"></i> Decision
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <Section title="Overview">
              <Field label="Buyer" value={req.buyerOrg} />
              <Field label="Buyer ref" value={req.buyerRef} mono />
              <Field label="Package" value={req.packageName} />
              <Field label="Supplier" value={req.supplierName} />
            </Section>
            <Section title="Purpose and scope">
              <Field label="Purpose" value={req.purpose} />
            </Section>
            <Section title="Risk flags">
              {req.riskFlags.length === 0 ? <p className="text-sm text-foreground-500">No risk flags.</p> : (
                <ul className="list-disc list-inside text-sm text-accent-700 space-y-1">
                  {req.riskFlags.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              )}
            </Section>
            {req.conditions.length > 0 && (
              <Section title="Conditions">
                <ul className="list-disc list-inside text-sm text-foreground-600 space-y-1">
                  {req.conditions.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </Section>
            )}
            <Section title="Supplier response">
              <p className="text-sm text-foreground-600">{req.supplierResponse || 'No response recorded.'}</p>
            </Section>
            <Section title="Compliance review">
              <p className="text-sm text-foreground-600">{req.complianceReviewNotes || 'No compliance notes recorded.'}</p>
            </Section>
            <Section title="History">
              {req.history.map(h => (
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
            <Section title="Details">
              <Field label="Reviewer" value={req.reviewer || 'Unassigned'} />
              <Field label="Created" value={new Date(req.createdAt).toLocaleDateString('en-GB')} />
              <Field label="Updated" value={new Date(req.updatedAt).toLocaleDateString('en-GB')} />
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
            <h2 className="text-sm font-semibold text-foreground-950 mb-3">Access request decision — demonstration</h2>
            <select value={actionType} onChange={e => setActionType(e.target.value)} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer mb-3">
              <option value="">Select decision...</option>
              <option value="Request more information — demo">Request more information</option>
              <option value="Refer to supplier — demo">Refer to supplier</option>
              <option value="Refer to compliance — demo">Refer to compliance</option>
              <option value="Approved — demo">Approve</option>
              <option value="Approved with conditions — demo">Approve with conditions</option>
              <option value="Declined — demo">Decline</option>
              <option value="Suspended — demo">Suspend</option>
              <option value="Expired — demo">Expire</option>
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