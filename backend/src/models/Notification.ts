import mongoose, { Schema, Document } from "mongoose";

export type NotificationType =
  | "booking_approved"
  | "booking_cancelled"
  | "booking_reminder"
  | "booking_completed"
  | "premium_purchase"
  | "download_ready"
  | "new_blog"
  | "system"
  | "account_update"
  | "password_changed"
  | "profile_updated"
  | "admin_message"
  | "security_alert";

export interface INotificationDocument extends Document {
  user: mongoose.Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotificationDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "booking_approved",
        "booking_cancelled",
        "booking_reminder",
        "booking_completed",
        "premium_purchase",
        "download_ready",
        "new_blog",
        "system",
        "account_update",
        "password_changed",
        "profile_updated",
        "admin_message",
        "security_alert",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ user: 1, type: 1 });

export const Notification = mongoose.model<INotificationDocument>("Notification", notificationSchema);
