import { useState, useMemo } from 'react';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoUsageEvents } from '@/data/buyerData';
import type { BuyerUsageEvent } from '@/data/buyerData';

export default function BuyerUsage() {
  const [unitFilter, setUnitFilter] = useState<string>('');
  const [pkgFilter, setPkgFilter] = useState<string>('');
  const [envFilter, setEnvFilter] = useState<string>('');

  const filtered = useMemo(() => {
    let list = [...demoUsageEvents];
    if (unitFilter) list = list.filter(e => e.unit === unitFilter);
    if (pkgFilter) list = list.filter(e => e.packageSlug === pkgFilter);
    if (envFilter) list = list.filter(e => e.environment === envFilter);
    return list;
  }, [unitFilter, pkgFilter, envFilter]);

  const packageOptions = useMemo(() => {
    const seen = new Set(demoUsageEvents.map(e => e.packageSlug));
    return Array.from(seen);
  }, []);

  const summary = useMemo(() => {
    const f = filtered;
    return {
      apiRequests: f.filter(e => e.unit === 'api_request').reduce((s, e) => s + e.count, 0),
      records: f.filter(e => e.unit === 'record').reduce((s, e) => s + e.count, 0),
      files: f.filter(e => e.unit === 'file').reduce((s, e) => s + e.count, 0),
      dataVolume: f.filter(e => e.unit === 'data_volume').reduce((s, e) => s + e.count, 0),
      cleanRoomJobs: f.filter(e => e.unit === 'clean_room_job').reduce((s, e) => s + e.count, 0),
      rateLimits: f.filter(e => e.status === 'rate_limited').length,
      errors: f.filter(e => e.status === 'error').length,
    };
  }, [filtered]);

  function handleExportCSV() {
    const header = 'Date,Package,API Key,Unit,Count,Environment,Endpoint,Status';
    const rows = filtered.map(e => `${e.date},${e.packageName},${e.apiKeyName},${e.unit},${e.count},${e.environment},${e.endpoint},${e.status}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dh_demo_usage_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">Usage</h1>
              <p className="text-sm text-foreground-500 mt-1">Demonstration usage data for your organisation.</p>
            </div>
            <button onClick={handleExportCSV} className="px-3 py-2 text-sm font-medium rounded-md border border-background-200/70 hover:bg-background-100 cursor-pointer whitespace-nowrap">
              <i className="ri-download-2-line mr-1"></i> Export CSV
            </button>
          </div>

          {/* Demo notice */}
          <div className="mb-6 p-3 rounded-lg bg-accent-50/50 border border-accent-200/60 text-xs text-foreground-600">
            All usage values shown are fictional demonstration data. No real API calls, records or data transfers are represented.
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-700 cursor-pointer">
              <option value="">All units</option>
              <option value="api_request">API Requests</option>
              <option value="record">Records</option>
              <option value="file">Files</option>
              <option value="data_volume">Data Volume</option>
              <option value="clean_room_job">Clean-room Jobs</option>
            </select>
            <select value={pkgFilter} onChange={(e) => setPkgFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-700 cursor-pointer">
              <option value="">All packages</option>
              {packageOptions.map(opt => (
                <option key={opt} value={opt}>{demoUsageEvents.find(e => e.packageSlug === opt)?.packageName || opt}</option>
              ))}
            </select>
            <select value={envFilter} onChange={(e) => setEnvFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-700 cursor-pointer">
              <option value="">All environments</option>
              <option value="production_demo">Production</option>
              <option value="sandbox_demo">Sandbox</option>
            </select>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            <UsageCard label="API requests" value={summary.apiRequests.toLocaleString()} icon="ri-code-line" />
            <UsageCard label="Records" value={summary.records.toLocaleString()} icon="ri-database-2-line" />
            <UsageCard label="Files" value={summary.files.toLocaleString()} icon="ri-file-line" />
            <UsageCard label="Data volume" value={`${summary.dataVolume} GB`} icon="ri-hard-drive-2-line" />
            <UsageCard label="Clean-room jobs" value={summary.cleanRoomJobs.toString()} icon="ri-shield-check-line" />
            <UsageCard label="Rate limits" value={summary.rateLimits.toString()} icon="ri-speed-up-line" highlight />
            <UsageCard label="Errors" value={summary.errors.toString()} icon="ri-error-warning-line" highlight />
          </div>

          {/* Events table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 text-left">
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Date</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Package</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Unit</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Count</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Endpoint</th>
                  <th className="py-3 font-medium text-foreground-500 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((evt) => (
                  <tr key={evt.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="py-3 pr-3 text-foreground-600 whitespace-nowrap">{evt.date}</td>
                    <td className="py-3 pr-3 text-foreground-700 whitespace-nowrap max-w-[160px] truncate">{evt.packageName}</td>
                    <td className="py-3 pr-3 text-foreground-500 whitespace-nowrap capitalize">{evt.unit.replace(/_/g, ' ')}</td>
                    <td className="py-3 pr-3 text-foreground-800 font-mono text-xs whitespace-nowrap">{evt.count.toLocaleString()}</td>
                    <td className="py-3 pr-3 text-foreground-500 font-mono text-xs whitespace-nowrap">{evt.endpoint}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${evt.status === 'success' ? 'text-accent-700' : evt.status === 'rate_limited' ? 'text-secondary-700' : 'text-red-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${evt.status === 'success' ? 'bg-accent-500' : evt.status === 'rate_limited' ? 'bg-secondary-500' : 'bg-red-500'}`}></span>
                        {evt.status === 'success' ? 'Success' : evt.status === 'rate_limited' ? 'Rate limited' : 'Error'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-bar-chart-2-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No usage data matches your filters</p>
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function UsageCard({ label, value, icon, highlight }: { label: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-lg border text-center ${highlight ? 'border-accent-200/60 bg-accent-50/30' : 'border-background-200/70'}`}>
      <i className={`${icon} text-lg ${highlight ? 'text-accent-600' : 'text-foreground-500'} mb-1 block`}></i>
      <p className="text-lg font-bold text-foreground-950">{value}</p>
      <p className="text-[11px] text-foreground-500">{label}</p>
    </div>
  );
}