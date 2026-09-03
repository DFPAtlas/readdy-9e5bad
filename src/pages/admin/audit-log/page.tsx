import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { getAuditEvents } from '@/utils/adminStorage';

export default function AdminAuditLog() {
  const events = getAuditEvents();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  let filtered = events;
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(e => e.entity.toLowerCase().includes(q) || e.entityRef.toLowerCase().includes(q) || e.actor.toLowerCase().includes(q) || e.detail?.toLowerCase().includes(q)); }
  if (actionFilter) filtered = filtered.filter(e => e.action === actionFilter);

  function exportCSV() {
    const header = 'Timestamp,Actor,Action,Entity,Entity Ref,Previous,New,Reason,Environment';
    const rows = filtered.map(e => `${e.timestamp},${e.actor},${e.action},${e.entity},${e.entityRef},${e.previousValue},${e.newValue},${e.reason},${e.environment}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `dh_demo_audit_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const uniqueActions = [...new Set(events.map(e => e.action))];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-foreground-950">Audit log</h1>
            <p className="text-xs text-foreground-500 mt-0.5">{events.length} events — local demonstration activity only</p>
          </div>
          <button onClick={exportCSV} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-download-line text-sm"></i> Export CSV
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search audit events..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
          </div>
          <select value={actionFilter} onChange={e => setActionFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All actions</option>
            {uniqueActions.map(a => <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>)}
          </select>
        </div>

        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Timestamp</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actor</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Action</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Entity</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Ref</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Previous → New</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Reason</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="px-4 py-2.5 text-foreground-500 text-xs whitespace-nowrap">{new Date(e.timestamp).toLocaleString('en-GB')}</td>
                    <td className="px-4 py-2.5 text-foreground-700 text-xs whitespace-nowrap">{e.actor}</td>
                    <td className="px-4 py-2.5 text-foreground-950 text-xs whitespace-nowrap">{e.action.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{e.entity}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground-500 whitespace-nowrap">{e.entityRef}</td>
                    <td className="px-4 py-2.5 text-xs whitespace-nowrap"><span className="text-foreground-500">{e.previousValue}</span> <span className="text-foreground-400">→</span> <span className="text-foreground-950 font-medium">{e.newValue}</span></td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs max-w-[200px] truncate">{e.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-foreground-400 mt-3">This is a local demonstration activity log, not a production audit record. Events are created by admin actions within this browser session.</p>
      </div>
    </AdminLayout>
  );
}