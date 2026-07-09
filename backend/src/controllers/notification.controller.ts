import { Response } from "express";
import { NotificationService } from "../services/notification.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const NotificationController = {
  getNotifications: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { page, limit, unreadOnly, type, search } = req.query as any;
    const data = await NotificationService.getNotifications(req.user!.id, {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      unreadOnly,
      type,
      search,
    });
    ApiResponse.success(res, data);
  }),

  markAsRead: asyncHandler(async (req: AuthRequest, res: Response) => {
    const notificationId = req.params.id as string;
    const notification = await NotificationService.markAsRead(req.user!.id, notificationId);
    ApiResponse.success(res, { notification }, "Notification marked as read");
  }),

  markAllAsRead: asyncHandler(async (req: AuthRequest, res: Response) => {
    await NotificationService.markAllAsRead(req.user!.id);
    ApiResponse.success(res, {}, "All notifications marked as read");
  }),

  deleteNotification: asyncHandler(async (req: AuthRequest, res: Response) => {
    const notificationId = req.params.id as string;
    await NotificationService.deleteNotification(req.user!.id, notificationId);
    ApiResponse.success(res, {}, "Notification deleted");
  }),

  deleteAllNotifications: asyncHandler(async (req: AuthRequest, res: Response) => {
    await NotificationService.deleteAllNotifications(req.user!.id);
    ApiResponse.success(res, {}, "All notifications deleted");
  }),
};
