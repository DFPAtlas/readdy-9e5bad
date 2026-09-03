import { useNavigate } from "react-router-dom";

export default function PublicFooter() {
  const navigate = useNavigate();

  const linkClass = "text-xs text-foreground-500 transition hover:text-foreground-300 cursor-pointer";

  return (
    <footer className="border-t border-foreground-200/10 bg-background-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Marketplace */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Marketplace</h4>
            <ul className="space-y-2.5">
              {["Browse Packages", "Data Categories", "Featured Packages", "API Products", "Data Feeds"].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => navigate("/marketplace")} className={linkClass}>{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Solutions</h4>
            <ul className="space-y-2.5">
              {["Marketing Intelligence", "Business Verification", "Fraud Prevention", "Location Intelligence", "Market Research"].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => navigate("/solutions")} className={linkClass}>{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Suppliers */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Suppliers</h4>
            <ul className="space-y-2.5">
              {["Become a Supplier", "Supplier Standards", "Package Guidelines", "Supplier Sign In"].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => navigate("/suppliers")} className={linkClass}>{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Compliance</h4>
            <ul className="space-y-2.5">
              {["Compliance Centre", "Responsible Use", "Data Provenance", "Data-Subject Requests", "Security Reporting"].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => navigate("/compliance")} className={linkClass}>{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Company</h4>
            <ul className="space-y-2.5">
              {["About DataHarbour", "Contact", "Resources", "Careers", "System Status"].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => navigate(item.includes("Contact") ? "/contact" : "/resources")} className={linkClass}>{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide text-foreground-200 uppercase">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Legal Centre", path: "/legal" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Cookie Policy", path: "/cookies" },
                { label: "Cookie Settings", path: "/cookie-settings" },
                { label: "Acceptable Use", path: "/acceptable-use" },
                { label: "Buyer Terms", path: "/buyer-terms" },
                { label: "Supplier Terms", path: "/supplier-terms" },
                { label: "Marketplace Terms", path: "/marketplace-terms" },
                { label: "Data Processing", path: "/data-processing-terms" },
                { label: "Data Retention", path: "/data-retention-policy" },
                { label: "Security", path: "/security-statement" },
                { label: "Subprocessors", path: "/subprocessors" },
                { label: "Complaints", path: "/complaints" },
              ].map((item) => (
                <li key={item.label}>
                  <button type="button" onClick={() => navigate(item.path)} className={linkClass}>{item.label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground-200/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-[#ff2e88]/40 bg-black/20">
              <i className="ri-flashlight-fill text-[10px] text-[#ff2e88]" />
            </div>
            <span className="text-xs text-foreground-500">&copy; DataHarbour. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => navigate("/privacy")} className="text-[11px] text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Privacy</button>
            <button type="button" onClick={() => navigate("/cookies")} className="text-[11px] text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Cookies</button>
            <button type="button" onClick={() => navigate("/cookie-settings")} className="text-[11px] text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Cookie Settings</button>
            <button type="button" onClick={() => navigate("/legal")} className="text-[11px] text-foreground-500 transition hover:text-foreground-300 cursor-pointer">Legal</button>
          </div>
        </div>
      </div>
    </footer>
  );
}