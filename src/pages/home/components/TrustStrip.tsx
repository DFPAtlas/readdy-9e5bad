import TrustItem from "@/components/base/TrustItem";

const trustItems = [
  {
    icon: "ri-shield-check-line",
    title: "Verified Sources",
    description: "Supplier and source information can be reviewed before a package is published.",
  },
  {
    icon: "ri-lock-line",
    title: "Controlled Access",
    description: "Restricted products require organisation and intended-use approval.",
  },
  {
    icon: "ri-file-search-line",
    title: "Clear Provenance",
    description: "Understand whether data is supplied, licensed, public, derived, inferred or aggregated.",
  },
  {
    icon: "ri-history-line",
    title: "Auditable Usage",
    description: "Access requests, package activity and API usage can be recorded.",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-foreground-200/10 bg-background-100/80">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <TrustItem key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  );
}