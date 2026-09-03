import { useState, useCallback } from "react";

interface ClearOption {
  key: string;
  label: string;
  description: string;
  storageKeys: string[];
}

const clearOptions: ClearOption[] = [
  { key: "saved-packages", label: "Saved Packages", description: "Marketplace packages saved for later review.", storageKeys: ["dh_saved_packages"] },
  { key: "comparison", label: "Comparison State", description: "Package comparison selections.", storageKeys: ["dh_comparison_state"] },
  { key: "supplier-draft", label: "Supplier Application Draft", description: "Draft supplier application data.", storageKeys: ["dh_supplier_draft", "supplier_application_draft"] },
  { key: "contact-drafts", label: "Contact Drafts and References", description: "Draft enquiry forms and local demonstration references.", storageKeys: ["dh_contact_draft", "contact_draft", "contact_submission"] },
  { key: "pricing-enquiry", label: "Pricing Enquiry", description: "Local copy of pricing demonstration enquiry.", storageKeys: ["dh_pricing_enquiry"] },
];

export default function LocalDataManager() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cleared, setCleared] = useState(false);

  const toggle = useCallback((key: string) => {
    setSelected((prev: Set<string>) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const handleClear = useCallback(() => {
    const opts = clearOptions.filter((o) => selected.has(o.key));
    opts.forEach((opt) => {
      opt.storageKeys.forEach((k) => {
        try { localStorage.removeItem(k); } catch { /* ignore */ }
      });
    });
    setCleared(true);
    setConfirmOpen(false);
    setSelected(new Set());
  }, [selected]);

  const selectAll = () => setSelected(new Set(clearOptions.map((o) => o.key)));
  const deselectAll = () => setSelected(new Set());

  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-100 p-6">
      <h2 className="mb-2 text-base font-semibold text-foreground-100">Local Browser Data</h2>
      <p className="mb-5 text-[12px] leading-relaxed text-foreground-400">
        DataHarbour stores some information in your browser for convenience. You can clear selected categories below. This does not affect any server-side data (none is stored in this demonstration phase).
      </p>

      {cleared && (
        <div className="mb-4 rounded-md bg-accent-100/60 px-4 py-3 text-[12px] text-accent-800" role="alert">
          Selected browser data has been cleared.
        </div>
      )}

      <div className="mb-5 space-y-3">
        {clearOptions.map((opt) => (
          <label key={opt.key} className="flex cursor-pointer items-start gap-3 rounded-md border border-foreground-200/10 p-3 transition hover:border-foreground-300/20">
            <input
              type="checkbox"
              checked={selected.has(opt.key)}
              onChange={() => toggle(opt.key)}
              className="mt-0.5 h-4 w-4 rounded border-foreground-500/40 bg-background-50 text-primary-500 focus:ring-primary-400"
            />
            <div>
              <span className="text-[13px] font-medium text-foreground-200">{opt.label}</span>
              <p className="text-[11px] text-foreground-500">{opt.description}</p>
              <p className="mt-0.5 font-mono text-[10px] text-foreground-600">{opt.storageKeys.join(", ")}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={selectAll} className="whitespace-nowrap text-[11px] text-foreground-500 underline transition hover:text-foreground-300 cursor-pointer">Select all</button>
        <button type="button" onClick={deselectAll} className="whitespace-nowrap text-[11px] text-foreground-500 underline transition hover:text-foreground-300 cursor-pointer">Deselect all</button>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={selected.size === 0}
          className="ml-auto whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-xs font-medium text-background-50 transition hover:bg-primary-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Clear Selected
        </button>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-xl border border-foreground-200/20 bg-background-100 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-label="Confirm clear">
            <h3 className="mb-2 text-sm font-semibold text-foreground-100">Clear Browser Data?</h3>
            <p className="mb-1 text-[12px] leading-relaxed text-foreground-400">
              This will permanently remove the selected data from this browser:
            </p>
            <ul className="mb-4 list-disc pl-5 text-[11px] text-foreground-500">
              {clearOptions.filter((o) => selected.has(o.key)).map((o) => (
                <li key={o.key}>{o.label}</li>
              ))}
            </ul>
            <p className="mb-4 text-[11px] text-foreground-600">This action cannot be undone. It does not affect any server data.</p>
            <div className="flex gap-2">
              <button type="button" onClick={handleClear} className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-xs font-medium text-background-50 transition hover:bg-primary-400 cursor-pointer">Yes, Clear</button>
              <button type="button" onClick={() => setConfirmOpen(false)} className="whitespace-nowrap rounded-md border border-foreground-300/30 bg-background-50 px-4 py-2 text-xs text-foreground-400 transition hover:text-foreground-300 cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}