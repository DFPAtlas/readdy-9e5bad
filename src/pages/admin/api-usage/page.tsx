import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoAdminApiUsage } from '@/data/adminData';

export default function AdminApiUsage() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">API usage</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoAdminApiUsage.length} usage records — demonstration data</p>
        </div>
        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Organisation</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Package</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Key (masked)</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Endpoint</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Env</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap text-right">Requests</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap text-right">Rate limits</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoAdminApiUsage.map(r => (
                  <tr key={r.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="px-4 py-2.5 text-foreground-950 font-medium whitespace-nowrap">{r.orgName}</td>
                    <td className="px-4 py-2.5 text-foreground-700 text-xs max-w-[180px] truncate">{r.packageName}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground-500 whitespace-nowrap">{r.keyMask}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground-600 whitespace-nowrap">{r.endpoint}</td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{r.environment.replace('_demo', '')}</td>
                    <td className="px-4 py-2.5 text-foreground-950 font-medium text-right whitespace-nowrap">{r.requestCount.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right whitespace-nowrap"><span className={`text-xs font-medium ${r.rateLimitEvents > 0 ? 'text-accent-700' : 'text-foreground-500'}`}>{r.rateLimitEvents}</span></td>
                    <td className="px-4 py-2.5"><span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${r.status === 'normal' ? 'bg-accent-100 text-accent-900' : 'bg-accent-100 text-accent-900'}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-foreground-500 mt-3">All values are fictional demonstration data. No real API endpoints or secrets are exposed.</p>
      </div>
    </AdminLayout>
  );
}