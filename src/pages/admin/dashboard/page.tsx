import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { computeAdminDashboard } from '@/data/adminData';
import { getAdminSession } from '@/utils/adminStorage';
import { getAuditEvents } from '@/utils/adminStorage';

export default function AdminDashboard() {
  const session = getAdminSession();
  const { summary, priorityQueue } = computeAdminDashboard();
  const recentAudit = getAuditEvents().slice(0, 6);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1480px]">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground-500 mb-1">{greeting}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 tracking-tight">
                {session?.displayName || 'Administrator'}
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-500" />
                All systems operational
              </span>
              <span className="hidden sm:inline text-foreground-300">|</span>
              <span className="hidden sm:inline">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          <p className="text-sm text-foreground-500 mt-2">
            Administration overview — all data is fictional demonstration information.
          </p>
        </div>

        {/* Priority Alerts Banner */}
        <PriorityAlertsBanner queue={priorityQueue} />

        {/* KPI Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard
            label="Total Organisations"
            value={summary.totalOrgs}
            sub={`${summary.totalBuyers} buyers, ${summary.totalSuppliers} suppliers`}
            icon="ri-building-2-line"
            trend="up"
            trendLabel="+1 this week"
            color="primary"
          />
          <KpiCard
            label="Awaiting Review"
            value={summary.appsAwaitingReview + summary.packagesAwaitingReview}
            sub={`${summary.appsAwaitingReview} applications, ${summary.packagesAwaitingReview} packages`}
            icon="ri-time-line"
            trend="neutral"
            trendLabel="3 pending"
            color="accent"
          />
          <KpiCard
            label="Access Requests"
            value={summary.accessRequestsAwaiting}
            sub="Awaiting compliance review"
            icon="ri-key-2-line"
            trend="up"
            trendLabel="1 new today"
            color="secondary"
          />
          <KpiCard
            label="Open Cases"
            value={summary.openComplianceCases + summary.openRightsRequests}
            sub={`${summary.openComplianceCases} compliance, ${summary.openRightsRequests} DSRs`}
            icon="ri-shield-check-line"
            trend="neutral"
            trendLabel="2 critical"
            color="foreground"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column — Priority Queue */}
          <div className="lg:col-span-2 space-y-6">
            {/* Priority Queue */}
            <section className="bg-background-100/80 border border-background-200/60 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-background-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                    <i className="ri-flag-line text-sm text-accent-700" />
                  </span>
                  <h2 className="text-base font-semibold text-foreground-950">Priority queue</h2>
                </div>
                <span className="text-xs font-medium text-foreground-500 bg-background-200/50 px-2.5 py-1 rounded-full">
                  {priorityQueue.length} items
                </span>
              </div>
              <div className="divide-y divide-background-200/40">
                {priorityQueue.map((item) => (
                  <PriorityQueueItem key={item.reference} item={item} />
                ))}
              </div>
              <div className="px-5 py-3 border-t border-background-200/60 bg-background-50/50">
                <Link
                  to="/admin/access-requests"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap inline-flex items-center gap-1"
                >
                  View all pending items
                  <i className="ri-arrow-right-line text-xs" />
                </Link>
              </div>
            </section>

            {/* Marketplace Health */}
            <section className="bg-background-100/80 border border-background-200/60 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                  <i className="ri-store-2-line text-sm text-primary-700" />
                </span>
                <h2 className="text-base font-semibold text-foreground-950">Marketplace health</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <HealthMiniCard
                  label="Packages published"
                  value={3}
                  total={4}
                  icon="ri-archive-line"
                  status="good"
                />
                <HealthMiniCard
                  label="Under review"
                  value={1}
                  total={4}
                  icon="ri-timer-line"
                  status="warning"
                />
                <HealthMiniCard
                  label="Access requests"
                  value={3}
                  total={3}
                  icon="ri-key-2-line"
                  status="good"
                  sub="1 approved, 2 pending"
                />
                <HealthMiniCard
                  label="Supplier apps"
                  value={2}
                  total={2}
                  icon="ri-file-list-3-line"
                  status="warning"
                  sub="1 under review"
                />
              </div>
            </section>

            {/* Compliance & Security Snapshot */}
            <section className="bg-background-100/80 border border-background-200/60 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                  <i className="ri-shield-flash-line text-sm text-secondary-700" />
                </span>
                <h2 className="text-base font-semibold text-foreground-950">Trust &amp; operations snapshot</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SnapshotCard
                  label="Compliance cases"
                  value={summary.openComplianceCases}
                  alert={summary.openComplianceCases > 0}
                  sub="1 high priority"
                  link="/admin/compliance"
                />
                <SnapshotCard
                  label="Rights requests"
                  value={summary.openRightsRequests}
                  alert={false}
                  sub="2 data-subject requests"
                  link="/admin/data-subject-requests"
                />
                <SnapshotCard
                  label="Security reports"
                  value={summary.securityReports}
                  alert={false}
                  sub="1 under investigation"
                  link="/admin/security-reports"
                />
                <SnapshotCard
                  label="Support cases"
                  value={2}
                  alert={false}
                  sub="2 open cases"
                  link="/admin/support"
                />
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* System Status */}
            <section className="bg-background-100/80 border border-background-200/60 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                  <i className="ri-pulse-line text-sm text-accent-700" />
                </span>
                <h2 className="text-base font-semibold text-foreground-950">System status</h2>
              </div>
              <div className="space-y-4">
                <StatusRow label="Marketplace" value="Operational" status="ok" />
                <StatusRow label="API Gateway" value="Operational" status="ok" />
                <StatusRow label="Delivery pipeline" value="Degraded" status="warn" />
                <StatusRow label="Billing sync" value="Operational" status="ok" />
                <StatusRow label="Auth service" value="Operational" status="ok" />
              </div>
              <div className="mt-4 pt-4 border-t border-background-200/40">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-background-50 rounded-lg p-3">
                    <p className="text-lg font-bold text-foreground-950">99.8%</p>
                    <p className="text-[11px] text-foreground-500">Uptime (30d)</p>
                  </div>
                  <div className="bg-background-50 rounded-lg p-3">
                    <p className="text-lg font-bold text-foreground-950">45ms</p>
                    <p className="text-[11px] text-foreground-500">Avg response</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-background-100/80 border border-background-200/60 rounded-xl p-5">
              <h2 className="text-base font-semibold text-foreground-950 mb-4">Quick actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <QuickActionButton label="Review applications" icon="ri-file-list-3-line" route="/admin/supplier-applications" />
                <QuickActionButton label="Access requests" icon="ri-key-2-line" route="/admin/access-requests" />
                <QuickActionButton label="Audit log" icon="ri-history-line" route="/admin/audit-log" />
                <QuickActionButton label="Users &amp; roles" icon="ri-team-line" route="/admin/users" />
                <QuickActionButton label="System settings" icon="ri-settings-3-line" route="/admin/system-settings" />
                <QuickActionButton label="Billing" icon="ri-bank-card-line" route="/admin/billing" />
              </div>
            </section>

            {/* Commercial Snapshot */}
            <section className="bg-background-100/80 border border-background-200/60 rounded-xl p-5">
              <h2 className="text-base font-semibold text-foreground-950 mb-4">Commercial</h2>
              <div className="space-y-3">
                <CommercialRow label="Active subscriptions" value="3" />
                <CommercialRow label="Open invoices" value="1" />
                <CommercialRow label="Overdue invoices" value="1" alert />
                <CommercialRow label="Active contracts" value="3" />
                <CommercialRow label="MRR" value="£2,840" />
              </div>
              <Link
                to="/admin/billing"
                className="mt-4 block text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap"
              >
                View billing &rarr;
              </Link>
            </section>

            {/* API Ops */}
            <section className="bg-background-100/80 border border-background-200/60 rounded-xl p-5">
              <h2 className="text-base font-semibold text-foreground-950 mb-4">API operations</h2>
              <div className="space-y-3">
                <CommercialRow label="Active deliveries" value="3" />
                <CommercialRow label="API keys active" value="2" />
                <CommercialRow label="Requests (Jul)" value="5,330" />
                <CommercialRow label="Rate-limit events" value="12" alert />
              </div>
              <Link
                to="/admin/deliveries"
                className="mt-4 block text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap"
              >
                View deliveries &rarr;
              </Link>
            </section>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <section className="bg-background-100/80 border border-background-200/60 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-background-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <i className="ri-pulse-line text-sm text-primary-700" />
              </span>
              <h2 className="text-base font-semibold text-foreground-950">Recent activity</h2>
            </div>
            <Link
              to="/admin/audit-log"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap"
            >
              View full audit log &rarr;
            </Link>
          </div>
          <div className="p-5">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-background-200/60 hidden sm:block" />
              <div className="space-y-4">
                {recentAudit.map((event) => (
                  <TimelineEvent key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

// ── Sub-components ──

function PriorityAlertsBanner({ queue }: { queue: Array<{ type: string; reference: string; title: string; priority: string; route: string }> }) {
  const critical = queue.filter((q) => q.priority === 'Critical' || q.priority === 'High');
  if (critical.length === 0) return null;

  return (
    <div className="mb-6 space-y-2">
      {critical.map((item) => (
        <div
          key={item.reference}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent-100/60 border border-accent-200/40"
        >
          <span className="w-6 h-6 rounded-full bg-accent-200/60 flex items-center justify-center shrink-0">
            <i className="ri-error-warning-line text-xs text-accent-800" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground-950 truncate">
              {item.type}: {item.title}
            </p>
            <p className="text-xs text-foreground-500">
              {item.reference} &middot; {item.priority} priority
            </p>
          </div>
          <Link
            to={item.route}
            className="text-xs font-medium text-accent-800 hover:text-accent-900 cursor-pointer whitespace-nowrap shrink-0"
          >
            Review &rarr;
          </Link>
        </div>
      ))}
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  icon,
  trend,
  trendLabel,
  color,
}: {
  label: string;
  value: number;
  sub: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendLabel: string;
  color: 'primary' | 'accent' | 'secondary' | 'foreground';
}) {
  const colorMap = {
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    foreground: 'bg-foreground-100 text-foreground-700',
  };
  const trendColor = trend === 'up' ? 'text-accent-700' : trend === 'down' ? 'text-foreground-500' : 'text-foreground-500';
  const trendIcon = trend === 'up' ? 'ri-arrow-up-line' : trend === 'down' ? 'ri-arrow-down-line' : 'ri-subtract-line';

  return (
    <div className="bg-background-100/80 border border-background-200/60 rounded-xl p-5 hover:border-background-300/60 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <span className={`w-10 h-10 rounded-lg ${colorMap[color]} flex items-center justify-center`}>
          <i className={`${icon} text-lg`} />
        </span>
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <i className={`${trendIcon}`} />
          {trendLabel}
        </span>
      </div>
      <p className="text-3xl font-bold text-foreground-950 tracking-tight">{value}</p>
      <p className="text-sm font-medium text-foreground-700 mt-1">{label}</p>
      <p className="text-xs text-foreground-500 mt-1">{sub}</p>
    </div>
  );
}

function PriorityQueueItem({ item }: { item: { type: string; reference: string; title: string; age: string; priority: string; owner: string; route: string } }) {
  const priorityColors: Record<string, string> = {
    Critical: 'border-l-accent-500',
    High: 'border-l-accent-400',
    Medium: 'border-l-secondary-400',
    Low: 'border-l-foreground-300',
  };
  const badgeColors: Record<string, string> = {
    Critical: 'bg-accent-100 text-accent-900',
    High: 'bg-accent-100 text-accent-900',
    Medium: 'bg-secondary-100 text-secondary-900',
    Low: 'bg-foreground-100 text-foreground-600',
  };

  return (
    <div className={`flex items-center gap-4 px-5 py-4 hover:bg-background-50 transition-colors border-l-[3px] ${priorityColors[item.priority] || 'border-l-foreground-300'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeColors[item.priority] || 'bg-foreground-100 text-foreground-600'}`}>
            {item.priority}
          </span>
          <span className="text-xs text-foreground-500">{item.type}</span>
        </div>
        <p className="text-sm font-medium text-foreground-950 truncate">{item.title}</p>
        <p className="text-xs text-foreground-500 mt-0.5">
          {item.reference} &middot; {item.age} &middot; Owner: {item.owner}
        </p>
      </div>
      <Link
        to={item.route}
        className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-background-50 border border-background-200/60 text-foreground-700 hover:bg-background-100 hover:text-foreground-950 transition-colors cursor-pointer whitespace-nowrap"
      >
        Open
        <i className="ri-arrow-right-line" />
      </Link>
    </div>
  );
}

function HealthMiniCard({
  label,
  value,
  total,
  icon,
  status,
  sub,
}: {
  label: string;
  value: number;
  total: number;
  icon: string;
  status: 'good' | 'warning' | 'danger';
  sub?: string;
}) {
  const pct = Math.round((value / total) * 100);
  const barColor = status === 'good' ? 'bg-primary-500' : status === 'warning' ? 'bg-secondary-500' : 'bg-accent-500';
  const iconColor = status === 'good' ? 'text-primary-600' : status === 'warning' ? 'text-secondary-600' : 'text-accent-600';

  return (
    <div className="bg-background-50 rounded-lg p-4 border border-background-200/40">
      <div className="flex items-center gap-2 mb-2">
        <i className={`${icon} text-sm ${iconColor}`} />
        <span className="text-xs font-medium text-foreground-600">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground-950">{value}<span className="text-sm font-normal text-foreground-400">/{total}</span></p>
      <div className="mt-2 h-1.5 rounded-full bg-background-200/60 overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      {sub && <p className="text-[11px] text-foreground-500 mt-2">{sub}</p>}
    </div>
  );
}

function SnapshotCard({
  label,
  value,
  alert,
  sub,
  link,
}: {
  label: string;
  value: number;
  alert: boolean;
  sub: string;
  link: string;
}) {
  return (
    <Link
      to={link}
      className="block bg-background-50 rounded-lg p-4 border border-background-200/40 hover:border-background-300/60 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-foreground-600">{label}</span>
        {alert && <span className="w-2 h-2 rounded-full bg-accent-500" />}
      </div>
      <p className={`text-xl font-bold ${alert ? 'text-accent-900' : 'text-foreground-950'}`}>{value}</p>
      <p className="text-[11px] text-foreground-500 mt-1">{sub}</p>
      <p className="text-[11px] text-primary-600 font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        Open section &rarr;
      </p>
    </Link>
  );
}

function StatusRow({ label, value, status }: { label: string; value: string; status: 'ok' | 'warn' | 'down' }) {
  const dotColor = status === 'ok' ? 'bg-primary-500' : status === 'warn' ? 'bg-secondary-500' : 'bg-accent-500';
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span className="text-sm text-foreground-700">{label}</span>
      </div>
      <span className={`text-xs font-medium ${status === 'ok' ? 'text-primary-700' : status === 'warn' ? 'text-secondary-700' : 'text-accent-700'}`}>
        {value}
      </span>
    </div>
  );
}

function QuickActionButton({ label, icon, route }: { label: string; icon: string; route: string }) {
  return (
    <Link
      to={route}
      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background-50 border border-background-200/40 hover:bg-background-100 hover:border-background-300/60 transition-colors cursor-pointer text-center"
    >
      <span className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
        <i className={`${icon} text-sm text-primary-700`} />
      </span>
      <span className="text-xs font-medium text-foreground-700 leading-tight">{label}</span>
    </Link>
  );
}

function CommercialRow({ label, value, alert }: { label: string; value: string; alert?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-foreground-600">{label}</span>
      <span className={`font-semibold ${alert ? 'text-accent-700' : 'text-foreground-950'}`}>{value}</span>
    </div>
  );
}

function TimelineEvent({ event }: { event: { id: string; timestamp: string; actor: string; action: string; entity: string; entityRef: string; previousValue: string; newValue: string } }) {
  const [expanded, setExpanded] = useState(false);
  const actionColors: Record<string, string> = {
    org_status_change: 'bg-primary-100 text-primary-700',
    application_decision: 'bg-secondary-100 text-secondary-700',
    package_review: 'bg-primary-100 text-primary-700',
    access_request_decision: 'bg-accent-100 text-accent-700',
    compliance_case_update: 'bg-accent-100 text-accent-700',
    rights_request_update: 'bg-accent-100 text-accent-700',
    security_case_update: 'bg-secondary-100 text-secondary-700',
    billing_status_change: 'bg-foreground-100 text-foreground-700',
    role_change: 'bg-foreground-100 text-foreground-700',
    settings_change: 'bg-foreground-100 text-foreground-700',
  };

  const date = new Date(event.timestamp);
  const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return (
    <div className="flex gap-4 items-start">
      <div className="relative shrink-0 hidden sm:block">
        <span className={`w-8 h-8 rounded-full ${actionColors[event.action] || 'bg-foreground-100 text-foreground-700'} flex items-center justify-center text-xs`}>
          <i className="ri-check-line" />
        </span>
      </div>
      <div className="flex-1 min-w-0 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground-950">
              {event.action.replace(/_/g, ' ')}
            </p>
            <p className="text-xs text-foreground-500 mt-0.5">
              {event.entity} <span className="font-mono text-foreground-400">{event.entityRef}</span>
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-medium text-foreground-600">{timeStr}</p>
            <p className="text-[11px] text-foreground-400">{dateStr}</p>
          </div>
        </div>
        {expanded && (
          <div className="mt-2 p-3 bg-background-50 rounded-lg border border-background-200/40 text-xs text-foreground-600 space-y-1">
            <p><span className="font-medium text-foreground-700">Actor:</span> {event.actor}</p>
            <p><span className="font-medium text-foreground-700">From:</span> {event.previousValue}</p>
            <p><span className="font-medium text-foreground-700">To:</span> {event.newValue}</p>
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
        >
          {expanded ? 'Show less' : 'Show details'}
        </button>
      </div>
    </div>
  );
}