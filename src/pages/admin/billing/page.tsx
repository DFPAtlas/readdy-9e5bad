import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { demoAdminInvoices } from '@/data/adminData';

export default function AdminBilling() {
  const [statusFilter, setStatusFilter] = useState('');

  let filtered = demoAdminInvoices;
  if (statusFilter) filtered = filtered.filter(i => i.status === statusFilter);

  const total = filtered.reduce((s, i) => s + i.total, 0);

  function printInvoice(inv: typeof demoAdminInvoices[0]) {
    const win = window.open('', '_blank', 'width=700,height=900');
    if (!win) return;
    win.document.write(`<html><head><title>${inv.number}</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#1a1a1a;}table{width:100%;border-collapse:collapse;margin:16px 0;}th,td{padding:8px;text-align:left;border-bottom:1px solid #e5e5e5;}th{color:#666;font-size:12px;}.total{font-weight:bold;}.demo{color:#999;font-size:11px;margin-top:24px;}</style></head><body>
      <h1>DataHarbour — Demonstration Invoice</h1><p class="demo">Demonstration record only — not a real invoice.</p>
      <h2>${inv.number}</h2><p>${inv.orgName} (${inv.orgRef})</p>
      <p>Date: ${new Date(inv.date).toLocaleDateString('en-GB')} | Due: ${new Date(inv.dueDate).toLocaleDateString('en-GB')}</p>
      <p>Period: ${new Date(inv.periodStart).toLocaleDateString('en-GB')} – ${new Date(inv.periodEnd).toLocaleDateString('en-GB')}</p>
      <p>${inv.description}</p>
      <table><tr><th>Subtotal</th><td>${inv.currency} ${inv.subtotal.toFixed(2)}</td></tr><tr><th>VAT</th><td>${inv.currency} ${inv.vat.toFixed(2)}</td></tr><tr class="total"><th>Total</th><td>${inv.currency} ${inv.total.toFixed(2)}</td></tr></table>
      <p class="demo">Demonstration billing record — no payment is due or processed.</p></body></html>`);
    win.document.close();
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Billing</h1>
          <p className="text-xs text-foreground-500 mt-0.5">{demoAdminInvoices.length} invoices — demonstration records</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-white border border-background-200/70 rounded-lg p-3">
            <p className="text-xs text-foreground-500">Total (all invoices)</p>
            <p className="text-lg font-bold text-foreground-950">£{total.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-background-200/70 rounded-lg p-3">
            <p className="text-xs text-foreground-500">Active subscriptions</p>
            <p className="text-lg font-bold text-foreground-950">3</p>
          </div>
          <div className="bg-white border border-accent-200/60 rounded-lg p-3">
            <p className="text-xs text-foreground-500">Outstanding</p>
            <p className="text-lg font-bold text-accent-900">{demoAdminInvoices.filter(i => i.status === 'open_demo' || i.status === 'overdue_demo').length}</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-700 outline-none cursor-pointer">
            <option value="">All statuses</option>
            <option value="paid_demo">Paid — demo</option>
            <option value="open_demo">Open — demo</option>
            <option value="overdue_demo">Overdue — demo</option>
            <option value="draft_demo">Draft — demo</option>
            <option value="void_demo">Void — demo</option>
          </select>
        </div>

        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Number</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Organisation</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Description</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Date</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap text-right">Total</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground-500 whitespace-nowrap">{inv.number}</td>
                    <td className="px-4 py-2.5 text-foreground-950 font-medium whitespace-nowrap">{inv.orgName}</td>
                    <td className="px-4 py-2.5 text-foreground-700 text-xs max-w-[200px] truncate">{inv.description}</td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{new Date(inv.date).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-2.5 text-foreground-950 font-medium text-right whitespace-nowrap">{inv.currency} {inv.total.toFixed(2)}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        inv.status === 'paid_demo' ? 'bg-accent-100 text-accent-900' :
                        inv.status === 'overdue_demo' ? 'bg-accent-100 text-accent-900' :
                        'bg-secondary-100 text-secondary-900'
                      }`}>{inv.status.replace(/_demo/, ' — demo')}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <button onClick={() => printInvoice(inv)} className="text-primary-600 hover:text-primary-700 text-xs font-medium whitespace-nowrap cursor-pointer">Print</button>
                    </td>
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