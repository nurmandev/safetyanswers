import { Response } from "express";
import { SupportService } from "../services/support.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const SupportController = {
  // ─── USER TICKET OPERATIONS ─────────────────────
  createTicket: asyncHandler(async (req: AuthRequest, res: Response) => {
    const ticket = await SupportService.createTicket(req.user!.id, req.body);
    ApiResponse.created(res, { ticket }, "Support ticket created successfully");
  }),

  getTickets: asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const result = await SupportService.getTickets(req.user!.id, { page, limit, status, search });
    ApiResponse.success(res, result);
  }),

  getTicketById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const ticketId = req.params.ticketId as string;
    const result = await SupportService.getTicketById(req.user!.id, ticketId);
    ApiResponse.success(res, result);
  }),

  addReply: asyncHandler(async (req: AuthRequest, res: Response) => {
    const ticketId = req.params.ticketId as string;
    const reply = await SupportService.addReply(req.user!.id, ticketId, req.body);
    ApiResponse.created(res, { reply }, "Reply sent successfully");
  }),

  // ─── PUBLIC/SHARED OPERATIONS ───────────────────
  getFAQs: asyncHandler(async (req: AuthRequest, res: Response) => {
    const category = req.query.category as string | undefined;
    const faqs = await SupportService.getFAQs(category);
    ApiResponse.success(res, { faqs });
  }),

  getCategories: asyncHandler(async (req: AuthRequest, res: Response) => {
    const categories = await SupportService.getCategories();
    ApiResponse.success(res, { categories });
  }),

  // ─── ADMIN OPERATIONS ───────────────────────────
  adminGetAllTickets: asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const status = req.query.status as string | undefined;
    const priority = req.query.priority as string | undefined;
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const assignedTo = req.query.assignedTo as string | undefined;
    const result = await SupportService.adminGetAllTickets({ page, limit, status, priority, category, search, assignedTo });
    ApiResponse.success(res, result);
  }),

  adminReplyToTicket: asyncHandler(async (req: AuthRequest, res: Response) => {
    const ticketId = req.params.ticketId as string;
    const reply = await SupportService.adminReplyToTicket(req.user!.id, ticketId, req.body);
    ApiResponse.created(res, { reply }, "Reply sent successfully");
  }),

  adminAssignTicket: asyncHandler(async (req: AuthRequest, res: Response) => {
    const ticketId = req.params.ticketId as string;
    const ticket = await SupportService.adminAssignTicket(ticketId, req.user!.id);
    ApiResponse.success(res, { ticket }, "Ticket assigned successfully");
  }),

  adminUpdateTicketStatus: asyncHandler(async (req: AuthRequest, res: Response) => {
    const ticketId = req.params.ticketId as string;
    const ticket = await SupportService.adminUpdateTicketStatus(ticketId, req.body.status);
    ApiResponse.success(res, { ticket }, "Ticket status updated");
  }),

  adminCreateFAQ: asyncHandler(async (req: AuthRequest, res: Response) => {
    const faq = await SupportService.adminCreateFAQ(req.body);
    ApiResponse.created(res, { faq }, "FAQ created successfully");
  }),

  adminUpdateFAQ: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const faq = await SupportService.adminUpdateFAQ(id, req.body);
    ApiResponse.success(res, { faq }, "FAQ updated successfully");
  }),

  adminDeleteFAQ: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    await SupportService.adminDeleteFAQ(id);
    ApiResponse.success(res, {}, "FAQ deleted successfully");
  }),

  adminCreateCategory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const category = await SupportService.adminCreateCategory(req.body);
    ApiResponse.created(res, { category }, "Category created successfully");
  }),

  adminUpdateCategory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const category = await SupportService.adminUpdateCategory(id, req.body);
    ApiResponse.success(res, { category }, "Category updated successfully");
  }),

  adminDeleteCategory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    await SupportService.adminDeleteCategory(id);
    ApiResponse.success(res, {}, "Category deleted successfully");
  }),
};
