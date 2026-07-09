import { Request, Response } from "express";
import { PremiumService } from "../services/premium.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const PremiumController = {
  // Public
  getArticles: asyncHandler(async (req: Request, res: Response) => {
    const result = await PremiumService.getPublishedArticles({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 12,
      search: req.query.search as string,
      category: req.query.category as string,
      tags: req.query.tags as string,
      author: req.query.author as string,
      isFeatured: req.query.isFeatured as string,
      minPrice: req.query.minPrice as string,
      maxPrice: req.query.maxPrice as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
    });
    ApiResponse.success(res, result);
  }),

  getArticleDetail: asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    const slug = req.params.slug as string;
    const result = await PremiumService.getArticleDetail(slug, authReq.user?.id);
    ApiResponse.success(res, result);
  }),

  getCategories: asyncHandler(async (_req: Request, res: Response) => {
    const categories = await PremiumService.getCategories();
    ApiResponse.success(res, { categories });
  }),

  // Authenticated user
  purchaseArticle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const articleId = req.params.id as string;
    const gateway = (req.body.gateway as string) || "stripe";
    const result = await PremiumService.purchaseArticle(articleId, req.user!.id, gateway);
    ApiResponse.created(res, result, "Article purchased successfully");
  }),

  getUserPurchases: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await PremiumService.getUserPurchases(req.user!.id, {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
    });
    ApiResponse.success(res, result);
  }),

  downloadArticle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const slug = req.params.slug as string;
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] as string;
    const result = await PremiumService.downloadArticle(slug, req.user!.id, ipAddress, userAgent);
    ApiResponse.success(res, result);
  }),

  // Admin
  adminGetArticles: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await PremiumService.adminGetArticles({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      status: req.query.status as string,
      search: req.query.search as string,
      category: req.query.category as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
    });
    ApiResponse.success(res, result);
  }),

  adminGetArticleById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const article = await PremiumService.adminGetArticleById(id);
    ApiResponse.success(res, { article });
  }),

  adminCreateArticle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const article = await PremiumService.adminCreateArticle(req.body);
    ApiResponse.created(res, { article }, "Article created successfully");
  }),

  adminUpdateArticle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const article = await PremiumService.adminUpdateArticle(id, req.body);
    ApiResponse.success(res, { article }, "Article updated successfully");
  }),

  adminDeleteArticle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const result = await PremiumService.adminDeleteArticle(id);
    ApiResponse.success(res, result);
  }),

  adminGetPurchases: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await PremiumService.adminGetPurchases({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      search: req.query.search as string,
      paymentStatus: req.query.paymentStatus as string,
      articleId: req.query.articleId as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
    });
    ApiResponse.success(res, result);
  }),

  adminGetAnalytics: asyncHandler(async (req: AuthRequest, res: Response) => {
    const analytics = await PremiumService.adminGetAnalytics();
    ApiResponse.success(res, analytics);
  }),

  adminCreateCategory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const category = await PremiumService.adminCreateCategory(req.body);
    ApiResponse.created(res, { category }, "Category created successfully");
  }),

  adminUpdateCategory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const category = await PremiumService.adminUpdateCategory(id, req.body);
    ApiResponse.success(res, { category }, "Category updated successfully");
  }),

  adminDeleteCategory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const result = await PremiumService.adminDeleteCategory(id);
    ApiResponse.success(res, result);
  }),

  adminGetDownloadLogs: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await PremiumService.adminGetDownloadLogs({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
      articleId: req.query.articleId as string,
    });
    ApiResponse.success(res, result);
  }),
};
