import { useState, useCallback, type FormEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

interface MarketplaceHeroProps {
  searchValue: string;
  onSearch: (value: string) => void;
}

export default function MarketplaceHero({ searchValue, onSearch }: MarketplaceHeroProps) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(searchValue);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSearch(inputValue);
    },
    [inputValue, onSearch],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch(inputValue);
      }
    },
    [inputValue, onSearch],
  );

  return (
    <section className="relative overflow-hidden border-b border-foreground-200/10 bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-primary-400 uppercase">
            Governed Data Marketplace
          </p>
          <h1
            className="mb-5 text-3xl text-foreground-50 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Find trusted intelligence for a declared business purpose
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-foreground-400">
            Explore verified data products, APIs, feeds, reports and audience intelligence with clear provenance, usage conditions and access controls.
          </p>

          {/* Search */}
          <form onSubmit={handleSubmit} className="mx-auto mb-6 max-w-lg">
            <div className="flex rounded-lg border border-foreground-200/20 bg-background-50 overflow-hidden focus-within:border-primary-400/50 transition">
              <div className="flex items-center pl-4">
                <i className="ri-search-line text-foreground-400" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by name, supplier, category or keyword..."
                className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground-100 placeholder:text-foreground-500 outline-none"
                aria-label="Search marketplace packages"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue("");
                    onSearch("");
                  }}
                  className="flex items-center px-3 text-foreground-400 hover:text-foreground-200 transition cursor-pointer"
                  aria-label="Clear search"
                >
                  <i className="ri-close-line" />
                </button>
              )}
              <button
                type="submit"
                className="whitespace-nowrap bg-primary-500 px-5 py-3 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                const resultsEl = document.getElementById("marketplace-results");
                resultsEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
            >
              Browse all packages
              <i className="ri-arrow-down-line" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/compliance")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-foreground-200/20 px-5 py-2.5 text-sm font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
            >
              How access works
              <i className="ri-arrow-right-line" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: "ri-shield-check-line", label: "Verified suppliers" },
              { icon: "ri-file-search-line", label: "Provenance reviewed" },
              { icon: "ri-lock-line", label: "Controlled access" },
            ].map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 text-xs text-foreground-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/10">
                  <i className={`${item.icon} text-[10px] text-accent-400`} />
                </span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}