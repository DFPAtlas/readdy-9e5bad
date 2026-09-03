import { useState, useCallback } from "react";

interface SharePackageButtonProps {
  packageSlug: string;
  packageName: string;
}

export default function SharePackageButton({ packageSlug, packageName }: SharePackageButtonProps) {
  const [feedback, setFeedback] = useState("");

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/marketplace/${packageSlug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: packageName, text: `Explore ${packageName} on DataHarbour`, url });
        setFeedback("Shared");
      } catch {
        // User cancelled — no action
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setFeedback("Link copied");
      } catch {
        setFeedback("Copy failed");
      }
    }

    setTimeout(() => setFeedback(""), 2000);
  }, [packageSlug, packageName]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleShare}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground-200/20 text-foreground-400 transition hover:border-foreground-200/40 hover:text-foreground-200 cursor-pointer"
        aria-label={`Share ${packageName}`}
      >
        <i className="ri-share-line text-sm" aria-hidden="true" />
      </button>
      {feedback && (
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] whitespace-nowrap text-accent-400 pointer-events-none">
          {feedback}
        </span>
      )}
    </div>
  );
}