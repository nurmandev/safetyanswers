import mongoose, { Schema, Document } from "mongoose";

export type ArticleStatus = "draft" | "published" | "archived" | "scheduled";

export interface IPremiumArticleDocument extends Document {
  title: string;
  slug: string;
  summary: string;
  fullContent: string;
  previewContent: string;
  featuredImage: string;
  featuredImagePublicId: string;
  gallery: string[];
  category: mongoose.Types.ObjectId;
  tags: string[];
  author: string;
  price: number;
  currency: string;
  discount: number;
  status: ArticleStatus;
  readingTime: number;
  downloadablePdf: string;
  downloadablePdfPublicId: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  publishedDate: Date;
  isFeatured: boolean;
  purchaseCount: number;
  downloadCount: number;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const premiumArticleSchema = new Schema<IPremiumArticleDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [300, "Title cannot exceed 300 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
      maxlength: [500, "Summary cannot exceed 500 characters"],
    },
    fullContent: {
      type: String,
      required: [true, "Full content is required"],
    },
    previewContent: {
      type: String,
      default: "",
    },
    featuredImage: { type: String },
    featuredImagePublicId: { type: String },
    gallery: [{ type: String }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "ArticleCategory",
    },
    tags: [{ type: String, trim: true }],
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived", "scheduled"],
      default: "draft",
    },
    readingTime: {
      type: Number,
      default: 5,
      min: [1, "Reading time must be at least 1 minute"],
    },
    downloadablePdf: { type: String },
    downloadablePdfPublicId: { type: String },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    seoKeywords: [{ type: String, trim: true }],
    publishedDate: { type: Date },
    isFeatured: { type: Boolean, default: false },
    purchaseCount: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

premiumArticleSchema.index({ slug: 1 });
premiumArticleSchema.index({ status: 1, isFeatured: -1 });
premiumArticleSchema.index({ category: 1 });
premiumArticleSchema.index({ tags: 1 });
premiumArticleSchema.index({ price: 1 });
premiumArticleSchema.index({ purchaseCount: -1 });
premiumArticleSchema.index({ createdAt: -1 });
premiumArticleSchema.index({ publishedDate: -1 });

export const PremiumArticle = mongoose.model<IPremiumArticleDocument>("PremiumArticle", premiumArticleSchema);
