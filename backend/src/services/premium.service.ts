import { PremiumArticle } from "../models/PremiumArticle";
import { ArticleCategory } from "../models/ArticleCategory";
import { ArticlePurchase } from "../models/ArticlePurchase";
import { ArticleDownloadLog } from "../models/ArticleDownloadLog";
import { AuditLog } from "../models/AuditLog";
import { Admin } from "../models/Admin";
import { User } from "../models/User";
import { EmailService } from "./email.service";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";
import mongoose from "mongoose";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateInvoiceNumber(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `INV-PA-${num}`;
}

async function logAudit(data: {
  action: string;
  entity: string;
  entityId: mongoose.Types.ObjectId;
  userId?: string;
  userType?: "user" | "admin";
  details?: Record<string, unknown>;
}) {
  try {
    await AuditLog.create(data);
  } catch {
    // Fail silently
  }
}

export const PremiumService = {
  // Public
  async getPublishedArticles(query: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    tags?: string;
    author?: string;
    isFeatured?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { status: "published" };

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { summary: { $regex: query.search, $options: "i" } },
        { tags: { $regex: query.search, $options: "i" } },
      ];
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.tags) {
      filter.tags = { $in: query.tags.split(",") };
    }

    if (query.author) {
      filter.author = { $regex: query.author, $options: "i" };
    }

    if (query.isFeatured === "true") {
      filter.isFeatured = true;
    }

    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) (filter.price as Record<string, number>).$gte = parseFloat(query.minPrice);
      if (query.maxPrice) (filter.price as Record<string, number>).$lte = parseFloat(query.maxPrice);
    }

    const sort: Record<string, 1 | -1> = {};
    const sortField = query.sortBy || "createdAt";
    if (sortField === "popular") {
      sort.purchaseCount = -1;
    } else if (sortField === "newest") {
      sort.publishedDate = -1;
    } else if (sortField === "oldest") {
      sort.publishedDate = 1;
    } else if (sortField === "price_asc") {
      sort.price = 1;
    } else if (sortField === "price_desc") {
      sort.price = -1;
    } else if (sortField === "title") {
      sort.title = 1;
    } else if (sortField === "reading_time") {
      sort.readingTime = 1;
    } else {
      sort[sortField] = query.sortOrder === "asc" ? 1 : -1;
    }

    const [articles, total] = await Promise.all([
      PremiumArticle.find(filter)
        .select("-fullContent")
        .populate("category", "name slug color")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      PremiumArticle.countDocuments(filter),
    ]);

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async getArticleDetail(slug: string, userId?: string) {
    const article = await PremiumArticle.findOne({ slug })
      .populate("category", "name slug color")
      .lean();

    if (!article) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }

    let isPurchased = false;
    if (userId) {
      const purchase = await ArticlePurchase.findOne({
        user: userId,
        article: article._id,
        paymentStatus: "successful",
      });
      isPurchased = !!purchase;
    }

    const related = await PremiumArticle.find({
      _id: { $ne: article._id },
      status: "published",
      $or: [
        { category: article.category },
        { tags: { $in: article.tags } },
      ],
    })
      .select("title slug summary featuredImage price readingTime purchaseCount")
      .limit(4)
      .lean();

    let categories = await ArticleCategory.find({ isActive: true }).lean();

    return {
      article: {
        ...article,
        fullContent: isPurchased ? article.fullContent : undefined,
        downloadablePdf: isPurchased ? article.downloadablePdf : undefined,
        isPurchased,
      },
      related,
      categories,
    };
  },

  async purchaseArticle(articleId: string, userId: string, gateway: string) {
    const article = await PremiumArticle.findById(articleId);
    if (!article) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }

    if (article.status !== "published") {
      throw new AppError("This article is not available for purchase", HTTP_STATUS.BAD_REQUEST);
    }

    const existing = await ArticlePurchase.findOne({
      user: userId,
      article: articleId,
      paymentStatus: "successful",
    });
    if (existing) {
      throw new AppError("You have already purchased this article", HTTP_STATUS.CONFLICT);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const finalPrice = article.discount > 0
      ? article.price * (1 - article.discount / 100)
      : article.price;

    let invoiceNumber = generateInvoiceNumber();
    let invExists = await ArticlePurchase.findOne({ invoiceNumber });
    while (invExists) {
      invoiceNumber = generateInvoiceNumber();
      invExists = await ArticlePurchase.findOne({ invoiceNumber });
    }

    const purchase = await ArticlePurchase.create({
      user: userId,
      article: articleId,
      amount: finalPrice,
      currency: article.currency,
      gateway,
      paymentStatus: "successful",
      invoiceNumber,
      purchaseDate: new Date(),
    });

    await PremiumArticle.findByIdAndUpdate(articleId, {
      $inc: { purchaseCount: 1 },
    });

    await logAudit({
      action: "purchase_created",
      entity: "ArticlePurchase",
      entityId: purchase._id,
      userId,
      userType: "user",
      details: { articleId, articleTitle: article.title, amount: finalPrice },
    });

    EmailService.sendPurchaseConfirmation({
      email: user.email,
      name: user.name,
      articleTitle: article.title,
      amount: `${finalPrice} ${article.currency}`,
      invoiceNumber,
    }).catch(() => {});

    const admins = await Admin.find({ role: { $in: ["admin", "super_admin"] } });
    for (const admin of admins) {
      EmailService.sendAdminPurchaseAlert({
        email: admin.email,
        name: user.name,
        articleTitle: article.title,
        amount: `${finalPrice} ${article.currency}`,
      }).catch(() => {});
    }

    return {
      purchase: {
        ...purchase.toObject(),
        article: {
          _id: article._id,
          title: article.title,
          slug: article.slug,
        },
      },
    };
  },

  async getUserPurchases(userId: string, query: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {
      user: userId,
      paymentStatus: "successful",
    };

    if (query.search) {
      const articles = await PremiumArticle.find({
        title: { $regex: query.search, $options: "i" },
      }).select("_id");
      const articleIds = articles.map((a) => a._id);
      filter.article = { $in: articleIds };
    }

    const sort: Record<string, 1 | -1> = {};
    sort[query.sortBy || "purchaseDate"] = query.sortOrder === "asc" ? 1 : -1;

    const [purchases, total] = await Promise.all([
      ArticlePurchase.find(filter)
        .populate("article", "title slug summary featuredImage price currency readingTime downloadCount purchaseCount rating isFeatured")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      ArticlePurchase.countDocuments(filter),
    ]);

    return {
      purchases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async downloadArticle(slug: string, userId: string, ipAddress?: string, userAgent?: string) {
    const article = await PremiumArticle.findOne({ slug });
    if (!article) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }

    const purchase = await ArticlePurchase.findOne({
      user: userId,
      article: article._id,
      paymentStatus: "successful",
    });

    if (!purchase) {
      await logAudit({
        action: "unauthorized_download_attempt",
        entity: "PremiumArticle",
        entityId: article._id,
        userId,
        userType: "user",
        details: { slug, reason: "No purchase found" },
      });
      throw new AppError("You have not purchased this article", HTTP_STATUS.FORBIDDEN);
    }

    if (!article.downloadablePdf) {
      throw new AppError("No downloadable file available for this article", HTTP_STATUS.NOT_FOUND);
    }

    await ArticlePurchase.findByIdAndUpdate(purchase._id, {
      $inc: { downloadCount: 1 },
    });

    await PremiumArticle.findByIdAndUpdate(article._id, {
      $inc: { downloadCount: 1 },
    });

    await ArticleDownloadLog.create({
      user: userId,
      article: article._id,
      purchase: purchase._id,
      ipAddress,
      userAgent,
      status: "completed",
      downloadedAt: new Date(),
    });

    await logAudit({
      action: "download_completed",
      entity: "ArticleDownloadLog",
      entityId: article._id,
      userId,
      userType: "user",
      details: { slug, articleTitle: article.title },
    });

    return { url: article.downloadablePdf, fileName: `${article.slug}.pdf` };
  },

  async getCategories() {
    return ArticleCategory.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  },

  // Admin
  async adminGetArticles(query: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { author: { $regex: query.search, $options: "i" } },
      ];
    }

    if (query.category) {
      filter.category = query.category;
    }

    const sort: Record<string, 1 | -1> = {};
    sort[query.sortBy || "createdAt"] = query.sortOrder === "asc" ? 1 : -1;

    const [articles, total] = await Promise.all([
      PremiumArticle.find(filter)
        .populate("category", "name slug color")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      PremiumArticle.countDocuments(filter),
    ]);

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async adminGetArticleById(id: string) {
    const article = await PremiumArticle.findById(id)
      .populate("category", "name slug color")
      .lean();
    if (!article) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }
    return article;
  },

  async adminCreateArticle(data: Record<string, unknown>) {
    let slug = (data.slug as string) || generateSlug(data.title as string);
    let existing = await PremiumArticle.findOne({ slug });
    let counter = 1;
    while (existing) {
      slug = `${generateSlug(data.title as string)}-${counter}`;
      existing = await PremiumArticle.findOne({ slug });
      counter++;
    }

    const publishedDate = data.status === "published" ? new Date() : data.publishedDate || undefined;

    const article = await PremiumArticle.create({
      ...data,
      slug,
      publishedDate,
    });

    await logAudit({
      action: "article_created",
      entity: "PremiumArticle",
      entityId: article._id,
      details: { title: data.title, slug },
    });

    return article;
  },

  async adminUpdateArticle(id: string, data: Record<string, unknown>) {
    const article = await PremiumArticle.findById(id);
    if (!article) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }

    if (data.title && data.title !== article.title) {
      let slug = generateSlug(data.title as string);
      let existing = await PremiumArticle.findOne({ slug, _id: { $ne: id } });
      let counter = 1;
      while (existing) {
        slug = `${generateSlug(data.title as string)}-${counter}`;
        existing = await PremiumArticle.findOne({ slug, _id: { $ne: id } });
        counter++;
      }
      (data as Record<string, unknown>).slug = slug;
    }

    if (data.status === "published" && article.status !== "published") {
      (data as Record<string, unknown>).publishedDate = new Date();
    }

    const updated = await PremiumArticle.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    await logAudit({
      action: "article_updated",
      entity: "PremiumArticle",
      entityId: article._id,
      details: { updates: Object.keys(data) },
    });

    return updated;
  },

  async adminDeleteArticle(id: string) {
    const article = await PremiumArticle.findById(id);
    if (!article) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }

    const purchases = await ArticlePurchase.countDocuments({ article: id });
    if (purchases > 0) {
      throw new AppError("Cannot delete article with existing purchases. Archive it instead.", HTTP_STATUS.BAD_REQUEST);
    }

    await PremiumArticle.findByIdAndDelete(id);

    await logAudit({
      action: "article_deleted",
      entity: "PremiumArticle",
      entityId: article._id,
      details: { title: article.title },
    });

    return { message: "Article deleted successfully" };
  },

  async adminGetPurchases(query: {
    page?: number;
    limit?: number;
    search?: string;
    paymentStatus?: string;
    articleId?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (query.paymentStatus) {
      filter.paymentStatus = query.paymentStatus;
    }

    if (query.articleId) {
      filter.article = query.articleId;
    }

    if (query.search) {
      const users = await User.find({
        $or: [
          { name: { $regex: query.search, $options: "i" } },
          { email: { $regex: query.search, $options: "i" } },
        ],
      }).select("_id");
      const userIds = users.map((u) => u._id);
      filter.user = { $in: userIds };
    }

    const sort: Record<string, 1 | -1> = {};
    sort[query.sortBy || "purchaseDate"] = query.sortOrder === "asc" ? 1 : -1;

    const [purchases, total] = await Promise.all([
      ArticlePurchase.find(filter)
        .populate("user", "name email")
        .populate("article", "title slug price currency")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      ArticlePurchase.countDocuments(filter),
    ]);

    return {
      purchases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async adminGetAnalytics(): Promise<Record<string, unknown>> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      totalPurchases,
      monthlyPurchases,
      weeklyPurchases,
      totalRevenue,
      monthlyRevenue,
      totalDownloads,
      popularArticles,
      bestSelling,
      categoryDistribution,
      recentPurchases,
    ] = await Promise.all([
      PremiumArticle.countDocuments(),
      PremiumArticle.countDocuments({ status: "published" }),
      PremiumArticle.countDocuments({ status: "draft" }),
      ArticlePurchase.countDocuments({ paymentStatus: "successful" }),
      ArticlePurchase.countDocuments({
        paymentStatus: "successful",
        purchaseDate: { $gte: startOfMonth },
      }),
      ArticlePurchase.countDocuments({
        paymentStatus: "successful",
        purchaseDate: { $gte: startOfWeek },
      }),
      ArticlePurchase.aggregate([
        { $match: { paymentStatus: "successful" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      ArticlePurchase.aggregate([
        { $match: { paymentStatus: "successful", purchaseDate: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      ArticleDownloadLog.countDocuments(),
      PremiumArticle.find({ status: "published" })
        .sort({ purchaseCount: -1 })
        .limit(5)
        .select("title slug price purchaseCount revenue")
        .lean(),
      PremiumArticle.find({ status: "published" })
        .sort({ purchaseCount: -1 })
        .limit(5)
        .select("title slug price purchaseCount")
        .lean(),
      PremiumArticle.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      ArticlePurchase.find({ paymentStatus: "successful" })
        .sort({ purchaseDate: -1 })
        .limit(10)
        .populate("user", "name email")
        .populate("article", "title slug price")
        .lean(),
    ]);

    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      totalPurchases,
      monthlyPurchases,
      weeklyPurchases,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
      totalDownloads,
      popularArticles,
      bestSelling,
      categoryDistribution,
      recentPurchases,
    } as Record<string, unknown>;
  },

  async adminCreateCategory(data: Record<string, unknown>) {
    const slug = (data.slug as string) || generateSlug(data.name as string);
    const existing = await ArticleCategory.findOne({ slug });
    if (existing) {
      throw new AppError("Category with this slug already exists", HTTP_STATUS.CONFLICT);
    }
    return ArticleCategory.create({ ...data, slug });
  },

  async adminUpdateCategory(id: string, data: Record<string, unknown>) {
    const category = await ArticleCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }
    return category;
  },

  async adminDeleteCategory(id: string) {
    const articles = await PremiumArticle.countDocuments({ category: id });
    if (articles > 0) {
      throw new AppError("Cannot delete category with existing articles", HTTP_STATUS.BAD_REQUEST);
    }
    await ArticleCategory.findByIdAndDelete(id);
    return { message: "Category deleted successfully" };
  },

  async adminGetDownloadLogs(query: {
    page?: number;
    limit?: number;
    articleId?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (query.articleId) {
      filter.article = query.articleId;
    }

    const [logs, total] = await Promise.all([
      ArticleDownloadLog.find(filter)
        .populate("user", "name email")
        .populate("article", "title slug")
        .sort({ downloadedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ArticleDownloadLog.countDocuments(filter),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },
} as unknown as Record<string, (...args: any[]) => any>;
