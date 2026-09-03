import { useState, useEffect, useCallback } from "react";

interface NavItem {
  label: string;
  anchor: string;
}

interface Props {
  items: NavItem[];
}

export default function ComplianceSectionNav({ items }: Props) {
  const [activeAnchor, setActiveAnchor] = useState(items[0]?.anchor ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const offsets = items
      .map((item) => {
        const el = document.getElementById(item.anchor);
        return el ? { anchor: item.anchor, top: el.getBoundingClientRect().top } : null;
      })
      .filter(Boolean) as { anchor: string; top: number }[];

    for (let i = offsets.length - 1; i >= 0; i--) {
      if (offsets[i].top <= 140) {
        setActiveAnchor(offsets[i].anchor);
        return;
      }
    }
    if (offsets.length > 0) setActiveAnchor(offsets[0].anchor);
  }, [items]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const activeLabel = items.find((i) => i.anchor === activeAnchor)?.label ?? items[0]?.label;

  return (
    <nav className="sticky top-[61px] z-30 border-b border-foreground-200/10 bg-background-50/95 backdrop-blur-md" aria-label="Page sections">
      <div className="mx-auto hidden max-w-7xl items-center gap-0.5 overflow-x-auto px-4 py-2 md:flex md:px-6">
        {items.map((item) => (
          <button
            key={item.anchor}
            type="button"
            onClick={() => scrollTo(item.anchor)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs transition cursor-pointer ${
              activeAnchor === item.anchor
                ? "bg-accent-500/10 text-accent-400 font-medium"
                : "text-foreground-500 hover:text-foreground-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-2 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-foreground-200/20 bg-background-100/60 px-3 py-2 text-xs text-foreground-300 cursor-pointer"
          aria-expanded={mobileOpen}
        >
          <span className="truncate">{activeLabel}</span>
          <i className={`${mobileOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} shrink-0 text-foreground-500`} aria-hidden="true" />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-foreground-200/10 bg-background-100 px-4 py-2 md:hidden">
          {items.map((item) => (
            <button
              key={item.anchor}
              type="button"
              onClick={() => scrollTo(item.anchor)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition cursor-pointer ${
                activeAnchor === item.anchor
                  ? "bg-accent-500/10 text-accent-400 font-medium"
                  : "text-foreground-500 hover:text-foreground-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}