import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/pages/onboarding/components/OnboardingLayout";
import { getTeamMembers, saveTeamMembers, saveOnboardingStage } from "@/utils/authStorage";
import { ORG_ROLES, generateRefId } from "@/data/authTypes";
import type { TeamMember, OrganisationRole } from "@/data/authTypes";

const ACCESS_LEVELS = [
  { value: 'full_access', label: 'Full access (organisation-owned data)' },
  { value: 'limited', label: 'Limited (specific packages only)' },
  { value: 'read_only', label: 'Read-only (view activity only)' },
];

const CONTACT_TYPES = [
  { value: 'billing', label: 'Billing' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'technical', label: 'Technical' },
  { value: 'general', label: 'General' },
];

interface MemberForm {
  id: string;
  fullName: string;
  workEmail: string;
  role: OrganisationRole;
  department: string;
  accessLevel: string;
  primaryContactType: string;
}

const emptyMember = (): MemberForm => ({
  id: '',
  fullName: '',
  workEmail: '',
  role: 'analyst_member',
  department: '',
  accessLevel: 'limited',
  primaryContactType: 'general',
});

export default function TeamStage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<MemberForm[]>(() => {
    const saved = getTeamMembers();
    return saved.length > 0
      ? saved.map((m) => ({ ...m }))
      : []; // Start empty — user adds members
  });
  const [addOpen, setAddOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<MemberForm>(emptyMember());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [listError, setListError] = useState('');

  useEffect(() => {
    setErrors({});
  }, [form]);

  const resetForm = useCallback(() => {
    setForm(emptyMember());
    setErrors({});
    setAddOpen(false);
    setEditIdx(null);
  }, []);

  const validateForm = useCallback((): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.workEmail.trim()) {
      errs.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim())) {
      errs.workEmail = 'Enter a valid email address';
    } else {
      // Check duplicate (skip current member if editing)
      const isDup = members.some((m, i) => i !== editIdx && m.workEmail.toLowerCase() === form.workEmail.trim().toLowerCase());
      if (isDup) errs.workEmail = 'A team member with this email already exists';
    }
    if (!form.department.trim()) errs.department = 'Department is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form, members, editIdx]);

  const handleAdd = useCallback(() => {
    if (!validateForm()) return;
    if (members.length >= 10) {
      setListError('Maximum 10 demonstration team members reached');
      return;
    }

    const newMember: MemberForm = { ...form, id: editIdx !== null ? form.id : generateRefId() };

    if (editIdx !== null) {
      const updated = [...members];
      updated[editIdx] = newMember;
      setMembers(updated);
    } else {
      setMembers([...members, newMember]);
    }
    resetForm();
    setListError('');
  }, [validateForm, form, members, editIdx, resetForm]);

  const handleEdit = useCallback((idx: number) => {
    setForm({ ...members[idx] });
    setEditIdx(idx);
    setAddOpen(true);
  }, [members]);

  const handleRemove = useCallback((idx: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
    if (editIdx === idx) resetForm();
  }, [editIdx, resetForm]);

  const handleContinue = useCallback(() => {
    if (members.length === 0) {
      setListError('Add at least one team member, including an organisation owner');
      return;
    }
    const hasOwner = members.some((m) => m.role === 'organisation_owner');
    if (!hasOwner) {
      setListError('At least one team member must be an organisation owner');
      return;
    }

    setListError('');
    saveTeamMembers(members as TeamMember[]);
    saveOnboardingStage('review');
    navigate('/onboarding/review');
  }, [members, navigate]);

  const handleBack = useCallback(() => {
    saveTeamMembers(members as TeamMember[]);
    navigate('/onboarding/intended-use');
  }, [members, navigate]);

  const formErrors = Object.entries(errors).filter(([, msg]) => msg);

  return (
    <OnboardingLayout
      currentStage="team"
      title="Set up your team"
      description="Add colleagues who will access your DataHarbour account. Assign roles and access levels following the principle of least privilege."
      onBack={handleBack}
      onContinue={handleContinue}
    >
      {/* Members list */}
      {members.length > 0 ? (
        <div className="mb-6 space-y-2">
          {members.map((m, i) => (
            <div key={m.id} className="flex items-center gap-3 rounded-lg border border-foreground-200/10 bg-background-100/50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-200/50 text-xs font-medium text-foreground-300">
                {m.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground-100 truncate">{m.fullName}</p>
                <p className="text-xs text-foreground-400 truncate">{m.workEmail}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] text-primary-400">
                    {ORG_ROLES.find((r) => r.value === m.role)?.label || m.role}
                  </span>
                  <span className="rounded-full bg-background-200/50 px-2 py-0.5 text-[10px] text-foreground-500">{m.department}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleEdit(i)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-200 cursor-pointer"
                  aria-label={`Edit ${m.fullName}`}
                >
                  <i className="ri-edit-line text-sm" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-500 hover:text-[#ff2e88] cursor-pointer"
                  aria-label={`Remove ${m.fullName}`}
                >
                  <i className="ri-delete-bin-line text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 rounded-lg border border-foreground-200/10 bg-background-100/50 p-6 text-center">
          <p className="text-sm text-foreground-400">No team members added yet. Add at least an organisation owner to continue.</p>
        </div>
      )}

      {listError && (
        <div className="mb-4 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-3" role="alert">
          <p className="text-xs text-[#ff2e88]">{listError}</p>
        </div>
      )}

      {/* Add / Edit form */}
      {addOpen ? (
        <div className="mb-4 rounded-lg border border-foreground-200/10 bg-background-100/50 p-4">
          <p className="mb-3 text-xs font-medium text-foreground-200">
            {editIdx !== null ? 'Edit team member' : 'Add team member'}
          </p>

          {formErrors.length > 0 && (
            <div className="mb-3 rounded-lg border border-[#ff2e88]/30 bg-[#ff2e88]/5 p-2" role="alert">
              <ul className="space-y-0.5">
                {formErrors.map(([field, msg]) => (
                  <li key={field}>
                    <a href={`#team-${field}`} className="text-[11px] text-[#ff2e88] underline">{msg}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="team-fullName" className="mb-1 block text-[11px] font-medium text-foreground-300">Full name <span className="text-[#ff2e88]">*</span></label>
                <input id="team-fullName" type="text" value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} className={`w-full rounded-lg border ${errors.fullName ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`} placeholder="Name" />
              </div>
              <div>
                <label htmlFor="team-workEmail" className="mb-1 block text-[11px] font-medium text-foreground-300">Work email <span className="text-[#ff2e88]">*</span></label>
                <input id="team-workEmail" type="email" value={form.workEmail} onChange={(e) => setForm((f) => ({ ...f, workEmail: e.target.value }))} className={`w-full rounded-lg border ${errors.workEmail ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`} placeholder="email@org.com" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="team-role" className="mb-1 block text-[11px] font-medium text-foreground-300">Role</label>
                <select id="team-role" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as OrganisationRole }))} className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3 py-2 text-sm text-foreground-100 focus:border-foreground-200/50 focus:outline-none cursor-pointer">
                  {ORG_ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="team-department" className="mb-1 block text-[11px] font-medium text-foreground-300">Department <span className="text-[#ff2e88]">*</span></label>
                <input id="team-department" type="text" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} className={`w-full rounded-lg border ${errors.department ? 'border-[#ff2e88]/60' : 'border-foreground-200/20'} bg-background-50 px-3 py-2 text-sm text-foreground-100 placeholder:text-foreground-500 focus:border-foreground-200/50 focus:outline-none`} placeholder="Data & Analytics" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="team-accessLevel" className="mb-1 block text-[11px] font-medium text-foreground-300">Access level</label>
                <select id="team-accessLevel" value={form.accessLevel} onChange={(e) => setForm((f) => ({ ...f, accessLevel: e.target.value }))} className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3 py-2 text-sm text-foreground-100 focus:border-foreground-200/50 focus:outline-none cursor-pointer">
                  {ACCESS_LEVELS.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="team-contactType" className="mb-1 block text-[11px] font-medium text-foreground-300">Contact type</label>
                <select id="team-contactType" value={form.primaryContactType} onChange={(e) => setForm((f) => ({ ...f, primaryContactType: e.target.value }))} className="w-full rounded-lg border border-foreground-200/20 bg-background-50 px-3 py-2 text-sm text-foreground-100 focus:border-foreground-200/50 focus:outline-none cursor-pointer">
                  {CONTACT_TYPES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={handleAdd} className="whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-background-950 transition hover:bg-primary-400 cursor-pointer">
                {editIdx !== null ? 'Save changes' : 'Add member'}
              </button>
              <button type="button" onClick={resetForm} className="whitespace-nowrap rounded-lg border border-foreground-200/20 bg-transparent px-4 py-2 text-sm text-foreground-400 transition hover:border-foreground-200/40 cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          disabled={members.length >= 10}
          className="mb-6 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-dashed border-foreground-200/30 bg-transparent px-4 py-3 text-sm text-foreground-400 transition hover:border-foreground-200/50 hover:text-foreground-200 disabled:opacity-30 cursor-pointer"
        >
          <i className="ri-add-line" />
          {members.length >= 10 ? 'Maximum 10 members reached' : 'Add team member'}
        </button>
      )}

      {/* Pre-account notice */}
      <div className="mb-4 rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
        <p className="text-xs text-foreground-400">
          <i className="ri-information-line mr-1 align-middle text-accent-500" />
          Invitation delivery will be connected later. Members are saved locally for now.
        </p>
      </div>

      {/* Least privilege explainer */}
      <div className="rounded-lg border border-foreground-200/10 bg-background-100/50 p-3">
        <p className="text-xs text-foreground-500">
          <i className="ri-shield-line mr-1 align-middle" />
          Roles should follow the principle of least privilege — assign only the access each person needs.
          DataHarbour staff and administrator roles cannot be assigned through public registration.
        </p>
      </div>
    </OnboardingLayout>
  );
}