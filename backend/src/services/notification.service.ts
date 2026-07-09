import { Notification } from "../models/Notification";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";

export const NotificationService = {
  async getNotifications(
    userId: string,
    query: {
      page?: number;
      limit?: number;
      unreadOnly?: string;
      type?: string;
      search?: string;
    }
  ) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { user: userId };

    if (query.unreadOnly === "true") {
      filter.isRead = false;
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { message: { $regex: query.search, $options: "i" } },
      ];
    }

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments(filter),
      Notification.countDocuments({ user: userId, isRead: false }),
    ]);

    return {
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      unreadCount,
    };
  },

  async markAsRead(userId: string, notificationId: string) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    if (!notification) {
      throw new AppError("Notification not found", HTTP_STATUS.NOT_FOUND);
    }
    return notification;
  },

  async markAllAsRead(userId: string) {
    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    return { success: true };
  },

  async deleteNotification(userId: string, notificationId: string) {
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId,
    });
    if (!notification) {
      throw new AppError("Notification not found", HTTP_STATUS.NOT_FOUND);
    }
    return { success: true };
  },

  async deleteAllNotifications(userId: string) {
    await Notification.deleteMany({ user: userId });
    return { success: true };
  },

  async createNotification(data: {
    user: string;
    type: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
  }) {
    return Notification.create(data);
  },
};
