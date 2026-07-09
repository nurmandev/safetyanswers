import { SupportTicket, ISupportTicketDocument } from "../models/SupportTicket";
import { SupportReply } from "../models/SupportReply";
import { SupportFAQ } from "../models/SupportFAQ";
import { SupportCategory } from "../models/SupportCategory";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";
import mongoose from "mongoose";

const generateTicketId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TICK-${timestamp}-${random}`;
};

export const SupportService = {
  // ─── TICKETS ────────────────────────────────────
  async createTicket(userId: string, data: {
    subject: string;
    category: string;
    priority?: string;
    description: string;
    attachments?: Array<{ name: string; url: string; publicId: string; type: string; size: number }>;
  }) {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);

    const ticket = await SupportTicket.create({
      ticketId: generateTicketId(),
      user: userId,
      subject: data.subject,
      category: data.category,
      priority: data.priority || "medium",
      description: data.description,
      attachments: data.attachments || [],
    });

    return ticket;
  },

  async getTickets(userId: string, params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { user: userId };
    if (params.status) filter.status = params.status;
    if (params.search) {
      filter.$or = [
        { subject: { $regex: params.search, $options: "i" } },
        { ticketId: { $regex: params.search, $options: "i" } },
      ];
    }

    const [tickets, total] = await Promise.all([
      SupportTicket.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("ticketId subject category priority status attachments lastReplyAt createdAt"),
      SupportTicket.countDocuments(filter),
    ]);

    return {
      tickets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async getTicketById(userId: string, ticketId: string) {
    const ticket = await SupportTicket.findOne({ ticketId, user: userId });
    if (!ticket) throw new AppError("Ticket not found", HTTP_STATUS.NOT_FOUND);

    const replies = await SupportReply.find({ ticket: ticket._id })
      .sort({ createdAt: 1 })
      .populate("sender", "name email avatar");

    return { ticket, replies };
  },

  async addReply(userId: string, ticketId: string, data: {
    message: string;
    attachments?: Array<{ name: string; url: string; publicId: string; type: string; size: number }>;
  }) {
    const ticket = await SupportTicket.findOne({ ticketId, user: userId });
    if (!ticket) throw new AppError("Ticket not found", HTTP_STATUS.NOT_FOUND);

    if (ticket.status === "closed" || ticket.status === "cancelled") {
      throw new AppError("Cannot reply to a closed ticket", HTTP_STATUS.BAD_REQUEST);
    }

    const reply = await SupportReply.create({
      ticket: ticket._id,
      sender: userId,
      senderType: "user",
      message: data.message,
      attachments: data.attachments || [],
    });

    ticket.lastReplyAt = new Date();
    if (ticket.status === "pending" || ticket.status === "in_progress") {
      ticket.status = "awaiting_customer";
    }
    await ticket.save();

    return reply;
  },

  // ─── FAQ ────────────────────────────────────────
  async getFAQs(category?: string) {
    const filter: Record<string, unknown> = { isActive: true };
    if (category) filter.category = category;

    const faqs = await SupportFAQ.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("question answer category");

    return faqs;
  },

  // ─── CATEGORIES ─────────────────────────────────
  async getCategories() {
    const categories = await SupportCategory.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .select("name slug description icon");
    return categories;
  },

  // ─── ADMIN OPERATIONS ───────────────────────────
  async adminGetAllTickets(params: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
    assignedTo?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (params.status) filter.status = params.status;
    if (params.priority) filter.priority = params.priority;
    if (params.category) filter.category = params.category;
    if (params.assignedTo) filter.assignedTo = params.assignedTo;
    if (params.search) {
      filter.$or = [
        { subject: { $regex: params.search, $options: "i" } },
        { ticketId: { $regex: params.search, $options: "i" } },
      ];
    }

    const [tickets, total] = await Promise.all([
      SupportTicket.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name email avatar")
        .populate("assignedTo", "name email"),
      SupportTicket.countDocuments(filter),
    ]);

    return {
      tickets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async adminReplyToTicket(adminId: string, ticketId: string, data: {
    message: string;
    status?: string;
    isInternalNote?: boolean;
    attachments?: Array<{ name: string; url: string; publicId: string; type: string; size: number }>;
  }) {
    const ticket = await SupportTicket.findOne({ ticketId });
    if (!ticket) throw new AppError("Ticket not found", HTTP_STATUS.NOT_FOUND);

    const reply = await SupportReply.create({
      ticket: ticket._id,
      sender: adminId,
      senderType: "admin",
      message: data.message,
      attachments: data.attachments || [],
      isInternalNote: data.isInternalNote || false,
    });

    ticket.lastReplyAt = new Date();
    if (data.status) ticket.status = data.status as any;
    await ticket.save();

    return reply;
  },

  async adminAssignTicket(ticketId: string, adminId: string) {
    const ticket = await SupportTicket.findOneAndUpdate(
      { ticketId },
      { assignedTo: adminId, status: "in_progress" },
      { new: true }
    );
    if (!ticket) throw new AppError("Ticket not found", HTTP_STATUS.NOT_FOUND);
    return ticket;
  },

  async adminUpdateTicketStatus(ticketId: string, status: string) {
    const updateData: Record<string, unknown> = { status };
    if (status === "resolved") updateData.resolvedAt = new Date();
    if (status === "closed") updateData.closedAt = new Date();

    const ticket = await SupportTicket.findOneAndUpdate(
      { ticketId },
      updateData,
      { new: true }
    );
    if (!ticket) throw new AppError("Ticket not found", HTTP_STATUS.NOT_FOUND);
    return ticket;
  },

  // ─── ADMIN FAQ CRUD ─────────────────────────────
  async adminCreateFAQ(data: { question: string; answer: string; category: string; sortOrder?: number }) {
    return SupportFAQ.create(data);
  },

  async adminUpdateFAQ(id: string, data: Record<string, unknown>) {
    const faq = await SupportFAQ.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!faq) throw new AppError("FAQ not found", HTTP_STATUS.NOT_FOUND);
    return faq;
  },

  async adminDeleteFAQ(id: string) {
    const faq = await SupportFAQ.findByIdAndDelete(id);
    if (!faq) throw new AppError("FAQ not found", HTTP_STATUS.NOT_FOUND);
  },

  async adminCreateCategory(data: { name: string; description?: string; icon?: string; sortOrder?: number }) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return SupportCategory.create({ ...data, slug });
  },

  async adminUpdateCategory(id: string, data: Record<string, unknown>) {
    const cat = await SupportCategory.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!cat) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    return cat;
  },

  async adminDeleteCategory(id: string) {
    const cat = await SupportCategory.findByIdAndDelete(id);
    if (!cat) throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
  },
};
