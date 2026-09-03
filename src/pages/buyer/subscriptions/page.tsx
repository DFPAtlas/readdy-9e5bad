import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoSubscriptions, SUBSCRIPTION_STATUS_LABELS } from '@/data/buyerData';
import type { BuyerSubscription } from '@/data/buyerData';

export default function BuyerSubscriptions() {
  const [selectedSub, setSelectedSub] = useState<BuyerSubscription | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('');

  const filtered = useMemo(() => {
    let list = [...demoSubscriptions];
    if (typeFilter) list = list.filter(s => s.type === typeFilter);
    return list;
  }, [typeFilter]);

  if (selectedSub) {
    return (
      <BuyerRouteGuard>
        <BuyerPortalLayout>
          <SubscriptionDetail sub={selectedSub} onBack={() => setSelectedSub(null)} />
        </BuyerPortalLayout>
      </BuyerRouteGuard>
    );
  }

  const tabs = [
    { value: '', label: 'All' },
    { value: 'membership', label: 'Membership' },
    { value: 'data_product', label: 'Data Products' },
    { value: 'package_licence', label: 'Package Licences' },
    { value: 'enterprise_agreement', label: 'Enterprise' },
  ];

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-foreground-950 mb-6">Subscriptions and Licences</h1>

          <div className="flex gap-2 mb-6 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setTypeFilter(tab.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer whitespace-nowrap transition-colors ${typeFilter === tab.value ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-file-list-3-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No subscriptions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((sub) => (
                <div key={sub.id} className="rounded-lg border border-background-200/70 p-5 hover:bg-background-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium text-foreground-500 bg-background-100 px-2 py-0.5 rounded uppercase whitespace-nowrap">{sub.type.replace(/_/g, ' ')}</span>
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${sub.status === 'demo_active' ? 'bg-accent-100 text-accent-800' : 'bg-foreground-100 text-foreground-600'}`}>
                          {SUBSCRIPTION_STATUS_LABELS[sub.status]}
                        </span>
                      </div>
                      <h2 className="text-base font-semibold text-foreground-950">{sub.name}</h2>
                      <p className="text-sm text-foreground-500">{sub.supplierName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground-950">{sub.billingAmount}</p>
                      <p className="text-xs text-foreground-400">{sub.billingCycle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-foreground-500">
                      <span>{formatDate(sub.startDate)} – {formatDate(sub.endDate)}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="hidden sm:inline">{sub.allowance.split('.')[0]}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full bg-primary-500" style={{ width: `${sub.usagePercentage}%` }}></div>
                        </div>
                        <span className="text-xs text-foreground-600">{sub.usagePercentage}%</span>
                      </div>
                      <button onClick={() => setSelectedSub(sub)} className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap ml-2">
                        View details <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function SubscriptionDetail({ sub, onBack }: { sub: BuyerSubscription; onBack: () => void }) {
  const conditions = sub.conditions[0];
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700 mb-4 cursor-pointer">
        <i className="ri-arrow-left-line"></i> Back to subscriptions
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground-950">{sub.name}</h1>
          <p className="text-sm text-foreground-500 mt-0.5">{sub.supplierName} · {sub.reference}</p>
        </div>
        <span className={`inline-block px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${sub.status === 'demo_active' ? 'bg-accent-100 text-accent-800' : 'bg-foreground-100 text-foreground-600'}`}>
          {SUBSCRIPTION_STATUS_LABELS[sub.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <DetailCard label="Start date" value={formatDate(sub.startDate)} />
        <DetailCard label="End date" value={formatDate(sub.endDate)} />
        <DetailCard label="Billing" value={`${sub.billingAmount} / ${sub.billingCycle}`} />
        <DetailCard label="Allowance" value={sub.allowance} />
      </div>

      {conditions && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground-950">Licence conditions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ConditionCard label="Permitted purpose" value={conditions.permittedPurpose} />
            <ConditionCard label="Geography" value={conditions.geography} />
            <ConditionCard label="Users / teams" value={conditions.usersOrTeams} />
            <ConditionCard label="Retention" value={conditions.retention} />
            <ConditionCard label="Sharing" value={conditions.sharing} />
            <ConditionCard label="Delivery" value={conditions.delivery} />
            <ConditionCard label="Usage limits" value={conditions.usageLimits} />
            <ConditionCard label="Renewal" value={conditions.renewalTerms} />
          </div>

          {conditions.prohibitedUses.length > 0 && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-foreground-900 mb-2">Prohibited uses</h3>
              <ul className="space-y-1">
                {conditions.prohibitedUses.map((use, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground-600">
                    <i className="ri-close-circle-line text-foreground-400 mt-0.5 shrink-0"></i>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-background-200/70">
      <p className="text-xs text-foreground-500 mb-0.5">{label}</p>
      <p className="text-sm text-foreground-900">{value}</p>
    </div>
  );
}

function ConditionCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-background-200/70">
      <p className="text-xs text-foreground-500 mb-0.5">{label}</p>
      <p className="text-sm text-foreground-700">{value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}