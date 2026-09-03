import { useNavigate } from "react-router-dom";
import type { Solution } from "@/data/solutions";

interface SolutionBreadcrumbProps {
  solution: Solution;
}

export default function SolutionBreadcrumb({ solution }: SolutionBreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb" className="bg-background-100 border-b border-foreground-200/10">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <ol className="flex items-center gap-2 text-xs text-foreground-500">
          <li>
            <button
              type="button"
              onClick={() => navigate("/solutions")}
              className="transition hover:text-foreground-200 cursor-pointer"
            >
              Solutions
            </button>
          </li>
          <li aria-hidden="true">
            <i className="ri-arrow-right-s-line text-[10px]" />
          </li>
          <li className="text-foreground-300 font-medium truncate">{solution.name}</li>
        </ol>
      </div>
    </nav>
  );
}