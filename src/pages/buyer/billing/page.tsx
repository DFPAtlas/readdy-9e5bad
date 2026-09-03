import { useState, useMemo } from 'react';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { demoInvoices, demoSubscriptions, INVOICE_STATUS_LABELS, SUBSCRIPTION_STATUS_LABELS } from '@/data/buyerData';
import type { BuyerInvoice } from '@/data/buyerData';

export default function BuyerBilling() {
  const [selectedInvoice, setSelectedInvoice] = useState<BuyerInvoice | null>(null);

  const activeMembership = useMemo(() => demoSubscriptions.find(s => s.type === 'membership'), []);
  const activeSubs = useMemo(() => demoSubscriptions.filter(s => s.status === 'demo_active' && s.type !== 'membership'), []);

  const totalActive = useMemo(() => {
    const membership = activeMembership ? parseFloat(activeMembership.billingAmount.replace(/[^0-9.]/g, '')) || 0 : 0;
    const products = activeSubs.reduce((sum, s) => {
      const amt = parseFloat(s.billingAmount.replace(/[^0-9.]/g, '')) || 0;
      return sum + (s.billingCycle === 'Annual' ? amt / 12 : amt);
    }, 0);
    return membership + products;
  }, [activeMembership, activeSubs]);

  if (selectedInvoice) {
    return (
      <BuyerRouteGuard>
        <BuyerPortalLayout>
          <InvoiceDetail invoice={selectedInvoice} onBack={() => setSelectedInvoice(null)} />
        </BuyerPortalLayout>
      </BuyerRouteGuard>
    );
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-foreground-950 mb-6">Billing</h1>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg border border-background-200/70">
              <p className="text-xs text-foreground-500 mb-1">Estimated monthly total</p>
              <p className="text-2xl font-bold text-foreground-950">£{totalActive.toFixed(0)}</p>
              <p className="text-xs text-foreground-400 mt-1">Demonstration only</p>
            </div>
            <div className="p-4 rounded-lg border border-background-200/70">
              <p className="text-xs text-foreground-500 mb-1">Active subscriptions</p>
              <p className="text-2xl font-bold text-foreground-950">{activeSubs.length + (activeMembership ? 1 : 0)}</p>
            </div>
            <div className="p-4 rounded-lg border border-background-200/70">
              <p className="text-xs text-foreground-500 mb-1">Outstanding invoices</p>
              <p className="text-2xl font-bold text-foreground-950">{demoInvoices.filter(i => i.status === 'open_demo' || i.status === 'overdue_demo').length}</p>
            </div>
          </div>

          {/* Payment method placeholder */}
          <div className="mb-8 p-4 rounded-lg border border-background-200/70 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground-900">Payment method</p>
              <p className="text-xs text-foreground-500">No payment method configured.</p>
            </div>
            <button disabled className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-400 cursor-not-allowed whitespace-nowrap">
              Add method — Planned
            </button>
          </div>

          {/* Active subscriptions */}
          <h2 className="text-base font-semibold text-foreground-950 mb-3">Active subscriptions</h2>
          <div className="space-y-2 mb-8">
            {activeMembership && (
              <div className="flex items-center justify-between p-3 rounded-lg border border-background-200/70">
                <div>
                  <p className="text-sm font-medium text-foreground-900">{activeMembership.name}</p>
                  <p className="text-xs text-foreground-500">{activeMembership.billingCycle}</p>
                </div>
                <p className="text-sm font-semibold text-foreground-950">{activeMembership.billingAmount}</p>
              </div>
            )}
            {activeSubs.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg border border-background-200/70">
                <div>
                  <p className="text-sm font-medium text-foreground-900">{sub.name}</p>
                  <p className="text-xs text-foreground-500">{sub.supplierName} · {sub.billingCycle}</p>
                </div>
                <p className="text-sm font-semibold text-foreground-950">{sub.billingAmount}</p>
              </div>
            ))}
          </div>

          {/* Invoices */}
          <h2 className="text-base font-semibold text-foreground-950 mb-3">Invoices</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 text-left">
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Number</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Period</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Description</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Total</th>
                  <th className="py-3 pr-3 font-medium text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="py-3 font-medium text-foreground-500 whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody>
                {demoInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-background-100 hover:bg-background-50">
                    <td className="py-3 pr-3 font-mono text-xs text-foreground-700 whitespace-nowrap">{inv.number}</td>
                    <td className="py-3 pr-3 text-foreground-500 whitespace-nowrap">{inv.periodStart} – {inv.periodEnd}</td>
                    <td className="py-3 pr-3 text-foreground-600 max-w-[200px] truncate">{inv.description}</td>
                    <td className="py-3 pr-3 text-foreground-800 font-semibold whitespace-nowrap">£{inv.total.toLocaleString()}</td>
                    <td className="py-3 pr-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${inv.status === 'paid_demo' ? 'bg-accent-100 text-accent-800' : inv.status === 'open_demo' ? 'bg-secondary-100 text-secondary-800' : 'bg-foreground-100 text-foreground-600'}`}>
                        {INVOICE_STATUS_LABELS[inv.status]}
                      </span>
                    </td>
                    <td className="py-3">
                      <button onClick={() => setSelectedInvoice(inv)} className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer whitespace-nowrap">
                        View <i className="ri-arrow-right-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax notice */}
          <p className="text-xs text-foreground-400 mt-6">All amounts shown are in GBP and include VAT where applicable. VAT rates are illustrative. This is a demonstration billing view — no real payments are processed.</p>
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function InvoiceDetail({ invoice, onBack }: { invoice: BuyerInvoice; onBack: () => void }) {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700 mb-4 cursor-pointer">
        <i className="ri-arrow-left-line"></i> Back to billing
      </button>

      <div className="rounded-lg border border-background-200/70 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground-950">Invoice {invoice.number}</h1>
            <p className="text-sm text-foreground-500 mt-0.5">{invoice.description}</p>
          </div>
          <span className={`inline-block px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${invoice.status === 'paid_demo' ? 'bg-accent-100 text-accent-800' : 'bg-secondary-100 text-secondary-800'}`}>
            {INVOICE_STATUS_LABELS[invoice.status]}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-sm">
          <div><span className="text-foreground-500">Date:</span> <span className="text-foreground-900">{invoice.date}</span></div>
          <div><span className="text-foreground-500">Due:</span> <span className="text-foreground-900">{invoice.dueDate}</span></div>
          <div><span className="text-foreground-500">Period:</span> <span className="text-foreground-900">{invoice.periodStart} – {invoice.periodEnd}</span></div>
          <div><span className="text-foreground-500">Currency:</span> <span className="text-foreground-900">{invoice.currency}</span></div>
        </div>

        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-background-200/70 text-left">
              <th className="py-2 pr-3 font-medium text-foreground-500">Description</th>
              <th className="py-2 pr-3 font-medium text-foreground-500 text-right">Qty</th>
              <th className="py-2 pr-3 font-medium text-foreground-500 text-right">Unit</th>
              <th className="py-2 font-medium text-foreground-500 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b border-background-100">
                <td className="py-2 pr-3 text-foreground-700">{item.description}</td>
                <td className="py-2 pr-3 text-foreground-600 text-right">{item.quantity}</td>
                <td className="py-2 pr-3 text-foreground-600 text-right">£{item.unitPrice.toFixed(2)}</td>
                <td className="py-2 text-foreground-800 text-right">£{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-background-200/70 pt-3 space-y-1 text-sm text-right">
          <div className="flex justify-end gap-8">
            <span className="text-foreground-500">Subtotal</span>
            <span className="text-foreground-800">£{invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-end gap-8">
            <span className="text-foreground-500">VAT</span>
            <span className="text-foreground-800">£{invoice.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-end gap-8 font-bold">
            <span className="text-foreground-900">Total</span>
            <span className="text-foreground-950">£{invoice.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-3 py-2 text-xs font-medium rounded-md border border-background-200/70 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-printer-line mr-1"></i> Print
          </button>
          <button disabled className="px-3 py-2 text-xs font-medium rounded-md border border-background-200/70 text-foreground-400 cursor-not-allowed whitespace-nowrap">
            Pay now — Planned
          </button>
        </div>
      </div>
    </div>
  );
}