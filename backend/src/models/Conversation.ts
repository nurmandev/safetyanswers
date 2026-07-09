import mongoose, { Schema, Document } from "mongoose";

export interface IConversationDocument extends Document {
  participants: mongoose.Types.ObjectId[];
  participantModels: ("User" | "Admin")[];
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt?: Date;
  unreadCount: Map<string, number>;
  isPinned: Map<string, boolean>;
  isArchived: Map<string, boolean>;
  subject?: string;
  type: "user_admin" | "user_user" | "broadcast";
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversationDocument>(
  {
    participants: [{ type: Schema.Types.ObjectId, required: true, refPath: "participantModels" }],
    participantModels: [{ type: String, required: true, enum: ["User", "Admin"] }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    lastMessageAt: { type: Date },
    unreadCount: { type: Map, of: Number, default: {} },
    isPinned: { type: Map, of: Boolean, default: {} },
    isArchived: { type: Map, of: Boolean, default: {} },
    subject: { type: String, trim: true },
    type: { type: String, enum: ["user_admin", "user_user", "broadcast"], default: "user_admin" },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1, updatedAt: -1 });
conversationSchema.index({ lastMessageAt: -1 });

export const Conversation = mongoose.model<IConversationDocument>("Conversation", conversationSchema);
