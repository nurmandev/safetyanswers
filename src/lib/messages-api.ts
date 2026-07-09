import { api } from "./api-client";

export interface Conversation {
  _id: string;
  participants: Array<{ _id: string; name: string; email: string; avatar?: string }>;
  participantModels: string[];
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount?: number;
  subject?: string;
  type: string;
  createdAt: string;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: { _id: string; name: string; email: string; avatar?: string } | string;
  senderModel: "User" | "Admin";
  content: string;
  type: string;
  attachments: Array<{
    name: string;
    url: string;
    publicId: string;
    type: string;
    size: number;
  }>;
  readBy: string[];
  isDeleted: boolean;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const messagesApi = {
  getConversations: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.search) searchParams.set("search", params.search);
    if (params?.type) searchParams.set("type", params.type);
    const query = searchParams.toString();
    return api.get<{ conversations: Conversation[]; pagination: Pagination }>(`/messages/conversations${query ? `?${query}` : ""}`);
  },

  getOrCreateConversation: (otherUserId: string, subject?: string) =>
    api.post<{ conversation: Conversation }>("/messages/conversations", { otherUserId, subject }),

  getMessages: (conversationId: string, params?: {
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    const query = searchParams.toString();
    return api.get<{ messages: Message[]; conversation: Conversation; pagination: Pagination }>(
      `/messages/conversations/${conversationId}${query ? `?${query}` : ""}`
    );
  },

  sendMessage: (conversationId: string, data: { content: string; type?: string }) =>
    api.post<{ message: Message }>(`/messages/conversations/${conversationId}/messages`, data),

  markAsRead: (conversationId: string) =>
    api.patch(`/messages/conversations/${conversationId}/read`),

  deleteMessage: (messageId: string) =>
    api.delete(`/messages/messages/${messageId}`),

  archiveConversation: (conversationId: string) =>
    api.patch(`/messages/conversations/${conversationId}/archive`),

  unarchiveConversation: (conversationId: string) =>
    api.patch(`/messages/conversations/${conversationId}/unarchive`),

  getUnreadCount: () => api.get<{ totalUnread: number }>("/messages/unread"),

  // ─── ADMIN ───────────────────────────────────
  adminGetConversations: (params?: { page?: number; limit?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.search) searchParams.set("search", params.search);
    const query = searchParams.toString();
    return api.get<{ conversations: Conversation[]; pagination: Pagination }>(`/messages/admin/conversations${query ? `?${query}` : ""}`, true);
  },

  adminSendMessage: (conversationId: string, data: { content: string; type?: string }) =>
    api.post<{ message: Message }>(`/messages/admin/conversations/${conversationId}/messages`, data, true),
};
