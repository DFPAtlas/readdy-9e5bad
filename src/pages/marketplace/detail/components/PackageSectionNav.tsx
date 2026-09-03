import { useState, useEffect, useCallback } from "react";

interface SectionNavProps {
  sections: { id: string; label: string; icon: string }[];
}

export default function PackageSectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const offsets = sections.map((s) => {
      const el = document.getElementById(s.id);
      return el ? el.getBoundingClientRect().top - 120 : Infinity;
    });
    let current = sections[0]?.id ?? "";
    for (let i = offsets.length - 1; i >= 0; i--) {
      if (offsets[i] <= 100) {
        current = sections[i].id;
        break;
      }
    }
    setActiveSection(current);
  }, [sections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const activeLabel = sections.find((s) => s.id === activeSection)?.label ?? sections[0]?.label;

  return (
    <>
      <nav className="hidden lg:block sticky top-[72px] z-30 -mx-1 mb-8" aria-label="Page sections">
        <div className="flex items-center gap-1 overflow-x-auto rounded-lg border border-foreground-200/10 bg-background-100/80 p-1 backdrop-blur-sm">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition cursor-pointer ${
                activeSection === s.id
                  ? "bg-background-50 text-foreground-100 shadow-sm"
                  : "text-foreground-400 hover:text-foreground-200"
              }`}
            >
              <i className={`${s.icon} text-[11px]`} aria-hidden="true" />
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="lg:hidden sticky top-[72px] z-30 mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-foreground-200/10 bg-background-100/80 px-4 py-2.5 text-xs font-medium text-foreground-200 backdrop-blur-sm cursor-pointer"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <i className="ri-menu-2-line text-foreground-400" aria-hidden="true" />
            {activeLabel}
          </span>
          <i className={mobileOpen ? "ri-arrow-up-s-line text-foreground-400" : "ri-arrow-down-s-line text-foreground-400"} aria-hidden="true" />
        </button>
        {mobileOpen && (
          <div className="absolute left-0 right-0 mt-1 rounded-lg border border-foreground-200/10 bg-background-100 shadow-lg">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-xs transition cursor-pointer ${
                  activeSection === s.id
                    ? "bg-background-200/60 text-foreground-100"
                    : "text-foreground-400 hover:bg-background-200/40"
                }`}
              >
                <i className={`${s.icon} text-[11px]`} aria-hidden="true" />
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}