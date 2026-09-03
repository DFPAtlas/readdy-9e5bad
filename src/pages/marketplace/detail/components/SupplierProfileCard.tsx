import type { MarketplacePackage } from "@/data/marketplacePackages";
import PackageBadge from "@/pages/marketplace/components/PackageBadge";

interface SupplierProfileCardProps {
  pkg: MarketplacePackage;
  totalPackages: number;
}

export default function SupplierProfileCard({ pkg, totalPackages }: SupplierProfileCardProps) {
  const supplierVariant = pkg.supplierStatus === "Verified Supplier"
    ? "supplier"
    : pkg.supplierStatus === "Demonstration Supplier"
    ? "demo"
    : "default";

  return (
    <section id="supplier" className="mb-10 scroll-mt-28">
      <h2
        className="mb-5 text-xl text-foreground-50"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Supplier
      </h2>

      <div className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium text-foreground-200">{pkg.supplier}</h3>
            <div className="mt-1 flex items-center gap-2">
              <PackageBadge label={pkg.supplierStatus} variant={supplierVariant} />
              <span className="text-[11px] text-foreground-500">Joined {new Date(pkg.supplierJoinedDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>
          <a
            href={`/contact?type=supplier&package=${pkg.slug}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2 text-[11px] font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
          >
            <i className="ri-mail-line" aria-hidden="true" />
            Contact Supplier
          </a>
        </div>

        <p className="mb-4 text-xs text-foreground-400 leading-relaxed">{pkg.supplierDescription}</p>

        <div className="flex flex-wrap gap-3 text-[11px]">
          <div className="rounded-md border border-foreground-200/10 bg-background-200/40 px-3 py-1.5">
            <span className="text-foreground-500">Packages on DataHarbour: </span>
            <span className="font-medium text-foreground-200">{totalPackages}</span>
          </div>
          <div className="rounded-md border border-foreground-200/10 bg-background-200/40 px-3 py-1.5">
            <span className="text-foreground-500">Provenance: </span>
            <span className="font-medium text-foreground-200">{pkg.provenanceStatus}</span>
          </div>
          <div className="rounded-md border border-foreground-200/10 bg-background-200/40 px-3 py-1.5">
            <span className="text-foreground-500">Support: </span>
            <span className="font-medium text-foreground-200">{pkg.supportLevel.split(".")[0]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}