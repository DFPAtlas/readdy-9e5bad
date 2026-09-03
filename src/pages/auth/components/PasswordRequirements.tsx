interface PasswordRequirementsProps {
  password: string;
  confirmPassword?: string;
}

interface RequirementItem {
  label: string;
  met: boolean;
}

export default function PasswordRequirements({ password, confirmPassword }: PasswordRequirementsProps) {
  const requirements: RequirementItem[] = [
    { label: 'At least 12 characters', met: password.length >= 12 },
    { label: 'One uppercase letter (A–Z)', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a–z)', met: /[a-z]/.test(password) },
    { label: 'One number (0–9)', met: /[0-9]/.test(password) },
    { label: 'One symbol (e.g. ! @ # $ % ^ & *)', met: /[!@#$%^&*()_+\-=[\];':"\\|,.<>/?`~]/.test(password) },
  ];

  if (confirmPassword !== undefined) {
    requirements.push({
      label: 'Passwords match',
      met: password.length > 0 && password === confirmPassword,
    });
  }

  const allMet = requirements.every((r) => r.met);

  if (password.length === 0) return null;

  return (
    <div className="mt-2 rounded-lg border border-foreground-200/10 bg-background-100/50 p-3">
      <p className="mb-2 text-xs font-medium text-foreground-300">Password requirements</p>
      <ul className="space-y-1">
        {requirements.map((req) => (
          <li key={req.label} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <i className="ri-check-line text-[10px] text-accent-500" />
            ) : (
              <i className="ri-close-line text-[10px] text-foreground-500" />
            )}
            <span className={req.met ? 'text-accent-500' : 'text-foreground-500'}>{req.label}</span>
          </li>
        ))}
      </ul>
      {allMet && (
        <p className="mt-2 text-xs font-medium text-accent-500">
          <i className="ri-shield-check-line mr-1 align-middle" />
          Password meets all requirements
        </p>
      )}
    </div>
  );
}