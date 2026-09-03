import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoContracts, CONTRACT_TYPE_LABELS } from '@/data/adminData';

export default function AdminContracts() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Contracts</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoContracts.length} contracts — demonstration records</p>
        </div>
        <div className="space-y-3">
          {demoContracts.map(c => (
            <div key={c.id} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-foreground-500">{c.reference}</span>
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary-100 text-secondary-900">{CONTRACT_TYPE_LABELS[c.type]}</span>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${c.status === 'active_demo' ? 'bg-accent-100 text-accent-900' : 'bg-foreground-100 text-foreground-600'}`}>{c.status.replace(/_demo/, ' — demo')}</span>
                  </div>
                  <h2 className="text-sm font-semibold text-foreground-950">Version {c.version}</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-foreground-600">
                <div><span className="text-foreground-400">Parties:</span> {c.parties.join(', ')}</div>
                <div><span className="text-foreground-400">Start:</span> {new Date(c.startDate).toLocaleDateString('en-GB')}</div>
                <div><span className="text-foreground-400">End:</span> {new Date(c.endDate).toLocaleDateString('en-GB')}</div>
                <div><span className="text-foreground-400">Renewal:</span> {new Date(c.renewalDate).toLocaleDateString('en-GB')}</div>
              </div>
              {c.linkedProducts.length > 0 && <p className="text-xs text-foreground-500 mt-2">Products: {c.linkedProducts.join(', ')}</p>}
              <p className="text-xs text-foreground-400 mt-1">{c.documentMetadata}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}