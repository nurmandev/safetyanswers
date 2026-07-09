import mongoose, { Schema, Document } from "mongoose";

export interface IArticleCategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const articleCategorySchema = new Schema<IArticleCategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, trim: true, maxlength: [300, "Description cannot exceed 300 characters"] },
    color: { type: String, default: "#7c3aed" },
    icon: { type: String, default: "FileText" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

articleCategorySchema.index({ slug: 1 });
articleCategorySchema.index({ isActive: 1, sortOrder: 1 });

export const ArticleCategory = mongoose.model<IArticleCategoryDocument>("ArticleCategory", articleCategorySchema);
