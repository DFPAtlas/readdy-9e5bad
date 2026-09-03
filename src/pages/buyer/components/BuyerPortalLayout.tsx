import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentDemoUser } from '@/utils/authStorage';
import { getUnreadNotificationCount } from '@/utils/buyerStorage';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', route: '/app/buyer/dashboard', icon: 'ri-dashboard-line', group: 'Overview' },
  { label: 'Marketplace', route: '/app/buyer/marketplace', icon: 'ri-store-2-line', group: 'Discover' },
  { label: 'Saved Packages', route: '/app/buyer/saved', icon: 'ri-bookmark-line', group: 'Discover' },
  { label: 'Comparisons', route: '/app/buyer/comparisons', icon: 'ri-scales-3-line', group: 'Discover' },
  { label: 'Access Requests', route: '/app/buyer/access-requests', icon: 'ri-key-2-line', group: 'Access & Delivery' },
  { label: 'Subscriptions', route: '/app/buyer/subscriptions', icon: 'ri-file-list-3-line', group: 'Access & Delivery' },
  { label: 'Deliveries', route: '/app/buyer/deliveries', icon: 'ri-download-2-line', group: 'Access & Delivery' },
  { label: 'API Keys', route: '/app/buyer/api-keys', icon: 'ri-code-s-slash-line', group: 'Access & Delivery' },
  { label: 'Usage', route: '/app/buyer/usage', icon: 'ri-bar-chart-2-line', group: 'Access & Delivery' },
  { label: 'Billing', route: '/app/buyer/billing', icon: 'ri-bank-card-line', group: 'Organisation' },
  { label: 'Team', route: '/app/buyer/team', icon: 'ri-team-line', group: 'Organisation' },
  { label: 'Compliance', route: '/app/buyer/compliance', icon: 'ri-shield-check-line', group: 'Organisation' },
  { label: 'Notifications', route: '/app/buyer/notifications', icon: 'ri-notification-3-line', group: 'Organisation' },
  { label: 'Settings', route: '/app/buyer/settings', icon: 'ri-settings-3-line', group: 'Organisation' },
];

const NAV_GROUPS = ['Overview', 'Discover', 'Access & Delivery', 'Organisation'];

