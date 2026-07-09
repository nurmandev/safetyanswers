import { Response } from "express";
import { ProfileService } from "../services/profile.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const ProfileController = {
  getProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const profile = await ProfileService.getProfile(req.user!.id);
    ApiResponse.success(res, { user: profile });
  }),

  updateProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const profile = await ProfileService.updateProfile(req.user!.id, req.body);
    ApiResponse.success(res, { user: profile }, "Profile updated successfully");
  }),

  changePassword: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    await ProfileService.changePassword(req.user!.id, currentPassword, newPassword);
    ApiResponse.success(res, {}, "Password changed successfully");
  }),

  updateAvatar: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      ApiResponse.error(res, "No file uploaded", 400);
      return;
    }
    const { uploadImage } = await import("../utils/cloudinary");
    const { url, publicId } = await uploadImage(req.file.path, "users/avatars");
    const result = await ProfileService.updateAvatar(req.user!.id, url, publicId);
    ApiResponse.success(res, result, "Avatar updated successfully");
  }),

  removeAvatar: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await ProfileService.removeAvatar(req.user!.id);
    ApiResponse.success(res, result, "Avatar removed successfully");
  }),
};
