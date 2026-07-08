import { AdminRepository } from "../repositories/admin.repository";
import { TokenRepository } from "../repositories/token.repository";
import { TokenService } from "./token.service";
import { EmailService } from "./email.service";
import { AppError } from "../middlewares/errorHandler";
import { HTTP_STATUS, ROLES } from "../constants";
import {
  generateAdminAccessToken,
  generateAdminRefreshToken,
  verifyAdminRefreshToken,
} from "../utils/token";

export const AdminService = {
  async login(email: string, password: string) {
    const admin = await AdminRepository.findByEmailWithPassword(email);
    if (!admin) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    const accessToken = generateAdminAccessToken(admin._id.toString(), admin.role);
    const refreshToken = generateAdminRefreshToken(admin._id.toString(), admin.role);

    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await TokenRepository.createRefreshToken({
      token: refreshToken,
      userId: admin._id.toString(),
      userType: "admin",
      expiresAt: refreshExpiresAt,
    });

    return {
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      accessToken,
      refreshToken,
    };
  },

  async logout(refreshToken: string) {
    await TokenRepository.deleteRefreshToken(refreshToken);
  },

  async refresh(refreshTokenStr: string) {
    const decoded = verifyAdminRefreshToken(refreshTokenStr);
    const stored = await TokenRepository.findRefreshToken(refreshTokenStr);

    if (!stored) {
      throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
    }

    const admin = await AdminRepository.findById(decoded.sub);
    if (!admin) {
      throw new AppError("Admin not found", HTTP_STATUS.UNAUTHORIZED);
    }

    await TokenRepository.deleteRefreshToken(refreshTokenStr);

    const accessToken = generateAdminAccessToken(admin._id.toString(), admin.role);
    const newRefreshToken = generateAdminRefreshToken(admin._id.toString(), admin.role);

    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await TokenRepository.createRefreshToken({
      token: newRefreshToken,
      userId: admin._id.toString(),
      userType: "admin",
      expiresAt: refreshExpiresAt,
    });

    return { accessToken, refreshToken: newRefreshToken };
  },

  async getMe(adminId: string) {
    const admin = await AdminRepository.findById(adminId);
    if (!admin) {
      throw new AppError("Admin not found", HTTP_STATUS.NOT_FOUND);
    }
    return {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
    };
  },

  async forgotPassword(email: string) {
    const admin = await AdminRepository.findByEmail(email);
    if (!admin) return;

    const resetToken = await TokenService.createPasswordResetToken(admin._id.toString(), "admin");
    await EmailService.sendPasswordResetEmail(email, resetToken);
  },

  async resetPassword(token: string, newPassword: string) {
    const doc = await TokenService.verifyPasswordResetToken(token);
    if (!doc || doc.userType !== "admin") {
      throw new AppError("Invalid or expired reset token", HTTP_STATUS.BAD_REQUEST);
    }

    const admin = await AdminRepository.findById(doc.userId);
    if (!admin) {
      throw new AppError("Admin not found", HTTP_STATUS.NOT_FOUND);
    }

    admin.password = newPassword;
    admin.passwordChangedAt = new Date();
    await admin.save();

    await TokenService.deletePasswordResetToken(token);
    await TokenService.invalidateUserRefreshTokens(doc.userId, "admin");
  },
};
