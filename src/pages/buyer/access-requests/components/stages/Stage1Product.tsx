import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { marketplacePackages } from '@/data/marketplacePackages';
import { validateProductStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft, WorkflowStage } from '@/data/accessRequestTypes';

interface Stage1ProductProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: (() => void) | null;
}

export default function Stage1Product({ draft, onUpdate, onNext, onPrev }: Stage1ProductProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [packageSlug, setPackageSlug] = useState(draft.packageSlug);

  const pkg = marketplacePackages.find((p) => p.slug === draft.packageSlug);

  function handleContinue() {
    const result = validateProductStage(draft);
    setErrors(result.errors);
    if (result.valid) onNext();
  }

  function handlePackageChange(slug: string) {
    const newPkg = marketplacePackages.find((p) => p.slug === slug);
    if (!newPkg) return;
    setPackageSlug(slug);
    onUpdate({
      ...draft,
      packageSlug: slug,
      packageName: newPkg.name,
      supplierName: newPkg.supplier,
      productAcknowledged: false,
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!pkg) {
    return (
      <div>
        <div className="p-6 text-center">
          <i className="ri-error-warning-line text-3xl text-foreground-300 mb-2 block"></i>
          <p className="text-foreground-600 font-medium">Package not found</p>
          <p className="text-sm text-foreground-400 mt-1">The selected package could not be found. Please select a different package.</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground-700 mb-1">Select a package</label>
          <select
            value={packageSlug}
            onChange={(e) => handlePackageChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400 cursor-pointer"
          >
            <option value="">— Select a package —</option>
            {marketplacePackages.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name} — {p.supplier}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Package details */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoRow label="Supplier" value={pkg.supplier} />
          <InfoRow label="Category" value={pkg.category} />
          <InfoRow label="Delivery formats" value={pkg.deliveryFormats.join(', ')} />
          <InfoRow label="Geographic coverage" value={pkg.geographicCoverage} />
          <InfoRow label="Access level" value={pkg.accessLevel} />
          <InfoRow label="Pricing model" value={pkg.pricingModel} />
          <InfoRow label="Provenance status" value={pkg.provenanceStatus} />
          <InfoRow label="Refresh frequency" value={pkg.refreshFrequency} />
        </div>

        <div className="p-3 rounded-lg border border-background-200/70 bg-background-50">
          <h3 className="text-sm font-semibold text-foreground-900 mb-1">Permitted use</h3>
          <p className="text-xs text-foreground-600">{pkg.permittedUseSummary}</p>
        </div>

        <div className="p-3 rounded-lg border border-accent-200/60 bg-accent-50/30">
          <h3 className="text-sm font-semibold text-foreground-900 mb-1">Restrictions</h3>
          <p className="text-xs text-foreground-600">{pkg.restrictionSummary}</p>
        </div>

        {pkg.retentionGuidance && (
          <div className="p-3 rounded-lg border border-background-200/70 bg-background-50">
            <h3 className="text-sm font-semibold text-foreground-900 mb-1">Retention guidance</h3>
            <p className="text-xs text-foreground-600">{pkg.retentionGuidance}</p>
          </div>
        )}

        {/* Change package */}
        <div>
          <label className="block text-sm font-medium text-foreground-700 mb-1">Change package</label>
          <select
            value={packageSlug}
            onChange={(e) => handlePackageChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400 cursor-pointer"
          >
            {marketplacePackages.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Acknowledgement */}
      <div className="p-4 rounded-lg border border-background-200/70 bg-background-50 mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={draft.productAcknowledged}
            onChange={(e) => onUpdate({ ...draft, productAcknowledged: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 cursor-pointer"
          />
          <span className="text-sm text-foreground-700">
            I have reviewed the package description, provenance, permitted-use summary, restrictions and retention guidance. I understand that access is subject to supplier approval and licence conditions.
          </span>
        </label>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-accent-50 border border-accent-200/60" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-1">Please fix the following:</p>
          <ul className="space-y-0.5">
            {errors.map((e) => (
              <li key={e.field} className="text-xs text-accent-800">{e.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-background-100">
        {onPrev ? (
          <button onClick={onPrev} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
            <i className="ri-arrow-left-line"></i> Previous
          </button>
        ) : (
          <div />
        )}
        <button onClick={handleContinue} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
          Continue <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[11px] text-foreground-400">{label}</span>
      <p className="text-sm text-foreground-800">{value}</p>
    </div>
  );
}