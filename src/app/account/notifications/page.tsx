"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AccountLayout } from "@/components/AccountLayout";
import {
  notificationsApi,
  type NotificationItem,
  type NotificationsResponse,
} from "@/lib/dashboard-api";
import {
  Calendar,
  DollarSign,
  Download,
  Bell,
  Megaphone,
  Lock,
  Shield,
  User,
  CheckCircle,
  Trash2,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";

const typeIcons: Record<string, typeof Calendar> = {
  booking_approved: Calendar,
  booking_cancelled: Calendar,
  booking_reminder: Calendar,
  booking_completed: Calendar,
  premium_purchase: DollarSign,
  download_ready: Download,
  new_blog: Megaphone,
  system: Bell,
  account_update: User,
  password_changed: Shield,
  profile_updated: User,
  admin_message: Megaphone,
  security_alert: Shield,
};

export default function AccountNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{
    total: number;
    totalPages: number;
    hasNext: boolean;
  }>({ total: 0, totalPages: 0, hasNext: false });

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getNotifications({
        page,
        limit: 20,
        unreadOnly: activeTab === "unread",
      });
      if (res.success && res.data) {
        const data = res.data as unknown as NotificationsResponse;
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
        setPagination(data.pagination);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [page, activeTab]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true, readAt: new Date().toISOString() }))
      );
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark all as read");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationsApi.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notification deleted");
    } catch {
      toast.error("Failed to delete notification");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await notificationsApi.deleteAllNotifications();
      setNotifications([]);
      setUnreadCount(0);
      toast.success("All notifications deleted");
    } catch {
      toast.error("Failed to delete all notifications");
    }
  };

  return (
    <AccountLayout title="Notifications" currentPath="/account/notifications">
      <div className="bg-white border border-slate-100 shadow-sm flex flex-col min-h-[70vh]">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Inbox Messages</h3>
            <p className="text-xs text-slate-400 mt-1">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "All caught up!"}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => { setActiveTab("all"); setPage(1); }}
              className={`text-xs font-bold px-4 py-2 border transition-all ${
                activeTab === "all"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-800"
              }`}
            >
              All Inbox
            </button>
            <button
              onClick={() => { setActiveTab("unread"); setPage(1); }}
              className={`text-xs font-bold px-4 py-2 border transition-all ${
                activeTab === "unread"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-800"
              }`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs font-bold px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all inline-flex items-center gap-1.5"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="text-xs font-bold px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 transition-all inline-flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 divide-y divide-slate-100">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-slate-100 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 w-1/3" />
                    <div className="h-3 bg-slate-100 w-2/3" />
                    <div className="h-3 bg-slate-100 w-1/4" />
                  </div>
                </div>
              </div>
            ))
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-500">No notifications</p>
              <p className="text-xs text-slate-400 mt-1">
                {activeTab === "unread" ? "All caught up!" : "You'll see notifications here when they arrive"}
              </p>
            </div>
          ) : (
            notifications.map((item) => {
              const Icon = typeIcons[item.type] || Bell;
              return (
                <div
                  key={item._id}
                  className={`p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 transition-colors hover:bg-slate-50/50 ${
                    !item.isRead ? "bg-slate-50/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-50 border border-slate-100">
                      <Icon className="h-5 w-5 text-[#7c3aed]" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        {!item.isRead && (
                          <span className="h-2 w-2 bg-[#7c3aed] shrink-0" title="Unread" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {item.type.replace(/_/g, " ")}
                        </span>
                        <span className="h-1 w-1 bg-slate-300" />
                        <span className="text-[10px] font-semibold text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="self-end md:self-start shrink-0 flex items-center gap-2">
                    {!item.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(item._id)}
                        className="text-[10px] font-bold text-slate-500 border border-slate-200 px-3 py-2 hover:bg-slate-50 transition-colors inline-flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" /> Mark read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-[10px] font-bold text-red-500 border border-red-200 px-3 py-2 hover:bg-red-50 transition-colors inline-flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-xs font-bold px-4 py-2 border border-slate-200 disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500">
              Page {page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={!pagination.hasNext}
              className="text-xs font-bold px-4 py-2 border border-slate-200 disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
