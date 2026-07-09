import { Response } from "express";
import { ConversationService } from "../services/conversation.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const ConversationController = {
  getConversations: asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const search = req.query.search as string | undefined;
    const type = req.query.type as string | undefined;
    const result = await ConversationService.getConversations(req.user!.id, { page, limit, search, type });
    ApiResponse.success(res, result);
  }),

  getOrCreateConversation: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { otherUserId, subject } = req.body;
    const conversation = await ConversationService.getOrCreateConversation(
      req.user!.id,
      otherUserId as string,
      subject as string
    );
    ApiResponse.success(res, { conversation });
  }),

  getMessages: asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const conversationId = req.params.conversationId as string;
    const result = await ConversationService.getMessages(req.user!.id, conversationId, { page, limit });
    ApiResponse.success(res, result);
  }),

  sendMessage: asyncHandler(async (req: AuthRequest, res: Response) => {
    const conversationId = req.params.conversationId as string;
    const message = await ConversationService.sendMessage(req.user!.id, conversationId, req.body);
    ApiResponse.created(res, { message }, "Message sent successfully");
  }),

  markAsRead: asyncHandler(async (req: AuthRequest, res: Response) => {
    const conversationId = req.params.conversationId as string;
    await ConversationService.markAsRead(req.user!.id, conversationId);
    ApiResponse.success(res, {}, "Conversation marked as read");
  }),

  deleteMessage: asyncHandler(async (req: AuthRequest, res: Response) => {
    const messageId = req.params.messageId as string;
    const message = await ConversationService.deleteMessage(req.user!.id, messageId);
    ApiResponse.success(res, { message }, "Message deleted successfully");
  }),

  archiveConversation: asyncHandler(async (req: AuthRequest, res: Response) => {
    const conversationId = req.params.conversationId as string;
    await ConversationService.archiveConversation(req.user!.id, conversationId);
    ApiResponse.success(res, {}, "Conversation archived");
  }),

  unarchiveConversation: asyncHandler(async (req: AuthRequest, res: Response) => {
    const conversationId = req.params.conversationId as string;
    await ConversationService.unarchiveConversation(req.user!.id, conversationId);
    ApiResponse.success(res, {}, "Conversation unarchived");
  }),

  getUnreadCount: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await ConversationService.getUnreadCount(req.user!.id);
    ApiResponse.success(res, result);
  }),

  // ─── ADMIN OPERATIONS ───────────────────────────
  adminGetConversations: asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const search = req.query.search as string | undefined;
    const type = req.query.type as string | undefined;
    const result = await ConversationService.adminGetConversations({ page, limit, search, type });
    ApiResponse.success(res, result);
  }),

  adminSendMessage: asyncHandler(async (req: AuthRequest, res: Response) => {
    const conversationId = req.params.conversationId as string;
    const message = await ConversationService.adminSendMessage(
      req.user!.id,
      conversationId,
      req.body
    );
    ApiResponse.created(res, { message }, "Message sent successfully");
  }),
};
