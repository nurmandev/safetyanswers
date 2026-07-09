import { api } from "./api-client";

export interface PremiumArticle {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  fullContent?: string;
  previewContent?: string;
  featuredImage: string;
  category: { _id: string; name: string; slug: string; color?: string };
  tags: string[];
  author: string;
  price: number;
  currency: string;
  discount: number;
  status: string;
  readingTime: number;
  downloadablePdf?: string;
  purchaseCount: number;
  downloadCount: number;
  isFeatured: boolean;
  publishedDate: string;
  createdAt: string;
  isPurchased?: boolean;
}

export interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ArticlePurchase {
  _id: string;
  user: { _id: string; name: string; email: string };
  article: PremiumArticle;
  amount: number;
  currency: string;
  gateway: string;
  paymentStatus: string;
  invoiceNumber: string;
  purchaseDate: string;
  downloadCount: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const premiumApi = {
  getArticles(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    tags?: string;
    author?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, String(value));
      });
    }
    const qs = searchParams.toString();
    return api.get<{
      articles: PremiumArticle[];
      pagination: PaginationInfo;
    }>(`/premium/articles${qs ? `?${qs}` : ""}`);
  },

  getArticleDetail(slug: string) {
    return api.get<{
      article: PremiumArticle;
      related: PremiumArticle[];
      categories: ArticleCategory[];
    }>(`/premium/articles/${slug}`);
  },

  getCategories() {
    return api.get<{ categories: ArticleCategory[] }>("/premium/categories");
  },

  purchaseArticle(articleId: string, gateway = "stripe") {
    return api.post<{ purchase: ArticlePurchase }>(
      `/premium/articles/${articleId}/purchase`,
      { gateway }
    );
  },

  getUserPurchases(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, String(value));
      });
    }
    const qs = searchParams.toString();
    return api.get<{
      purchases: ArticlePurchase[];
      pagination: PaginationInfo;
    }>(`/premium/purchases${qs ? `?${qs}` : ""}`);
  },

  downloadArticle(slug: string) {
    return api.get<{ url: string; fileName: string }>(
      `/premium/articles/${slug}/download`
    );
  },

  // Admin
  adminGetArticles(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, String(value));
      });
    }
    const qs = searchParams.toString();
    return api.get<{
      articles: PremiumArticle[];
      pagination: PaginationInfo;
    }>(`/admin/premium/articles${qs ? `?${qs}` : ""}`, true);
  },

  adminGetArticleById(id: string) {
    return api.get<{ article: PremiumArticle }>(
      `/admin/premium/articles/${id}`,
      true
    );
  },

  adminCreateArticle(data: Record<string, unknown>) {
    return api.post<{ article: PremiumArticle }>(
      "/admin/premium/articles",
      data,
      true
    );
  },

  adminUpdateArticle(id: string, data: Record<string, unknown>) {
    return api.patch<{ article: PremiumArticle }>(
      `/admin/premium/articles/${id}`,
      data,
      true
    );
  },

  adminDeleteArticle(id: string) {
    return api.delete<{ message: string }>(
      `/admin/premium/articles/${id}`,
      true
    );
  },

  adminGetPurchases(params?: {
    page?: number;
    limit?: number;
    search?: string;
    paymentStatus?: string;
    articleId?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, String(value));
      });
    }
    const qs = searchParams.toString();
    return api.get<{
      purchases: ArticlePurchase[];
      pagination: PaginationInfo;
    }>(`/admin/premium/purchases${qs ? `?${qs}` : ""}`, true);
  },

  adminGetAnalytics() {
    return api.get<Record<string, unknown>>(
      "/admin/premium/analytics",
      true
    );
  },

  adminCreateCategory(data: Record<string, unknown>) {
    return api.post<{ category: ArticleCategory }>(
      "/admin/premium/categories",
      data,
      true
    );
  },

  adminUpdateCategory(id: string, data: Record<string, unknown>) {
    return api.patch<{ category: ArticleCategory }>(
      `/admin/premium/categories/${id}`,
      data,
      true
    );
  },

  adminDeleteCategory(id: string) {
    return api.delete<{ message: string }>(
      `/admin/premium/categories/${id}`,
      true
    );
  },

  adminGetDownloadLogs(params?: {
    page?: number;
    limit?: number;
    articleId?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, String(value));
      });
    }
    const qs = searchParams.toString();
    return api.get<Record<string, unknown>>(
      `/admin/premium/downloads${qs ? `?${qs}` : ""}`,
      true
    );
  },
};
