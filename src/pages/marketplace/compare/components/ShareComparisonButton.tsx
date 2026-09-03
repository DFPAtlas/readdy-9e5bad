import { useState, useCallback } from "react";

interface ShareComparisonButtonProps {
  currentUrl: string;
}

export default function ShareComparisonButton({ currentUrl }: ShareComparisonButtonProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleShare = useCallback(async () => {
    const fullUrl = window.location.origin + currentUrl;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "DataHarbour Package Comparison",
          url: fullUrl,
        });
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
        return;
      } catch {
        // User cancelled or API failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(fullUrl);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    } catch {
      // Clipboard failed — still show attempt
    }
  }, [currentUrl]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-foreground-200/20 px-3 py-2 text-xs text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
        aria-label="Share comparison"
      >
        <i className="ri-share-forward-line text-sm" aria-hidden="true" />
        <span className="hidden sm:inline">Share</span>
      </button>
      {showFeedback && (
        <span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-accent-400"
          role="status"
          aria-live="polite"
        >
          <i className="ri-check-line mr-1" aria-hidden="true" />
          Link copied
        </span>
      )}
    </div>
  );
}