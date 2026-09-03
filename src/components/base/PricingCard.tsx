interface PricingCardProps {
  name: string;
  priceLabel: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({ name, priceLabel, features, highlighted = false }: PricingCardProps) {
  return (
    <div
      className={`flex flex-col rounded-lg border p-6 backdrop-blur-sm transition ${
        highlighted
          ? "border-accent-400/30 bg-accent-500/5"
          : "border-foreground-200/10 bg-background-100/50 hover:border-foreground-200/20"
      }`}
    >
      <h3 className="mb-1 text-lg font-semibold text-foreground-50">{name}</h3>
      <p className="mb-5 text-sm font-medium text-primary-400">{priceLabel}</p>
      <ul className="mb-6 flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs text-foreground-400">
            <i className="ri-check-line mt-0.5 shrink-0 text-accent-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`w-full whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-medium transition cursor-pointer ${
          highlighted
            ? "bg-primary-500 text-background-950 hover:bg-primary-400"
            : "border border-foreground-200/20 text-foreground-300 hover:border-foreground-200/40 hover:text-foreground-100"
        }`}
      >
        {name === "Explorer" ? "Get Started" : name === "Supplier" ? "Apply to Join" : "Contact Sales"}
      </button>
    </div>
  );
}