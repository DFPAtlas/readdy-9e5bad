import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { useAuth } from '@/contexts/AuthContext';
import { clearAllAccountData } from '@/utils/authStorage';
import { clearBuyerPortalData, getBuyerPreferences, saveBuyerPreferences } from '@/utils/buyerStorage';
import type { BuyerPreferences } from '@/utils/buyerStorage';

const TIMEZONES = [
  'Europe/London',
  'Europe/Dublin',
  'Europe/Paris',
  'Europe/Berlin',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Singapore',
  'Australia/Sydney',
];

export default function BuyerSettings() {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<BuyerPreferences>(getBuyerPreferences());
  const [confirmClearPortal, setConfirmClearPortal] = useState(false);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [saved, setSaved] = useState(false);

  // ── Editable real-profile form state ──
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [timezone, setTimezone] = useState('Europe/London');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Hydrate the form when the real profile arrives
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setCompanyName(profile.company_name || '');
      setPhone(profile.phone || '');
      setTimezone(profile.timezone || 'Europe/London');
    }
  }, [profile]);

  async function handleSaveProfile() {
    setSavingProfile(true);
    setProfileError(null);
    setProfileSaved(false);

    const { error } = await updateProfile({
      full_name: fullName.trim(),
      display_name: fullName.trim(),
      company_name: companyName.trim(),
      phone: phone.trim(),
      timezone,
    });

    setSavingProfile(false);

    if (error) {
      setProfileError(error);
      return;
    }

    await refreshProfile();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  function handleSavePrefs() {
    saveBuyerPreferences(prefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleClearPortal() {
    clearBuyerPortalData();
    setConfirmClearPortal(false);
    navigate('/app/buyer/dashboard');
  }

  function handleClearAll() {
    clearAllAccountData();
    clearBuyerPortalData();
    setConfirmClearAll(false);
    navigate('/');
  }

  const isDirty =
    profile !== null &&
    (fullName.trim() !== (profile.full_name || '') ||
      companyName.trim() !== (profile.company_name || '') ||
      phone.trim() !== (profile.phone || '') ||
      timezone !== (profile.timezone || 'Europe/London'));

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-foreground-950 mb-6">Settings</h1>

          {/* Personal profile — real Supabase profile, editable */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground-950">Personal profile</h2>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-700 bg-accent-100 px-2 py-0.5 rounded-full">
                <i className="ri-database-2-line" />
                Live account
              </span>
            </div>
            <div className="rounded-lg border border-background-200/70 bg-background-100/40 p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground-700 mb-1">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground-700 mb-1">Work email</label>
                  <input
                    type="email"
                    value={profile?.email || user?.email || ''}
                    className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-100 text-foreground-500 outline-none cursor-not-allowed"
                    readOnly
                  />
                  <p className="mt-1 text-[11px] text-foreground-400">Email is managed by your sign-in and cannot be edited here.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground-700 mb-1">Organisation</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your organisation"
                    className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-950 outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground-700 mb-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-700 cursor-pointer outline-none focus:border-primary-400"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              {profileError && (
                <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  <i className="ri-error-warning-line mt-0.5" />
                  <span>{profileError}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile || !isDirty}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {savingProfile ? 'Saving…' : profileSaved ? 'Saved' : 'Save profile'}
                </button>
                {!isDirty && !profileSaved && (
                  <span className="text-xs text-foreground-400">Edit a field to enable saving.</span>
                )}
                {profileSaved && (
                  <span className="inline-flex items-center gap-1 text-xs text-accent-700">
                    <i className="ri-check-line" /> Changes saved to your account.
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Workspace preferences */}
          <section className="mb-8">
            <h2 className="text-base font-semibold text-foreground-950 mb-4">Workspace preferences</h2>
            <div className="rounded-lg border border-background-200/70 p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground-700 mb-1">Date format</label>
                  <select value={prefs.dateFormat} onChange={(e) => setPrefs(p => ({ ...p, dateFormat: e.target.value }))} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-700 cursor-pointer">
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground-700 mb-1">Number format</label>
                  <select value={prefs.numberFormat} onChange={(e) => setPrefs(p => ({ ...p, numberFormat: e.target.value }))} className="w-full px-3 py-2 text-sm border border-background-200/70 rounded-lg bg-background-50 text-foreground-700 cursor-pointer">
                    <option value="UK">UK (1,234.56)</option>
                    <option value="EU">EU (1.234,56)</option>
                    <option value="US">US (1,234.56)</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSavePrefs} className="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-background-50 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
                {saved ? 'Saved' : 'Save preferences'}
              </button>
            </div>
          </section>

          {/* Notification preferences */}
          <section className="mb-8">
            <h2 className="text-base font-semibold text-foreground-950 mb-4">Notification preferences</h2>
            <div className="rounded-lg border border-background-200/70 p-4 space-y-3">
              {[
                { key: 'notificationDashboard', label: 'In-dashboard notifications' },
                { key: 'notificationUsageAlert', label: 'Usage alerts' },
                { key: 'notificationBillingAlert', label: 'Billing alerts' },
                { key: 'notificationComplianceReminder', label: 'Compliance reminders' },
                { key: 'notificationProductUpdates', label: 'Product updates' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-foreground-700">{label}</span>
                  <button
                    onClick={() => setPrefs(p => ({ ...p, [key]: !p[key as keyof BuyerPreferences] }))}
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${prefs[key as keyof BuyerPreferences] ? 'bg-primary-500' : 'bg-foreground-200'}`}
                    role="switch"
                    aria-checked={prefs[key as keyof BuyerPreferences]}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background-50 transition-transform ${prefs[key as keyof BuyerPreferences] ? 'translate-x-5' : 'translate-x-0'}`}></span>
                  </button>
                </div>
              ))}
              <p className="text-xs text-foreground-400">Email notifications will be available when Resend is connected. These toggles control in-dashboard display only.</p>
            </div>
          </section>

          {/* Session info — from real auth */}
          <section className="mb-8">
            <h2 className="text-base font-semibold text-foreground-950 mb-4">Session</h2>
            <div className="rounded-lg border border-background-200/70 p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground-500">Signed in as</span>
                  <span className="text-foreground-800">{profile?.email || user?.email || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Account role</span>
                  <span className="text-foreground-800 capitalize">{profile?.role || 'Member'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Email status</span>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800">
                    {user?.email_confirmed_at ? 'Verified' : 'Pending verification'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Last sign-in</span>
                  <span className="text-foreground-800">{user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : '—'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Danger zone */}
          <section>
            <h2 className="text-base font-semibold text-foreground-950 mb-4">Danger zone</h2>
            <div className="rounded-lg border border-red-200/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground-900">Clear buyer portal data</p>
                  <p className="text-xs text-foreground-500">Remove notifications, saved comparisons and preferences stored on this device. Your account and saved packages will be preserved.</p>
                </div>
                <button onClick={() => setConfirmClearPortal(true)} className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer whitespace-nowrap ml-4">
                  Clear portal data
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-red-100 pt-3">
                <div>
                  <p className="text-sm font-medium text-foreground-900">Clear local demonstration data</p>
                  <p className="text-xs text-foreground-500">Remove local onboarding drafts, team members and buyer-portal preferences from this device. This does not delete your live Supabase account.</p>
                </div>
                <button onClick={() => setConfirmClearAll(true)} className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-background-50 hover:bg-red-700 cursor-pointer whitespace-nowrap ml-4">
                  Clear local data
                </button>
              </div>
            </div>
          </section>

          {/* Clear portal confirmation */}
          {confirmClearPortal && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-2">Clear buyer portal data?</h3>
                <p className="text-sm text-foreground-500 mb-4">This removes notifications, saved comparisons and preferences stored on this device. Your account will not be affected.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmClearPortal(false)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleClearPortal} className="px-4 py-2 text-sm font-medium text-background-50 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer whitespace-nowrap">Clear</button>
                </div>
              </div>
            </div>
          )}

          {/* Clear all confirmation */}
          {confirmClearAll && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-background-50 rounded-xl p-6 max-w-sm w-full shadow-lg" role="dialog" aria-modal="true">
                <h3 className="text-base font-semibold text-foreground-950 mb-2">Clear local demonstration data?</h3>
                <p className="text-sm text-foreground-500 mb-4">This removes local onboarding drafts, team members and buyer portal data from this device and returns you to the homepage. Your live Supabase account is not deleted.</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmClearAll(false)} className="px-4 py-2 text-sm font-medium text-foreground-600 hover:bg-background-100 rounded-md cursor-pointer whitespace-nowrap">Cancel</button>
                  <button onClick={handleClearAll} className="px-4 py-2 text-sm font-medium text-background-50 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer whitespace-nowrap">Clear local data</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; }
}