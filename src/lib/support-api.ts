import { api } from "./api-client";

export interface SupportTicket {
  _id: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
  status: string;
  attachments: Array<{
    name: string;
    url: string;
    publicId: string;
    type: string;
    size: number;
  }>;
  lastReplyAt?: string;
  createdAt: string;
}

export interface SupportReply {
  _id: string;
  ticket: string;
  sender: { _id: string; name: string; email: string; avatar?: string } | string;
  senderType: "user" | "admin";
  message: string;
  attachments: Array<{
    name: string;
    url: string;
    publicId: string;
    type: string;
    size: number;
  }>;
  isInternalNote: boolean;
  createdAt: string;
}

export interface SupportFAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
}

export interface SupportCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const supportApi = {
  // ─── USER OPERATIONS ──────────────────────────
  createTicket: (data: {
    subject: string;
    category: string;
    priority?: string;
    description: string;
  }) => api.post<{ ticket: SupportTicket }>("/support/tickets", data),

  getTickets: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.status) searchParams.set("status", params.status);
    if (params?.search) searchParams.set("search", params.search);
    const query = searchParams.toString();
    return api.get<{ tickets: SupportTicket[]; pagination: Pagination }>(`/support/tickets${query ? `?${query}` : ""}`);
  },

  getTicketById: (ticketId: string) =>
    api.get<{ ticket: SupportTicket; replies: SupportReply[] }>(`/support/tickets/${ticketId}`),

  addReply: (ticketId: string, data: { message: string }) =>
    api.post<{ reply: SupportReply }>(`/support/tickets/${ticketId}/replies`, data),

  getFAQs: (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return api.get<{ faqs: SupportFAQ[] }>(`/support/faqs${query}`);
  },

  getCategories: () => api.get<{ categories: SupportCategory[] }>("/support/categories"),

  // ─── ADMIN OPERATIONS ─────────────────────────
  adminGetAllTickets: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.status) searchParams.set("status", params.status);
    if (params?.priority) searchParams.set("priority", params.priority);
    if (params?.search) searchParams.set("search", params.search);
    const query = searchParams.toString();
    return api.get<{ tickets: SupportTicket[]; pagination: Pagination }>(`/support/admin/tickets${query ? `?${query}` : ""}`, true);
  },

  adminReplyToTicket: (ticketId: string, data: { message: string; status?: string; isInternalNote?: boolean }) =>
    api.post<{ reply: SupportReply }>(`/support/admin/tickets/${ticketId}/replies`, data, true),

  adminUpdateTicketStatus: (ticketId: string, status: string) =>
    api.patch<{ ticket: SupportTicket }>(`/support/admin/tickets/${ticketId}/status`, { status }, true),

  adminCreateFAQ: (data: { question: string; answer: string; category: string }) =>
    api.post<{ faq: SupportFAQ }>("/support/admin/faqs", data, true),

  adminUpdateFAQ: (id: string, data: Record<string, unknown>) =>
    api.put<{ faq: SupportFAQ }>(`/support/admin/faqs/${id}`, data, true),

  adminDeleteFAQ: (id: string) =>
    api.delete(`/support/admin/faqs/${id}`, true),

  adminCreateCategory: (data: { name: string; description?: string }) =>
    api.post<{ category: SupportCategory }>("/support/admin/categories", data, true),

  adminUpdateCategory: (id: string, data: Record<string, unknown>) =>
    api.put<{ category: SupportCategory }>(`/support/admin/categories/${id}`, data, true),

  adminDeleteCategory: (id: string) =>
    api.delete(`/support/admin/categories/${id}`, true),
};
