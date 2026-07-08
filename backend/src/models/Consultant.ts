import mongoose, { Schema, Document } from "mongoose";

export interface IConsultantDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  avatarPublicId?: string;
  title: string;
  expertise: string[];
  bio?: string;
  qualifications: string[];
  workingDays: number[];
  workingHours: {
    start: string;
    end: string;
  };
  breakTime: {
    start: string;
    end: string;
  };
  timezone: string;
  maxDailyBookings: number;
  maxWeeklyBookings: number;
  isAvailable: boolean;
  isActive: boolean;
  blockedDates: Date[];
  holidays: Date[];
  createdAt: Date;
  updatedAt: Date;
}

const consultantSchema = new Schema<IConsultantDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: { type: String, trim: true },
    avatar: { type: String },
    avatarPublicId: { type: String },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    expertise: [{
      type: String,
      trim: true,
    }],
    bio: { type: String, trim: true },
    qualifications: [{
      type: String,
      trim: true,
    }],
    workingDays: {
      type: [Number],
      default: [1, 2, 3, 4, 5],
      validate: {
        validator: (v: number[]) => v.every((d) => d >= 0 && d <= 6),
        message: "Working days must be between 0 (Sunday) and 6 (Saturday)",
      },
    },
    workingHours: {
      start: { type: String, default: "09:00" },
      end: { type: String, default: "17:00" },
    },
    breakTime: {
      start: { type: String, default: "12:00" },
      end: { type: String, default: "13:00" },
    },
    timezone: { type: String, default: "UTC" },
    maxDailyBookings: { type: Number, default: 5 },
    maxWeeklyBookings: { type: Number, default: 20 },
    isAvailable: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    blockedDates: [{ type: Date }],
    holidays: [{ type: Date }],
  },
  { timestamps: true }
);

consultantSchema.index({ expertise: 1 });
consultantSchema.index({ isActive: 1, isAvailable: 1 });

export const Consultant = mongoose.model<IConsultantDocument>("Consultant", consultantSchema);
