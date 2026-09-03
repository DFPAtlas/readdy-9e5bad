import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { marketplacePackages } from '@/data/marketplacePackages';
import { useSavedPackages } from '@/hooks/useSavedPackages';
import { useComparePackages } from '@/hooks/useComparePackages';
import type { MarketplacePackage } from '@/data/marketplacePackages';

export default function BuyerSaved() {
  const { savedIds, removeSave } = useSavedPackages();
  const { compareIds, toggleCompare, isAtLimit } = useComparePackages();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string>('saved_date');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmClear, setConfirmClear] = useState(false);

  const savedPackages = useMemo(() => {
    let pkgs = savedIds.map(slug => marketplacePackages.find(p => p.slug === slug)).filter(Boolean) as MarketplacePackage[];
    if (search) {
      const q = search.toLowerCase();
      pkgs = pkgs.filter(p => p.name.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'name': pkgs.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'supplier': pkgs.sort((a, b) => a.supplier.localeCompare(b.supplier)); break;
      case 'updated': pkgs.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)); break;
      default: break; // saved_date — keep original order
    }
    return pkgs;
  }, [savedIds, search, sortBy]);

  const toggleSelect = useCallback((slug: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected(new Set(savedPackages.map(p => p.slug)));
  }, [savedPackages]);

  const deselectAll = useCallback(() => setSelected(new Set()), []);

  function addSelectedToComparison() {
    savedPackages.forEach(p => {
      if (selected.has(p.slug) && !compareIds.includes(p.slug) && !isAtLimit) {
        toggleCompare(p.slug);
      }
    });
    setSelected(new Set());
  }

  function clearAll() {
    savedIds.forEach(id => removeSave(id));
    setConfirmClear(false);
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">Saved Packages</h1>
              <p className="text-sm text-foreground-500 mt-1">{savedPackages.length} package{savedPackages.length !== 1 ? 's' : ''} saved</p>
            </div>
            {savedPackages.length > 0 && (
              <button onClick={() => setConfirmClear(true)} className="text-xs font-medium text-foreground-500 hover:text-foreground-700 cursor-pointer whitespace-nowrap">
                <i className="ri-delete-bin-line mr-1"></i>Clear all
              </button>
            )}
          </div>

          {savedPackages.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-bookmark-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No saved packages</p>
              <p className="text-sm text-foreground-400 mt-1 mb-4">Save packages from the marketplace to review them later.</p>
              <Link to="/app/buyer/marketplace" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 whitespace-nowrap">
                Browse marketplace <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter saved packages..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400" />
                </div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-700 cursor-pointer">
                  <option value="saved_date">Sort: Saved date</option>
                  <option value="name">Sort: Name</option>
                  <option value="supplier">Sort: Supplier</option>
                  <option value="updated">Sort: Last updated</option>
                </select>
              </div>

              {/* Batch actions */}
              {selected.size > 0 && (
                <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-secondary-50 border border-secondary-100">
                  <span className="text-sm text-foreground-700">{selected.size} selected</span>
                  <button onClick={selectAll} className="text-xs text-foreground-600 hover:text-foreground-800 cursor-pointer">Select all</button>
                  <button onClick={deselectAll} className="text-xs text-foreground-600 hover:text-foreground-800 cursor-pointer">Deselect all</button>
                  <button onClick={addSelectedToComparison} className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap ml-auto">
                    Add to comparison <i className="ri-scales-3-line"></i>
                  </button>
                </div>
              )}

              {/* List */}
              <div className="space-y-2">
                {savedPackages.map((pkg) => (
                  <div key={pkg.slug} className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70 hover:bg-background-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={selected.has(pkg.slug)}
                      onChange={() => toggleSelect(pkg.slug)}
                      className="w-4 h-4 rounded border-background-300 text-primary-500 cursor-pointer accent-primary-500"
                    />
                    <div className="flex-1 min-w-0">
                      <Link to={`/marketplace/${pkg.slug}`} className="text-sm font-semibold text-foreground-900 hover:text-primary-600 truncate block">{pkg.name}</Link>
                      <p className="text-xs text-foreground-500">{pkg.supplier} · {pkg.pricingModel}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleCompare(pkg.slug)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer ${compareIds.includes(pkg.slug) ? 'text-primary-600 bg-primary-50' : 'text-foreground-400 hover:text-foreground-600 hover:bg-background-200'}`}
                        title={compareIds.includes(pkg.slug) ? 'Remove from comparison' : 'Add to comparison'}
                      >
                        <i className="ri-scales-3-line text-sm"></i>
                      </button>
                      <button onClick={() => removeSave(pkg.slug)} className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-foreground-600 hover:bg-background-200 cursor-pointer" title="Remove from saved">
                        <i className="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Clear confirmation */}
          {confirmClear && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-2">Clear all saved packages?</h3>
                <p className="text-sm text-foreground-500 mb-4">This will remove all {savedPackages.length} saved packages. This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmClear(false)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={clearAll} className="px-4 py-2 text-sm font-medium text-background-50 bg-foreground-800 hover:bg-foreground-900 rounded-md cursor-pointer whitespace-nowrap">Clear all</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}