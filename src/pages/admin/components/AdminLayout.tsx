import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAdminSession, saveAdminSession, clearAdminSession } from '@/utils/adminStorage';

interface AdminNavItem {
  label: string;
  route: string;
  icon: string;
  group: string;
}

const NAV_ITEMS: AdminNavItem[] = [
  { label: 'Dashboard', route: '/admin', icon: 'ri-dashboard-line', group: 'Overview' },
  { label: 'Organisations', route: '/admin/organisations', icon: 'ri-building-line', group: 'Marketplace' },
  { label: 'Buyers', route: '/admin/buyers', icon: 'ri-shopping-bag-3-line', group: 'Marketplace' },
  { label: 'Suppliers', route: '/admin/suppliers', icon: 'ri-store-2-line', group: 'Marketplace' },
  { label: 'Supplier Applications', route: '/admin/supplier-applications', icon: 'ri-file-list-3-line', group: 'Marketplace' },
  { label: 'Packages', route: '/admin/packages', icon: 'ri-archive-line', group: 'Marketplace' },
  { label: 'Access Requests', route: '/admin/access-requests', icon: 'ri-key-2-line', group: 'Marketplace' },
  { label: 'Compliance', route: '/admin/compliance', icon: 'ri-shield-check-line', group: 'Trust & Operations' },
  { label: 'Data-Subject Requests', route: '/admin/data-subject-requests', icon: 'ri-user-search-line', group: 'Trust & Operations' },
  { label: 'Security Reports', route: '/admin/security-reports', icon: 'ri-shield-flash-line', group: 'Trust & Operations' },
  { label: 'Support', route: '/admin/support', icon: 'ri-customer-service-2-line', group: 'Trust & Operations' },
  { label: 'Contracts', route: '/admin/contracts', icon: 'ri-file-text-line', group: 'Trust & Operations' },
  { label: 'Deliveries', route: '/admin/deliveries', icon: 'ri-download-2-line', group: 'Trust & Operations' },
  { label: 'API Usage', route: '/admin/api-usage', icon: 'ri-code-s-slash-line', group: 'Trust & Operations' },
  { label: 'Billing', route: '/admin/billing', icon: 'ri-bank-card-line', group: 'Commercial' },
  { label: 'Audit Log', route: '/admin/audit-log', icon: 'ri-history-line', group: 'Governance' },
  { label: 'Content', route: '/admin/content', icon: 'ri-pages-line', group: 'Governance' },
  { label: 'Users', route: '/admin/users', icon: 'ri-team-line', group: 'Governance' },
  { label: 'Roles', route: '/admin/roles', icon: 'ri-admin-line', group: 'Governance' },
  { label: 'System Settings', route: '/admin/system-settings', icon: 'ri-settings-3-line', group: 'Governance' },
];

