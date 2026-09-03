import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoSupportCases } from '@/data/adminData';
import { getAdminSession } from '@/utils/adminStorage';

export default function AdminSupport() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const session = getAdminSession();

  let filtered = demoSupportCases;
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(s => s.reference.toLowerCase().includes(q) || s.subject.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.linkedOrg.toLowerCase().includes(q)); }
  if (catFilter) filtered = filtered.filter(s => s.category === catFilter);

  function addDraftResponse(caseId: string) {
    if (!replyText.trim()) return;
    setReplyText('');
    setExpanded(null);
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Support cases</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoSupportCases.length} cases — demonstration records</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cases..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All categories</option>
            <option value="buyer">Buyer</option><option value="supplier">Supplier</option><option value="technical">Technical</option><option value="billing">Billing</option><option value="compliance">Compliance</option><option value="general">General</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.map(s => (
            <div key={s.id} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-foreground-500">{s.reference}</span>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium capitalize bg-foreground-100 text-foreground-600`}>{s.category}</span>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${s.priority === 'high' ? 'bg-accent-100 text-accent-900' : 'bg-secondary-100 text-secondary-900'}`}>{s.priority}</span>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${s.status === 'open' ? 'bg-accent-100 text-accent-900' : 'bg-secondary-100 text-secondary-900'}`}>{s.status.replace(/_/g, ' ')}</span>
                  </div>
                  <h2 className="text-sm font-semibold text-foreground-950">{s.subject}</h2>
                  <p className="text-xs text-foreground-600 mt-1">{s.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs text-foreground-500">
                    {s.linkedOrg && <span>Org: {s.linkedOrg}</span>}
                    <span>Owner: {s.owner}</span>
                    <span>Created: {new Date(s.createdAt).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              </div>
              {s.notes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-background-100 space-y-2">
                  {s.notes.map(n => (
                    <div key={n.id} className="bg-background-50 rounded-md p-2 text-xs">
                      <span className="font-medium text-foreground-700">{n.author}</span> · <span className="text-foreground-400">{new Date(n.createdAt).toLocaleString('en-GB')}</span>
                      <p className="text-foreground-600 mt-0.5">{n.body}</p>
                    </div>
                  ))}
                </div>
              )}
              {s.draftResponses.length > 0 && (
                <div className="mt-3 pt-3 border-t border-background-100 space-y-2">
                  {s.draftResponses.map(dr => (
                    <div key={dr.id} className="bg-accent-50/50 rounded-md p-2 text-xs border border-accent-100">
                      <span className="font-medium text-accent-700">Draft only — not sent</span>
                      <p className="text-foreground-600 mt-0.5">{dr.body}</p>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium cursor-pointer">Add note / draft response</button>
              {expanded === s.id && (
                <div className="mt-2 space-y-2">
                  <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Draft response (not sent)..." rows={2} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none resize-none" />
                  <div className="flex gap-2">
                    <button onClick={() => addDraftResponse(s.id)} disabled={!replyText.trim()} className="px-3 py-1.5 text-xs font-medium bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 disabled:opacity-50 cursor-pointer whitespace-nowrap">Save draft</button>
                    <button onClick={() => setExpanded(null)} className="px-3 py-1.5 text-xs font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}