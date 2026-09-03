import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoOrganisations, ADMIN_ORG_STATUS_LABELS, ADMIN_ORG_STATUS_COLORS } from '@/data/adminData';
import type { AdminOrganisation } from '@/data/adminData';

export default function AdminOrganisations() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  let filtered = demoOrganisations;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(o => o.name.toLowerCase().includes(q) || o.reference.toLowerCase().includes(q) || o.businessEmail.toLowerCase().includes(q));
  }
  if (statusFilter) filtered = filtered.filter(o => o.status === statusFilter);
  if (typeFilter) filtered = filtered.filter(o => o.type === typeFilter);

  function exportCSV() {
    const header = 'Name,Reference,Type,Status,Industry,Country,City,Created';
    const rows = filtered.map(o => `${o.name},${o.reference},${o.type},${ADMIN_ORG_STATUS_LABELS[o.status]},${o.industry},${o.country},${o.city},${o.createdAt}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dh_demo_organisations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-foreground-950">Organisations</h1>
            <p className="text-xs text-foreground-500 mt-0.5">{demoOrganisations.length} organisations — demonstration records</p>
          </div>
          <button onClick={exportCSV} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-download-line text-sm"></i> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search organisations..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400"
            />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All statuses</option>
            {Object.entries(ADMIN_ORG_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All types</option>
            <option value="buyer">Buyer</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Reference</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Type</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Industry</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Country</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden lg:table-cell">Created</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-foreground-500">No organisations found</td></tr>
                ) : (
                  filtered.map(org => (
                    <tr key={org.id} className="border-b border-background-100 hover:bg-background-50">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-md bg-background-100 flex items-center justify-center shrink-0">
                            <i className={`text-xs ${org.type === 'buyer' ? 'ri-shopping-bag-3-line' : 'ri-store-2-line'} text-foreground-500`}></i>
                          </div>
                          <span className="font-medium text-foreground-950 whitespace-nowrap">{org.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-foreground-500 font-mono text-xs whitespace-nowrap">{org.reference}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${org.type === 'buyer' ? 'bg-secondary-100 text-secondary-900' : 'bg-accent-100 text-accent-900'}`}>
                          {org.type === 'buyer' ? 'Buyer' : 'Supplier'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${ADMIN_ORG_STATUS_COLORS[org.status]}`}>
                          {ADMIN_ORG_STATUS_LABELS[org.status]}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-foreground-600 text-xs hidden md:table-cell whitespace-nowrap">{org.industry}</td>
                      <td className="px-4 py-2.5 text-foreground-600 text-xs hidden md:table-cell whitespace-nowrap">{org.country}</td>
                      <td className="px-4 py-2.5 text-foreground-500 text-xs hidden lg:table-cell whitespace-nowrap">{new Date(org.createdAt).toLocaleDateString('en-GB')}</td>
                      <td className="px-4 py-2.5">
                        <Link to={`/admin/organisations/${org.id}`} className="text-primary-600 hover:text-primary-700 text-xs font-medium whitespace-nowrap cursor-pointer">View</Link>
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