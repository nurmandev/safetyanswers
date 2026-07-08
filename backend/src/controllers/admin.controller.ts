import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";
import { getCookieOptions } from "../utils/helpers";

export const AdminController = {
  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AdminService.login(email, password);

    res.cookie("adminRefreshToken", result.refreshToken, {
      ...getCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.success(res, {
      admin: result.admin,
      accessToken: result.accessToken,
    }, "Admin login successful");
  }),

  logout: asyncHandler(async (req: AuthRequest, res: Response) => {
    const refreshToken = req.cookies?.adminRefreshToken || req.body?.refreshToken;
    if (refreshToken) {
      await AdminService.logout(refreshToken);
    }

    res.clearCookie("adminRefreshToken", getCookieOptions());
    ApiResponse.success(res, {}, "Admin logged out successfully");
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.adminRefreshToken || req.body?.refreshToken;
    if (!refreshToken) {
      ApiResponse.error(res, "Admin refresh token required", 401);
      return;
    }

    const result = await AdminService.refresh(refreshToken);

    res.cookie("adminRefreshToken", result.refreshToken, {
      ...getCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.success(res, {
      accessToken: result.accessToken,
    }, "Admin token refreshed");
  }),

  getMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const admin = await AdminService.getMe(req.user!.id);
    ApiResponse.success(res, { admin });
  }),

  forgotPassword: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await AdminService.forgotPassword(email);
    ApiResponse.success(res, {}, "If the email exists, a reset link has been sent");
  }),

  resetPassword: asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await AdminService.resetPassword(token, password);
    ApiResponse.success(res, {}, "Password reset successful");
  }),
};
