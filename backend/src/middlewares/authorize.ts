import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { Role } from "../constants";
import { ApiResponse } from "../utils/ApiResponse";
import { HTTP_STATUS } from "../constants";

export const authorize = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      ApiResponse.error(res, "Authentication required", HTTP_STATUS.UNAUTHORIZED);
      return;
    }

    if (!roles.includes(req.user.role)) {
      ApiResponse.error(res, "You do not have permission to perform this action", HTTP_STATUS.FORBIDDEN);
      return;
    }

    next();
  };
};
