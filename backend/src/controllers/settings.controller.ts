import { Response } from "express";
import { SettingsService } from "../services/settings.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const SettingsController = {
  getSettings: asyncHandler(async (req: AuthRequest, res: Response) => {
    const settings = await SettingsService.getSettings(req.user!.id);
    ApiResponse.success(res, { settings });
  }),

  updateNotificationPreferences: asyncHandler(async (req: AuthRequest, res: Response) => {
    const settings = await SettingsService.updateNotificationPreferences(req.user!.id, req.body);
    ApiResponse.success(res, { settings }, "Notification preferences updated");
  }),

  updatePrivacySettings: asyncHandler(async (req: AuthRequest, res: Response) => {
    const settings = await SettingsService.updatePrivacySettings(req.user!.id, req.body);
    ApiResponse.success(res, { settings }, "Privacy settings updated");
  }),

  updateGeneral: asyncHandler(async (req: AuthRequest, res: Response) => {
    const settings = await SettingsService.updateGeneral(req.user!.id, req.body);
    ApiResponse.success(res, { settings }, "General settings updated");
  }),

  deleteAccount: asyncHandler(async (req: AuthRequest, res: Response) => {
    await SettingsService.deleteAccount(req.user!.id);
    ApiResponse.success(res, {}, "Account deleted successfully");
  }),
};
