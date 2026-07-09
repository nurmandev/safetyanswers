import mongoose, { Schema, Document } from "mongoose";

export interface ISupportFAQDocument extends Document {
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const supportFAQSchema = new Schema<ISupportFAQDocument>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

supportFAQSchema.index({ category: 1, sortOrder: 1 });
supportFAQSchema.index({ isActive: 1 });

export const SupportFAQ = mongoose.model<ISupportFAQDocument>("SupportFAQ", supportFAQSchema);
