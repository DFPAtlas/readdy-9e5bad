import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoSupplierApplications, APP_STATUS_LABELS, generateAdminRef } from '@/data/adminData';
import { getAdminSession, addAuditEvent } from '@/utils/adminStorage';
import type { AdminNote } from '@/data/adminData';

export default function AdminSupplierApplicationDetail() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const app = demoSupplierApplications.find(a => a.id === applicationId);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [actionConditions, setActionConditions] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [localNotes, setLocalNotes] = useState<AdminNote[]>([]);
  const session = getAdminSession();

  if (!app) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <h1 className="text-lg font-semibold text-foreground-950 mb-2">Application not found</h1>
          <Link to="/admin/supplier-applications" className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer">Return to applications</Link>
        </div>
      </AdminLayout>
    );
  }

  function handleAction() {
    if (!actionType || !actionReason.trim()) return;
    const event = {
      id: generateAdminRef('AE'), timestamp: new Date().toISOString(),
      actor: session?.displayName || 'Administrator',
      action: 'application_decision' as const, entity: 'Supplier application', entityRef: app!.reference,
      previousValue: APP_STATUS_LABELS[app!.status],
      newValue: actionType === 'request_info' ? 'Awaiting information' : actionType === 'accept' ? 'Accepted' : actionType === 'accept_conditions' ? 'Accepted with conditions' : actionType === 'decline' ? 'Declined' : 'Paused',
      reason: actionReason, environment: 'demonstration', isDemo: true,
    };
    addAuditEvent(event);
    setLocalNotes(prev => [...prev, {
      id: `n-${Date.now()}`, author: session?.displayName || 'Administrator',
      body: `Action: ${actionType}. Reason: ${actionReason}${actionConditions ? `. Conditions: ${actionConditions}` : ''}${actionNote ? `. Note: ${actionNote}` : ''}. Not sent — local demonstration action.`,
      isInternal: true, createdAt: new Date().toISOString(),
    }]);
    setActionDialog(false);
    setActionType(''); setActionReason(''); setActionConditions(''); setActionNote('');
  }

  const allNotes = [...(app.notes || []), ...localNotes];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="flex items-center gap-1.5 text-xs text-foreground-500 mb-4">
          <Link to="/admin" className="hover:text-foreground-700 cursor-pointer">Admin</Link>
          <span>/</span>
          <Link to="/admin/supplier-applications" className="hover:text-foreground-700 cursor-pointer">Supplier Applications</Link>
          <span>/</span>
          <span className="text-foreground-950 font-medium">{app.reference}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-foreground-950">{app.productName}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs font-mono text-foreground-500">{app.reference}</span>
              <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary-100 text-secondary-900">{APP_STATUS_LABELS[app.status]}</span>
              <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-foreground-100 text-foreground-600">{app.priority} priority</span>
            </div>
          </div>
          <button onClick={() => setActionDialog(true)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-check-double-line text-sm"></i> Take action
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <DetailSection title="Organisation and representative">
              <DetailField label="Organisation" value={app.organisationName} />
              <DetailField label="Organisation ref" value={app.organisationRef} mono />
              <DetailField label="Representative" value={app.representativeName} />
              <DetailField label="Email" value={app.representativeEmail} />
            </DetailSection>
            <DetailSection title="Product">
              <DetailField label="Product name" value={app.productName} />
              <DetailField label="Category" value={app.productCategory} />
            </DetailSection>
            <DetailSection title="Sources and provenance">
              <DetailField label="Provenance summary" value={app.provenanceSummary} />
            </DetailSection>
            <DetailSection title="Rights and licensing">
              <DetailField label="Rights summary" value={app.rightsSummary} />
            </DetailSection>
            <DetailSection title="Delivery and commercial">
              <DetailField label="Delivery" value={app.deliverySummary} />
              <DetailField label="Commercial model" value={app.commercialSummary} />
            </DetailSection>
            {app.missingInfo.length > 0 && (
              <DetailSection title="Missing information">
                <ul className="list-disc list-inside text-sm text-accent-700 space-y-1">
                  {app.missingInfo.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </DetailSection>
            )}
            <DetailSection title="History">
              <div className="space-y-2">
                {app.history.map(h => (
                  <div key={h.id} className="text-xs">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-foreground-700">{h.actor}</span>
                      <span className="text-foreground-400">{new Date(h.createdAt).toLocaleString('en-GB')}</span>
                    </div>
                    <p className="text-foreground-600">{h.detail}</p>
                  </div>
                ))}
              </div>
            </DetailSection>
          </div>

          <div className="space-y-4">
            <DetailSection title="Reviewer">
              <DetailField label="Assigned to" value={app.reviewer || 'Unassigned'} />
              <DetailField label="Submitted" value={new Date(app.submittedAt).toLocaleDateString('en-GB')} />
              <DetailField label="Last updated" value={new Date(app.updatedAt).toLocaleDateString('en-GB')} />
            </DetailSection>
            {allNotes.length > 0 && (
              <DetailSection title="Notes">
                <div className="space-y-2">
                  {allNotes.map(n => (
                    <div key={n.id} className="bg-background-50 rounded-md p-3 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground-700">{n.author}</span>
                        <span className="text-foreground-400">{new Date(n.createdAt).toLocaleString('en-GB')}</span>
                      </div>
                      <p className="text-foreground-600">{n.body}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}
          </div>
        </div>
      </div>

      {actionDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setActionDialog(false)}>
          <div className="bg-white rounded-lg border border-background-200/70 shadow-lg max-w-md w-full p-5" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2 className="text-sm font-semibold text-foreground-950 mb-3">Review action — demonstration</h2>
            <p className="text-xs text-foreground-500 mb-4">All actions are local demonstration only. No communication is sent.</p>
            <select value={actionType} onChange={e => setActionType(e.target.value)} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer mb-3">
              <option value="">Select action...</option>
              <option value="request_info">Request more information</option>
              <option value="accept">Accept for package preparation</option>
              <option value="accept_conditions">Accept with conditions</option>
              <option value="decline">Decline</option>
              <option value="pause">Pause</option>
            </select>
            <textarea value={actionReason} onChange={e => setActionReason(e.target.value)} placeholder="Reason (required)..." rows={2} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none resize-none mb-3" />
            <textarea value={actionConditions} onChange={e => setActionConditions(e.target.value)} placeholder="Conditions (optional)..." rows={2} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none resize-none mb-3" />
            <textarea value={actionNote} onChange={e => setActionNote(e.target.value)} placeholder="Internal note (optional)..." rows={2} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none resize-none mb-3" />
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

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-background-200/70 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DetailField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-foreground-400">{label}</p>
      <p className={`text-sm text-foreground-950 ${mono ? 'font-mono' : ''}`}>{value || '—'}</p>
    </div>
  );
}