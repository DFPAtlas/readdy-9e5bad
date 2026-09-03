import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearDemoSession } from "@/utils/authStorage";

export default function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session only — preserve onboarding draft
    clearDemoSession();

    // Brief delay so screen-readers can announce
    setTimeout(() => {
      navigate('/sign-in');
    }, 300);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-50">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center">
          <i className="ri-loader-4-line animate-spin text-xl text-foreground-400" />
        </div>
        <p className="text-sm text-foreground-400" role="status" aria-live="polite">
          Signing out...
        </p>
      </div>
    </div>
  );
}