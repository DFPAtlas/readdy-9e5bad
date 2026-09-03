import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoOrganisations, ADMIN_ORG_STATUS_LABELS, ADMIN_ORG_STATUS_COLORS, generateAdminRef } from '@/data/adminData';
import type { AdminOrganisation, AdminNote } from '@/data/adminData';
import { getAdminSession, addAuditEvent } from '@/utils/adminStorage';

type OrgTab = 'overview' | 'verification' | 'users' | 'intended_use' | 'packages' | 'access_requests' | 'licences' | 'billing' | 'compliance' | 'documents' | 'activity';

const TABS: { key: OrgTab; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: 'ri-information-line' },
  { key: 'verification', label: 'Verification', icon: 'ri-shield-check-line' },
  { key: 'users', label: 'Users', icon: 'ri-team-line' },
  { key: 'intended_use', label: 'Intended Use', icon: 'ri-focus-2-line' },
  { key: 'packages', label: 'Packages', icon: 'ri-archive-line' },
  { key: 'access_requests', label: 'Access Requests', icon: 'ri-key-2-line' },
  { key: 'licences', label: 'Licences', icon: 'ri-file-list-3-line' },
  { key: 'billing', label: 'Billing', icon: 'ri-bank-card-line' },
  { key: 'compliance', label: 'Compliance', icon: 'ri-shield-flash-line' },
  { key: 'documents', label: 'Documents', icon: 'ri-file-text-line' },
  { key: 'activity', label: 'Activity', icon: 'ri-history-line' },
];

