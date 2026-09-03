import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { marketplacePackages, packageCategories } from '@/data/marketplacePackages';
import type { MarketplacePackage } from '@/data/marketplacePackages';
import { demoAccessRequests, demoSubscriptions } from '@/data/buyerData';

export default function BuyerMarketplace() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const approvedSlugs = useMemo(() => {
    const approved = demoAccessRequests.filter(a => a.status === 'approved_demo' || a.status === 'approved_conditions_demo');
    return new Set(approved.map(a => a.packageSlug));
  }, []);

  const subscribedSlugs = useMemo(() => {
    return new Set(demoSubscriptions.filter(s => s.status === 'demo_active' && s.packageSlug).map(s => s.packageSlug!));
  }, []);

  const filtered = useMemo(() => {
    let pkgs = [...marketplacePackages];
    if (search) {
      const q = search.toLowerCase();
      pkgs = pkgs.filter(p => p.name.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    if (selectedCategory) {
      pkgs = pkgs.filter(p => p.category === selectedCategory);
    }
    return pkgs;
  }, [search, selectedCategory]);

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-foreground-950">Marketplace</h1>
            <p className="text-sm text-foreground-500 mt-1">Browse and discover data products available through DataHarbour.</p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search packages, suppliers or tags..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400"
              />
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
                className="w-9 h-9 flex items-center justify-center rounded-md border border-background-200/70 hover:bg-background-100 cursor-pointer"
                aria-label={viewMode === 'card' ? 'Switch to list view' : 'Switch to card view'}
              >
                <i className={`text-sm text-foreground-600 ${viewMode === 'card' ? 'ri-list-check' : 'ri-grid-line'}`}></i>
              </button>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-700 outline-none focus:border-primary-400 cursor-pointer"
              >
                <option value="">All categories</option>
                {packageCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-store-2-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No packages match your search</p>
              <p className="text-sm text-foreground-400 mt-1">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className={viewMode === 'card'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-3'
            }>
              {filtered.map((pkg) => (
                <BuyerPackageCard
                  key={pkg.id}
                  pkg={pkg}
                  viewMode={viewMode}
                  hasAccess={approvedSlugs.has(pkg.slug)}
                  isSubscribed={subscribedSlugs.has(pkg.slug)}
                />
              ))}
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function BuyerPackageCard({ pkg, viewMode, hasAccess, isSubscribed }: { pkg: MarketplacePackage; viewMode: string; hasAccess: boolean; isSubscribed: boolean }) {
  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 rounded-lg border border-background-200/70 hover:bg-background-100 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link to={`/marketplace/${pkg.slug}`} className="text-sm font-semibold text-foreground-900 hover:text-primary-600 truncate whitespace-nowrap">{pkg.name}</Link>
            {hasAccess && <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent-100 text-accent-800 whitespace-nowrap">Access</span>}
            {isSubscribed && <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-100 text-secondary-800 whitespace-nowrap">Subscribed</span>}
          </div>
          <p className="text-xs text-foreground-500 line-clamp-1">{pkg.shortDescription}</p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-foreground-400">
            <span>{pkg.supplier}</span>
            <span>{pkg.pricingModel}</span>
            <span>{pkg.geographicCoverage}</span>
          </div>
        </div>
        <Link to={`/marketplace/${pkg.slug}`} className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 whitespace-nowrap">
          View details
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-background-200/70 bg-background-50 hover:border-background-300/60 transition-colors overflow-hidden flex flex-col">
      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium text-foreground-500 bg-background-100 px-2 py-0.5 rounded whitespace-nowrap">{pkg.pricingModel}</span>
          {pkg.featured && <span className="text-[10px] font-medium text-accent-700 bg-accent-50 px-2 py-0.5 rounded whitespace-nowrap">Featured</span>}
          {hasAccess && <span className="text-[10px] font-medium text-accent-800 bg-accent-100 px-2 py-0.5 rounded whitespace-nowrap">Access</span>}
          {isSubscribed && <span className="text-[10px] font-medium text-secondary-800 bg-secondary-100 px-2 py-0.5 rounded whitespace-nowrap">Subscribed</span>}
        </div>
        <Link to={`/marketplace/${pkg.slug}`} className="text-sm font-semibold text-foreground-900 hover:text-primary-600 line-clamp-2 block mb-1">{pkg.name}</Link>
        <p className="text-xs text-foreground-500 line-clamp-2 mb-3">{pkg.shortDescription}</p>
        <div className="flex items-center gap-2 text-[11px] text-foreground-400">
          <span className="truncate">{pkg.supplier}</span>
          <span>·</span>
          <span className="whitespace-nowrap">{pkg.geographicCoverage}</span>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-background-100 flex items-center justify-between">
        <span className="text-xs font-medium text-foreground-600">{pkg.priceDisplay}</span>
        <Link to={`/marketplace/${pkg.slug}`} className="text-xs font-medium text-primary-600 hover:text-primary-700 whitespace-nowrap">
          Details <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </div>
  );
}