import mongoose, { Schema, Document } from "mongoose";

export type BookingStatus =
  | "pending"
  | "awaiting_review"
  | "approved"
  | "confirmed"
  | "scheduled"
  | "rescheduled"
  | "completed"
  | "cancelled"
  | "rejected"
  | "no_show";

export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "refunded"
  | "failed";

export type MeetingType = "virtual" | "physical";

export interface IBookingDocument extends Document {
  bookingId: string;
  user?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  organization?: string;
  country?: string;
  service: string;
  serviceId?: mongoose.Types.ObjectId;
  category: string;
  title: string;
  description: string;
  preferredDate: Date;
  preferredTime: string;
  timezone: string;
  duration: number;
  meetingType: MeetingType;
  meetingLocation?: string;
  googleMeetLink?: string;
  zoomLink?: string;
  microsoftTeamsLink?: string;
  additionalNotes?: string;
  documents: {
    name: string;
    url: string;
    publicId: string;
    type: string;
    size: number;
  }[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  currency: string;
  assignedConsultant?: mongoose.Types.ObjectId;
  internalNotes?: string;
  adminNotes?: string;
  cancellationReason?: string;
  timeline: {
    action: string;
    date: Date;
    by?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBookingDocument>(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [200, "Name cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    whatsapp: { type: String, trim: true },
    organization: { type: String, trim: true },
    country: { type: String, trim: true },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [500, "Title cannot exceed 500 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    preferredDate: {
      type: Date,
      required: [true, "Preferred date is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    duration: {
      type: Number,
      default: 60,
      min: [15, "Duration must be at least 15 minutes"],
    },
    meetingType: {
      type: String,
      enum: ["virtual", "physical"],
      default: "virtual",
    },
    meetingLocation: { type: String, trim: true },
    googleMeetLink: { type: String, trim: true },
    zoomLink: { type: String, trim: true },
    microsoftTeamsLink: { type: String, trim: true },
    additionalNotes: { type: String, trim: true },
    documents: [{
      name: { type: String, required: true },
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      type: { type: String, required: true },
      size: { type: Number, required: true },
    }],
    status: {
      type: String,
      enum: [
        "pending",
        "awaiting_review",
        "approved",
        "confirmed",
        "scheduled",
        "rescheduled",
        "completed",
        "cancelled",
        "rejected",
        "no_show",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid", "refunded", "failed"],
      default: "unpaid",
    },
    amount: {
      type: Number,
      default: 0,
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },
    assignedConsultant: {
      type: Schema.Types.ObjectId,
      ref: "Consultant",
    },
    internalNotes: { type: String, trim: true },
    adminNotes: { type: String, trim: true },
    cancellationReason: { type: String, trim: true },
    timeline: [{
      action: { type: String, required: true },
      date: { type: Date, default: Date.now },
      by: { type: String },
    }],
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ assignedConsultant: 1 });
bookingSchema.index({ preferredDate: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ bookingId: 1 });

export const Booking = mongoose.model<IBookingDocument>("Booking", bookingSchema);
