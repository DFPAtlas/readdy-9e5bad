import type { ReactNode } from "react";

interface TrustItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function TrustItem({ icon, title, description }: TrustItemProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-foreground-200/10 bg-background-100/50 p-6 text-center backdrop-blur-sm transition hover:border-foreground-200/20">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/10">
        <i className={`${icon} text-xl text-accent-400`} />
      </div>
      <h3 className="mb-2 text-sm font-semibold text-foreground-100">{title}</h3>
      <p className="text-xs leading-relaxed text-foreground-400">{description}</p>
    </div>
  );
}