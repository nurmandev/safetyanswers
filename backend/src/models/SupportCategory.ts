import mongoose, { Schema, Document } from "mongoose";

export interface ISupportCategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const supportCategorySchema = new Schema<ISupportCategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    icon: { type: String, default: "HelpCircle" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

supportCategorySchema.index({ slug: 1 });
supportCategorySchema.index({ isActive: 1, sortOrder: 1 });

export const SupportCategory = mongoose.model<ISupportCategoryDocument>("SupportCategory", supportCategorySchema);
