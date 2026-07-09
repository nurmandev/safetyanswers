import mongoose, { Schema, Document } from "mongoose";

export type MessageType = "text" | "image" | "document" | "pdf" | "link" | "system";

export interface IMessageDocument extends Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  senderModel: "User" | "Admin";
  content: string;
  type: MessageType;
  attachments: {
    name: string;
    url: string;
    publicId: string;
    type: string;
    size: number;
  }[];
  readBy: mongoose.Types.ObjectId[];
  deliveredTo: mongoose.Types.ObjectId[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessageDocument>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Schema.Types.ObjectId, required: true, refPath: "senderModel" },
    senderModel: { type: String, required: true, enum: ["User", "Admin"] },
    content: { type: String, required: true, trim: true },
    type: { type: String, enum: ["text", "image", "document", "pdf", "link", "system"], default: "text" },
    attachments: [{
      name: { type: String, required: true },
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      type: { type: String, required: true },
      size: { type: Number, required: true },
    }],
    readBy: [{ type: Schema.Types.ObjectId }],
    deliveredTo: [{ type: Schema.Types.ObjectId }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });

export const Message = mongoose.model<IMessageDocument>("Message", messageSchema);
