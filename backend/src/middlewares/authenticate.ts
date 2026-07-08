import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyAccessToken } from "../utils/token";
import { User } from "../models/User";
import { ApiResponse } from "../utils/ApiResponse";
import { HTTP_STATUS } from "../constants";
import { asyncHandler } from "../utils/asyncHandler";

export const authenticateUser = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      ApiResponse.error(res, "Authentication required", HTTP_STATUS.UNAUTHORIZED);
      return;
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.sub).select("-refreshToken");

    if (!user) {
      ApiResponse.error(res, "User not found", HTTP_STATUS.UNAUTHORIZED);
      return;
    }

    if (user.passwordChangedAt) {
      const changedAt = Math.floor(user.passwordChangedAt.getTime() / 1000);
      if (decoded.iat && decoded.iat < changedAt) {
        ApiResponse.error(res, "Password recently changed. Please login again", HTTP_STATUS.UNAUTHORIZED);
        return;
      }
    }

    req.user = { id: user._id.toString(), role: user.role };
    next();
  }
);