export default function AdminOrganisationDetail() {
  const { organisationId } = useParams<{ organisationId: string }>();
  const org = demoOrganisations.find(o => o.id === organisationId);
  const [tab, setTab] = useState<OrgTab>('overview');
  const [statusDialog, setStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');
  const [statusNotes, setStatusNotes] = useState<AdminNote[]>([]);
  const session = getAdminSession();

  if (!org) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <h1 className="text-lg font-semibold text-foreground-950 mb-2">Organisation not found</h1>
          <p className="text-sm text-foreground-500 mb-4">The requested organisation does not exist in demonstration data.</p>
          <Link to="/admin/organisations" className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer">Return to organisations</Link>
        </div>
      </AdminLayout>
    );
  }

  function handleStatusChange() {
    if (!newStatus || !statusReason.trim()) return;
    const event = {
      id: generateAdminRef('AE'),
      timestamp: new Date().toISOString(),
      actor: session?.displayName || 'Administrator',
      action: 'org_status_change' as const,
      entity: 'Organisation',
      entityRef: org!.reference,
      previousValue: ADMIN_ORG_STATUS_LABELS[org!.status],
      newValue: ADMIN_ORG_STATUS_LABELS[newStatus as keyof typeof ADMIN_ORG_STATUS_LABELS] || newStatus,
      reason: statusReason,
      environment: 'demonstration',
      isDemo: true,
    };
    addAuditEvent(event);
    setStatusNotes(prev => [...prev, {
      id: `n-${Date.now()}`,
      author: session?.displayName || 'Administrator',
      body: `Status changed to ${ADMIN_ORG_STATUS_LABELS[newStatus as keyof typeof ADMIN_ORG_STATUS_LABELS] || newStatus}. Reason: ${statusReason}. Not sent — local demonstration action.`,
      isInternal: true,
      createdAt: new Date().toISOString(),
    }]);
    setStatusDialog(false);
    setNewStatus('');
    setStatusReason('');
  }

  const allNotes = [...(org.notes || []), ...statusNotes];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-foreground-500 mb-4">
          <Link to="/admin" className="hover:text-foreground-700 cursor-pointer">Admin</Link>
          <span>/</span>
          <Link to="/admin/organisations" className="hover:text-foreground-700 cursor-pointer">Organisations</Link>
          <span>/</span>
          <span className="text-foreground-950 font-medium">{org.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-foreground-950">{org.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs font-mono text-foreground-500">{org.reference}</span>
              <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${org.type === 'buyer' ? 'bg-secondary-100 text-secondary-900' : 'bg-accent-100 text-accent-900'}`}>
                {org.type === 'buyer' ? 'Buyer' : 'Supplier'}
              </span>
              <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${ADMIN_ORG_STATUS_COLORS[org.status]}`}>
                {ADMIN_ORG_STATUS_LABELS[org.status]}
              </span>
            </div>
          </div>
          <button onClick={() => setStatusDialog(true)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-edit-line text-sm"></i> Change status
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-5 border-b border-background-200/70 pb-0">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-md transition-colors whitespace-nowrap cursor-pointer ${
                tab === t.key ? 'bg-white border border-background-200/70 border-b-white -mb-[1px] text-foreground-950' : 'text-foreground-500 hover:text-foreground-700 hover:bg-background-100'
              }`}
            >
              <span className="w-3.5 h-3.5 flex items-center justify-center"><i className={`${t.icon} text-xs`}></i></span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white border border-background-200/70 rounded-lg p-4 md:p-5">
          {tab === 'overview' && <OverviewTab org={org} />}
          {tab === 'verification' && <VerificationTab org={org} notes={allNotes} />}
          {tab === 'users' && <UsersTab org={org} />}
          {tab === 'intended_use' && <IntendedUseTab org={org} />}
          {tab === 'packages' && <PackagesTab org={org} />}
          {tab === 'access_requests' && <AccessRequestsTab org={org} />}
          {tab === 'licences' && <LicencesTab org={org} />}
          {tab === 'billing' && <BillingTab org={org} />}
          {tab === 'compliance' && <ComplianceTab org={org} />}
          {tab === 'documents' && <DocumentsTab />}
          {tab === 'activity' && <ActivityTab org={org} notes={allNotes} />}
        </div>
      </div>

      {/* Status change dialog */}
      {statusDialog && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setStatusDialog(false)}>
          <div className="bg-white rounded-lg border border-background-200/70 shadow-lg max-w-md w-full p-5" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <h2 className="text-sm font-semibold text-foreground-950 mb-3">Change organisation status</h2>
            <p className="text-xs text-foreground-500 mb-4">Demonstration only — no real verification action.</p>
            <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer mb-3">
              <option value="">Select status...</option>
              {Object.entries(ADMIN_ORG_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <textarea value={statusReason} onChange={e => setStatusReason(e.target.value)} placeholder="Reason for status change..." rows={3} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400 resize-none mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setStatusDialog(false)} className="px-3 py-2 text-xs font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
              <button onClick={handleStatusChange} disabled={!newStatus || !statusReason.trim()} className="px-3 py-2 text-xs font-medium bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 disabled:opacity-50 cursor-pointer whitespace-nowrap">Confirm — local action</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function OverviewTab({ org }: { org: AdminOrganisation }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Legal name" value={org.name} />
      <Field label="Trading name" value={org.tradingName} />
      <Field label="Organisation type" value={org.orgType} />
      <Field label="Country" value={org.country} />
      <Field label="Registration number" value={org.registrationNumber} />
      <Field label="Website" value={org.website} />
      <Field label="Industry" value={org.industry} />
      <Field label="Size" value={org.size} />
      <Field label="City" value={org.city} />
      <Field label="Business email" value={org.businessEmail} />
      <Field label="Compliance status" value={org.complianceStatus} />
      <Field label="Billing status" value={org.billingStatus} />
      <Field label="Created" value={new Date(org.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
      <Field label="Last activity" value={new Date(org.lastActivity).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
    </div>
  );
}

function VerificationTab({ org, notes }: { org: AdminOrganisation; notes: AdminNote[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-2">Verification status</h3>
        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${ADMIN_ORG_STATUS_COLORS[org.status]}`}>
          {ADMIN_ORG_STATUS_LABELS[org.status]}
        </span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-2">Notes</h3>
        <p className="text-sm text-foreground-600 bg-background-50 rounded-md p-3">{org.verificationNotes || 'No verification notes.'}</p>
      </div>
      {org.conditions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground-950 mb-2">Conditions</h3>
          <ul className="list-disc list-inside text-sm text-foreground-600 space-y-1">
            {org.conditions.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}
      {notes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground-950 mb-2">Status change history</h3>
          <div className="space-y-2">
            {notes.map(n => (
              <div key={n.id} className="bg-background-50 rounded-md p-3 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground-700">{n.author}</span>
                  <span className="text-foreground-400">{new Date(n.createdAt).toLocaleString('en-GB')}</span>
                </div>
                <p className="text-foreground-600">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UsersTab({ org }: { org: AdminOrganisation }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground-950">Organisation users ({org.users.length})</h3>
      </div>
      {org.users.length === 0 ? (
        <p className="text-sm text-foreground-500">No users recorded.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-100 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Name</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Email</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Role</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Last active</th>
              </tr>
            </thead>
            <tbody>
              {org.users.map(u => (
                <tr key={u.id} className="border-b border-background-100">
                  <td className="px-3 py-2 text-foreground-950 font-medium whitespace-nowrap">{u.name}</td>
                  <td className="px-3 py-2 text-foreground-600 text-xs whitespace-nowrap">{u.email}</td>
                  <td className="px-3 py-2 text-foreground-600 text-xs whitespace-nowrap">{u.role}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${u.status === 'active' ? 'bg-accent-100 text-accent-900' : 'bg-foreground-100 text-foreground-600'}`}>
                      {u.status === 'active' ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-foreground-500 text-xs whitespace-nowrap">{u.lastActive ? new Date(u.lastActive).toLocaleDateString('en-GB') : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function IntendedUseTab({ org }: { org: AdminOrganisation }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground-950">Intended-use declaration</h3>
      {org.type === 'buyer' ? (
        <div className="bg-background-50 rounded-md p-4 text-sm text-foreground-600">
          <p>Buyer organisation. Intended use captured during onboarding and access-request workflows.</p>
          <p className="mt-2">Review individual access requests for detailed purpose, scope, and retention declarations.</p>
          <Link to="/admin/access-requests" className="inline-block mt-2 text-primary-600 hover:text-primary-700 text-xs font-medium cursor-pointer">View access requests</Link>
        </div>
      ) : (
        <div className="bg-background-50 rounded-md p-4 text-sm text-foreground-600">
          <p>Supplier organisation. Product details and intended buyer types declared during supplier application.</p>
          <Link to="/admin/supplier-applications" className="inline-block mt-2 text-primary-600 hover:text-primary-700 text-xs font-medium cursor-pointer">View supplier applications</Link>
        </div>
      )}
    </div>
  );
}

function PackagesTab({ org }: { org: AdminOrganisation }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground-950 mb-3">
        {org.type === 'buyer' ? 'Licensed packages' : 'Published packages'}
      </h3>
      {org.type === 'buyer' ? (
        org.licences.length === 0 ? <p className="text-sm text-foreground-500">No active licences.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Package</th>
                  <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Supplier</th>
                  <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Period</th>
                </tr>
              </thead>
              <tbody>
                {org.licences.map((l, i) => (
                  <tr key={i} className="border-b border-background-100">
                    <td className="px-3 py-2 text-foreground-950 font-medium whitespace-nowrap">{l.packageName}</td>
                    <td className="px-3 py-2 text-foreground-600 text-xs whitespace-nowrap">{l.supplier}</td>
                    <td className="px-3 py-2"><span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent-100 text-accent-900">{l.status}</span></td>
                    <td className="px-3 py-2 text-foreground-500 text-xs whitespace-nowrap">{l.startDate} – {l.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <p className="text-sm text-foreground-500">
          <Link to="/admin/packages" className="text-primary-600 hover:text-primary-700 cursor-pointer">View supplier packages in package moderation</Link>
        </p>
      )}
    </div>
  );
}

function AccessRequestsTab({ org }: { org: AdminOrganisation }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground-950 mb-3">Access requests</h3>
      <p className="text-sm text-foreground-600 bg-background-50 rounded-md p-4">
        {org.type === 'buyer'
          ? 'View this buyer\'s access requests in the access-request oversight area.'
          : 'View access requests involving this supplier\'s packages in the access-request oversight area.'}
      </p>
      <Link to="/admin/access-requests" className="inline-block mt-2 text-primary-600 hover:text-primary-700 text-xs font-medium cursor-pointer">View all access requests</Link>
    </div>
  );
}

function LicencesTab({ org }: { org: AdminOrganisation }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground-950 mb-3">Licences</h3>
      {org.licences.length === 0 ? (
        <p className="text-sm text-foreground-500">No licences recorded.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-100 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Package</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Supplier</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">Start</th>
                <th className="px-3 py-2 text-xs font-semibold text-foreground-500 whitespace-nowrap">End</th>
              </tr>
            </thead>
            <tbody>
              {org.licences.map((l, i) => (
                <tr key={i} className="border-b border-background-100">
                  <td className="px-3 py-2 text-foreground-950 font-medium">{l.packageName}</td>
                  <td className="px-3 py-2 text-foreground-600 text-xs">{l.supplier}</td>
                  <td className="px-3 py-2"><span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent-100 text-accent-900">{l.status}</span></td>
                  <td className="px-3 py-2 text-foreground-500 text-xs">{l.startDate}</td>
                  <td className="px-3 py-2 text-foreground-500 text-xs">{l.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function BillingTab({ org }: { org: AdminOrganisation }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground-950">Billing overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-background-50 rounded-md p-3">
          <p className="text-xs text-foreground-500">Billing status</p>
          <p className="text-sm font-medium text-foreground-950">{org.billingStatus}</p>
        </div>
        <div className="bg-background-50 rounded-md p-3">
          <p className="text-xs text-foreground-500">Billing contact</p>
          <p className="text-sm font-medium text-foreground-950">{org.contacts[0]?.email || 'Not set'}</p>
        </div>
      </div>
      <Link to="/admin/billing" className="inline-block text-primary-600 hover:text-primary-700 text-xs font-medium cursor-pointer">View all billing records</Link>
    </div>
  );
}

function ComplianceTab({ org }: { org: AdminOrganisation }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground-950">Compliance status</h3>
      <div className="bg-background-50 rounded-md p-3">
        <p className="text-sm text-foreground-600">Status: <span className="font-medium">{org.complianceStatus}</span></p>
      </div>
      <Link to="/admin/compliance" className="inline-block text-primary-600 hover:text-primary-700 text-xs font-medium cursor-pointer">View compliance cases</Link>
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground-950">Document metadata</h3>
      <p className="text-sm text-foreground-500 bg-background-50 rounded-md p-4">
        Secure document upload will be connected in a later backend phase. Document metadata only.
      </p>
    </div>
  );
}

function ActivityTab({ org, notes }: { org: AdminOrganisation; notes: AdminNote[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground-950 mb-3">Activity and notes</h3>
      {notes.length === 0 ? (
        <p className="text-sm text-foreground-500">No activity recorded.</p>
      ) : (
        <div className="space-y-2">
          {notes.map(n => (
            <div key={n.id} className="bg-background-50 rounded-md p-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground-700">{n.author}</span>
                <span className="text-foreground-400">{new Date(n.createdAt).toLocaleString('en-GB')}</span>
                {n.isInternal && <span className="inline-flex px-1 py-0.5 rounded text-[10px] bg-secondary-100 text-secondary-900">Internal</span>}
              </div>
              <p className="text-foreground-600">{n.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-foreground-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-foreground-950">{value || '—'}</p>
    </div>
  );
}