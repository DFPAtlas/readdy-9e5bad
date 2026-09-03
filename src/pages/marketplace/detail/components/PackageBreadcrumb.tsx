import { useNavigate } from "react-router-dom";

interface PackageBreadcrumbProps {
  category: string;
  packageName: string;
}

export default function PackageBreadcrumb({ category, packageName }: PackageBreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav className="mb-6 flex items-center gap-2 text-xs text-foreground-500" aria-label="Breadcrumb">
      <button
        type="button"
        onClick={() => navigate("/marketplace")}
        className="transition hover:text-foreground-200 cursor-pointer whitespace-nowrap"
      >
        Marketplace
      </button>
      <i className="ri-arrow-right-s-line text-foreground-500 flex-shrink-0" aria-hidden="true" />
      <button
        type="button"
        onClick={() => navigate("/marketplace")}
        className="transition hover:text-foreground-200 cursor-pointer whitespace-nowrap"
      >
        {category}
      </button>
      <i className="ri-arrow-right-s-line text-foreground-500 flex-shrink-0" aria-hidden="true" />
      <span className="text-foreground-300 truncate">{packageName}</span>
    </nav>
  );
}