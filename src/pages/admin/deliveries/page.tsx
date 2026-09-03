import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoAdminDeliveries } from '@/data/adminData';

export default function AdminDeliveries() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Deliveries</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoAdminDeliveries.length} deliveries — demonstration records</p>
        </div>
        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Reference</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Buyer</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Supplier</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Package</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Format</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Created</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap hidden md:table-cell">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {demoAdminDeliveries.map(d => (
                  <tr key={d.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground-500 whitespace-nowrap">{d.reference}</td>
                    <td className="px-4 py-2.5 text-foreground-950 font-medium whitespace-nowrap">{d.buyerOrg}</td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{d.supplierName}</td>
                    <td className="px-4 py-2.5 text-foreground-700 text-xs max-w-[180px] truncate">{d.packageName}</td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{d.format}</td>
                    <td className="px-4 py-2.5"><span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${d.status === 'ready_demo' ? 'bg-accent-100 text-accent-900' : 'bg-secondary-100 text-secondary-900'}`}>{d.status.replace(/_demo/, ' — demo')}</span></td>
                    <td className="px-4 py-2.5 text-foreground-500 text-xs hidden md:table-cell whitespace-nowrap">{new Date(d.createdDate).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-2.5 text-foreground-500 text-xs hidden md:table-cell whitespace-nowrap">{new Date(d.expiryDate).toLocaleDateString('en-GB')}</td>
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