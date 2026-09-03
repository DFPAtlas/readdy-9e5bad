import AdminLayout from '@/pages/admin/components/AdminLayout';
import { ADMIN_ROLES, PERMISSION_MATRIX, type AdminPermission } from '@/data/adminData';

const ALL_PERMISSIONS: AdminPermission[] = ['view', 'create', 'update', 'approve', 'publish', 'export', 'settings'];

export default function AdminRoles() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-[1440px]">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-foreground-950">Roles and permissions</h1>
          <p className="text-xs text-foreground-500 mt-0.5">Frontend navigation permissions only — not production security enforcement.</p>
        </div>

        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-100 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Role</th>
                  {ALL_PERMISSIONS.map(p => (
                    <th key={p} className="px-3 py-3 text-xs font-semibold text-foreground-500 text-center whitespace-nowrap capitalize">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ADMIN_ROLES.map(role => {
                  const perms = PERMISSION_MATRIX[role.value];
                  return (
                    <tr key={role.value} className="border-b border-background-100 hover:bg-background-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground-950 text-sm whitespace-nowrap">{role.label}</p>
                        <p className="text-xs text-foreground-500 mt-0.5">{role.description}</p>
                      </td>
                      {ALL_PERMISSIONS.map(p => (
                        <td key={p} className="px-3 py-3 text-center">
                          {perms.includes(p) ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-accent-100"><i className="ri-check-line text-xs text-accent-700"></i></span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-foreground-100"><i className="ri-close-line text-xs text-foreground-400"></i></span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 p-4 bg-background-50 border border-background-200/70 rounded-lg">
          <h3 className="text-sm font-semibold text-foreground-950 mb-2">Role rules</h3>
          <ul className="list-disc list-inside text-xs text-foreground-600 space-y-1">
            <li>Public users can never self-assign admin roles.</li>
            <li>The final Super Administrator — demonstration role cannot be removed.</li>
            <li>Role changes require reason and confirmation.</li>
            <li>Frontend permissions are navigation aids only — not production security enforcement.</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}