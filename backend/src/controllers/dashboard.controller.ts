import { Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const DashboardController = {
  getDashboard: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await DashboardService.getDashboard(req.user!.id);
    ApiResponse.success(res, data);
  }),
};
