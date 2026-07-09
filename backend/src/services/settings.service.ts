import { UserSettings } from "../models/UserSettings";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";

export const SettingsService = {
  async getSettings(userId: string) {
    let settings = await UserSettings.findOne({ user: userId });
    if (!settings) {
      settings = await UserSettings.create({ user: userId });
    }
    return settings;
  },

  async updateNotificationPreferences(userId: string, preferences: Record<string, boolean>) {
    let settings = await UserSettings.findOne({ user: userId });
    if (!settings) {
      settings = await UserSettings.create({ user: userId });
    }

    const allowedFields = [
      "email", "sms", "push", "bookings", "marketing",
      "blogUpdates", "premiumUpdates", "securityAlerts", "supportUpdates", "newsletter",
    ];

    const updates: Record<string, boolean> = {};
    for (const field of allowedFields) {
      if (field in preferences) {
        updates[`notifications.${field}`] = preferences[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new AppError("No valid fields to update", HTTP_STATUS.BAD_REQUEST);
    }

    settings = await UserSettings.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    return settings!;
  },

  async updatePrivacySettings(userId: string, preferences: Record<string, unknown>) {
    let settings = await UserSettings.findOne({ user: userId });
    if (!settings) {
      settings = await UserSettings.create({ user: userId });
    }

    const allowedFields = [
      "profileVisibility", "emailVisibility", "phoneVisibility",
      "searchVisibility", "activityVisibility", "downloadHistoryVisibility",
    ];

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in preferences) {
        updates[`privacy.${field}`] = preferences[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new AppError("No valid fields to update", HTTP_STATUS.BAD_REQUEST);
    }

    settings = await UserSettings.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    return settings!;
  },

  async updateGeneral(userId: string, data: { language?: string; timezone?: string }) {
    let settings = await UserSettings.findOne({ user: userId });
    if (!settings) {
      settings = await UserSettings.create({ user: userId });
    }

    if (data.language !== undefined) settings.language = data.language;
    if (data.timezone !== undefined) settings.timezone = data.timezone;

    await settings.save();
    return settings;
  },

  async deleteAccount(userId: string) {
    const { User } = await import("../models/User");
    const { Booking } = await import("../models/Booking");
    const { ArticlePurchase } = await import("../models/ArticlePurchase");
    const { ArticleDownloadLog } = await import("../models/ArticleDownloadLog");
    const { Notification } = await import("../models/Notification");

    await Promise.all([
      UserSettings.findOneAndDelete({ user: userId }),
      Booking.deleteMany({ user: userId }),
      ArticlePurchase.deleteMany({ user: userId }),
      ArticleDownloadLog.deleteMany({ user: userId }),
      Notification.deleteMany({ user: userId }),
      User.findByIdAndDelete(userId),
    ]);
  },
};
