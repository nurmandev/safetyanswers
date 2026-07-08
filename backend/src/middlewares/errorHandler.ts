import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { HTTP_STATUS } from "../constants";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err.message, { stack: err.stack });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values((err as any).errors || {}).map(
      (e: any) => e.message
    );
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation error",
      errors: messages,
    });
  }

  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0];
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: `Duplicate value for ${field}. This ${field} is already in use.`,
    });
  }

  if (err.name === "CastError") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
}
