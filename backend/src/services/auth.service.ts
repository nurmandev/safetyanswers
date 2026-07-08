import { UserRepository } from "../repositories/user.repository";
import { TokenRepository } from "../repositories/token.repository";
import { TokenService } from "./token.service";
import { EmailService } from "./email.service";
import { AppError } from "../middlewares/errorHandler";
import { HTTP_STATUS, ROLES } from "../constants";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token";
import { config } from "../config";

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      throw new AppError("Email already in use", HTTP_STATUS.CONFLICT);
    }

    const user = await UserRepository.create({ name, email, password });
    const verificationToken = await TokenService.createEmailVerificationToken(user._id.toString());

    await EmailService.sendVerificationEmail(email, verificationToken);

    const accessToken = generateAccessToken(user._id.toString(), ROLES.USER);
    const refreshToken = generateRefreshToken(user._id.toString(), ROLES.USER);

    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await TokenRepository.createRefreshToken({
      token: refreshToken,
      userId: user._id.toString(),
      userType: "user",
      expiresAt: refreshExpiresAt,
    });

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
      accessToken,
      refreshToken,
    };
  },

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    const accessToken = generateAccessToken(user._id.toString(), ROLES.USER);
    const refreshToken = generateRefreshToken(user._id.toString(), ROLES.USER);

    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await TokenRepository.createRefreshToken({
      token: refreshToken,
      userId: user._id.toString(),
      userType: "user",
      expiresAt: refreshExpiresAt,
    });

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
      accessToken,
      refreshToken,
    };
  },

  async logout(refreshToken: string) {
    await TokenRepository.deleteRefreshToken(refreshToken);
  },

  async refresh(refreshTokenStr: string) {
    const decoded = verifyRefreshToken(refreshTokenStr);
    const stored = await TokenRepository.findRefreshToken(refreshTokenStr);

    if (!stored) {
      throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
    }

    const user = await UserRepository.findById(decoded.sub);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.UNAUTHORIZED);
    }

    await TokenRepository.deleteRefreshToken(refreshTokenStr);

    const accessToken = generateAccessToken(user._id.toString(), ROLES.USER);
    const newRefreshToken = generateRefreshToken(user._id.toString(), ROLES.USER);

    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await TokenRepository.createRefreshToken({
      token: newRefreshToken,
      userId: user._id.toString(),
      userType: "user",
      expiresAt: refreshExpiresAt,
    });

    return { accessToken, refreshToken: newRefreshToken };
  },

  async getMe(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      country: user.country,
      institution: user.institution,
      isVerified: user.isVerified,
      role: user.role,
      createdAt: user.createdAt,
    };
  },

  async verifyEmail(token: string) {
    const doc = await TokenService.verifyEmailToken(token);
    if (!doc) {
      throw new AppError("Invalid or expired verification token", HTTP_STATUS.BAD_REQUEST);
    }

    await UserRepository.updateById(doc.userId, { isVerified: true } as any);
    await TokenService.deleteEmailVerificationToken(token);
  },

  async resendVerification(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("No account found with this email", HTTP_STATUS.NOT_FOUND);
    }
    if (user.isVerified) {
      throw new AppError("Email is already verified", HTTP_STATUS.BAD_REQUEST);
    }

    const verificationToken = await TokenService.createEmailVerificationToken(user._id.toString());
    await EmailService.sendVerificationEmail(email, verificationToken);
  },

  async forgotPassword(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return;
    }

    const resetToken = await TokenService.createPasswordResetToken(user._id.toString(), "user");
    await EmailService.sendPasswordResetEmail(email, resetToken);
  },

  async resetPassword(token: string, newPassword: string) {
    const doc = await TokenService.verifyPasswordResetToken(token);
    if (!doc) {
      throw new AppError("Invalid or expired reset token", HTTP_STATUS.BAD_REQUEST);
    }

    await UserRepository.updatePassword(doc.userId, newPassword);
    await TokenService.deletePasswordResetToken(token);
    await TokenService.invalidateUserRefreshTokens(doc.userId, "user");
  },
};
