import { useState } from "react";

interface PackageCardProps {
  name: string;
  category: string;
  description: string;
  coverage: string;
  refresh: string;
  delivery: string;
  access: string;
}

export default function PackageCard({ name, category, description, coverage, refresh, delivery, access }: PackageCardProps) {
  const [saved, setSaved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-lg border border-foreground-200/10 bg-background-100/60 p-5 backdrop-blur-sm transition hover:border-foreground-200/20">
      <div className="mb-3">
        <span className="inline-block rounded-full bg-accent-500/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent-400">
          {category}
        </span>
      </div>
      <h3 className="mb-2 text-base font-semibold text-foreground-50">{name}</h3>
      <p className="mb-4 flex-1 text-xs leading-relaxed text-foreground-400">{description}</p>
      <div className="mb-4 space-y-1.5 border-t border-foreground-200/10 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500">Coverage</span>
          <span className="text-foreground-300">{coverage}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500">Refresh</span>
          <span className="text-foreground-300">{refresh}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-500">Delivery</span>
          <span className="text-foreground-300">{delivery}</span>
        </div>
      </div>
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-md bg-accent-500/10 px-2.5 py-1 text-[10px] font-medium text-accent-400">
          <i className="ri-shield-check-line text-xs" />
          {access}
        </span>
      </div>
      <div className="mt-auto flex items-center gap-2">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-500/90 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
        >
          View Package
        </button>
        <button
          type="button"
          onClick={handleSave}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition cursor-pointer ${
            saved
              ? "border-accent-400/50 bg-accent-500/20 text-accent-400"
              : "border-foreground-200/20 text-foreground-400 hover:border-foreground-200/40 hover:text-foreground-200"
          }`}
          aria-label={saved ? "Unsave package" : "Save package"}
        >
          <i className={`${saved ? "ri-bookmark-fill" : "ri-bookmark-line"} text-sm`} />
        </button>
      </div>
      {showConfirm && (
        <div className="mt-2 text-center text-[11px] text-accent-400">
          {saved ? "Package saved" : "Package removed"}
        </div>
      )}
    </div>
  );
}