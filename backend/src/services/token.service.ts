import { TokenRepository } from "../repositories/token.repository";
import { generateRandomToken, hashToken } from "../utils/token";

export const TokenService = {
  async createPasswordResetToken(userId: string, userType: "user" | "admin") {
    const rawToken = generateRandomToken();
    const hashed = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await TokenRepository.createPasswordResetToken({
      userId,
      userType,
      token: hashed,
      expiresAt,
    });

    return rawToken;
  },

  async verifyPasswordResetToken(rawToken: string) {
    const hashed = hashToken(rawToken);
    const doc = await TokenRepository.findPasswordResetToken(hashed);
    if (!doc) return null;
    if (doc.expiresAt < new Date()) {
      await TokenRepository.deletePasswordResetToken(hashed);
      return null;
    }
    return doc;
  },

  async deletePasswordResetToken(rawToken: string) {
    const hashed = hashToken(rawToken);
    await TokenRepository.deletePasswordResetToken(hashed);
  },

  async invalidateUserRefreshTokens(userId: string, userType: "user" | "admin") {
    await TokenRepository.deleteAllUserRefreshTokens(userId, userType);
  },
};
