import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoAdminAccessRequests, AR_STATUS_LABELS } from '@/data/adminData';

export default function AdminAccessRequests() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  let filtered = demoAdminAccessRequests;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(r => r.reference.toLowerCase().includes(q) || r.buyerOrg.toLowerCase().includes(q) || r.packageName.toLowerCase().includes(q) || r.purpose.toLowerCase().includes(q));
  }
  if (statusFilter) filtered = filtered.filter(r => r.status === statusFilter);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Access requests</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoAdminAccessRequests.length} requests — demonstration records</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search requests..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All statuses</option>
            {Object.entries(AR_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Reference</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Buyer</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Package</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Supplier</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Risk</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden lg:table-cell">Updated</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-foreground-500">No requests found</td></tr>
                ) : (
                  filtered.map(r => (
                    <tr key={r.id} className="border-b border-background-100 hover:bg-background-50">
                      <td className="px-4 py-2.5 font-mono text-xs text-foreground-500 whitespace-nowrap">{r.reference}</td>
                      <td className="px-4 py-2.5 text-foreground-950 font-medium whitespace-nowrap">{r.buyerOrg}</td>
                      <td className="px-4 py-2.5 text-foreground-700 text-xs max-w-[180px] truncate">{r.packageName}</td>
                      <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{r.supplierName}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          r.status === 'approved_demo' ? 'bg-accent-100 text-accent-900' :
                          r.status === 'compliance_review_demo' ? 'bg-secondary-100 text-secondary-900' :
                          'bg-foreground-100 text-foreground-600'
                        }`}>{AR_STATUS_LABELS[r.status]}</span>
                      </td>
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        {r.riskFlags.length > 0 ? (
                          <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent-100 text-accent-900">{r.riskFlags.length} flags</span>
                        ) : (
                          <span className="text-xs text-foreground-400">None</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-foreground-500 text-xs hidden lg:table-cell whitespace-nowrap">{new Date(r.updatedAt).toLocaleDateString('en-GB')}</td>
                      <td className="px-4 py-2.5">
                        <Link to={`/admin/access-requests/${r.id}`} className="text-primary-600 hover:text-primary-700 text-xs font-medium whitespace-nowrap cursor-pointer">View</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}