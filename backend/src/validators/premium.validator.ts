import { z } from "zod";

export const createPremiumArticleSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(300).trim(),
    summary: z.string().min(10, "Summary must be at least 10 characters").max(500).trim(),
    fullContent: z.string().min(50, "Full content must be at least 50 characters"),
    previewContent: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string().trim()).optional(),
    author: z.string().min(2, "Author must be at least 2 characters").trim(),
    price: z.number().min(0, "Price cannot be negative"),
    currency: z.string().max(3).default("USD"),
    discount: z.number().min(0).max(100).optional(),
    status: z.enum(["draft", "published", "archived", "scheduled"]).default("draft"),
    readingTime: z.number().min(1).optional(),
    seoTitle: z.string().max(200).trim().optional(),
    seoDescription: z.string().max(300).trim().optional(),
    seoKeywords: z.array(z.string().trim()).optional(),
    isFeatured: z.boolean().optional(),
    publishedDate: z.string().optional(),
  }),
});

export const updatePremiumArticleSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(300).trim().optional(),
    summary: z.string().min(10).max(500).trim().optional(),
    fullContent: z.string().min(50).optional(),
    previewContent: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string().trim()).optional(),
    author: z.string().min(2).trim().optional(),
    price: z.number().min(0).optional(),
    currency: z.string().max(3).optional(),
    discount: z.number().min(0).max(100).optional(),
    status: z.enum(["draft", "published", "archived", "scheduled"]).optional(),
    readingTime: z.number().min(1).optional(),
    seoTitle: z.string().max(200).trim().optional(),
    seoDescription: z.string().max(300).trim().optional(),
    seoKeywords: z.array(z.string().trim()).optional(),
    isFeatured: z.boolean().optional(),
    publishedDate: z.string().optional(),
  }),
});

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
    description: z.string().max(300).trim().optional(),
    color: z.string().optional(),
    icon: z.string().optional(),
    sortOrder: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const articlesQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).default("1"),
    limit: z.string().regex(/^\d+$/).transform(Number).default("12"),
    search: z.string().optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
    author: z.string().optional(),
    status: z.enum(["draft", "published", "archived", "scheduled"]).optional(),
    isFeatured: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    sortBy: z.string().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});
