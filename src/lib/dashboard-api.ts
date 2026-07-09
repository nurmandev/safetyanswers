import { api } from "./api-client";

export interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    country?: string;
    institution?: string;
    company?: string;
    jobTitle?: string;
    isVerified: boolean;
    createdAt: string;
  };
  statistics: {
    totalBookings: number;
    completedBookings: number;
    pendingBookings: number;
    upcomingBookingsCount: number;
    totalPurchases: number;
    totalDownloads: number;
    unreadNotifications: number;
  };
  profileCompletion: number;
  upcomingBookings: Array<{
    _id: string;
    bookingId: string;
    title: string;
    service: string;
    category: string;
    preferredDate: string;
    preferredTime: string;
    status: string;
    meetingType: string;
  }>;
  recentPurchases: Array<{
    id: string;
    article: { _id: string; title: string; slug: string; featuredImage?: string; category?: string };
    amount: number;
    purchaseDate: string;
    downloadCount: number;
  }>;
  recentDownloads: Array<{
    id: string;
    article: { _id: string; title: string; slug: string; featuredImage?: string };
    downloadedAt: string;
    status: string;
  }>;
  recentNotifications: Array<{
    _id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  }>;
  recentActivity: Array<{
    id: string;
    action: string;
    entity: string;
    details?: Record<string, unknown>;
    createdAt: string;
  }>;
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  country?: string;
  institution?: string;
  company?: string;
  jobTitle?: string;
  address?: string;
  state?: string;
  city?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  _id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  unreadCount: number;
}

export const dashboardApi = {
  getDashboard: () => api.get<DashboardData>("/dashboard"),
};

export const profileApi = {
  getProfile: () => api.get<{ user: ProfileData }>("/profile"),

  updateProfile: (data: {
    name?: string;
    phone?: string;
    country?: string;
    institution?: string;
    company?: string;
    jobTitle?: string;
    address?: string;
    state?: string;
    city?: string;
    bio?: string;
    socialLinks?: { linkedin?: string; twitter?: string; website?: string };
  }) => api.patch<{ user: ProfileData }>("/profile", data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.post("/profile/password", data),

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.upload<{ avatar: string }>("/profile/avatar", formData);
  },

  removeAvatar: () => api.delete("/profile/avatar"),
};

export const notificationsApi = {
  getNotifications: (params?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
    type?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.unreadOnly) searchParams.set("unreadOnly", "true");
    if (params?.type) searchParams.set("type", params.type);
    if (params?.search) searchParams.set("search", params.search);
    const query = searchParams.toString();
    return api.get<NotificationsResponse>(`/notifications${query ? `?${query}` : ""}`);
  },

  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),

  markAllAsRead: () => api.patch("/notifications/read-all"),

  deleteNotification: (id: string) => api.delete(`/notifications/${id}`),

  deleteAllNotifications: () => api.delete("/notifications/all"),
};
