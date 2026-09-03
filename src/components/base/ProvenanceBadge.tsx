interface ProvenanceBadgeProps {
  label: string;
  variant?: "default" | "active" | "inactive";
}

const variantStyles: Record<string, string> = {
  default: "border-foreground-200/20 bg-background-100 text-foreground-300",
  active: "border-accent-400/30 bg-accent-500/10 text-accent-400",
  inactive: "border-foreground-200/10 bg-transparent text-foreground-500",
};

export default function ProvenanceBadge({ label, variant = "default" }: ProvenanceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}