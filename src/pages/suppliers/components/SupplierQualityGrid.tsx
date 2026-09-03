import SectionHeading from "@/components/base/SectionHeading";

const qualityItems = [
  {
    title: "Accurate descriptions",
    description: "Product listings must be accurate, current and not misleading. Overstating coverage, understating limitations or making claims that cannot be substantiated is a breach of supplier standards. Descriptions should be specific enough that a buyer can assess product fit without guessing.",
  },
  {
    title: "Field definitions",
    description: "Every data field must be defined — name, type, description, example values and null handling. Buyers need to understand what each field means before they can assess whether the product meets their needs. A complete data dictionary is expected.",
  },
  {
    title: "Schema consistency",
    description: "Data structure must be consistent between versions. Breaking schema changes must be communicated in advance. Buyers building integrations against your product rely on schema stability. Version identifiers and changelogs help buyers manage updates.",
  },
  {
    title: "Refresh reliability",
    description: "Data must be refreshed on the advertised schedule. If a refresh is delayed or fails, buyers should be notified. Consistent refresh builds buyer confidence. Repeatedly missed refreshes undermine trust and may result in listing review.",
  },
  {
    title: "Quality checks",
    description: "Suppliers must have documented quality-control processes — validation rules, consistency checks, duplicate handling, completeness monitoring and cross-reference verification where applicable. These processes should be described in the product listing.",
  },
  {
    title: "Duplicate handling",
    description: "The approach to identifying and handling duplicate records must be documented. Buyers need to know whether duplicates are removed, flagged or left for the buyer to handle. Inconsistent duplicate handling can distort analysis and undermine confidence.",
  },
  {
    title: "Coverage transparency",
    description: "Product coverage must be honestly described — what is included, what is excluded and where coverage is partial. Buyers making decisions based on coverage assumptions need accurate information. Gaps must be disclosed, not hidden.",
  },
  {
    title: "Known limitations",
    description: "Every dataset has limitations. Suppliers must document known limitations honestly. Concealing limitations creates liability and destroys trust. Transparent disclosure demonstrates responsible data stewardship.",
  },
  {
    title: "Version history",
    description: "Maintain and publish a version history. Each version should be identifiable, and differences between versions should be documented. Buyers need to understand the product's evolution and the impact of updates on their use.",
  },
  {
    title: "Deprecation",
    description: "If a field, endpoint or feature is being deprecated, buyers must be given reasonable notice and a migration path where possible. Sudden deprecation without notice can break buyer integrations and damage relationships.",
  },
  {
    title: "Support",
    description: "State what support you provide — contact method, response-time expectations and any limitations. Buyers need to know who to contact when they have questions or encounter issues. Realistic support expectations are better than overpromising.",
  },
  {
    title: "Incident notification",
    description: "Notify DataHarbour — and through DataHarbour, affected buyers — of incidents that may affect data quality, availability or security. Timely, honest communication during incidents preserves trust. Delayed or incomplete notification damages it.",
  },
];

export default function SupplierQualityGrid() {
  return (
    <section className="bg-background-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <SectionHeading
          label="Quality expectations"
          heading="Quality isn't a score — it's a practice"
          supporting="DataHarbour does not use a single unexplained quality score. Instead, suppliers are expected to document their quality practices honestly and completely, so buyers can make their own informed assessments."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualityItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-foreground-200/10 bg-background-100 p-5"
            >
              <h3 className="text-sm font-semibold text-foreground-200">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}