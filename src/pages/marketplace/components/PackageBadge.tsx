interface PackageBadgeProps {
  label: string;
  variant?: "default" | "demo" | "supplier" | "access" | "provenance";
  icon?: string;
}

const variantStyles: Record<string, string> = {
  default: "border-foreground-200/20 bg-background-100/80 text-foreground-400",
  demo: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  supplier: "border-accent-400/30 bg-accent-500/10 text-accent-400",
  access: "border-[#ff2e88]/30 bg-[#ff2e88]/10 text-[#ff2e88]",
  provenance: "border-accent-400/20 bg-accent-500/10 text-accent-400",
};

export default function PackageBadge({ label, variant = "default", icon }: PackageBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${variantStyles[variant]}`}>
      {icon && <i className={`${icon} text-[10px]`} />}
      {label}
    </span>
  );
}