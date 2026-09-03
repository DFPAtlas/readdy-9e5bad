import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { getCurrentDemoUser, getOnboardingCompletion } from '@/utils/authStorage';
import {
  computeDashboardSummary,
  demoAccessRequests,
  demoSubscriptions,
  demoDeliveries,
  demoNotifications,
  demoActivityFeed,
  demoUsageEvents,
  demoComplianceItems,
  ACCESS_REQUEST_STATUS_LABELS,
  SUBSCRIPTION_STATUS_LABELS,
  DELIVERY_STATUS_LABELS,
  NOTIFICATION_CATEGORY_LABELS,
} from '@/data/buyerData';
import { marketplacePackages } from '@/data/marketplacePackages';

export default function BuyerDashboard() {
  const user = getCurrentDemoUser();
  const completion = getOnboardingCompletion();
  const summary = useMemo(() => computeDashboardSummary(), []);

  const recentNotifications = useMemo(() => demoNotifications.filter(n => !n.read).slice(0, 3), []);
  const recentActivity = useMemo(() => demoActivityFeed.slice(0, 5), []);
  const pendingCompliance = useMemo(() => demoComplianceItems.filter(c => c.status === 'action_needed'), []);

  const recentAccessRequests = useMemo(() =>
    demoAccessRequests.filter(a => a.status !== 'draft' && a.status !== 'withdrawn').slice(0, 3),
  []);

  const activeSubscriptions = useMemo(() =>
    demoSubscriptions.filter(s => s.status === 'demo_active'),
  []);

  const readyDeliveries = useMemo(() =>
    demoDeliveries.filter(d => d.status === 'ready_demo'),
  []);

  const totalApiUsage = useMemo(() =>
    demoUsageEvents.filter(e => e.unit === 'api_request').reduce((sum, e) => sum + e.count, 0),
  []);

  // Get saved packages count
  const savedCount = useMemo(() => {
    try {
      const raw = localStorage.getItem('dataharbour_saved_packages');
      return raw ? JSON.parse(raw).length : 0;
    } catch { return 0; }
  }, []);

  const recentSaved = useMemo(() => {
    try {
      const raw = localStorage.getItem('dataharbour_saved_packages');
      const ids: string[] = raw ? JSON.parse(raw) : [];
      return ids.slice(-3).reverse().map(slug => marketplacePackages.find(p => p.slug === slug)).filter(Boolean);
    } catch { return []; }
  }, []);

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-foreground-950">
              Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-foreground-500">
              <span className="flex items-center gap-1">
                <i className="ri-building-line text-sm"></i>
                {user?.organisationName || 'Organisation'}
              </span>
              {completion && (
                <span className="flex items-center gap-1">
                  <i className="ri-hashtag text-sm"></i>
                  {completion.organisationRef}
                </span>
              )}
              <span className="flex items-center gap-1">
                <i className="ri-information-line text-sm"></i>
                Demonstration account
              </span>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            <SummaryCard icon="ri-bookmark-line" label="Saved" value={savedCount} route="/app/buyer/saved" />
            <SummaryCard icon="ri-scales-3-line" label="Comparisons" value={summary.activeComparisons} route="/app/buyer/comparisons" />
            <SummaryCard icon="ri-key-2-line" label="Requests" value={summary.accessRequests} route="/app/buyer/access-requests" />
            <SummaryCard icon="ri-file-list-3-line" label="Licences" value={summary.demoLicences} route="/app/buyer/subscriptions" />
            <SummaryCard icon="ri-download-2-line" label="Deliveries" value={summary.plannedDeliveries} route="/app/buyer/deliveries" />
            <SummaryCard icon="ri-bar-chart-2-line" label="API calls" value={`${(totalApiUsage / 1000).toFixed(1)}k`} route="/app/buyer/usage" />
            <SummaryCard icon="ri-bank-card-line" label="Open billing" value={summary.openBillingItems} route="/app/buyer/billing" />
            <SummaryCard icon="ri-shield-check-line" label="Actions" value={summary.complianceActions} route="/app/buyer/compliance" highlight />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue your work */}
              <DashboardSection title="Continue your work">
                <div className="space-y-3">
                  {recentSaved.length > 0 && (
                    <ContinueCard
                      icon="ri-bookmark-line"
                      title="Recently saved packages"
                      detail={`${recentSaved.map(p => (p as { name: string }).name).join(', ')}`}
                      action="View saved"
                      route="/app/buyer/saved"
                    />
                  )}
                  {demoAccessRequests.find(a => a.status === 'draft') && (
                    <ContinueCard
                      icon="ri-edit-line"
                      title="Draft access request"
                      detail={demoAccessRequests.find(a => a.status === 'draft')!.packageName}
                      action="Continue draft"
                      route="/app/buyer/access-requests"
                    />
                  )}
                  <ContinueCard
                    icon="ri-scales-3-line"
                    title="Latest comparison"
                    detail="Risk Data Evaluation — 2 packages"
                    action="Open"
                    route="/app/buyer/comparisons"
                  />
                  {pendingCompliance.length > 0 && (
                    <ContinueCard
                      icon="ri-shield-check-line"
                      title={`${pendingCompliance.length} compliance action${pendingCompliance.length > 1 ? 's' : ''} needed`}
                      detail={pendingCompliance[0].title}
                      action="Review"
                      route="/app/buyer/compliance"
                    />
                  )}
                </div>
              </DashboardSection>

              {/* Access requests overview */}
              <DashboardSection title="Access requests" action={{ label: 'View all', route: '/app/buyer/access-requests' }}>
                {recentAccessRequests.length === 0 ? (
                  <EmptyState message="No access requests yet" action="Browse marketplace" route="/app/buyer/marketplace" />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-background-200/70 text-left">
                          <th className="py-2 pr-3 font-medium text-foreground-500 whitespace-nowrap">Reference</th>
                          <th className="py-2 pr-3 font-medium text-foreground-500 whitespace-nowrap">Package</th>
                          <th className="py-2 pr-3 font-medium text-foreground-500 whitespace-nowrap">Status</th>
                          <th className="py-2 font-medium text-foreground-500 whitespace-nowrap">Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAccessRequests.map((ar) => (
                          <tr key={ar.id} className="border-b border-background-100">
                            <td className="py-2 pr-3">
                              <Link to="/app/buyer/access-requests" className="text-foreground-800 font-mono text-xs hover:text-primary-600 whitespace-nowrap">{ar.reference}</Link>
                            </td>
                            <td className="py-2 pr-3 text-foreground-700 whitespace-nowrap max-w-[180px] truncate">{ar.packageName}</td>
                            <td className="py-2 pr-3">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${getStatusBadgeColor(ar.status)}`}>
                                {ACCESS_REQUEST_STATUS_LABELS[ar.status]}
                              </span>
                            </td>
                            <td className="py-2 text-foreground-500 whitespace-nowrap">{formatDate(ar.updatedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </DashboardSection>

              {/* Products & licences */}
              <DashboardSection title="Products and licences" action={{ label: 'View all', route: '/app/buyer/subscriptions' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSubscriptions.map((sub) => (
                    <div key={sub.id} className="p-3 rounded-lg border border-background-200/70 bg-background-50">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground-900">{sub.name}</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${getSubStatusColor(sub.status)}`}>
                          {SUBSCRIPTION_STATUS_LABELS[sub.status]}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-500 mb-2">{sub.supplierName}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-foreground-500">Usage:</span>
                        <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full bg-primary-500" style={{ width: `${sub.usagePercentage}%` }}></div>
                        </div>
                        <span className="text-foreground-600 font-medium">{sub.usagePercentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardSection>

              {/* Delivery activity */}
              <DashboardSection title="Delivery activity" action={{ label: 'View all', route: '/app/buyer/deliveries' }}>
                {readyDeliveries.length === 0 ? (
                  <p className="text-sm text-foreground-500">No deliveries ready at this time.</p>
                ) : (
                  <div className="space-y-2">
                    {readyDeliveries.map((del) => (
                      <div key={del.id} className="flex items-center justify-between p-3 rounded-lg border border-background-200/70">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground-900 truncate">{del.packageName}</p>
                          <p className="text-xs text-foreground-500">{del.format} · {del.version} · Expires {formatDate(del.expiryDate)}</p>
                        </div>
                        <Link to="/app/buyer/deliveries" className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 whitespace-nowrap ml-3">
                          View delivery
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </DashboardSection>

              {/* Usage preview */}
              <DashboardSection title="Usage preview" action={{ label: 'Full usage', route: '/app/buyer/usage' }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <UsageMetric label="API requests" value={totalApiUsage.toLocaleString()} unit="this month" />
                  <UsageMetric label="Records" value="2,450" unit="this month" />
                  <UsageMetric label="Files" value="3" unit="this month" />
                  <UsageMetric label="Data volume" value="62" unit="GB this month" />
                </div>
              </DashboardSection>
            </div>

            {/* Side column */}
            <div className="space-y-6">
              {/* Compliance actions */}
              <DashboardSection title="Compliance actions">
                {pendingCompliance.length === 0 ? (
                  <p className="text-sm text-foreground-500">All compliance actions complete.</p>
                ) : (
                  <div className="space-y-2">
                    {pendingCompliance.map((item) => (
                      <div key={item.id} className="p-3 rounded-lg border border-accent-200/60 bg-accent-50/50">
                        <p className="text-sm font-medium text-foreground-900">{item.title}</p>
                        <p className="text-xs text-foreground-500 mt-0.5 mb-2">{item.description}</p>
                        {item.actionRoute && (
                          <Link to={item.actionRoute} className="text-xs font-medium text-primary-600 hover:text-primary-700 whitespace-nowrap">
                            {item.actionLabel || 'Review'} <i className="ri-arrow-right-line"></i>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </DashboardSection>

              {/* Notifications */}
              <DashboardSection title="Recent notifications" action={{ label: 'View all', route: '/app/buyer/notifications' }}>
                {recentNotifications.length === 0 ? (
                  <p className="text-sm text-foreground-500">No new notifications.</p>
                ) : (
                  <div className="space-y-2">
                    {recentNotifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-md hover:bg-background-100">
                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent-500 mt-1.5 shrink-0"></span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground-900 truncate">{n.title}</p>
                            <p className="text-xs text-foreground-500 mt-0.5 line-clamp-2">{n.body}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DashboardSection>

              {/* Recent activity */}
              <DashboardSection title="Recent activity">
                <div className="space-y-2">
                  {recentActivity.map((evt) => (
                    <div key={evt.id} className="flex items-start gap-2 text-xs">
                      <i className={`${getActivityIcon(evt.type)} text-foreground-400 mt-0.5`}></i>
                      <div>
                        <span className="text-foreground-700">{evt.description}</span>
                        <span className="text-foreground-400 ml-1">{evt.detail}</span>
                        <p className="text-foreground-400 mt-0.5">{formatDateTime(evt.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardSection>
            </div>
          </div>
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function SummaryCard({ icon, label, value, route, highlight }: { icon: string; label: string; value: string | number; route: string; highlight?: boolean }) {
  return (
    <Link
      to={route}
      className={`flex flex-col items-center gap-1 p-3 rounded-lg border cursor-pointer transition-colors ${
        highlight ? 'border-accent-200/60 bg-accent-50/50 hover:bg-accent-100/50' : 'border-background-200/70 bg-background-50 hover:bg-background-100'
      }`}
    >
      <i className={`${icon} text-lg ${highlight ? 'text-accent-600' : 'text-foreground-500'}`}></i>
      <span className="text-lg font-bold text-foreground-950">{value}</span>
      <span className="text-[11px] text-foreground-500 whitespace-nowrap">{label}</span>
    </Link>
  );
}

function DashboardSection({ title, action, children }: { title: string; action?: { label: string; route: string }; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground-950">{title}</h2>
        {action && (
          <Link to={action.route} className="text-xs font-medium text-foreground-500 hover:text-foreground-700 whitespace-nowrap">
            {action.label} <i className="ri-arrow-right-line"></i>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function ContinueCard({ icon, title, detail, action, route }: { icon: string; title: string; detail: string; action: string; route: string }) {
  return (
    <Link to={route} className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70 hover:bg-background-100 cursor-pointer transition-colors">
      <div className="w-9 h-9 rounded-md bg-background-100 flex items-center justify-center shrink-0">
        <i className={`${icon} text-foreground-600`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground-900">{title}</p>
        <p className="text-xs text-foreground-500 truncate">{detail}</p>
      </div>
      <span className="text-xs font-medium text-primary-600 whitespace-nowrap shrink-0">{action} <i className="ri-arrow-right-line"></i></span>
    </Link>
  );
}

function UsageMetric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="p-3 rounded-lg border border-background-200/70 text-center">
      <p className="text-lg font-bold text-foreground-950">{value}</p>
      <p className="text-xs text-foreground-600">{label}</p>
      <p className="text-[11px] text-foreground-400">{unit}</p>
    </div>
  );
}

function EmptyState({ message, action, route }: { message: string; action: string; route: string }) {
  return (
    <div className="text-center py-6">
      <p className="text-sm text-foreground-500 mb-2">{message}</p>
      <Link to={route} className="text-sm font-medium text-primary-600 hover:text-primary-700 whitespace-nowrap">{action} <i className="ri-arrow-right-line"></i></Link>
    </div>
  );
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'approved_demo': return 'bg-accent-100 text-accent-800';
    case 'compliance_review_demo': case 'supplier_review_demo': return 'bg-secondary-100 text-secondary-800';
    case 'submitted_demo': return 'bg-secondary-100 text-secondary-800';
    case 'declined_demo': return 'bg-foreground-200 text-foreground-700';
    default: return 'bg-foreground-100 text-foreground-600';
  }
}

function getSubStatusColor(status: string): string {
  switch (status) {
    case 'demo_active': return 'bg-accent-100 text-accent-800';
    case 'renewal_due_demo': return 'bg-secondary-100 text-secondary-800';
    default: return 'bg-foreground-100 text-foreground-600';
  }
}

function getActivityIcon(type: string): string {
  switch (type) {
    case 'saved_package': return 'ri-bookmark-line';
    case 'comparison': return 'ri-scales-3-line';
    case 'access_draft': return 'ri-edit-line';
    case 'team_change': return 'ri-team-line';
    case 'invoice_view': return 'ri-bank-card-line';
    case 'delivery_download': return 'ri-download-2-line';
    case 'settings_change': return 'ri-settings-3-line';
    default: return 'ri-record-circle-line';
  }
}

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch { return iso; }
}