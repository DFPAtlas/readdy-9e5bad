import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { getDraft, withdrawDraft, duplicateDraft, createRevisedDraft, deleteDraft } from '@/utils/accessRequestStorage';
import { FORM_STATUS_LABELS, FORM_STATUS_COLORS, WORKFLOW_STAGES, STAGE_LABELS, DOCUMENT_TYPE_LABELS, generateLocalId } from '@/data/accessRequestTypes';
import type { AccessRequestDraft, AccessRequestMessage } from '@/data/accessRequestTypes';

type DetailTab = 'overview' | 'purpose' | 'users' | 'delivery' | 'sharing' | 'risk' | 'security' | 'conditions' | 'messages' | 'history';

const TABS: { key: DetailTab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'purpose', label: 'Purpose & scope' },
  { key: 'users', label: 'Users & systems' },
  { key: 'delivery', label: 'Delivery & retention' },
  { key: 'sharing', label: 'Sharing & risk' },
  { key: 'security', label: 'Security & documents' },
  { key: 'conditions', label: 'Conditions' },
  { key: 'messages', label: 'Messages' },
  { key: 'history', label: 'History' },
];

export default function AccessRequestDetail() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = (searchParams.get('tab') || 'overview') as DetailTab;
  const validTabs: DetailTab[] = ['overview', 'purpose', 'users', 'delivery', 'sharing', 'risk', 'security', 'conditions', 'messages', 'history'];
  const initialTab = validTabs.includes(tabFromUrl) ? tabFromUrl : 'overview';
  const [draft, setDraft] = useState<AccessRequestDraft | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>(initialTab);
  const [loading, setLoading] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (requestId) {
      const d = getDraft(requestId);
      setDraft(d);
    }
    setLoading(false);
  }, [requestId]);

  if (loading) {
    return <BuyerRouteGuard><BuyerPortalLayout><div className="flex items-center justify-center min-h-[400px]"><i className="ri-loader-4-line animate-spin text-2xl text-foreground-400"></i></div></BuyerPortalLayout></BuyerRouteGuard>;
  }

  if (!draft) {
    return (
      <BuyerRouteGuard><BuyerPortalLayout>
        <div className="p-6 max-w-lg mx-auto text-center">
          <p className="text-foreground-700 font-medium">Request not found.</p>
          <Link to="/app/buyer/access-requests" className="mt-4 inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">Back to requests</Link>
        </div>
      </BuyerPortalLayout></BuyerRouteGuard>
    );
  }

  const isSubmitted = draft.status !== 'draft';
  const isDraft = draft.status === 'draft';
  const canWithdraw = draft.status === 'draft' || draft.status === 'submitted_demo';

  function handleWithdraw() {
    if (!withdrawReason.trim()) return;
    const updated = withdrawDraft(draft!.id, withdrawReason);
    if (updated) setDraft(updated);
    setShowWithdraw(false);
    setWithdrawReason('');
  }

  function handleDuplicate() {
    const dup = duplicateDraft(draft!.id);
    if (dup) navigate(`/app/buyer/access-requests/${dup.id}/edit`);
  }

  function handleRevise() {
    const rev = createRevisedDraft(draft!.id);
    if (rev) navigate(`/app/buyer/access-requests/${rev.id}/edit`);
  }

  function handleDelete() {
    deleteDraft(draft!.id);
    navigate('/app/buyer/access-requests');
  }

  function handleReply() {
    if (!replyText.trim()) return;
    const msg: AccessRequestMessage = {
      id: generateLocalId(),
      direction: 'buyer',
      sender: 'Current user',
      body: replyText,
      createdAt: new Date().toISOString(),
      isDemo: true,
      notSent: true,
    };
    const updated = { ...draft!, messages: [...draft!.messages, msg] };
    setDraft(updated);
    import('@/utils/accessRequestStorage').then(({ saveDraft: sd }) => sd(updated));
    setReplyText('');
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link to="/app/buyer/access-requests" className="text-sm text-foreground-500 hover:text-foreground-700 mb-1 inline-block">
                <i className="ri-arrow-left-line mr-1"></i> Back to requests
              </Link>
              <h1 className="text-xl font-bold text-foreground-950">{draft.packageName}</h1>
              <p className="text-xs font-mono text-foreground-500">{draft.reference || 'Draft — no reference'}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${FORM_STATUS_COLORS[draft.status]}`}>
                {FORM_STATUS_LABELS[draft.status]}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {isDraft && (
              <Link to={`/app/buyer/access-requests/${draft.id}/edit`} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
                Continue editing
              </Link>
            )}
            {isSubmitted && (
              <button onClick={handleRevise} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                Create revised draft
              </button>
            )}
            <button onClick={handleDuplicate} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
              Duplicate
            </button>
            {canWithdraw && (
              <button onClick={() => setShowWithdraw(true)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                Withdraw
              </button>
            )}
            <button onClick={() => window.print()} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
              <i className="ri-printer-line mr-1"></i> Print
            </button>
            {isDraft && (
              <button onClick={() => setShowDelete(true)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-accent-200/60 text-accent-700 hover:bg-accent-50 cursor-pointer whitespace-nowrap">
                Delete draft
              </button>
            )}
          </div>

          {/* Withdraw dialog */}
          {showWithdraw && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowWithdraw(false)}>
              <div className="bg-background-50 rounded-xl border border-background-200/70 shadow-lg w-full max-w-sm mx-4 p-5" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Withdraw request">
                <h3 className="text-sm font-semibold text-foreground-950 mb-3">Withdraw request</h3>
                <p className="text-xs text-foreground-600 mb-3">Please provide a reason for withdrawing this request.</p>
                <textarea value={withdrawReason} onChange={(e) => setWithdrawReason(e.target.value)} rows={3} className="w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400 mb-4" placeholder="Reason for withdrawal" />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowWithdraw(false)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-600 hover:bg-background-100 cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleWithdraw} disabled={!withdrawReason.trim()} className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent-500 text-background-50 hover:bg-accent-600 cursor-pointer disabled:opacity-50 disabled:cursor-default whitespace-nowrap">Confirm withdrawal</button>
                </div>
              </div>
            </div>
          )}

          {/* Delete dialog */}
          {showDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowDelete(false)}>
              <div className="bg-background-50 rounded-xl border border-background-200/70 shadow-lg w-full max-w-sm mx-4 p-5" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Delete draft">
                <h3 className="text-sm font-semibold text-foreground-950 mb-3">Delete draft</h3>
                <p className="text-xs text-foreground-600 mb-4">This will permanently delete this draft from your browser. This action cannot be undone.</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowDelete(false)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-600 hover:bg-background-100 cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleDelete} className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent-500 text-background-50 hover:bg-accent-600 cursor-pointer whitespace-nowrap">Delete draft</button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-background-200/70 mb-5 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-700'
                      : 'border-transparent text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="min-h-[300px]">
            {activeTab === 'overview' && <OverviewTab draft={draft} />}
            {activeTab === 'purpose' && <PurposeTab draft={draft} />}
            {activeTab === 'users' && <UsersTab draft={draft} />}
            {activeTab === 'delivery' && <DeliveryTab draft={draft} />}
            {activeTab === 'sharing' && <SharingTab draft={draft} />}
            {activeTab === 'risk' && <SharingTab draft={draft} />}
            {activeTab === 'security' && <SecurityTab draft={draft} />}
            {activeTab === 'conditions' && <ConditionsTab draft={draft} />}
            {activeTab === 'messages' && <MessagesTab draft={draft} replyText={replyText} setReplyText={setReplyText} handleReply={handleReply} />}
            {activeTab === 'history' && <HistoryTab draft={draft} />}
          </div>
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

// ── Tab Components ──

function OverviewTab({ draft }: { draft: AccessRequestDraft }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <Card title="Package"><p className="text-foreground-700">{draft.packageName}</p><p className="text-xs text-foreground-500">{draft.supplierName}</p></Card>
      <Card title="Status"><span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${FORM_STATUS_COLORS[draft.status]}`}>{FORM_STATUS_LABELS[draft.status]}</span></Card>
      <Card title="Reference"><span className="font-mono text-xs text-foreground-700">{draft.reference || '—'}</span></Card>
      <Card title="Created"><span className="text-foreground-700">{fmtDate(draft.createdAt)}</span></Card>
      <Card title="Submitted"><span className="text-foreground-700">{draft.submittedAt ? fmtDate(draft.submittedAt) : '—'}</span></Card>
      <Card title="Last saved"><span className="text-foreground-700">{draft.lastSavedAt ? fmtDate(draft.lastSavedAt) : '—'}</span></Card>
      {draft.requestTitle && <Card title="Request title"><span className="text-foreground-700">{draft.requestTitle}</span></Card>}
      {draft.originalRequestId && <Card title="Revised from"><span className="font-mono text-xs">{draft.originalRequestId}</span></Card>}
    </div>
  );
}

