import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BuyerPortalLayout from '@/pages/buyer/components/BuyerPortalLayout';
import BuyerRouteGuard from '@/pages/buyer/components/BuyerRouteGuard';
import { getBuyerNotifications, saveBuyerNotifications, markNotificationRead, markNotificationUnread, clearReadNotifications } from '@/utils/buyerStorage';
import { demoNotifications, NOTIFICATION_CATEGORY_LABELS } from '@/data/buyerData';
import type { BuyerNotification, NotificationCategory } from '@/data/buyerData';

export default function BuyerNotifications() {
  const [notifications, setNotifications] = useState<BuyerNotification[]>(() => {
    const stored = getBuyerNotifications();
    return stored.length > 0 ? stored : demoNotifications;
  });
  const [filter, setFilter] = useState<string>('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...notifications];
    if (filter) list = list.filter(n => n.category === filter);
    if (showUnreadOnly) list = list.filter(n => !n.read);
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return list;
  }, [notifications, filter, showUnreadOnly]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  function toggleRead(id: string) {
    const updated = notifications.map(n => n.id === id ? { ...n, read: !n.read } : n);
    setNotifications(updated);
    saveBuyerNotifications(updated);
    const target = updated.find(n => n.id === id);
    if (target) {
      if (target.read) markNotificationRead(id);
      else markNotificationUnread(id);
    }
  }

  function handleClearRead() {
    const updated = notifications.filter(n => !n.read);
    setNotifications(updated);
    saveBuyerNotifications(updated);
    clearReadNotifications();
  }

  return (
    <BuyerRouteGuard>
      <BuyerPortalLayout>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950">Notifications</h1>
              <p className="text-sm text-foreground-500 mt-1">{unreadCount} unread</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${showUnreadOnly ? 'bg-primary-500 text-background-50' : 'border border-background-200/70 hover:bg-background-100 text-foreground-600'}`}
              >
                Unread only
              </button>
              {notifications.some(n => n.read) && (
                <button onClick={handleClearRead} className="px-3 py-1.5 text-xs font-medium rounded-md border border-background-200/70 hover:bg-background-100 cursor-pointer whitespace-nowrap text-foreground-600">
                  Clear read
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setFilter('')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer whitespace-nowrap ${filter === '' ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`}
            >
              All
            </button>
            {(Object.keys(NOTIFICATION_CATEGORY_LABELS) as NotificationCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(filter === cat ? '' : cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer whitespace-nowrap ${filter === cat ? 'bg-primary-500 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`}
              >
                {NOTIFICATION_CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <i className="ri-notification-3-line text-4xl text-foreground-300 mb-3 block"></i>
              <p className="text-foreground-600 font-medium">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${n.read ? 'hover:bg-background-50' : 'bg-accent-50/30 border border-accent-100/50 hover:bg-accent-50/50'}`}
                  onClick={() => toggleRead(n.id)}
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-foreground-200' : 'bg-accent-500'}`}></span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-medium text-foreground-500 bg-background-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                        {NOTIFICATION_CATEGORY_LABELS[n.category]}
                      </span>
                      <span className="text-[11px] text-foreground-400">{formatDateTime(n.createdAt)}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground-900">{n.title}</p>
                    <p className="text-xs text-foreground-500 mt-0.5 line-clamp-2">{n.body}</p>
                    {n.linkedRoute && (
                      <Link
                        to={n.linkedRoute}
                        className="inline-block mt-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View details <i className="ri-arrow-right-line"></i>
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleRead(n.id); }}
                    className="shrink-0 w-6 h-6 flex items-center justify-center rounded text-foreground-400 hover:text-foreground-600 cursor-pointer"
                    title={n.read ? 'Mark unread' : 'Mark read'}
                  >
                    <i className={`text-sm ${n.read ? 'ri-mail-line' : 'ri-mail-open-line'}`}></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </BuyerPortalLayout>
    </BuyerRouteGuard>
  );
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch { return iso; }
}