const NAV_GROUPS = ['Overview', 'Marketplace', 'Trust & Operations', 'Commercial', 'Governance'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getAdminSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setUserMenuOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    if (q.includes('org')) navigate('/admin/organisations');
    else if (q.includes('supplier') && q.includes('app')) navigate('/admin/supplier-applications');
    else if (q.includes('supplier')) navigate('/admin/suppliers');
    else if (q.includes('buyer')) navigate('/admin/buyers');
    else if (q.includes('package')) navigate('/admin/packages');
    else if (q.includes('access') || q.includes('request')) navigate('/admin/access-requests');
    else if (q.includes('complian')) navigate('/admin/compliance');
    else if (q.includes('secur')) navigate('/admin/security-reports');
    else if (q.includes('billing') || q.includes('invoice')) navigate('/admin/billing');
    else if (q.includes('audit')) navigate('/admin/audit-log');
    else if (q.includes('user')) navigate('/admin/users');
    else navigate('/admin');
    setSearchOpen(false);
    setSearchQuery('');
  }

  function handleSignOut() {
    clearAdminSession();
    navigate('/');
  }

  function isActive(route: string): boolean {
    if (route === '/admin') return location.pathname === '/admin';
    return location.pathname === route || location.pathname.startsWith(`${route}/`);
  }

  // If no session, show the preview gate
  if (!session) {
    return <AdminPreviewGate />;
  }

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      {/* Demo admin banner */}
      <div className="bg-accent-100/70 border-b border-accent-200/50 px-4 py-2 text-center text-xs text-accent-900">
        <span className="font-semibold whitespace-nowrap">Demonstration administration workspace</span>
        <span className="hidden sm:inline"> — no production authority, live data or real staff account exists.</span>
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background-50/95 backdrop-blur border-b border-background-200/60 h-14 flex items-center px-4 gap-3 shrink-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-background-100 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <i className="ri-menu-line text-lg text-foreground-700"></i>
        </button>

        <Link to="/admin" className="flex items-center gap-2.5 shrink-0 mr-3">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-sm">
            <i className="ri-database-2-line text-sm text-background-50"></i>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground-950 whitespace-nowrap">DataHarbour</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent-100 text-accent-900 whitespace-nowrap">
              ADMIN
            </span>
          </div>
        </Link>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-background-100 cursor-pointer"
            aria-label="Search"
          >
            <i className="ri-search-line text-lg text-foreground-600"></i>
          </button>
          {searchOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-background-50 border border-background-200/60 rounded-xl shadow-lg p-3 z-50">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center gap-2 bg-background-100 rounded-lg px-3 py-2">
                  <i className="ri-search-line text-sm text-foreground-500"></i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search organisations, packages, requests..."
                    className="flex-1 bg-transparent text-sm text-foreground-950 placeholder-foreground-400 outline-none"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-foreground-400 hover:text-foreground-600 cursor-pointer" aria-label="Close search">
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-background-100 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={userMenuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center border border-primary-200/40">
              <span className="text-xs font-semibold text-primary-700">
                {session.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="hidden md:block text-sm text-foreground-700 whitespace-nowrap">{session.displayName}</span>
            <i className="ri-arrow-down-s-line text-sm text-foreground-500 hidden md:block"></i>
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-background-50 border border-background-200/60 rounded-xl shadow-lg py-1 z-50">
              <div className="px-3 py-2.5 border-b border-background-100">
                <p className="text-sm font-medium text-foreground-950 whitespace-nowrap">{session.displayName}</p>
                <p className="text-xs text-foreground-500 whitespace-nowrap">{session.role === 'super_administrator_demo' ? 'Super Administrator' : 'Administrator'}</p>
              </div>
              <Link to="/admin/users" className="block px-3 py-2 text-sm text-foreground-700 hover:bg-background-100 whitespace-nowrap" onClick={() => setUserMenuOpen(false)}>Users & roles</Link>
              <Link to="/admin/system-settings" className="block px-3 py-2 text-sm text-foreground-700 hover:bg-background-100 whitespace-nowrap" onClick={() => setUserMenuOpen(false)}>System settings</Link>
              <div className="border-t border-background-100 mt-1 pt-1">
                <button onClick={handleSignOut} className="block w-full text-left px-3 py-2 text-sm text-foreground-700 hover:bg-background-100 whitespace-nowrap cursor-pointer">Sign out</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={closeMobile} aria-hidden="true" />
      )}

      <div className="flex flex-1">
        {/* Mobile drawer */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-background-50 border-r border-background-200/60 z-50 transform transition-transform duration-200 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog" aria-modal="true" aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-4 h-14 border-b border-background-200/60">
            <span className="font-semibold text-sm text-foreground-950">Administration</span>
            <button onClick={closeMobile} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-100 cursor-pointer" aria-label="Close menu">
              <i className="ri-close-line text-lg text-foreground-600"></i>
            </button>
          </div>
          <nav className="overflow-y-auto h-[calc(100%-3.5rem)] py-2">
            <AdminSidebarNav collapsed={false} onNavigate={closeMobile} />
          </nav>
        </aside>

        {/* Desktop sidebar */}
        <aside className={`hidden lg:flex flex-col border-r border-background-200/60 bg-background-50 shrink-0 transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'}`}>
          <div className="flex-1 overflow-y-auto py-3">
            <AdminSidebarNav collapsed={collapsed} />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center h-10 border-t border-background-200/60 hover:bg-background-100 cursor-pointer text-foreground-500"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <i className={`text-sm ${collapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'}`}></i>
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminSidebarNav({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const location = useLocation();

  function isActive(route: string): boolean {
    if (route === '/admin') return location.pathname === '/admin';
    return location.pathname === route || location.pathname.startsWith(`${route}/`);
  }

  return (
    <ul className="space-y-1 px-2.5">
      {NAV_GROUPS.map((group) => {
        const groupItems = NAV_ITEMS.filter((item) => item.group === group);
        return (
          <li key={group}>
            {!collapsed && (
              <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                {group}
              </p>
            )}
            <ul className="space-y-0.5">
              {groupItems.map((item) => {
                const active = isActive(item.route);
                return (
                  <li key={item.route}>
                    <Link
                      to={item.route}
                      onClick={onNavigate}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-primary-500 text-background-50 shadow-sm font-medium'
                          : 'text-foreground-600 hover:bg-background-100'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className="w-5 h-5 flex items-center justify-center shrink-0">
                        <i className={`${item.icon} text-base`}></i>
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

// ── Preview Gate ──
function AdminPreviewGate() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleEnter(e: React.FormEvent) {
    e.preventDefault();
    const displayName = name.trim() || 'Administrator';
    saveAdminSession({
      userId: `admin_${Date.now()}`,
      displayName,
      role: 'super_administrator_demo',
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
            <i className="ri-shield-check-line text-2xl text-accent-900"></i>
          </div>
          <h1 className="text-xl font-semibold text-foreground-950 mb-2">Administration workspace ready</h1>
          <p className="text-sm text-foreground-600 mb-6">
            Session created locally. This is a <strong>demonstration</strong> workspace — no production authority, live data or real staff account exists.
          </p>
          <a
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-500 text-background-50 font-medium text-sm hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-dashboard-line"></i>
            Enter administration
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-4">
            <i className="ri-shield-flash-line text-2xl text-accent-900"></i>
          </div>
          <h1 className="text-xl font-semibold text-foreground-950 mb-2">DataHarbour Administration</h1>
          <p className="text-sm text-foreground-600">
            Demonstration administration workspace. This preview gate creates a local session only and is removable before launch.
          </p>
          <p className="text-xs text-foreground-500 mt-3 p-3 bg-background-100 rounded-lg">
            No password, credential or production authority exists. All data is fictional demonstration information.
          </p>
        </div>
        <form onSubmit={handleEnter} className="bg-background-100/80 border border-background-200/60 rounded-xl p-6">
          <label className="block mb-2">
            <span className="text-sm font-medium text-foreground-700">Display name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Administrator"
              className="mt-1 block w-full px-3 py-2 text-sm border border-background-200/60 rounded-lg bg-background-50 text-foreground-950 placeholder-foreground-400 outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-300"
              autoComplete="off"
            />
          </label>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2.5 rounded-lg bg-primary-500 text-background-50 font-medium text-sm hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Enter demonstration administration
          </button>
          <p className="text-[11px] text-foreground-400 text-center mt-3">
            This creates a local preview session. No data is sent or received.
          </p>
        </form>
      </div>
    </div>
  );
}