import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../middlewares/errorHandler";
import { HTTP_STATUS } from "../constants";

export const UserService = {
  async getProfile(userId: string) {
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
      createdAt: user.createdAt,
    };
  },

  async updateProfile(userId: string, data: { name?: string; phone?: string; country?: string; institution?: string }) {
    const user = await UserRepository.updateById(userId, data as any);
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
    };
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await UserRepository.findByEmailWithPassword("");
    const fullUser = await UserRepository.findById(userId);
    if (!fullUser) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const userWithPassword = await UserRepository.findByEmailWithPassword(fullUser.email);
    if (!userWithPassword) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const isMatch = await userWithPassword.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError("Current password is incorrect", HTTP_STATUS.UNAUTHORIZED);
    }

    await UserRepository.updatePassword(userId, newPassword);
  },

  async updateAvatar(userId: string, avatarUrl: string, publicId: string) {
    const user = await UserRepository.updateById(userId, { avatar: avatarUrl, avatarPublicId: publicId } as any);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return user.avatar;
  },
};
