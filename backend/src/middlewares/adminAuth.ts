import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyAdminAccessToken } from "../utils/token";
import { Admin } from "../models/Admin";
import { ApiResponse } from "../utils/ApiResponse";
import { HTTP_STATUS } from "../constants";
import { asyncHandler } from "../utils/asyncHandler";

export const authenticateAdmin = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      ApiResponse.error(res, "Admin authentication required", HTTP_STATUS.UNAUTHORIZED);
      return;
    }

    const decoded = verifyAdminAccessToken(token);
    const admin = await Admin.findById(decoded.sub).select("-refreshToken");

    if (!admin) {
      ApiResponse.error(res, "Admin not found", HTTP_STATUS.UNAUTHORIZED);
      return;
    }

    if (admin.passwordChangedAt) {
      const changedAt = Math.floor(admin.passwordChangedAt.getTime() / 1000);
      if (decoded.iat && decoded.iat < changedAt) {
        ApiResponse.error(res, "Password recently changed. Please login again", HTTP_STATUS.UNAUTHORIZED);
        return;
      }
    }

    req.user = { id: admin._id.toString(), role: admin.role };
    next();
  }
);
