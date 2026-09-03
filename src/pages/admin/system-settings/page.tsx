import { useState } from 'react';
import AdminLayout from '@/pages/admin/components/AdminLayout';
import { getSystemSettings, saveSystemSettings } from '@/utils/adminStorage';
import type { AdminSystemSettings } from '@/data/adminData';

export default function AdminSystemSettings() {
  const [settings, setSettings] = useState<AdminSystemSettings>(getSystemSettings());
  const [saved, setSaved] = useState(false);
  const [maintBanner, setMaintBanner] = useState(settings.maintenanceBanner);

  function handleSave() {
    saveSystemSettings({ ...settings, maintenanceBanner: maintBanner });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-foreground-950">System settings</h1>
            <p className="text-xs text-foreground-500 mt-0.5">Demonstration settings — no real system configuration.</p>
          </div>
          <button onClick={handleSave} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary-500 text-background-50 text-sm font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap">
            <i className="ri-check-line"></i> {saved ? 'Saved' : 'Save settings'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Section title="Marketplace settings">
            <Field label="Maximum comparison packages" value={settings.marketplaceMaxCompare.toString()} />
            <Field label="Reference format" value={settings.referenceFormat} mono />
          </Section>

          <Section title="Review settings">
            <Field label="Access review SLA (days)" value={settings.accessReviewDays.toString()} />
            <Field label="Supplier review SLA (days)" value={settings.supplierReviewDays.toString()} />
          </Section>

          <Section title="Limits">
            <Field label="File size limit (MB)" value={settings.fileSizeLimitMb.toString()} />
            <Field label="Rate limit per minute" value={settings.rateLimitPerMinute.toString()} />
          </Section>

          <Section title="Legal document versions">
            {Object.entries(settings.legalDocumentVersions).map(([k, v]) => (
              <Field key={k} label={k} value={v} />
            ))}
          </Section>

          <Section title="Feature flags">
            {Object.entries(settings.featureFlags).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground-700 capitalize">{k.replace(/_/g, ' ')}</span>
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium ${v ? 'bg-accent-100 text-accent-900' : 'bg-foreground-100 text-foreground-600'}`}>{v ? 'Enabled' : 'Disabled'}</span>
              </div>
            ))}
          </Section>

          <Section title="Maintenance banner">
            <textarea
              value={maintBanner}
              onChange={e => setMaintBanner(e.target.value)}
              placeholder="Maintenance banner text (empty = no banner)..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-md bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none resize-none"
            />
          </Section>

          <Section title="Environment">
            <Field label="Environment" value="Demonstration" />
            <Field label="Storage" value="localStorage (browser only)" />
            <Field label="Cookie consent version" value={settings.cookieConsentVersion} />
            <p className="text-xs text-foreground-500 mt-2">No real secrets, keys, webhook URLs or service-role credentials are stored in settings.</p>
          </Section>
        </div>
      </div>
    </AdminLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-background-200/70 rounded-lg p-4">
      <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="mb-2">
      <p className="text-[11px] font-medium text-foreground-400">{label}</p>
      <p className={`text-sm text-foreground-950 ${mono ? 'font-mono' : ''}`}>{value || '—'}</p>
    </div>
  );
}