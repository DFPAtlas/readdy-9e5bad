import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoDataSubjectRequests, DSR_STAGE_LABELS } from '@/data/adminData';

export default function AdminDataSubjectRequests() {
  const [search, setSearch] = useState('');
  let filtered = demoDataSubjectRequests;
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(d => d.reference.toLowerCase().includes(q) || d.linkedOrg.toLowerCase().includes(q)); }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Data-subject requests</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoDataSubjectRequests.length} requests — demonstration records</p>
        </div>
        <div className="relative max-w-sm mb-4">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search requests..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
        </div>

        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Reference</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Type</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Organisation</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Stage</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Owner</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden lg:table-cell">Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground-500 whitespace-nowrap">{d.reference}</td>
                    <td className="px-4 py-2.5 text-foreground-700 text-xs capitalize whitespace-nowrap">{d.requestType}</td>
                    <td className="px-4 py-2.5 text-foreground-950 font-medium whitespace-nowrap">{d.linkedOrg}</td>
                    <td className="px-4 py-2.5"><span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary-100 text-secondary-900">{DSR_STAGE_LABELS[d.stage]}</span></td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs hidden md:table-cell whitespace-nowrap">{d.owner}</td>
                    <td className="px-4 py-2.5 text-foreground-500 text-xs hidden lg:table-cell whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-foreground-500 mt-4">Link: <a href="/data-subject-request" className="text-primary-600 hover:text-primary-700 cursor-pointer">Public rights-request page</a> | <a href="/complaints" className="text-primary-600 hover:text-primary-700 cursor-pointer">Complaints page</a></p>
      </div>
    </AdminLayout>
  );
}