import mongoose, { Schema, Document } from "mongoose";

export interface IArticleDownloadLogDocument extends Document {
  user: mongoose.Types.ObjectId;
  article: mongoose.Types.ObjectId;
  purchase: mongoose.Types.ObjectId;
  ipAddress: string;
  userAgent: string;
  status: string;
  downloadedAt: Date;
  createdAt: Date;
}

const articleDownloadLogSchema = new Schema<IArticleDownloadLogDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "PremiumArticle",
      required: true,
    },
    purchase: {
      type: Schema.Types.ObjectId,
      ref: "ArticlePurchase",
      required: true,
    },
    ipAddress: { type: String },
    userAgent: { type: String },
    status: {
      type: String,
      enum: ["started", "completed", "failed"],
      default: "completed",
    },
    downloadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

articleDownloadLogSchema.index({ user: 1 });
articleDownloadLogSchema.index({ article: 1 });
articleDownloadLogSchema.index({ purchase: 1 });
articleDownloadLogSchema.index({ downloadedAt: -1 });

export const ArticleDownloadLog = mongoose.model<IArticleDownloadLogDocument>("ArticleDownloadLog", articleDownloadLogSchema);
