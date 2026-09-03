import { useNavigate } from "react-router-dom";
import type { CompliancePage } from "@/data/compliancePages";

interface Props {
  page: CompliancePage;
}

export default function ComplianceBreadcrumb({ page }: Props) {
  const navigate = useNavigate();

  return (
    <nav className="bg-background-50 border-b border-foreground-200/10" aria-label="Breadcrumb">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs">
          <li>
            <button
              type="button"
              onClick={() => navigate("/compliance")}
              className="text-foreground-500 transition hover:text-foreground-300 cursor-pointer"
            >
              Compliance Centre
            </button>
          </li>
          <li className="text-foreground-600" aria-hidden="true">/</li>
          <li className="text-foreground-300">{page.title}</li>
        </ol>
      </div>
    </nav>
  );
}