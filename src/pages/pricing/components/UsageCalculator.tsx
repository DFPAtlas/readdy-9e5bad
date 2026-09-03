import { useState, useMemo, type ChangeEvent } from "react";
import { usageCalculatorConfigs, type UsageTierConfig } from "@/data/pricing";
import SectionHeading from "@/components/base/SectionHeading";

const basisOptions = [
  { value: "api", label: "API requests" },
  { value: "records", label: "Records" },
  { value: "feed", label: "Monthly feed" },
  { value: "fixed", label: "Fixed package" },
];

interface BreakdownItem {
  label: string;
  count: number;
  rate: number;
  subtotal: number;
}

function calculateUsage(config: UsageTierConfig, volume: number): BreakdownItem[] {
  const items: BreakdownItem[] = [];
  let remaining = volume;

  for (const tier of config.tiers) {
    if (remaining <= 0) break;
    const tierMax = tier.max !== null ? tier.max - tier.min : Infinity;
    const count = Math.min(remaining, tierMax);
    if (count > 0) {
      items.push({
        label: tier.label,
        count,
        rate: tier.unitPrice,
        subtotal: count * tier.unitPrice,
      });
    }
    remaining -= count;
  }

  return items;
}

export default function UsageCalculator() {
  const [basis, setBasis] = useState("api");
  const [volume, setVolume] = useState("25000");
  const [supportLevel, setSupportLevel] = useState("standard");
  const [showVat, setShowVat] = useState(false);

  const config = usageCalculatorConfigs[basis] || usageCalculatorConfigs.api;
  const numVolume = Math.max(0, Math.min(parseInt(volume, 10) || 0, 10000000));

  const breakdown = useMemo(() => calculateUsage(config, numVolume), [config, numVolume]);

  const supportMultiplier = config.supportLevels.find((s) => s.id === supportLevel)?.multiplier ?? 0;
  const usageSubtotal = breakdown.reduce((sum, item) => sum + item.subtotal, 0);
  const supportCharge = usageSubtotal * supportMultiplier;
  const subtotal = usageSubtotal + supportCharge;
  const vatAmount = showVat ? subtotal * config.vatRate : 0;
  const total = subtotal + vatAmount;

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setVolume(val);
  };

  const formatGBP = (amount: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }).format(amount);

  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Usage Estimator"
          heading="Estimate an illustrative usage charge"
          supporting="Select a pricing basis and estimated volume to see a demonstration calculation. This is not a quote."
        />

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-foreground-200/10 bg-background-100/60 p-5 md:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="calc-basis" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Pricing basis
              </label>
              <select
                id="calc-basis"
                value={basis}
                onChange={(e) => setBasis(e.target.value)}
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30 cursor-pointer"
              >
                {basisOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="calc-volume" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Estimated monthly {config.unit}
              </label>
              <input
                id="calc-volume"
                type="text"
                inputMode="numeric"
                value={volume}
                onChange={handleVolumeChange}
                placeholder="e.g. 25000"
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 placeholder:text-foreground-600 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30"
              />
              <p className="mt-1 text-[10px] text-foreground-600">
                Up to 10,000,000 — demonstration maximum
              </p>
            </div>

            <div>
              <label htmlFor="calc-support" className="mb-1.5 block text-xs font-medium text-foreground-300">
                Support level
              </label>
              <select
                id="calc-support"
                value={supportLevel}
                onChange={(e) => setSupportLevel(e.target.value)}
                className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3.5 py-2.5 text-sm text-foreground-200 focus:border-accent-400/50 focus:outline-none focus:ring-1 focus:ring-accent-400/30 cursor-pointer"
              >
                {config.supportLevels.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground-300">VAT display</label>
              <button
                type="button"
                onClick={() => setShowVat(!showVat)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition cursor-pointer ${
                  showVat
                    ? "border-accent-300/50 bg-accent-100/50 text-accent-700"
                    : "border-foreground-200/20 bg-background-50 text-foreground-400"
                }`}
                aria-pressed={showVat}
              >
                <span className={`h-3.5 w-3.5 rounded-full border-2 transition ${showVat ? "border-accent-500 bg-accent-500" : "border-foreground-400"}`} />
                {showVat ? "VAT included (20%)" : "Show VAT (20%)"}
              </button>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-7 rounded-lg border border-foreground-200/10 bg-background-50 p-4">
            <h4 className="mb-3 text-xs font-medium text-foreground-300">Calculation breakdown</h4>

            <div className="space-y-2">
              {breakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-foreground-400">{item.label}</span>
                  <span className="shrink-0 text-foreground-400">
                    {item.count.toLocaleString()} {config.unit} &times; {formatGBP(item.rate)} = {formatGBP(item.subtotal)}
                  </span>
                </div>
              ))}

              {supportMultiplier > 0 && (
                <div className="flex items-center justify-between gap-4 border-t border-foreground-200/10 pt-2 text-xs">
                  <span className="text-foreground-400">Support uplift ({(supportMultiplier * 100).toFixed(0)}%)</span>
                  <span className="shrink-0 text-foreground-400">{formatGBP(supportCharge)}</span>
                </div>
              )}
            </div>

            <div className="mt-3 space-y-1.5 border-t border-foreground-200/10 pt-3">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-foreground-400">Subtotal</span>
                <span className="shrink-0 text-sm font-medium text-foreground-200">{formatGBP(subtotal)}</span>
              </div>
              {showVat && (
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-foreground-500">VAT (20%)</span>
                  <span className="shrink-0 text-foreground-500">{formatGBP(vatAmount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between gap-4 border-t border-foreground-200/10 pt-2 text-xs">
                <span className="font-medium text-foreground-200">Estimated total</span>
                <span className="shrink-0 text-base font-semibold text-foreground-50">{formatGBP(total)}</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-foreground-600">
            This estimate is for demonstration only and excludes membership, setup, supplier-specific terms, minimum commitments and negotiated agreements. Not a quote.
          </p>
        </div>
      </div>
    </section>
  );
}