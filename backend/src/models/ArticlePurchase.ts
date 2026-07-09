import mongoose, { Schema, Document } from "mongoose";

export type PaymentStatus = "pending" | "successful" | "failed" | "refunded";

export interface IArticlePurchaseDocument extends Document {
  user: mongoose.Types.ObjectId;
  article: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  gateway: string;
  paymentStatus: PaymentStatus;
  invoiceNumber: string;
  receiptUrl: string;
  downloadCount: number;
  downloadExpiry: Date;
  refundStatus: string;
  refundReason: string;
  purchaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const articlePurchaseSchema = new Schema<IArticlePurchaseDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "PremiumArticle",
      required: [true, "Article is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },
    gateway: {
      type: String,
      required: [true, "Payment gateway is required"],
      trim: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "successful", "failed", "refunded"],
      default: "successful",
    },
    invoiceNumber: {
      type: String,
      unique: true,
    },
    receiptUrl: { type: String },
    downloadCount: { type: Number, default: 0 },
    downloadExpiry: { type: Date },
    refundStatus: { type: String, default: "" },
    refundReason: { type: String, trim: true },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

articlePurchaseSchema.index({ user: 1 });
articlePurchaseSchema.index({ article: 1 });
articlePurchaseSchema.index({ user: 1, article: 1 }, { unique: true });
articlePurchaseSchema.index({ paymentStatus: 1 });
articlePurchaseSchema.index({ purchaseDate: -1 });

export const ArticlePurchase = mongoose.model<IArticlePurchaseDocument>("ArticlePurchase", articlePurchaseSchema);
