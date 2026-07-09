import { api } from "./api-client";

export interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    bookings: boolean;
    marketing: boolean;
    blogUpdates: boolean;
    premiumUpdates: boolean;
    securityAlerts: boolean;
    supportUpdates: boolean;
    newsletter: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "contacts";
    emailVisibility: boolean;
    phoneVisibility: boolean;
    searchVisibility: boolean;
    activityVisibility: boolean;
    downloadHistoryVisibility: boolean;
  };
  language: string;
  timezone: string;
}

export const settingsApi = {
  getSettings: () => api.get<{ settings: UserSettings }>("/settings"),

  updateNotificationPreferences: (preferences: Record<string, boolean>) =>
    api.patch<{ settings: UserSettings }>("/settings/notifications", preferences),

  updatePrivacySettings: (preferences: Record<string, unknown>) =>
    api.patch<{ settings: UserSettings }>("/settings/privacy", preferences),

  updateGeneral: (data: { language?: string; timezone?: string }) =>
    api.patch<{ settings: UserSettings }>("/settings/general", data),

  deleteAccount: () => api.delete("/settings/account"),
};
