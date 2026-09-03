import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoNamedComparisons } from '@/data/buyerData';
import type { NamedComparison } from '@/data/buyerData';
import { marketplacePackages } from '@/data/marketplacePackages';
import { getNamedComparisons, saveNamedComparison, deleteNamedComparison, saveNamedComparisons } from '@/utils/buyerStorage';
import { useComparePackages } from '@/hooks/useComparePackages';

export default function BuyerComparisons() {
  const [comparisons, setComparisons] = useState<NamedComparison[]>(() => {
    const stored = getNamedComparisons();
    return stored.length > 0 ? stored : demoNamedComparisons;
  });
  const { compareIds, clearCompare } = useComparePackages();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');

  function handleSaveEdit() {
    if (!editingId || !editName.trim()) return;
    const updated = comparisons.map(c => c.id === editingId ? { ...c, name: editName.trim(), updatedAt: new Date().toISOString() } : c);
    setComparisons(updated);
    saveNamedComparisons(updated);
    setEditingId(null);
  }

  function handleDelete() {
    if (!confirmDeleteId) return;
    const updated = comparisons.filter(c => c.id !== confirmDeleteId);
    setComparisons(updated);
    deleteNamedComparison(confirmDeleteId);
    setConfirmDeleteId(null);
  }

  function handleDuplicate(comp: NamedComparison) {
    const newComp: NamedComparison = {
      ...comp,
      id: `nc-${Date.now()}`,
      name: `${comp.name} (copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...comparisons, newComp];
    setComparisons(updated);
    saveNamedComparison(newComp);
  }

  function handleCreate() {
    if (!newName.trim() || compareIds.length === 0) return;
    const newComp: NamedComparison = {
      id: `nc-${Date.now()}`,
      name: newName.trim(),
      packageSlugs: [...compareIds],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...comparisons, newComp];
    setComparisons(updated);
    saveNamedComparison(newComp);
    setNewName('');
    setShowCreate(false);
  }

  function getPackageNames(slugs: string[]): string {
    return slugs.map(s => marketplacePackages.find(p => p.slug === s)?.name || s).join(', ');
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">Comparisons</h1>
              <p className="text-sm text-foreground-500 mt-1">{comparisons.length} saved comparison{comparisons.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-2">
              {compareIds.length > 0 && (
                <button onClick={() => setShowCreate(true)} className="px-3 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
                  Save current <i className="ri-add-line ml-1"></i>
                </button>
              )}
              <Link to="/marketplace/compare" className="px-3 py-2 text-sm font-medium rounded-md border border-background-200/70 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                New comparison <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>
          </div>

          {comparisons.length === 0 && compareIds.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-scales-3-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No comparisons yet</p>
              <p className="text-sm text-foreground-400 mt-1 mb-4">Add packages from the marketplace and compare features side by side.</p>
              <Link to="/app/buyer/marketplace" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 whitespace-nowrap">
                Browse marketplace <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {comparisons.map((comp) => (
                <div key={comp.id} className="flex items-center gap-4 p-4 rounded-lg border border-background-200/70 hover:bg-background-100 transition-colors">
                  <div className="w-10 h-10 rounded-md bg-secondary-50 flex items-center justify-center shrink-0">
                    <i className="ri-scales-3-line text-secondary-600"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    {editingId === comp.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') setEditingId(null); }}
                          className="px-2 py-1 text-sm border border-primary-400 rounded bg-background-50 text-foreground-950 outline-none flex-1"
                          autoFocus
                        />
                        <button onClick={handleSaveEdit} className="text-xs text-primary-600 font-medium cursor-pointer whitespace-nowrap">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs text-foreground-500 cursor-pointer whitespace-nowrap">Cancel</button>
                      </div>
                    ) : (
                      <Link to={`/marketplace/compare?packages=${comp.packageSlugs.join(',')}`} className="text-sm font-semibold text-foreground-900 hover:text-primary-600 block truncate">
                        {comp.name}
                      </Link>
                    )}
                    <p className="text-xs text-foreground-500 mt-0.5 truncate">
                      {comp.packageSlugs.length} packages: {getPackageNames(comp.packageSlugs)}
                    </p>
                    <p className="text-[11px] text-foreground-400 mt-0.5">
                      Created {formatDate(comp.createdAt)} · Updated {formatDate(comp.updatedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => { setEditingId(comp.id); setEditName(comp.name); }}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-foreground-600 hover:bg-background-200 cursor-pointer"
                      title="Rename"
                    >
                      <i className="ri-edit-line text-sm"></i>
                    </button>
                    <button
                      onClick={() => handleDuplicate(comp)}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-foreground-600 hover:bg-background-200 cursor-pointer"
                      title="Duplicate"
                    >
                      <i className="ri-file-copy-line text-sm"></i>
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(comp.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                    <Link
                      to={`/marketplace/compare?packages=${comp.packageSlugs.join(',')}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 whitespace-nowrap ml-2"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create dialog */}
          {showCreate && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-2">Save comparison</h3>
                <p className="text-sm text-foreground-500 mb-3">Save your current comparison of {compareIds.length} packages for later reference.</p>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Comparison name"
                  className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400 mb-4"
                  autoFocus
                />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleCreate} disabled={!newName.trim() || compareIds.length === 0} className="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap">Save</button>
                </div>
              </div>
            </div>
          )}

          {/* Delete confirmation */}
          {confirmDeleteId && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-2">Delete comparison?</h3>
                <p className="text-sm text-foreground-500 mb-4">This comparison will be permanently removed. This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-background-50 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer whitespace-nowrap">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}