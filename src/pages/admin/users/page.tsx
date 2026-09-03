import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoAdminUsers, ADMIN_ROLE_LABELS } from '@/data/adminData';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  let filtered = demoAdminUsers;
  if (search) { const q = search.toLowerCase(); filtered = filtered.filter(u => u.displayName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)); }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Users</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoAdminUsers.length} admin users — demonstration staff previews</p>
        </div>
        <div className="relative max-w-sm mb-4">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-400"></i>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400" />
        </div>
        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Email</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Role</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Last active</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden lg:table-cell">Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-secondary-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-semibold text-secondary-900">{u.displayName.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-foreground-950 whitespace-nowrap">{u.displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{u.email}</td>
                    <td className="px-4 py-2.5 text-foreground-700 text-xs whitespace-nowrap">{ADMIN_ROLE_LABELS[u.role]}</td>
                    <td className="px-4 py-2.5"><span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${u.status === 'active' ? 'bg-accent-100 text-accent-900' : 'bg-foreground-100 text-foreground-600'}`}>{u.status}</span></td>
                    <td className="px-4 py-2.5 text-foreground-500 text-xs hidden md:table-cell whitespace-nowrap">{u.lastActive ? new Date(u.lastActive).toLocaleDateString('en-GB') : '—'}</td>
                    <td className="px-4 py-2.5 text-foreground-500 text-xs hidden lg:table-cell whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}