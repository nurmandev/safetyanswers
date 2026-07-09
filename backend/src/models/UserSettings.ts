import mongoose, { Schema, Document } from "mongoose";

export interface IUserSettingsDocument extends Document {
  user: mongoose.Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const userSettingsSchema = new Schema<IUserSettingsDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
      bookings: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false },
      blogUpdates: { type: Boolean, default: true },
      premiumUpdates: { type: Boolean, default: true },
      securityAlerts: { type: Boolean, default: true },
      supportUpdates: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false },
    },
    privacy: {
      profileVisibility: { type: String, enum: ["public", "private", "contacts"], default: "public" },
      emailVisibility: { type: Boolean, default: false },
      phoneVisibility: { type: Boolean, default: false },
      searchVisibility: { type: Boolean, default: true },
      activityVisibility: { type: Boolean, default: true },
      downloadHistoryVisibility: { type: Boolean, default: false },
    },
    language: { type: String, default: "en" },
    timezone: { type: String, default: "UTC" },
  },
  { timestamps: true }
);

userSettingsSchema.index({ user: 1 });

export const UserSettings = mongoose.model<IUserSettingsDocument>("UserSettings", userSettingsSchema);
