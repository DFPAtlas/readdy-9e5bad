import type { MarketplacePackage } from "@/data/marketplacePackages";
import PackageBadge from "@/pages/marketplace/components/PackageBadge";

interface PackageTrustRowProps {
  pkg: MarketplacePackage;
}

export default function PackageTrustRow({ pkg }: PackageTrustRowProps) {
  const items = [
    {
      label: "Provenance",
      value: pkg.provenanceStatus,
      icon: pkg.provenanceStatus === "Full" ? "ri-check-double-line" : pkg.provenanceStatus === "Reviewed" ? "ri-check-line" : "ri-information-line",
      variant: "provenance" as const,
    },
    {
      label: "Access",
      value: pkg.accessLevel,
      icon: "ri-lock-line",
      variant: "access" as const,
    },
    {
      label: "Refresh",
      value: pkg.refreshFrequency,
      icon: "ri-refresh-line",
      variant: "default" as const,
    },
    {
      label: "Geography",
      value: pkg.geographicCoverage,
      icon: "ri-earth-line",
      variant: "default" as const,
    },
    {
      label: "Delivery",
      value: pkg.deliveryFormats.length > 1 ? `${pkg.deliveryFormats.length} formats` : pkg.deliveryFormats[0],
      icon: "ri-download-line",
      variant: "default" as const,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5 rounded-md border border-foreground-200/10 bg-background-100/60 px-2.5 py-1.5">
          <i className={`${item.icon} text-[10px] text-foreground-400`} aria-hidden="true" />
          <span className="text-[10px] text-foreground-500 whitespace-nowrap">{item.label}</span>
          <PackageBadge label={item.value} variant={item.variant} />
        </div>
      ))}
    </div>
  );
}