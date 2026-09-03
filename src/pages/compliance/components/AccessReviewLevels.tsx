const accessLevels = [
  {
    level: "Open catalogue information",
    description:
      "Anyone can browse the marketplace catalogue, read product descriptions, review permitted-use summaries and understand access requirements. No verification is needed to explore what is available.",
    examples: "Catalogue browsing, product comparison, public documentation.",
  },
  {
    level: "Verified buyer access",
    description:
      "Access requires the buyer to be a verified organisation with an authorised representative and a declared business purpose. Suitable for products where the supplier has set standard access terms.",
    examples: "Standard registry data, aggregated market intelligence, pre-built audience segments.",
  },
  {
    level: "Compliance review",
    description:
      "Access requires an additional compliance review of the declared purpose, the buyer's internal controls and the proportionality of the request. Required for products with higher sensitivity or regulatory implications.",
    examples: "Identity-verification signals, fraud-prevention data, enriched personal data.",
  },
  {
    level: "Supplier approval",
    description:
      "The supplier must separately approve the buyer's access request. This is common where the supplier wishes to maintain direct control over who accesses their data or where the product carries bespoke commercial terms.",
    examples: "Bespoke research products, limited-distribution datasets, high-value commercial data.",
  },
  {
    level: "Enterprise agreement",
    description:
      "Access is governed by a negotiated enterprise agreement covering volume, term, permitted use, security, service levels and pricing. Suitable for large-scale, multi-product or ongoing data-access relationships.",
    examples: "Enterprise-wide data-platform access, multi-year agreements, custom integration.",
  },
];

export default function AccessReviewLevels() {
  return (
    <section className="bg-background-100" id="access-levels" aria-labelledby="al-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="al-heading"
          className="mb-2 text-2xl text-foreground-100 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Access review levels
        </h2>
        <p className="mb-2 text-sm text-foreground-400 max-w-2xl">
          Not all data products carry the same access requirements. DataHarbour uses a tiered access model that matches the level of review to the sensitivity and conditions of each product.
        </p>
        <p className="mb-10 text-xs text-foreground-500 italic">
          A catalogue listing is not automatic permission to access or use the underlying product. The access level on each product page tells you what will be required.
        </p>

        <div className="space-y-4">
          {accessLevels.map((level, i) => (
            <div
              key={level.level}
              className="rounded-lg border border-foreground-200/10 bg-background-50/60 p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background-200/60">
                  <span className="text-sm font-semibold text-foreground-400">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-medium text-foreground-100">{level.level}</h3>
                  <p className="mb-2 text-sm leading-relaxed text-foreground-300">{level.description}</p>
                  <p className="text-xs text-foreground-500">
                    <span className="font-medium text-foreground-400">Typical examples:</span>{" "}
                    {level.examples}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}