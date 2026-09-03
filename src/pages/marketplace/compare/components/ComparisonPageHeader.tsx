import { useNavigate } from "react-router-dom";
import ShareComparisonButton from "./ShareComparisonButton";

interface ComparisonPageHeaderProps {
  packageCount: number;
  currentUrl: string;
  onClear: () => void;
  onPrint: () => void;
}

export default function ComparisonPageHeader({
  packageCount,
  currentUrl,
  onClear,
  onPrint,
}: ComparisonPageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <button
        type="button"
        onClick={() => navigate("/marketplace")}
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
      >
        <i className="ri-arrow-left-line" aria-hidden="true" />
        Back to Marketplace
      </button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-foreground-500">
            Marketplace Comparison
          </p>
          <h1
            className="text-3xl text-foreground-50 md:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Compare governed data packages
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-400">
            Review coverage, delivery, pricing, provenance and usage conditions side by side before
            deciding which products may suit your organisation.
          </p>
          <p className="mt-2 text-xs text-foreground-500">
            <i className="ri-information-line mr-1 align-middle" aria-hidden="true" />
            Comparing <strong className="text-foreground-300">{packageCount}</strong> package
            {packageCount !== 1 ? "s" : ""} — maximum four.{" "}
            {packageCount < 2 && (
              <span>Add at least one more package to begin comparison.</span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ShareComparisonButton currentUrl={currentUrl} />
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-xs text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            aria-label="Print comparison"
          >
            <i className="ri-printer-line text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-xs text-foreground-400 transition hover:border-[#ff2e88]/30 hover:text-[#ff2e88] cursor-pointer"
            aria-label="Clear comparison"
          >
            <i className="ri-delete-bin-line text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
}