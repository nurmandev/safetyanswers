import { RefreshToken } from "../models/RefreshToken";
import { EmailVerificationToken } from "../models/EmailVerificationToken";
import { PasswordResetToken } from "../models/PasswordResetToken";

export const TokenRepository = {
  async createRefreshToken(data: { token: string; userId: string; userType: "user" | "admin"; expiresAt: Date }) {
    return RefreshToken.create(data);
  },

  async findRefreshToken(token: string) {
    return RefreshToken.findOne({ token });
  },

  async deleteRefreshToken(token: string) {
    return RefreshToken.deleteOne({ token });
  },

  async deleteAllUserRefreshTokens(userId: string, userType: "user" | "admin") {
    return RefreshToken.deleteMany({ userId, userType });
  },

  async createEmailVerificationToken(data: { userId: string; token: string; expiresAt: Date }) {
    return EmailVerificationToken.create(data);
  },

  async findEmailVerificationToken(token: string) {
    return EmailVerificationToken.findOne({ token });
  },

  async deleteEmailVerificationToken(token: string) {
    return EmailVerificationToken.deleteOne({ token });
  },

  async createPasswordResetToken(data: { userId: string; userType: "user" | "admin"; token: string; expiresAt: Date }) {
    return PasswordResetToken.create(data);
  },

  async findPasswordResetToken(token: string) {
    return PasswordResetToken.findOne({ token });
  },

  async deletePasswordResetToken(token: string) {
    return PasswordResetToken.deleteOne({ token });
  },

  async deleteUserPasswordResetTokens(userId: string, userType: "user" | "admin") {
    return PasswordResetToken.deleteMany({ userId, userType });
  },
};
