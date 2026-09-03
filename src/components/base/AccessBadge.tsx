interface AccessBadgeProps {
  level: string;
}

export default function AccessBadge({ level }: AccessBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-accent-500/10 px-2.5 py-1 text-[10px] font-medium text-accent-400">
      <i className="ri-shield-check-line text-xs" />
      {level}
    </span>
  );
}