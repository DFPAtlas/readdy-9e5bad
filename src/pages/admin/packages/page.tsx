import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoPackageReviews, PACKAGE_STATUS_LABELS } from '@/data/adminData';

export default function AdminPackages() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  let filtered = demoPackageReviews;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.supplierName.toLowerCase().includes(q));
  }
  if (statusFilter) filtered = filtered.filter(p => p.status === statusFilter);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Packages</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoPackageReviews.length} packages — demonstration records</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All statuses</option>
            {Object.entries(PACKAGE_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Package</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Supplier</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Category</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Version</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Reviewer</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-foreground-500">No packages found</td></tr>
                ) : (
                  filtered.map(pkg => (
                    <tr key={pkg.id} className="border-b border-background-100 hover:bg-background-50">
                      <td className="px-4 py-2.5 text-foreground-950 font-medium whitespace-nowrap">{pkg.name}</td>
                      <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{pkg.supplierName}</td>
                      <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{pkg.category}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          pkg.status === 'published_demo' ? 'bg-accent-100 text-accent-900' :
                          pkg.status === 'under_review_demo' ? 'bg-secondary-100 text-secondary-900' :
                          'bg-foreground-100 text-foreground-600'
                        }`}>{PACKAGE_STATUS_LABELS[pkg.status]}</span>
                      </td>
                      <td className="px-4 py-2.5 text-foreground-500 text-xs hidden md:table-cell whitespace-nowrap">{pkg.version}</td>
                      <td className="px-4 py-2.5 text-foreground-600 text-xs hidden md:table-cell whitespace-nowrap">{pkg.reviewer}</td>
                      <td className="px-4 py-2.5">
                        <Link to={`/admin/packages/${pkg.id}`} className="text-primary-600 hover:text-primary-700 text-xs font-medium whitespace-nowrap cursor-pointer">Review</Link>
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