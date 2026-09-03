import { useState, useEffect } from 'react';
import { generateLocalId, validateUsersSystemsStage } from '@/data/accessRequestTypes';
import type { AccessRequestDraft, AccessRequestUserGroup, AccessRequestSystem } from '@/data/accessRequestTypes';

interface Stage3UsersSystemsProps {
  draft: AccessRequestDraft;
  onUpdate: (updated: AccessRequestDraft) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ROLES = ['Organisation owner', 'Administrator', 'Compliance lead', 'Technical lead', 'Billing contact', 'Analyst or standard member', 'Read-only member'];
const USER_TYPES = ['employee', 'contractor', 'third_party'] as const;
const ENVIRONMENTS = ['development', 'test', 'production'] as const;

export default function Stage3UsersSystems({ draft, onUpdate, onNext, onPrev }: Stage3UsersSystemsProps) {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [editingUserGroup, setEditingUserGroup] = useState<AccessRequestUserGroup | null>(null);
  const [editingSystem, setEditingSystem] = useState<AccessRequestSystem | null>(null);

  function handleContinue() {
    const result = validateUsersSystemsStage(draft);
    setErrors(result.errors);
    if (result.valid) onNext();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function addUserGroup() {
    setEditingUserGroup({
      id: generateLocalId(),
      name: '',
      department: '',
      numberOfUsers: 1,
      userType: 'employee',
      workflowRole: '',
      accessLevel: 'Standard',
      trainingRequired: '',
    });
  }

  function saveUserGroup(ug: AccessRequestUserGroup) {
    const idx = draft.userGroups.findIndex((u) => u.id === ug.id);
    const updated = idx >= 0
      ? draft.userGroups.map((u) => (u.id === ug.id ? ug : u))
      : [...draft.userGroups, ug];
    onUpdate({ ...draft, userGroups: updated });
    setEditingUserGroup(null);
  }

  function removeUserGroup(id: string) {
    onUpdate({ ...draft, userGroups: draft.userGroups.filter((u) => u.id !== id) });
  }

  function addSystem() {
    setEditingSystem({
      id: generateLocalId(),
      name: '',
      systemType: '',
      environment: 'production',
      hostingRegion: '',
      purpose: '',
      directUsers: '',
      combinedDataSources: '',
      profilingOrScoring: false,
      outputsAffectIndividuals: false,
    });
  }

  function saveSystem(sys: AccessRequestSystem) {
    const idx = draft.systems.findIndex((s) => s.id === sys.id);
    const updated = idx >= 0
      ? draft.systems.map((s) => (s.id === sys.id ? sys : s))
      : [...draft.systems, sys];
    onUpdate({ ...draft, systems: updated });
    setEditingSystem(null);
  }

  function removeSystem(id: string) {
    onUpdate({ ...draft, systems: draft.systems.filter((s) => s.id !== id) });
  }

  const hasErrors = errors.some((e) => e.field === 'userGroups' || e.field === 'systems');

  return (
    <div>
      {/* User groups */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground-900">User groups</h3>
          <button onClick={addUserGroup} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
            <i className="ri-add-line"></i> Add group
          </button>
        </div>
        <p className="text-xs text-foreground-500 mb-3">
          Describe the groups of users who will access this data. Apply the principle of least privilege — grant only the access necessary for each role.
        </p>

        {draft.userGroups.length === 0 && (
          <p className="text-sm text-foreground-400 italic py-4 text-center border border-dashed border-background-200/70 rounded-lg">No user groups added yet. At least one is required.</p>
        )}

        {draft.userGroups.map((ug) => (
          <div key={ug.id} className="mb-2 p-3 rounded-lg border border-background-200/70 bg-background-50 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground-800">{ug.name || 'Unnamed group'}</p>
              <p className="text-xs text-foreground-500">{ug.numberOfUsers} user{ug.numberOfUsers !== 1 ? 's' : ''} · {ug.userType.replace('_', ' ')} · {ug.accessLevel}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setEditingUserGroup(ug)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-100 cursor-pointer text-foreground-500"><i className="ri-edit-line text-sm"></i></button>
              <button onClick={() => removeUserGroup(ug.id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-accent-50 cursor-pointer text-foreground-500"><i className="ri-delete-bin-line text-sm"></i></button>
            </div>
          </div>
        ))}
      </div>

      {/* Systems */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground-900">Systems</h3>
          <button onClick={addSystem} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
            <i className="ri-add-line"></i> Add system
          </button>
        </div>
        <p className="text-xs text-foreground-500 mb-3">
          List the systems, applications or platforms that will access or process this data.
        </p>

        {draft.systems.length === 0 && (
          <p className="text-sm text-foreground-400 italic py-4 text-center border border-dashed border-background-200/70 rounded-lg">No systems added yet. At least one is required.</p>
        )}

        {draft.systems.map((sys) => (
          <div key={sys.id} className="mb-2 p-3 rounded-lg border border-background-200/70 bg-background-50 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground-800">{sys.name || 'Unnamed system'}</p>
              <p className="text-xs text-foreground-500">{sys.environment} · {sys.hostingRegion || 'Region not specified'}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setEditingSystem(sys)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-100 cursor-pointer text-foreground-500"><i className="ri-edit-line text-sm"></i></button>
              <button onClick={() => removeSystem(sys.id)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-accent-50 cursor-pointer text-foreground-500"><i className="ri-delete-bin-line text-sm"></i></button>
            </div>
          </div>
        ))}
      </div>

      {/* Errors */}
      {hasErrors && (
        <div className="mb-4 p-3 rounded-lg bg-accent-50 border border-accent-200/60" role="alert">
          <p className="text-sm font-semibold text-accent-900 mb-1">Please fix the following:</p>
          <ul className="space-y-0.5">
            {errors.map((e) => (<li key={e.field} className="text-xs text-accent-800">{e.message}</li>))}
          </ul>
        </div>
      )}

      {/* Edit modal for user group */}
      {editingUserGroup && (
        <UserGroupModal
          data={editingUserGroup}
          onSave={saveUserGroup}
          onCancel={() => setEditingUserGroup(null)}
        />
      )}

      {/* Edit modal for system */}
      {editingSystem && (
        <SystemModal
          data={editingSystem}
          onSave={saveSystem}
          onCancel={() => setEditingSystem(null)}
        />
      )}

      <div className="flex items-center justify-between pt-4 border-t border-background-100">
        <button onClick={onPrev} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-background-200/70 text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
          <i className="ri-arrow-left-line"></i> Previous
        </button>
        <button onClick={handleContinue} className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
          Continue <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

function UserGroupModal({ data, onSave, onCancel }: { data: AccessRequestUserGroup; onSave: (ug: AccessRequestUserGroup) => void; onCancel: () => void }) {
  const [form, setForm] = useState(data);
  const ic = 'w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div className="bg-background-50 rounded-xl border border-background-200/70 shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Edit user group">
        <div className="p-4 border-b border-background-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground-950">{data.name ? 'Edit user group' : 'Add user group'}</h3>
          <button onClick={onCancel} className="w-7 h-7 flex items-center justify-center rounded hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Group name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="E.g. Compliance Analysts" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Department</label>
            <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="E.g. Risk & Compliance" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Number of users</label>
            <input type="number" min={1} value={form.numberOfUsers} onChange={(e) => setForm({ ...form, numberOfUsers: parseInt(e.target.value) || 1 })} className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">User type</label>
            <select value={form.userType} onChange={(e) => setForm({ ...form, userType: e.target.value as typeof form.userType })} className={`${ic} cursor-pointer`}>
              {USER_TYPES.map((t) => (<option key={t} value={t}>{t.replace('_', ' ')}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Workflow role *</label>
            <input type="text" value={form.workflowRole} onChange={(e) => setForm({ ...form, workflowRole: e.target.value })} placeholder="E.g. KYC verification, risk scoring" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Access level</label>
            <input type="text" value={form.accessLevel} onChange={(e) => setForm({ ...form, accessLevel: e.target.value })} placeholder="E.g. Read-only, Standard, Administrative" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Training requirement</label>
            <input type="text" value={form.trainingRequired} onChange={(e) => setForm({ ...form, trainingRequired: e.target.value })} placeholder="E.g. Data handling, AML training" className={ic} />
          </div>
        </div>
        <div className="p-4 border-t border-background-100 flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-600 hover:bg-background-100 cursor-pointer whitespace-nowrap">Cancel</button>
          <button onClick={() => { if (form.name.trim()) onSave(form); }} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">Save</button>
        </div>
      </div>
    </div>
  );
}

function SystemModal({ data, onSave, onCancel }: { data: AccessRequestSystem; onSave: (s: AccessRequestSystem) => void; onCancel: () => void }) {
  const [form, setForm] = useState(data);
  const ic = 'w-full px-3 py-2 text-sm rounded-lg border border-background-200/70 bg-background-50 text-foreground-950 outline-none focus:border-primary-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div className="bg-background-50 rounded-xl border border-background-200/70 shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Edit system">
        <div className="p-4 border-b border-background-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground-950">{data.name ? 'Edit system' : 'Add system'}</h3>
          <button onClick={onCancel} className="w-7 h-7 flex items-center justify-center rounded hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">System name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="E.g. KYC Verification Platform" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">System type</label>
            <input type="text" value={form.systemType} onChange={(e) => setForm({ ...form, systemType: e.target.value })} placeholder="E.g. Web application, data pipeline" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Environment</label>
            <select value={form.environment} onChange={(e) => setForm({ ...form, environment: e.target.value as typeof form.environment })} className={`${ic} cursor-pointer`}>
              {ENVIRONMENTS.map((env) => (<option key={env} value={env}>{env}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Hosting region</label>
            <input type="text" value={form.hostingRegion} onChange={(e) => setForm({ ...form, hostingRegion: e.target.value })} placeholder="E.g. UK, EU" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Purpose *</label>
            <input type="text" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} placeholder="How the system uses this data" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Direct users</label>
            <input type="text" value={form.directUsers} onChange={(e) => setForm({ ...form, directUsers: e.target.value })} placeholder="Who operates this system?" className={ic} />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground-600 mb-0.5">Combined data sources</label>
            <input type="text" value={form.combinedDataSources} onChange={(e) => setForm({ ...form, combinedDataSources: e.target.value })} placeholder="Other datasets combined with this data" className={ic} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.profilingOrScoring} onChange={(e) => setForm({ ...form, profilingOrScoring: e.target.checked })} className="w-4 h-4 rounded text-primary-500 cursor-pointer" />
            <label className="text-sm text-foreground-700">Profiling or scoring</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.outputsAffectIndividuals} onChange={(e) => setForm({ ...form, outputsAffectIndividuals: e.target.checked })} className="w-4 h-4 rounded text-primary-500 cursor-pointer" />
            <label className="text-sm text-foreground-700">Outputs may affect individuals</label>
          </div>
        </div>
        <div className="p-4 border-t border-background-100 flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 text-foreground-600 hover:bg-background-100 cursor-pointer whitespace-nowrap">Cancel</button>
          <button onClick={() => { if (form.name.trim() && form.purpose.trim()) onSave(form); }} className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">Save</button>
        </div>
      </div>
    </div>
  );
}