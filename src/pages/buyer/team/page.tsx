import { useState, useMemo, useCallback } from 'react';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoTeamMembers } from '@/data/buyerData';
import type { BuyerTeamMember } from '@/data/buyerData';

export default function BuyerTeam() {
  const [members, setMembers] = useState<BuyerTeamMember[]>(demoTeamMembers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState({ fullName: '', workEmail: '', role: 'analyst_member', department: '', accessLevel: 'standard' });

  const filtered = useMemo(() => {
    let list = [...members];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(m => m.fullName.toLowerCase().includes(q) || m.workEmail.toLowerCase().includes(q) || m.department.toLowerCase().includes(q));
    }
    if (roleFilter) list = list.filter(m => m.role === roleFilter);
    return list;
  }, [members, search, roleFilter]);

  const ownerCount = useMemo(() => members.filter(m => m.role === 'organisation_owner' && m.status === 'active').length, [members]);

  const handleRemove = useCallback(() => {
    if (!confirmRemove) return;
    setMembers(prev => prev.filter(m => m.id !== confirmRemove));
    setConfirmRemove(null);
  }, [confirmRemove]);

  const handleAdd = useCallback(() => {
    if (!newMember.fullName.trim() || !newMember.workEmail.trim()) return;
    const exists = members.some(m => m.workEmail.toLowerCase() === newMember.workEmail.toLowerCase());
    if (exists) return;
    const member: BuyerTeamMember = {
      id: `tm-${Date.now()}`,
      fullName: newMember.fullName.trim(),
      workEmail: newMember.workEmail.trim(),
      role: newMember.role,
      department: newMember.department.trim(),
      accessLevel: newMember.accessLevel,
      lastActiveDate: null,
      packageAccess: [],
      status: 'active',
    };
    setMembers(prev => [...prev, member]);
    setNewMember({ fullName: '', workEmail: '', role: 'analyst_member', department: '', accessLevel: 'standard' });
    setShowAdd(false);
  }, [newMember, members]);

  const roleOptions = ['organisation_owner', 'administrator', 'compliance_lead', 'technical_lead', 'billing_contact', 'analyst_member', 'read_only_member'];

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">Team</h1>
              <p className="text-sm text-foreground-500 mt-1">{members.filter(m => m.status === 'active').length} active member{members.length !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              disabled={members.filter(m => m.status === 'active').length >= 10}
              className="px-3 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              Add member <i className="ri-add-line ml-1"></i>
            </button>
          </div>

          {/* Notice */}
          <div className="mb-4 p-3 rounded-lg bg-accent-50/50 border border-accent-200/60 text-xs text-foreground-600">
            Invitation delivery will be connected later. Team members shown here are for demonstration only. Assign the principle of least privilege.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email or department..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400" />
            </div>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-700 cursor-pointer">
              <option value="">All roles</option>
              {roleOptions.map(r => (
                <option key={r} value={r}>{r.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 text-left">
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Name</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Email</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Role</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Department</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Access</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="py-3 font-medium text-foreground-500 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="py-3 pr-3 text-foreground-800 font-medium whitespace-nowrap">{m.fullName}</td>
                    <td className="py-3 pr-3 text-foreground-600 whitespace-nowrap">{m.workEmail}</td>
                    <td className="py-3 pr-3 text-foreground-600 whitespace-nowrap capitalize">{m.role.replace(/_/g, ' ')}</td>
                    <td className="py-3 pr-3 text-foreground-500 whitespace-nowrap">{m.department || '—'}</td>
                    <td className="py-3 pr-3 text-foreground-500 whitespace-nowrap capitalize">{m.accessLevel}</td>
                    <td className="py-3 pr-3">
                      <span className={`inline-flex items-center gap-1 text-xs ${m.status === 'active' ? 'text-accent-700' : 'text-foreground-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'active' ? 'bg-accent-500' : 'bg-foreground-300'}`}></span>
                        {m.status === 'active' ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        {m.role !== 'organisation_owner' && (
                          <button onClick={() => setConfirmRemove(m.id)} className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-red-600 hover:bg-red-50 cursor-pointer" title="Remove member">
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {members.length >= 10 && (
            <p className="text-xs text-foreground-400 mt-3">Maximum of 10 demonstration team members reached.</p>
          )}

          {/* Add dialog */}
          {showAdd && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-3">Add demonstration team member</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Full name</label>
                    <input type="text" value={newMember.fullName} onChange={(e) => setNewMember(prev => ({ ...prev, fullName: e.target.value }))} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400" autoFocus />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Work email</label>
                    <input type="email" value={newMember.workEmail} onChange={(e) => setNewMember(prev => ({ ...prev, workEmail: e.target.value }))} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Role</label>
                    <select value={newMember.role} onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-700 cursor-pointer">
                      {roleOptions.map(r => (
                        <option key={r} value={r}>{r.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Department</label>
                    <input type="text" value={newMember.department} onChange={(e) => setNewMember(prev => ({ ...prev, department: e.target.value }))} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-700 mb-1">Access level</label>
                    <select value={newMember.accessLevel} onChange={(e) => setNewMember(prev => ({ ...prev, accessLevel: e.target.value }))} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-700 cursor-pointer">
                      <option value="standard">Standard</option>
                      <option value="administrative">Administrative</option>
                      <option value="read_only">Read-only</option>
                    </select>
                  </div>
                </div>
                <p className="text-xs text-foreground-400 mb-3">No invitation email will be sent. This is a demonstration-only addition.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleAdd} disabled={!newMember.fullName.trim() || !newMember.workEmail.trim()} className="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap">Add member</button>
                </div>
              </div>
            </div>
          )}

          {/* Remove confirmation */}
          {confirmRemove && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-2">Remove team member?</h3>
                <p className="text-sm text-foreground-500 mb-4">This member will lose access to all packages and organisation data. This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmRemove(null)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleRemove} className="px-4 py-2 text-sm font-medium text-background-50 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer whitespace-nowrap">Remove</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}