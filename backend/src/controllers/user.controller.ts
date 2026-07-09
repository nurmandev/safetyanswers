import { Response } from "express";
import { UserService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const UserController = {
  getProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await UserService.getProfile(req.user!.id);
    ApiResponse.success(res, { user });
  }),

  updateProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, phone, country, institution, company, jobTitle, address, state, city, bio, socialLinks } = req.body;
    const user = await UserService.updateProfile(req.user!.id, { name, phone, country, institution, company, jobTitle, address, state, city, bio, socialLinks });
    ApiResponse.success(res, { user }, "Profile updated successfully");
  }),

  changePassword: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    await UserService.changePassword(req.user!.id, currentPassword, newPassword);
    ApiResponse.success(res, {}, "Password changed successfully");
  }),

  updateAvatar: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      ApiResponse.error(res, "No file uploaded", 400);
      return;
    }

    const { uploadImage } = await import("../utils/cloudinary");
    const { url, publicId } = await uploadImage(req.file.path, "users/avatars");
    const avatar = await UserService.updateAvatar(req.user!.id, url, publicId);

    ApiResponse.success(res, { avatar }, "Avatar updated successfully");
  }),
};
