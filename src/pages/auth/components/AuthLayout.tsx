import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  showBackLink?: boolean;
  backTo?: string;
  backLabel?: string;
}

export default function AuthLayout({ children, showBackLink = true, backTo = "/sign-in", backLabel = "Back to Sign In" }: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background-50">
      {/* Top bar */}
      <div className="flex items-center justify-center border-b border-foreground-200/10 px-4 py-3 md:px-6 md:py-4">
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
      </div>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 md:px-6 md:py-16">
        <div className="w-full max-w-md">
          {children}
          {showBackLink && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => navigate(backTo)}
                className="text-xs text-foreground-400 transition hover:text-foreground-200 cursor-pointer"
              >
                <i className="ri-arrow-left-line mr-1" />
                {backLabel}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <div className="border-t border-foreground-200/10 px-4 py-3 text-center">
        <p className="text-xs text-foreground-500">
          <i className="ri-shield-check-line mr-1 align-middle text-accent-500" />
          DataHarbour — The UK&apos;s governed data marketplace. Built with Supabase Auth.
        </p>
      </div>
    </div>
  );
}