import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoSecurityReports, SECURITY_STATUS_LABELS } from '@/data/adminData';

export default function AdminSecurityReports() {
  const [search, setSearch] = useState('');
  let filtered = demoSecurityReports;
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(s => s.reference.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) || s.issueType.toLowerCase().includes(q)); }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Security reports</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoSecurityReports.length} reports — demonstration records</p>
        </div>
        <div className="relative max-w-sm mb-4">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
        </div>
        <div className="space-y-4">
          {filtered.map(s => (
            <div key={s.id} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-foreground-500">{s.reference}</span>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${s.severity === 'critical' || s.severity === 'high' ? 'bg-accent-100 text-accent-900' : 'bg-secondary-100 text-secondary-900'}`}>{s.severity}</span>
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-foreground-100 text-foreground-600">{SECURITY_STATUS_LABELS[s.status]}</span>
                  </div>
                  <h2 className="text-sm font-semibold text-foreground-950">{s.issueType}</h2>
                </div>
              </div>
              <p className="text-sm text-foreground-600 mb-2">{s.summary}</p>
              <div className="flex flex-wrap gap-3 text-xs text-foreground-500">
                <span>Affected: {s.affectedFeature}</span>
                <span>Discovered: {new Date(s.discoveryDate).toLocaleDateString('en-GB')}</span>
                <span>Owner: {s.owner}</span>
                {s.ongoing && <span className="text-accent-700 font-medium">Ongoing</span>}
              </div>
              {s.notes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-background-100 space-y-2">
                  {s.notes.map(n => (
                    <div key={n.id} className="bg-background-50 rounded-md p-2 text-xs">
                      <div className="flex items-center gap-2 mb-0.5"><span className="font-medium text-foreground-700">{n.author}</span><span className="text-foreground-400">{new Date(n.createdAt).toLocaleString('en-GB')}</span></div>
                      <p className="text-foreground-600">{n.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}