import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";
import { getCookieOptions } from "../utils/helpers";
import { config } from "../config";

export const AuthController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const result = await AuthService.register(name, email, password);

    res.cookie("refreshToken", result.refreshToken, {
      ...getCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.created(res, {
      user: result.user,
      accessToken: result.accessToken,
    }, "Registration successful. Please verify your email.");
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    res.cookie("refreshToken", result.refreshToken, {
      ...getCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.success(res, {
      user: result.user,
      accessToken: result.accessToken,
    }, "Login successful");
  }),

  logout: asyncHandler(async (req: AuthRequest, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }

    res.clearCookie("refreshToken", getCookieOptions());
    ApiResponse.success(res, {}, "Logged out successfully");
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!refreshToken) {
      ApiResponse.error(res, "Refresh token required", 401);
      return;
    }

    const result = await AuthService.refresh(refreshToken);

    res.cookie("refreshToken", result.refreshToken, {
      ...getCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.success(res, {
      accessToken: result.accessToken,
    }, "Token refreshed");
  }),

  getMe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await AuthService.getMe(req.user!.id);
    ApiResponse.success(res, { user });
  }),

  verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      ApiResponse.error(res, "Verification token required", 400);
      return;
    }

    await AuthService.verifyEmail(token);
    ApiResponse.success(res, {}, "Email verified successfully");
  }),

  resendVerification: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthService.resendVerification(email);
    ApiResponse.success(res, {}, "If the email exists, a verification link has been sent");
  }),

  forgotPassword: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthService.forgotPassword(email);
    ApiResponse.success(res, {}, "If the email exists, a password reset link has been sent");
  }),

  resetPassword: asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await AuthService.resetPassword(token, password);
    ApiResponse.success(res, {}, "Password reset successful");
  }),
};
