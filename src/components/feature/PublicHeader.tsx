import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicHeader() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (path: string) => {
      closeMobile();
      navigate(path);
    },
    [navigate, closeMobile],
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-foreground-200/10 bg-background-50/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ff2e88]/60 bg-black/30">
              <i className="ri-flashlight-fill text-sm text-[#ff2e88]" />
            </div>
            <span
              className="text-base tracking-[0.25em] text-foreground-100"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              DataHarbour
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="text-xs tracking-wide text-foreground-400 transition hover:text-foreground-100 cursor-pointer"
            >
              Marketplace
            </button>
            <button
              type="button"
              onClick={() => navigate("/solutions")}
              className="text-xs tracking-wide text-foreground-400 transition hover:text-foreground-100 cursor-pointer"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => navigate("/compliance")}
              className="text-xs tracking-wide text-foreground-400 transition hover:text-foreground-100 cursor-pointer"
            >
              Compliance
            </button>
            <button
              type="button"
              onClick={() => navigate("/suppliers")}
              className="text-xs tracking-wide text-foreground-400 transition hover:text-foreground-100 cursor-pointer"
            >
              Suppliers
            </button>
            <button
              type="button"
              onClick={() => navigate("/resources")}
              className="text-xs tracking-wide text-foreground-400 transition hover:text-foreground-100 cursor-pointer"
            >
              Resources
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/sign-in")}
              className="hidden whitespace-nowrap rounded-lg border border-foreground-200/20 px-4 py-2 text-xs font-medium text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 md:inline-flex cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="hidden whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2 text-xs font-medium text-background-950 transition hover:bg-primary-400 md:inline-flex cursor-pointer"
            >
              Explore Marketplace
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground-200/20 text-foreground-300 transition hover:border-foreground-200/40 md:hidden cursor-pointer"
              aria-label="Open menu"
            >
              <i className="ri-menu-line text-lg" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-background-100 border-l border-foreground-200/10 p-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <span
                className="text-sm tracking-[0.2em] text-foreground-200"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                DataHarbour
              </span>
              <button
                type="button"
                onClick={closeMobile}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-100 cursor-pointer"
                aria-label="Close menu"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {[
                { label: "Marketplace", path: "/marketplace" },
                { label: "Solutions", path: "/solutions" },
                { label: "Compliance", path: "/compliance" },
                { label: "Suppliers", path: "/suppliers" },
                { label: "Resources", path: "/resources" },
              ].map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground-300 transition hover:bg-background-200 hover:text-foreground-100 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <hr className="my-3 border-foreground-200/10" />
              <button
                type="button"
                onClick={() => handleNavClick("/sign-in")}
                className="w-full rounded-lg border border-foreground-200/20 px-3 py-2.5 text-left text-sm text-foreground-300 transition hover:border-foreground-200/40 hover:text-foreground-100 cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("/marketplace")}
                className="mt-1 w-full rounded-lg bg-primary-500 px-3 py-2.5 text-center text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer"
              >
                Explore Marketplace
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}