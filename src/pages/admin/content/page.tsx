import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoContentItems } from '@/data/adminData';

export default function AdminContent() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPreview, setEditPreview] = useState('');

  let filtered = demoContentItems;
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.section.toLowerCase().includes(q)); }
  if (statusFilter) filtered = filtered.filter(c => c.status === statusFilter);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Content management</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoContentItems.length} items — demonstration metadata only</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search content..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All statuses</option>
            <option value="published_demo">Published — demo</option>
            <option value="draft">Draft</option>
            <option value="archived_demo">Archived — demo</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-foreground-100 text-foreground-600">{c.section}</span>
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary-100 text-secondary-900">{c.contentType}</span>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${c.status === 'published_demo' ? 'bg-accent-100 text-accent-900' : 'bg-foreground-100 text-foreground-600'}`}>{c.status.replace(/_demo/, ' — demo')}</span>
                  </div>
                  <h2 className="text-sm font-semibold text-foreground-950">{c.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-foreground-500">
                    <span>Edited: {new Date(c.lastEdited).toLocaleDateString('en-GB')} by {c.editor}</span>
                  </div>
                  {editingId === c.id ? (
                    <div className="mt-3 space-y-2">
                      <textarea value={editPreview} onChange={e => setEditPreview(e.target.value)} rows={2} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 outline-none resize-none" />
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingId(null); }} className="px-3 py-1.5 text-xs font-medium bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 cursor-pointer whitespace-nowrap">Save draft</button>
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-foreground-600 mt-2 bg-background-50 rounded-md p-2">{c.preview}</p>
                  )}
                </div>
                <button
                  onClick={() => { setEditingId(c.id); setEditPreview(c.preview); }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-background-200/70 text-xs font-medium text-foreground-600 hover:bg-background-100 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-edit-line text-xs"></i> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}