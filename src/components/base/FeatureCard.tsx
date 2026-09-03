interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-foreground-200/10 bg-background-100/50 p-5 backdrop-blur-sm transition hover:border-foreground-200/20">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10">
        <i className={`${icon} text-lg text-primary-400`} />
      </div>
      <div>
        <h4 className="mb-1 text-sm font-semibold text-foreground-100">{title}</h4>
        <p className="text-xs leading-relaxed text-foreground-400">{description}</p>
      </div>
    </div>
  );
}