import { Response } from "express";
import { HTTP_STATUS } from "../constants";

export class ApiResponse {
  static success(res: Response, data: Record<string, unknown>, message = "Success", statusCode: number = HTTP_STATUS.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created(res: Response, data: Record<string, unknown>, message = "Created") {
    return ApiResponse.success(res, data, message, HTTP_STATUS.CREATED);
  }

  static noContent(res: Response) {
    return res.status(HTTP_STATUS.NO_CONTENT).json({ success: true, message: "No content", data: {} });
  }

  static error(res: Response, message: string, statusCode: number = HTTP_STATUS.BAD_REQUEST, errors?: string[]) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  }
}
