import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config";
import { JwtPayload } from "../types";
import { Role, TOKEN_TYPES } from "../constants";

export function generateAccessToken(userId: string, role: Role): string {
  return jwt.sign(
    { sub: userId, role, type: TOKEN_TYPES.ACCESS },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiresIn } as SignOptions
  );
}

export function generateRefreshToken(userId: string, role: Role): string {
  return jwt.sign(
    { sub: userId, role, type: TOKEN_TYPES.REFRESH },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn } as SignOptions
  );
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
}

export function generateAdminAccessToken(userId: string, role: Role): string {
  return jwt.sign(
    { sub: userId, role, type: TOKEN_TYPES.ACCESS },
    config.adminJwt.accessSecret,
    { expiresIn: config.adminJwt.accessExpiresIn } as SignOptions
  );
}

export function generateAdminRefreshToken(userId: string, role: Role): string {
  return jwt.sign(
    { sub: userId, role, type: TOKEN_TYPES.REFRESH },
    config.adminJwt.refreshSecret,
    { expiresIn: config.adminJwt.refreshExpiresIn } as SignOptions
  );
}

export function verifyAdminAccessToken(token: string): JwtPayload {
  return jwt.verify(token, config.adminJwt.accessSecret) as JwtPayload;
}

export function verifyAdminRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, config.adminJwt.refreshSecret) as JwtPayload;
}

export function generateRandomToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