export default function BuyerPortalLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentDemoUser();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const unreadCount = getUnreadNotificationCount();

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
    if (searchQuery.trim()) {
      navigate(`/app/buyer/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }

  function isActive(route: string): boolean {
    return location.pathname === route || location.pathname.startsWith(`${route}/`);
  }

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      {/* Demo workspace banner */}
      <div className="bg-accent-100 border-b border-accent-200/60 px-4 py-2 text-center text-xs text-accent-900">
        <span className="font-semibold whitespace-nowrap">Demonstration buyer workspace</span>
        <span className="hidden sm:inline"> — no server account, product access, payment, API credential or live delivery exists.</span>
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background-50 border-b border-background-200/70 h-14 flex items-center px-4 gap-3 shrink-0">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-background-100 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <i className="ri-menu-line text-lg text-foreground-700"></i>
        </button>

        {/* Logo */}
        <Link to="/app/buyer/dashboard" className="flex items-center gap-2 shrink-0 mr-2">
          <div className="w-7 h-7 rounded-md bg-primary-500 flex items-center justify-center">
            <i className="ri-database-2-line text-sm text-background-50"></i>
          </div>
          <span className="font-semibold text-sm text-foreground-950 hidden sm:block whitespace-nowrap">DataHarbour</span>
        </Link>

        {/* Org switcher placeholder */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-background-100 border border-background-200/60 text-xs text-foreground-600 shrink-0">
          <i className="ri-building-line text-sm"></i>
          <span className="whitespace-nowrap max-w-[140px] truncate">{user?.organisationName || 'Organisation'}</span>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-background-100 cursor-pointer"
            aria-label="Search marketplace"
          >
            <i className="ri-search-line text-lg text-foreground-600"></i>
          </button>
          {searchOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-background-50 border border-background-200/70 rounded-lg shadow-lg p-3 z-50">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center gap-2 bg-background-100 rounded-md px-3 py-2">
                  <i className="ri-search-line text-sm text-foreground-500"></i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search packages..."
                    className="flex-1 bg-transparent text-sm text-foreground-950 placeholder-foreground-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-foreground-400 hover:text-foreground-600 cursor-pointer"
                    aria-label="Close search"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Notifications */}
        <Link
          to="/app/buyer/notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-md hover:bg-background-100 cursor-pointer"
          aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ''}`}
        >
          <i className="ri-notification-3-line text-lg text-foreground-600"></i>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent-500 text-background-50 text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Help */}
        <a
          href="/resources"
          className="w-9 h-9 hidden sm:flex items-center justify-center rounded-md hover:bg-background-100 cursor-pointer"
          aria-label="Help and resources"
        >
          <i className="ri-question-line text-lg text-foreground-600"></i>
        </a>

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-background-100 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={userMenuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
              <span className="text-xs font-semibold text-secondary-900">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <span className="hidden sm:block text-sm text-foreground-700 whitespace-nowrap max-w-[100px] truncate">
              {user?.fullName || 'User'}
            </span>
            <i className="ri-arrow-down-s-line text-sm text-foreground-500 hidden sm:block"></i>
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-background-50 border border-background-200/70 rounded-lg shadow-lg py-1 z-50">
              <div className="px-3 py-2 border-b border-background-100">
                <p className="text-sm font-medium text-foreground-950 whitespace-nowrap truncate">{user?.fullName}</p>
                <p className="text-xs text-foreground-500 whitespace-nowrap truncate">{user?.workEmail}</p>
              </div>
              <Link to="/account-demo" className="block px-3 py-2 text-sm text-foreground-700 hover:bg-background-100 whitespace-nowrap" onClick={() => setUserMenuOpen(false)}>Account overview</Link>
              <Link to="/app/buyer/settings" className="block px-3 py-2 text-sm text-foreground-700 hover:bg-background-100 whitespace-nowrap" onClick={() => setUserMenuOpen(false)}>Settings</Link>
              <div className="border-t border-background-100 mt-1 pt-1">
                <Link to="/sign-out" className="block px-3 py-2 text-sm text-foreground-700 hover:bg-background-100 whitespace-nowrap">Sign out</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-1">
        {/* Mobile drawer */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-background-50 border-r border-background-200/70 z-50 transform transition-transform duration-200 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-4 h-14 border-b border-background-200/70">
            <span className="font-semibold text-sm text-foreground-950">Navigation</span>
            <button onClick={closeMobile} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-background-100 cursor-pointer" aria-label="Close menu">
              <i className="ri-close-line text-lg text-foreground-600"></i>
            </button>
          </div>
          <nav className="overflow-y-auto h-[calc(100%-3.5rem)] py-2">
            <SidebarNav collapsed={false} onNavigate={closeMobile} />
          </nav>
        </aside>

        {/* Desktop sidebar */}
        <aside
          className={`hidden lg:flex flex-col border-r border-background-200/70 bg-background-50 shrink-0 transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'}`}
        >
          <div className="flex-1 overflow-y-auto py-2">
            <SidebarNav collapsed={collapsed} />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center h-10 border-t border-background-200/70 hover:bg-background-100 cursor-pointer text-foreground-500"
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

function SidebarNav({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const location = useLocation();

  function isActive(route: string): boolean {
    return location.pathname === route || location.pathname.startsWith(`${route}/`);
  }

  return (
    <ul className="space-y-0.5 px-2">
      {NAV_GROUPS.map((group) => {
        const groupItems = NAV_ITEMS.filter((item) => item.group === group);
        return (
          <li key={group}>
            {!collapsed && (
              <p className="px-3 pt-3 pb-1 text-[11px] font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                {group}
              </p>
            )}
            <ul>
              {groupItems.map((item) => (
                <li key={item.route}>
                  <Link
                    to={item.route}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors whitespace-nowrap cursor-pointer ${
                      isActive(item.route)
                        ? 'bg-primary-100 text-primary-700 font-medium'
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
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}