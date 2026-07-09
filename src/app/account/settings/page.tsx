"use client";

import { useState, useEffect } from "react";
import { AccountLayout } from "@/components/AccountLayout";
import { settingsApi, UserSettings } from "@/lib/settings-api";
import { toast } from "sonner";

const timezones = [
  "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Asia/Tokyo", "Asia/Shanghai",
  "Australia/Sydney", "Pacific/Auckland",
];

export default function AccountSettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"notifications" | "privacy" | "general" | "security">("notifications");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await settingsApi.getSettings();
      if (res.success && res.data?.settings) {
        setSettings(res.data.settings);
      } else {
        toast.error(res.message || "Failed to load settings");
      }
    } catch {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateNotifications = async (preferences: Record<string, boolean>) => {
    setSaving(true);
    try {
      const res = await settingsApi.updateNotificationPreferences(preferences);
      if (res.success && res.data?.settings) {
        setSettings(res.data.settings);
        toast.success("Notification preferences updated");
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch {
      toast.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  const updatePrivacy = async (preferences: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await settingsApi.updatePrivacySettings(preferences);
      if (res.success && res.data?.settings) {
        setSettings(res.data.settings);
        toast.success("Privacy settings updated");
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch {
      toast.error("Failed to update privacy settings");
    } finally {
      setSaving(false);
    }
  };

  const updateGeneral = async (data: { language?: string; timezone?: string }) => {
    setSaving(true);
    try {
      const res = await settingsApi.updateGeneral(data);
      if (res.success && res.data?.settings) {
        setSettings(res.data.settings);
        toast.success("General settings updated");
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    setSaving(true);
    try {
      const res = await settingsApi.deleteAccount();
      if (res.success) {
        toast.success("Account deleted successfully");
        window.location.href = "/";
      } else {
        toast.error(res.message || "Failed to delete account");
      }
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AccountLayout title="Settings" currentPath="/account/settings">
        <div className="bg-white border border-slate-100 shadow-sm p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-slate-100" />
            ))}
          </div>
        </div>
      </AccountLayout>
    );
  }

  if (!settings) {
    return (
      <AccountLayout title="Settings" currentPath="/account/settings">
        <div className="bg-white border border-slate-100 shadow-sm p-8 text-center text-slate-500 text-sm">
          Failed to load settings. Please try again.
        </div>
      </AccountLayout>
    );
  }

  const tabs = [
    { id: "notifications" as const, label: "Notifications" },
    { id: "privacy" as const, label: "Privacy" },
    { id: "general" as const, label: "General" },
    { id: "security" as const, label: "Security" },
  ];

  return (
    <AccountLayout title="Settings" currentPath="/account/settings">
      <div className="bg-white border border-slate-100 shadow-sm p-8">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h3 className="text-lg font-bold text-slate-950">Settings</h3>
          <p className="text-xs text-slate-400 mt-1">Manage your account settings, notifications, and privacy preferences.</p>
        </div>

        <div className="flex gap-1 border-b border-slate-100 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-slate-900 text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div className="space-y-4 max-w-3xl">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Notification Preferences</h4>
            {[
              { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
              { key: "sms", label: "SMS Notifications", desc: "Receive notifications via text message" },
              { key: "push", label: "Push Notifications", desc: "Receive browser push notifications" },
              { key: "bookings", label: "Booking Updates", desc: "Get notified about booking status changes" },
              { key: "marketing", label: "Marketing", desc: "Receive promotional offers and news" },
              { key: "blogUpdates", label: "Blog Updates", desc: "Get notified about new blog posts" },
              { key: "premiumUpdates", label: "Premium Updates", desc: "Get notified about new premium articles" },
              { key: "securityAlerts", label: "Security Alerts", desc: "Important security notifications" },
              { key: "supportUpdates", label: "Support Updates", desc: "Get notified about support ticket replies" },
              { key: "newsletter", label: "Newsletter", desc: "Weekly digest of activity and news" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 border border-slate-100"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{item.label}</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  disabled={saving}
                  onClick={() =>
                    updateNotifications({
                      [item.key]: !settings.notifications[item.key as keyof typeof settings.notifications],
                    })
                  }
                  className={`self-start sm:self-center px-4 py-2 text-[10px] font-bold border transition-colors disabled:opacity-50 ${
                    settings.notifications[item.key as keyof typeof settings.notifications]
                      ? "bg-slate-900 border-slate-900 text-white hover:bg-slate-800"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-800 hover:text-slate-900"
                  }`}
                >
                  {settings.notifications[item.key as keyof typeof settings.notifications] ? "Enabled" : "Disabled"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PRIVACY TAB */}
        {activeTab === "privacy" && (
          <div className="space-y-6 max-w-3xl">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Privacy Settings</h4>

            <div className="p-4 bg-slate-50 border border-slate-100">
              <h5 className="text-xs font-bold text-slate-900 mb-2">Profile Visibility</h5>
              <p className="text-[11px] text-slate-500 mb-3">Control who can see your profile</p>
              <div className="flex gap-2">
                {(["public", "private", "contacts"] as const).map((value) => (
                  <button
                    key={value}
                    disabled={saving}
                    onClick={() => updatePrivacy({ profileVisibility: value })}
                    className={`px-4 py-2 text-[10px] font-bold border transition-colors disabled:opacity-50 capitalize ${
                      settings.privacy.profileVisibility === value
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-800"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {[
              { key: "emailVisibility", label: "Show Email Address", desc: "Allow others to see your email" },
              { key: "phoneVisibility", label: "Show Phone Number", desc: "Allow others to see your phone number" },
              { key: "searchVisibility", label: "Search Visibility", desc: "Allow your profile to appear in search results" },
              { key: "activityVisibility", label: "Activity Visibility", desc: "Show your recent activity to others" },
              { key: "downloadHistoryVisibility", label: "Download History", desc: "Show your download history on your profile" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 border border-slate-100"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{item.label}</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  disabled={saving}
                  onClick={() =>
                    updatePrivacy({
                      [item.key]: !settings.privacy[item.key as keyof typeof settings.privacy],
                    })
                  }
                  className={`self-start sm:self-center px-4 py-2 text-[10px] font-bold border transition-colors disabled:opacity-50 ${
                    settings.privacy[item.key as keyof typeof settings.privacy]
                      ? "bg-slate-900 border-slate-900 text-white hover:bg-slate-800"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-800 hover:text-slate-900"
                  }`}
                >
                  {settings.privacy[item.key as keyof typeof settings.privacy] ? "On" : "Off"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <div className="space-y-6 max-w-3xl">
            <h4 className="text-sm font-bold text-slate-900 mb-4">General Settings</h4>

            <div className="p-4 bg-slate-50 border border-slate-100">
              <h5 className="text-xs font-bold text-slate-900 mb-2">Language</h5>
              <select
                value={settings.language}
                onChange={(e) => updateGeneral({ language: e.target.value })}
                disabled={saving}
                className="w-full px-4 py-2.5 text-xs border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-800 disabled:opacity-50"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100">
              <h5 className="text-xs font-bold text-slate-900 mb-2">Timezone</h5>
              <select
                value={settings.timezone}
                onChange={(e) => updateGeneral({ timezone: e.target.value })}
                disabled={saving}
                className="w-full px-4 py-2.5 text-xs border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-800 disabled:opacity-50"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div className="space-y-6 max-w-3xl">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Security</h4>

            <div className="p-4 bg-slate-50 border border-slate-100">
              <h5 className="text-xs font-bold text-slate-900">Password Management</h5>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">
                Keep your account secure by using a strong, unique password.
              </p>
              <a
                href="/account/profile"
                className="inline-block px-4 py-2 text-[10px] font-bold bg-white border border-slate-200 text-slate-700 hover:border-slate-800 hover:text-slate-900 transition-colors"
              >
                Change Password
              </a>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100">
              <h5 className="text-xs font-bold text-slate-900">Two-Factor Authentication</h5>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">
                Add an extra layer of security to your account.
              </p>
              <button className="px-4 py-2 text-[10px] font-bold bg-white border border-slate-200 text-slate-700 hover:border-slate-800 hover:text-slate-900 transition-colors">
                Enable 2FA
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-red-100">
              <h5 className="text-xs font-bold text-red-600">Danger Zone</h5>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">
                Permanently delete your account and all associated data.
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={saving}
                className="px-4 py-2 text-[10px] font-bold bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors disabled:opacity-50"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
