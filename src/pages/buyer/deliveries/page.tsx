import { useState, useMemo } from 'react';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoDeliveries, DELIVERY_STATUS_LABELS } from '@/data/buyerData';
import type { BuyerDelivery } from '@/data/buyerData';

export default function BuyerDeliveries() {
  const [selected, setSelected] = useState<BuyerDelivery | null>(null);
  const [copiedChecksum, setCopiedChecksum] = useState(false);

  if (selected) {
    return (
      <BuyerRouteGuard>
        <BuyerPortalLayout>
          <DeliveryDetail delivery={selected} onBack={() => setSelected(null)} copiedChecksum={copiedChecksum} onCopyChecksum={() => { navigator.clipboard.writeText(selected.checksum); setCopiedChecksum(true); setTimeout(() => setCopiedChecksum(false), 2000); }} />
        </BuyerPortalLayout>
      </BuyerRouteGuard>
    );
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-foreground-950 mb-6">Deliveries</h1>

          {demoDeliveries.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-download-2-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No deliveries yet</p>
              <p className="text-sm text-foreground-400 mt-1">Deliveries will appear here once access is approved and data is prepared.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {demoDeliveries.map((del) => (
                <div key={del.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border border-background-200/70 hover:bg-background-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-sm font-semibold text-foreground-950">{del.packageName}</h2>
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${del.status === 'ready_demo' ? 'bg-accent-100 text-accent-800' : del.status === 'preparing_demo' ? 'bg-secondary-100 text-secondary-800' : 'bg-foreground-100 text-foreground-600'}`}>
                        {DELIVERY_STATUS_LABELS[del.status]}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-500">
                      {del.deliveryType} · {del.format} · {del.version}
                    </p>
                    <p className="text-xs text-foreground-400 mt-0.5">
                      Created {formatDate(del.createdDate)} · Expires {formatDate(del.expiryDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {del.checksum !== 'N/A' && (
                      <button
                        onClick={() => { navigator.clipboard.writeText(del.checksum); }}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-foreground-400 hover:text-foreground-600 hover:bg-background-200 cursor-pointer"
                        title="Copy checksum"
                      >
                        <i className="ri-file-copy-line text-sm"></i>
                      </button>
                    )}
                    <button onClick={() => setSelected(del)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
                      View details
                    </button>
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

function DeliveryDetail({ delivery, onBack, copiedChecksum, onCopyChecksum }: { delivery: BuyerDelivery; onBack: () => void; copiedChecksum: boolean; onCopyChecksum: () => void }) {
  const isDownloadable = delivery.fileName !== 'N/A';

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700 mb-4 cursor-pointer">
        <i className="ri-arrow-left-line"></i> Back to deliveries
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground-950">{delivery.packageName}</h1>
          <p className="text-sm text-foreground-500 font-mono mt-0.5">{delivery.reference}</p>
        </div>
        <span className={`inline-block px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${delivery.status === 'ready_demo' ? 'bg-accent-100 text-accent-800' : 'bg-secondary-100 text-secondary-800'}`}>
          {DELIVERY_STATUS_LABELS[delivery.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <DLabel label="Type" value={delivery.deliveryType} />
        <DLabel label="Format" value={delivery.format} />
        <DLabel label="Version" value={delivery.version} />
        <DLabel label="Created" value={formatDate(delivery.createdDate)} />
        {delivery.fileName !== 'N/A' && (
          <>
            <DLabel label="File" value={delivery.fileName} />
            <DLabel label="Size" value={delivery.fileSize} />
            <DLabel label="Records" value={delivery.recordCount.toLocaleString()} />
            <DLabel label="Expires" value={formatDate(delivery.expiryDate)} />
          </>
        )}
      </div>

      {delivery.checksum !== 'N/A' && (
        <div className="mb-6 p-3 rounded-lg border border-background-200/70 flex items-center justify-between">
          <div>
            <p className="text-xs text-foreground-500 mb-0.5">Checksum (SHA-256)</p>
            <p className="text-xs font-mono text-foreground-700 break-all">{delivery.checksum}</p>
          </div>
          <button onClick={onCopyChecksum} className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 hover:bg-background-100 cursor-pointer whitespace-nowrap ml-3">
            {copiedChecksum ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      {delivery.manifest.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground-950 mb-2">Data manifest</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 text-left">
                  <th className="py-2 pr-3 font-medium text-foreground-500">Field</th>
                  <th className="py-2 pr-3 font-medium text-foreground-500">Type</th>
                  <th className="py-2 font-medium text-foreground-500">Description</th>
                </tr>
              </thead>
              <tbody>
                {delivery.manifest.map((m) => (
                  <tr key={m.field} className="border-b border-background-100">
                    <td className="py-2 pr-3 font-mono text-xs text-foreground-700 whitespace-nowrap">{m.field}</td>
                    <td className="py-2 pr-3 text-xs text-foreground-500 whitespace-nowrap">{m.type}</td>
                    <td className="py-2 text-xs text-foreground-600">{m.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {delivery.restrictions.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground-950 mb-2">Restrictions</h2>
          <ul className="space-y-1">
            {delivery.restrictions.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground-600">
                <i className="ri-information-line text-foreground-400 mt-0.5 shrink-0"></i>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {delivery.activityLog.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground-950 mb-2">Activity</h2>
          <div className="space-y-1">
            {delivery.activityLog.map((a) => (
              <div key={a.id} className="flex items-start gap-2 text-xs text-foreground-600">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground-300 mt-1.5 shrink-0"></div>
                <span>{a.action} — {a.detail} ({formatDate(a.createdAt)})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isDownloadable && (
        <button className="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
          <i className="ri-download-2-line mr-1"></i> Download demonstration file
        </button>
      )}
    </div>
  );
}

function DLabel({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg border border-background-200/70">
      <p className="text-xs text-foreground-500 mb-0.5">{label}</p>
      <p className="text-sm text-foreground-900 truncate">{value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}