function PurposeTab({ draft }: { draft: AccessRequestDraft }) {
  return (
    <div className="space-y-4 text-sm">
      <Section title="Business purpose">
        <Kv label="Primary purpose" value={draft.primaryPurpose} />
        <Kv label="Department" value={draft.department} />
        <Kv label="Planned start" value={draft.plannedStartDate} />
        <Kv label="Duration" value={draft.expectedDuration} />
        <Kv label="Purpose may change" value={draft.purposeMayChange ? 'Yes' : 'No'} />
      </Section>
      <Section title="Detailed intended use"><p className="text-foreground-600 whitespace-pre-wrap">{draft.detailedIntendedUse || '—'}</p></Section>
      <Section title="Business problem"><p className="text-foreground-600 whitespace-pre-wrap">{draft.businessProblem || '—'}</p></Section>
      <Section title="Why this package"><p className="text-foreground-600">{draft.whyThisPackage || '—'}</p></Section>
      <Section title="Legal review"><p className="text-foreground-600 capitalize">{draft.legalReviewStatus.replace('_', ' ')}</p></Section>
    </div>
  );
}

function UsersTab({ draft }: { draft: AccessRequestDraft }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-foreground-900 mb-2">User groups ({draft.userGroups.length})</h3>
        {draft.userGroups.length === 0 ? <p className="text-xs text-foreground-400 italic">None</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-background-100 text-left"><th className="py-1.5 pr-2 font-medium text-foreground-500">Name</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Dept</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Users</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Type</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Role</th></tr></thead>
              <tbody>
                {draft.userGroups.map((ug) => (
                  <tr key={ug.id} className="border-b border-background-50"><td className="py-1.5 pr-2 text-foreground-700">{ug.name}</td><td className="py-1.5 pr-2 text-foreground-600">{ug.department}</td><td className="py-1.5 pr-2 text-foreground-600">{ug.numberOfUsers}</td><td className="py-1.5 pr-2 text-foreground-600">{ug.userType.replace('_', ' ')}</td><td className="py-1.5 pr-2 text-foreground-600">{ug.workflowRole}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground-900 mb-2">Systems ({draft.systems.length})</h3>
        {draft.systems.length === 0 ? <p className="text-xs text-foreground-400 italic">None</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-background-100 text-left"><th className="py-1.5 pr-2 font-medium text-foreground-500">Name</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Type</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Env</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Region</th><th className="py-1.5 pr-2 font-medium text-foreground-500">Purpose</th></tr></thead>
              <tbody>
                {draft.systems.map((s) => (
                  <tr key={s.id} className="border-b border-background-50"><td className="py-1.5 pr-2 text-foreground-700">{s.name}</td><td className="py-1.5 pr-2 text-foreground-600">{s.systemType}</td><td className="py-1.5 pr-2 text-foreground-600">{s.environment}</td><td className="py-1.5 pr-2 text-foreground-600">{s.hostingRegion}</td><td className="py-1.5 pr-2 text-foreground-600">{s.purpose}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function DeliveryTab({ draft }: { draft: AccessRequestDraft }) {
  return (
    <div className="space-y-4 text-sm">
      <Section title="Delivery">
        <Kv label="Preferred format" value={draft.preferredDeliveryFormat} />
        <Kv label="Backup format" value={draft.backupDeliveryFormat} />
        <Kv label="Integration" value={draft.integrationMethod} />
        <Kv label="Auth expectation" value={draft.authExpectation} />
        <Kv label="Technical contact" value={draft.technicalContact} />
        <Kv label="Frequency" value={draft.deliveryFrequency} />
      </Section>
      <Section title="Retention">
        <Kv label="Period" value={draft.proposedRetentionPeriod} />
        <Kv label="Reason" value={draft.retentionReason} />
        <Kv label="Deletion method" value={draft.deletionMethod} />
        <Kv label="Owner" value={draft.retentionOwner} />
        <Kv label="Supplier limits override" value={draft.supplierLimitsOverrideLonger ? 'Yes' : 'No'} />
      </Section>
    </div>
  );
}

function SharingTab({ draft }: { draft: AccessRequestDraft }) {
  const riskFlags = [
    ['Personal data', draft.involvesPersonalData],
    ['Sensitive attributes', draft.involvesSensitiveAttributes],
    ['Children/vulnerable', draft.involvesChildrenOrVulnerable],
    ['Location data', draft.involvesLocationMovementData],
    ['Large-scale profiling', draft.involvesLargeScaleProfiling],
    ['Dataset matching', draft.involvesDatasetMatching],
    ['Re-identification risk', draft.involvesReidentificationRisk],
    ['Automated decisions', draft.involvesAutomatedDecisions],
    ['Employment/housing/credit', draft.involvesEmploymentHousingCreditInsurance],
    ['Fraud/risk scoring', draft.involvesFraudRiskScoring],
    ['Marketing activation', draft.involvesMarketingActivation],
    ['Monitoring/surveillance', draft.involvesMonitoringSurveillance],
    ['International access', draft.involvesInternationalAccess],
    ['Significant effects', draft.involvesSignificantEffects],
  ];

  return (
    <div className="space-y-4 text-sm">
      <Section title="Sharing">
        <Kv label="Internal departments" value={draft.internalDepartments} />
        <Kv label="External organisations" value={draft.externalOrganisations} />
        <Kv label="Countries" value={draft.countriesInvolved} />
        <Kv label="Resale intended" value={draft.resaleOrSublicensing ? 'Yes' : 'No'} />
        <Kv label="Model training" value={draft.modelTrainingUse ? 'Yes' : 'No'} />
        <Kv label="Justification" value={draft.sharingJustification} />
      </Section>
      <Section title="Risk flags">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {riskFlags.map(([label, value]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className={value ? 'text-accent-700' : 'text-foreground-400'}>{value ? '✓' : '✗'}</span>
              <span className={value ? 'text-foreground-700' : 'text-foreground-400'}>{label}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Safeguards"><p className="text-foreground-600 whitespace-pre-wrap">{draft.safeguards || '—'}</p></Section>
    </div>
  );
}

function SecurityTab({ draft }: { draft: AccessRequestDraft }) {
  const controls = [
    ['MFA', draft.hasMfa], ['RBAC', draft.hasRbac], ['Encryption in transit', draft.hasEncryptionTransit],
    ['Encryption at rest', draft.hasEncryptionRest], ['Logging', draft.hasLogging], ['Key management', draft.hasKeyManagement],
    ['Secure development', draft.hasSecureDevelopment], ['Vulnerability mgmt', draft.hasVulnerabilityManagement],
    ['Incident response', draft.hasIncidentResponse], ['Backup & recovery', draft.hasBackupRecovery],
    ['Staff confidentiality', draft.hasStaffConfidentiality], ['Deletion process', draft.hasDeletionProcess],
    ['Processor controls', draft.hasProcessorControls],
  ];
  return (
    <div className="space-y-4 text-sm">
      <Section title="Security controls">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {controls.map(([label, value]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className={value ? 'text-accent-700' : 'text-foreground-400'}>{value ? '✓' : '✗'}</span>
              <span className={value ? 'text-foreground-700' : 'text-foreground-400'}>{label}</span>
            </div>
          ))}
        </div>
        <Kv label="Notes" value={draft.securityNotes} />
      </Section>
      <Section title={`Documents (${draft.documents.length})`}>
        {draft.documents.length === 0 ? <p className="text-xs text-foreground-400 italic">None</p> : (
          <div className="space-y-2">
            {draft.documents.map((doc) => (
              <div key={doc.id} className="p-2 rounded border border-background-200/70 text-xs">
                <p className="font-medium text-foreground-800">{doc.displayFilename}</p>
                <p className="text-foreground-500">{DOCUMENT_TYPE_LABELS[doc.docType]} · {doc.readiness} · {doc.confidentiality}</p>
                {doc.description && <p className="text-foreground-600 mt-0.5">{doc.description}</p>}
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function ConditionsTab({ draft }: { draft: AccessRequestDraft }) {
  if (draft.conditions.length === 0) {
    return <p className="text-sm text-foreground-500 italic py-8 text-center">No conditions have been set for this request.</p>;
  }
  return (
    <div className="space-y-2">
      {draft.conditions.map((c) => (
        <div key={c.id} className="p-3 rounded-lg border border-accent-200/60 bg-accent-50/30 flex items-start gap-2">
          <i className="ri-checkbox-circle-line text-accent-600 mt-0.5"></i>
          <div>
            <p className="text-sm text-foreground-800">{c.description}</p>
            <span className="text-[10px] text-foreground-400 capitalize">{c.category.replace('_', ' ')}</span>
          </div>
          {c.isDemo && <span className="ml-auto text-[10px] text-accent-600 bg-accent-50 px-1.5 py-0.5 rounded whitespace-nowrap">Demo</span>}
        </div>
      ))}
    </div>
  );
}

function MessagesTab({ draft, replyText, setReplyText, handleReply }: { draft: AccessRequestDraft; replyText: string; setReplyText: (v: string) => void; handleReply: () => void }) {
  return (
    <div>
      {draft.messages.length === 0 ? (
        <p className="text-sm text-foreground-500 italic py-8 text-center">No messages.</p>
      ) : (
        <div className="space-y-3 mb-4">
          {draft.messages.map((m) => (
            <div key={m.id} className={`p-3 rounded-lg border ${m.isDemo ? 'border-accent-200/60 bg-accent-50/30' : 'border-background-200/70'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-foreground-900">{m.sender}</span>
                <span className="text-[10px] text-foreground-400">{fmtDateTime(m.createdAt)}</span>
                {m.isDemo && <span className="text-[10px] text-accent-600 bg-accent-50 px-1.5 py-0.5 rounded whitespace-nowrap">Demonstration</span>}
                {m.notSent && <span className="text-[10px] text-foreground-500 bg-foreground-100 px-1.5 py-0.5 rounded whitespace-nowrap">Not sent — local demo</span>}
              </div>
              <p className="text-sm text-foreground-700 whitespace-pre-wrap">{m.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply box */}
      {draft.status !== 'withdrawn' && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={3}
            placeholder="Write a local demonstration reply (not sent)..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] text-foreground-400">Messages are stored locally and not transmitted.</p>
            <button onClick={handleReply} disabled={!replyText.trim()} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-default cursor-pointer whitespace-nowrap">
              Send reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryTab({ draft }: { draft: AccessRequestDraft }) {
  return (
    <div className="space-y-2">
      {draft.history.length === 0 ? (
        <p className="text-sm text-foreground-500 italic py-8 text-center">No history recorded.</p>
      ) : (
        draft.history.map((e) => (
          <div key={e.id} className="flex items-start gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-300 mt-1.5 shrink-0"></div>
            <div>
              <span className="font-medium text-foreground-800">{e.action}</span>
              <span className="text-foreground-500"> — {e.detail}</span>
              <p className="text-foreground-400">{fmtDateTime(e.createdAt)} · {e.actor}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ── Helpers ──
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="p-3 rounded-lg border border-background-200/70"><p className="text-xs text-foreground-500 mb-0.5">{title}</p>{children}</div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="p-4 rounded-lg border border-background-200/70 bg-background-50"><h3 className="text-sm font-semibold text-foreground-900 mb-2">{title}</h3>{children}</div>;
}

function Kv({ label, value }: { label: string; value: string | undefined | null }) {
  if (!value) return null;
  return <div className="flex gap-2 py-0.5"><span className="text-xs text-foreground-500 shrink-0 w-32">{label}</span><span className="text-xs text-foreground-700">{value}</span></div>;
}

function fmtDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}

function fmtDateTime(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return iso; }
}