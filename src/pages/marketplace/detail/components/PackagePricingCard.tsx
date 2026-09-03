import type { MarketplacePackage } from "@/data/marketplacePackages";

interface PackagePricingCardProps {
  pkg: MarketplacePackage;
  onRequestAccess: () => void;
  isSaved: boolean;
  isComparing: boolean;
  isCompareAtLimit: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export default function PackagePricingCard({
  pkg,
  onRequestAccess,
  isSaved,
  isComparing,
  isCompareAtLimit,
  onToggleSave,
  onToggleCompare,
}: PackagePricingCardProps) {
  return (
    <div className="rounded-lg border border-foreground-200/10 bg-background-100/80 p-5 backdrop-blur-sm">
      {/* Price */}
      <div className="mb-4">
        <span className="text-lg font-semibold text-foreground-50">{pkg.priceDisplay}</span>
        <p className="mt-1 text-[11px] text-foreground-500">{pkg.pricingModel}</p>
      </div>

      <hr className="mb-4 border-foreground-200/10" />

      {/* Details */}
      <dl className="mb-5 space-y-3">
        <div className="flex justify-between text-[11px]">
          <dt className="text-foreground-500">Billing</dt>
          <dd className="text-foreground-300">{pkg.billingFrequency}</dd>
        </div>
        <div className="flex justify-between text-[11px]">
          <dt className="text-foreground-500">Minimum Term</dt>
          <dd className="text-foreground-300">{pkg.minimumTerm}</dd>
        </div>
        <div className="flex justify-between text-[11px]">
          <dt className="text-foreground-500">Licence</dt>
          <dd className="text-foreground-300">{pkg.licenceType}</dd>
        </div>
        <div className="flex justify-between text-[11px]">
          <dt className="text-foreground-500">Included</dt>
          <dd className="text-foreground-300">{pkg.usageAllowanceDisplay}</dd>
        </div>
        <div className="flex justify-between text-[11px]">
          <dt className="text-foreground-500">Overage</dt>
          <dd className="text-foreground-300">{pkg.overageDisplay}</dd>
        </div>
        <div className="flex justify-between text-[11px]">
          <dt className="text-foreground-500">Access Level</dt>
          <dd className="text-foreground-300">{pkg.accessLevel}</dd>
        </div>
        <div className="flex justify-between text-[11px]">
          <dt className="text-foreground-500">Onboarding</dt>
          <dd className="text-foreground-300">{pkg.onboardingTimeDisplay}</dd>
        </div>
      </dl>

      {/* CTA buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={onRequestAccess}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          <i className="ri-key-2-line" aria-hidden="true" />
          Request Access
        </button>
        <button
          type="button"
          onClick={() => {
            const searchParams = new URLSearchParams({ type: "supplier", package: pkg.slug });
            window.location.href = `/contact?${searchParams.toString()}`;
          }}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
        >
          Contact Sales
        </button>
      </div>

      {/* Save + Compare */}
      <hr className="my-4 border-foreground-200/10" />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleSave(pkg.id)}
          className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-2 text-[11px] transition cursor-pointer ${
            isSaved
              ? "border-accent-400/40 bg-accent-500/10 text-accent-400"
              : "border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"
          }`}
          aria-pressed={isSaved}
        >
          <i className={`text-sm ${isSaved ? "ri-bookmark-fill" : "ri-bookmark-line"}`} aria-hidden="true" />
          {isSaved ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => onToggleCompare(pkg.id)}
          disabled={!isComparing && isCompareAtLimit}
          className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-2 text-[11px] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            isComparing
              ? "border-accent-400/40 bg-accent-500/10 text-accent-400"
              : "border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40"
          }`}
          aria-pressed={isComparing}
        >
          <i className={isComparing ? "ri-checkbox-line" : "ri-add-line"} aria-hidden="true" />
          {isComparing ? "Comparing" : "Compare"}
        </button>
      </div>

      {!isComparing && isCompareAtLimit && (
        <p className="mt-2 text-[10px] text-foreground-500 text-center">
          Maximum 4 packages for comparison
        </p>
      )}
    </div>
  );
}