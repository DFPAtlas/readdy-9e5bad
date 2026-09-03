import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOnboardingStage, hasDemoSession } from "@/utils/authStorage";

export default function Onboarding() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasDemoSession()) {
      navigate('/sign-in');
      return;
    }

    const stage = getOnboardingStage();
    const stageRoutes: Record<string, string> = {
      organisation: '/onboarding/organisation',
      intended_use: '/onboarding/intended-use',
      team: '/onboarding/team',
      review: '/onboarding/review',
      complete: '/onboarding/complete',
    };

    navigate(stageRoutes[stage] || '/onboarding/organisation', { replace: true });
  }, [navigate]);

  return null;
}