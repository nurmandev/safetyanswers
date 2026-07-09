import { Conversation } from "../models/Conversation";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";
import mongoose from "mongoose";

export const ConversationService = {
  async getConversations(userId: string, params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {
      participants: userId,
    };
    if (params.type) filter.type = params.type;

    const [conversations, total] = await Promise.all([
      Conversation.find(filter)
        .sort({ lastMessageAt: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("participants", "name email avatar")
        .populate("lastMessage"),
      Conversation.countDocuments(filter),
    ]);

    let filteredConversations = conversations;
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredConversations = conversations.filter((conv) => {
        const participantNames = (conv.participants as any[]).map((p: any) => p.name?.toLowerCase() || "").join(" ");
        const subject = conv.subject?.toLowerCase() || "";
        return participantNames.includes(searchLower) || subject.includes(searchLower);
      });
    }

    const conversationsWithUnread = filteredConversations.map((conv) => {
      const unreadCount = conv.unreadCount?.get(userId) || 0;
      return { ...conv.toObject(), unreadCount };
    });

    return {
      conversations: conversationsWithUnread,
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

  async getOrCreateConversation(userId: string, otherUserId: string, subject?: string) {
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] },
      type: "user_user",
    });

    if (!conversation) {
      const otherUser = await User.findById(otherUserId);
      if (!otherUser) throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);

      conversation = await Conversation.create({
        participants: [userId, otherUserId],
        participantModels: ["User", "User"],
        subject: subject || `Conversation with ${otherUser.name}`,
        type: "user_user",
      });
    }

    return conversation;
  },

  async getMessages(userId: string, conversationId: string, params: {
    page?: number;
    limit?: number;
  }) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new AppError("Conversation not found", HTTP_STATUS.NOT_FOUND);

    if (!conversation.participants.includes(new mongoose.Types.ObjectId(userId))) {
      throw new AppError("You are not a participant in this conversation", HTTP_STATUS.FORBIDDEN);
    }

    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find({ conversation: conversationId, isDeleted: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("sender", "name email avatar"),
      Message.countDocuments({ conversation: conversationId, isDeleted: false }),
    ]);

    const unreadCount = conversation.unreadCount?.get(userId) || 0;

    return {
      messages: messages.reverse(),
      conversation: {
        ...conversation.toObject(),
        unreadCount,
      },
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

  async sendMessage(userId: string, conversationId: string, data: {
    content: string;
    type?: string;
    attachments?: Array<{ name: string; url: string; publicId: string; type: string; size: number }>;
  }) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new AppError("Conversation not found", HTTP_STATUS.NOT_FOUND);

    if (!conversation.participants.includes(new mongoose.Types.ObjectId(userId))) {
      throw new AppError("You are not a participant in this conversation", HTTP_STATUS.FORBIDDEN);
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: userId,
      senderModel: "User",
      content: data.content,
      type: data.type || "text",
      attachments: data.attachments || [],
      readBy: [userId],
      deliveredTo: conversation.participants.filter((p) => p.toString() !== userId),
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();

    for (const participantId of conversation.participants) {
      if (participantId.toString() !== userId) {
        const currentCount = conversation.unreadCount?.get(participantId.toString()) || 0;
        conversation.unreadCount?.set(participantId.toString(), currentCount + 1);
      }
    }

    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name email avatar");

    return populatedMessage;
  },

  async markAsRead(userId: string, conversationId: string) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new AppError("Conversation not found", HTTP_STATUS.NOT_FOUND);

    conversation.unreadCount?.set(userId, 0);
    await conversation.save();

    await Message.updateMany(
      { conversation: conversationId, readBy: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    );
  },

  async deleteMessage(userId: string, messageId: string) {
    const message = await Message.findById(messageId);
    if (!message) throw new AppError("Message not found", HTTP_STATUS.NOT_FOUND);
    if (message.sender.toString() !== userId) {
      throw new AppError("You can only delete your own messages", HTTP_STATUS.FORBIDDEN);
    }

    message.isDeleted = true;
    message.content = "This message has been deleted";
    await message.save();
    return message;
  },

  async archiveConversation(userId: string, conversationId: string) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new AppError("Conversation not found", HTTP_STATUS.NOT_FOUND);

    conversation.isArchived?.set(userId, true);
    await conversation.save();
  },

  async unarchiveConversation(userId: string, conversationId: string) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new AppError("Conversation not found", HTTP_STATUS.NOT_FOUND);

    conversation.isArchived?.set(userId, false);
    await conversation.save();
  },

  async getUnreadCount(userId: string) {
    const conversations = await Conversation.find({ participants: userId });
    let totalUnread = 0;
    for (const conv of conversations) {
      totalUnread += conv.unreadCount?.get(userId) || 0;
    }
    return { totalUnread };
  },

  // ─── ADMIN OPERATIONS ───────────────────────────
  async adminGetConversations(params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (params.type) filter.type = params.type;

    const [conversations, total] = await Promise.all([
      Conversation.find(filter)
        .sort({ lastMessageAt: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("participants", "name email avatar")
        .populate("lastMessage"),
      Conversation.countDocuments(filter),
    ]);

    return {
      conversations,
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

  async adminSendMessage(adminId: string, conversationId: string, data: {
    content: string;
    type?: string;
    attachments?: Array<{ name: string; url: string; publicId: string; type: string; size: number }>;
  }) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new AppError("Conversation not found", HTTP_STATUS.NOT_FOUND);

    const message = await Message.create({
      conversation: conversationId,
      sender: adminId,
      senderModel: "Admin",
      content: data.content,
      type: data.type || "text",
      attachments: data.attachments || [],
      readBy: [adminId],
      deliveredTo: conversation.participants.filter((p) => p.toString() !== adminId),
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();

    for (const participantId of conversation.participants) {
      if (participantId.toString() !== adminId) {
        const currentCount = conversation.unreadCount?.get(participantId.toString()) || 0;
        conversation.unreadCount?.set(participantId.toString(), currentCount + 1);
      }
    }

    await conversation.save();

    return Message.findById(message._id).populate("sender", "name email avatar");
  },
};
