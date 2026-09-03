import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoAccessRequests, ACCESS_REQUEST_STATUS_LABELS, ACCESS_REQUEST_STATUS_COLORS } from '@/data/buyerData';
import { getOrganisationDrafts } from '@/utils/accessRequestStorage';
import { FORM_STATUS_LABELS, FORM_STATUS_COLORS } from '@/data/accessRequestTypes';
import type { AccessRequestDraft } from '@/data/accessRequestTypes';

interface MergedRequest {
  id: string;
  reference: string;
  packageName: string;
  supplierName: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  updatedAt: string;
  isLocal: boolean;
  isDemo: boolean;
}

export default function BuyerAccessRequests() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const navigate = useNavigate();

  const allRequests = useMemo((): MergedRequest[] => {
    const localDrafts = getOrganisationDrafts();
    const local: MergedRequest[] = localDrafts.map((d) => ({
      id: d.id,
      reference: d.reference || 'Draft — no reference',
      packageName: d.packageName,
      supplierName: d.supplierName,
      status: d.status,
      statusLabel: FORM_STATUS_LABELS[d.status] || d.status,
      statusColor: FORM_STATUS_COLORS[d.status] || 'bg-foreground-100 text-foreground-700',
      updatedAt: d.updatedAt,
      isLocal: true,
      isDemo: false,
    }));

    const demo: MergedRequest[] = demoAccessRequests.map((ar) => ({
      id: ar.id,
      reference: ar.reference,
      packageName: ar.packageName,
      supplierName: ar.supplierName,
      status: ar.status,
      statusLabel: ACCESS_REQUEST_STATUS_LABELS[ar.status],
      statusColor: ACCESS_REQUEST_STATUS_COLORS[ar.status],
      updatedAt: ar.updatedAt,
      isLocal: false,
      isDemo: true,
    }));

    return [...local, ...demo];
  }, []);

  const filtered = useMemo(() => {
    let list = [...allRequests];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a => a.packageName.toLowerCase().includes(q) || a.reference.toLowerCase().includes(q) || a.supplierName.toLowerCase().includes(q));
    }
    if (statusFilter) {
      list = list.filter(a => a.status === statusFilter);
    }
    list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return list;
  }, [search, statusFilter, allRequests]);

  const statusOptions = useMemo(() => {
    const seen = new Set(allRequests.map(a => a.status));
    return Array.from(seen);
  }, [allRequests]);

  function handleRowClick(id: string, isLocal: boolean) {
    navigate(`/app/buyer/access-requests/${id}`);
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">Access Requests</h1>
              <p className="text-sm text-foreground-500 mt-1">{filtered.length} request{filtered.length !== 1 ? 's' : ''} — {allRequests.filter(a => a.isLocal).length} local, {allRequests.filter(a => a.isDemo).length} demonstration</p>
            </div>
            <Link to="/app/buyer/marketplace" className="px-3 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
              New request <i className="ri-add-line ml-1"></i>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by package or reference..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-700 cursor-pointer">
              <option value="">All statuses</option>
              {statusOptions.map(s => {
                const label = ACCESS_REQUEST_STATUS_LABELS[s as keyof typeof ACCESS_REQUEST_STATUS_LABELS] || FORM_STATUS_LABELS[s as keyof typeof FORM_STATUS_LABELS] || s;
                return <option key={s} value={s}>{label}</option>;
              })}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-key-2-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No access requests found</p>
              <p className="text-sm text-foreground-400 mt-1 mb-4">Start a new access request from the marketplace.</p>
              <Link to="/app/buyer/marketplace" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 whitespace-nowrap">Browse marketplace <i className="ri-arrow-right-line ml-1"></i></Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200/70 text-left">
                    <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Reference</th>
                    <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Package</th>
                    <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Supplier</th>
                    <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Status</th>
                    <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Type</th>
                    <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Updated</th>
                    <th className="py-3 font-medium text-foreground-500 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ar) => (
                    <tr key={ar.id} className="border-b border-background-100 hover:bg-background-50">
                      <td className="py-3 pr-3">
                        <span className="text-foreground-700 font-mono text-xs whitespace-nowrap">{ar.reference}</span>
                      </td>
                      <td className="py-3 pr-3 text-foreground-700 max-w-[200px] truncate">{ar.packageName}</td>
                      <td className="py-3 pr-3 text-foreground-500 whitespace-nowrap">{ar.supplierName}</td>
                      <td className="py-3 pr-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${ar.statusColor}`}>
                          {ar.statusLabel}
                        </span>
                      </td>
                      <td className="py-3 pr-3">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap ${ar.isLocal ? 'bg-secondary-100 text-secondary-700' : 'bg-foreground-100 text-foreground-600'}`}>
                          {ar.isLocal ? 'Local' : 'Demo'}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-foreground-500 whitespace-nowrap">{formatDate(ar.updatedAt)}</td>
                      <td className="py-3">
                        <Link
                          to={`/app/buyer/access-requests/${ar.id}`}
                          className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap"
                        >
                          View <i className="ri-arrow-right-line"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty state for local drafts */}
          {allRequests.filter(a => a.isLocal).length === 0 && (
            <div className="mt-6 p-4 rounded-lg border border-dashed border-background-200/70 text-center">
              <p className="text-xs text-foreground-500">
                No local drafts yet. Start a new access request to create one.
              </p>
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}