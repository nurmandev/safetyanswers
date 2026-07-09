import { User } from "../models/User";
import { Booking } from "../models/Booking";
import { ArticlePurchase } from "../models/ArticlePurchase";
import { ArticleDownloadLog } from "../models/ArticleDownloadLog";
import { Notification } from "../models/Notification";
import { AuditLog } from "../models/AuditLog";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";

export const DashboardService = {
  async getDashboard(userId: string) {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const [
      totalBookings,
      upcomingBookings,
      completedBookings,
      pendingBookings,
      totalPurchases,
      recentPurchases,
      totalDownloads,
      recentDownloads,
      unreadNotifications,
      recentNotifications,
      recentActivity,
    ] = await Promise.all([
      Booking.countDocuments({ user: userId }),
      Booking.find({
        user: userId,
        status: { $in: ["approved", "confirmed", "scheduled"] },
        preferredDate: { $gte: new Date() },
      })
        .sort({ preferredDate: 1 })
        .limit(5)
        .select("bookingId title service category preferredDate preferredTime status meetingType"),
      Booking.countDocuments({ user: userId, status: "completed" }),
      Booking.countDocuments({
        user: userId,
        status: { $in: ["pending", "awaiting_review"] },
      }),
      ArticlePurchase.countDocuments({ user: userId, paymentStatus: "successful" }),
      ArticlePurchase.find({ user: userId, paymentStatus: "successful" })
        .sort({ purchaseDate: -1 })
        .limit(5)
        .populate("article", "title slug featuredImage category")
        .select("article amount purchaseDate downloadCount"),
      ArticleDownloadLog.countDocuments({ user: userId }),
      ArticleDownloadLog.find({ user: userId })
        .sort({ downloadedAt: -1 })
        .limit(5)
        .populate("article", "title slug featuredImage")
        .select("article downloadedAt status"),
      Notification.countDocuments({ user: userId, isRead: false }),
      Notification.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("type title message isRead createdAt"),
      AuditLog.find({ userId: userId, userType: "user" })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("action entity details createdAt"),
    ]);

    const profileFields = ["name", "email", "phone", "avatar", "country", "institution", "company", "jobTitle", "bio"];
    const filledFields = profileFields.filter(
      (field) => (user as any)[field] && String((user as any)[field]).trim() !== ""
    );
    const profileCompletion = Math.round((filledFields.length / profileFields.length) * 100);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        country: user.country,
        institution: user.institution,
        company: user.company,
        jobTitle: user.jobTitle,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
      statistics: {
        totalBookings,
        completedBookings,
        pendingBookings,
        upcomingBookingsCount: upcomingBookings.length,
        totalPurchases,
        totalDownloads,
        unreadNotifications,
      },
      profileCompletion,
      upcomingBookings,
      recentPurchases: recentPurchases.map((p) => ({
        id: (p as any)._id,
        article: (p as any).article,
        amount: p.amount,
        purchaseDate: p.purchaseDate,
        downloadCount: p.downloadCount,
      })),
      recentDownloads: recentDownloads.map((d) => ({
        id: (d as any)._id,
        article: (d as any).article,
        downloadedAt: d.downloadedAt,
        status: d.status,
      })),
      recentNotifications,
      recentActivity: recentActivity.map((a) => ({
        id: (a as any)._id,
        action: a.action,
        entity: a.entity,
        details: a.details,
        createdAt: a.createdAt,
      })),
    };
  },
};
