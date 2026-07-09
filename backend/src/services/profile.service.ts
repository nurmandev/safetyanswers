import { User } from "../models/User";
import { AuditLog } from "../models/AuditLog";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";
import { deleteImage } from "../utils/cloudinary";

export const ProfileService = {
  async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password -refreshToken");
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
      company: user.company,
      jobTitle: user.jobTitle,
      address: user.address,
      state: user.state,
      city: user.city,
      bio: user.bio,
      socialLinks: user.socialLinks,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async updateProfile(userId: string, data: Record<string, unknown>) {
    const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true }).select("-password -refreshToken");
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    await AuditLog.create({
      action: "profile_updated",
      entity: "User",
      entityId: user._id,
      userId: user._id,
      userType: "user",
      details: { updatedFields: Object.keys(data) },
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      country: user.country,
      institution: user.institution,
      company: user.company,
      jobTitle: user.jobTitle,
      address: user.address,
      state: user.state,
      city: user.city,
      bio: user.bio,
      socialLinks: user.socialLinks,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError("Current password is incorrect", HTTP_STATUS.UNAUTHORIZED);
    }

    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    await AuditLog.create({
      action: "password_changed",
      entity: "User",
      entityId: user._id,
      userId: user._id,
      userType: "user",
    });
  },

  async updateAvatar(userId: string, avatarUrl: string, publicId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    if (user.avatarPublicId) {
      try {
        await deleteImage(user.avatarPublicId);
      } catch {}
    }

    user.avatar = avatarUrl;
    user.avatarPublicId = publicId;
    await user.save();

    await AuditLog.create({
      action: "avatar_uploaded",
      entity: "User",
      entityId: user._id,
      userId: user._id,
      userType: "user",
      details: { avatarUrl },
    });

    return { avatar: user.avatar };
  },

  async removeAvatar(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    if (user.avatarPublicId) {
      try {
        await deleteImage(user.avatarPublicId);
      } catch {}
    }

    user.avatar = undefined;
    user.avatarPublicId = undefined;
    await user.save();

    await AuditLog.create({
      action: "avatar_removed",
      entity: "User",
      entityId: user._id,
      userId: user._id,
      userType: "user",
    });

    return { avatar: null };
  },
};
