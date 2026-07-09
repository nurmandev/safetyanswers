import mongoose, { Schema, Document } from "mongoose";

export type TicketStatus = "open" | "pending" | "in_progress" | "awaiting_customer" | "resolved" | "closed" | "cancelled";
export type TicketPriority = "low" | "medium" | "high" | "urgent" | "critical";

export interface ISupportTicketDocument extends Document {
  ticketId: string;
  user: mongoose.Types.ObjectId;
  subject: string;
  category: string;
  priority: TicketPriority;
  description: string;
  status: TicketStatus;
  assignedTo?: mongoose.Types.ObjectId;
  attachments: {
    name: string;
    url: string;
    publicId: string;
    type: string;
    size: number;
  }[];
  internalNotes?: string;
  lastReplyAt?: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const supportTicketSchema = new Schema<ISupportTicketDocument>(
  {
    ticketId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true, trim: true, maxlength: [300, "Subject cannot exceed 300 characters"] },
    category: { type: String, required: true, trim: true },
    priority: { type: String, enum: ["low", "medium", "high", "urgent", "critical"], default: "medium" },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: ["open", "pending", "in_progress", "awaiting_customer", "resolved", "closed", "cancelled"], default: "open" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Admin" },
    attachments: [{
      name: { type: String, required: true },
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      type: { type: String, required: true },
      size: { type: Number, required: true },
    }],
    internalNotes: { type: String, trim: true },
    lastReplyAt: { type: Date },
    resolvedAt: { type: Date },
    closedAt: { type: Date },
  },
  { timestamps: true }
);

supportTicketSchema.index({ user: 1, createdAt: -1 });
supportTicketSchema.index({ status: 1 });
supportTicketSchema.index({ ticketId: 1 });
supportTicketSchema.index({ category: 1 });
supportTicketSchema.index({ assignedTo: 1 });

export const SupportTicket = mongoose.model<ISupportTicketDocument>("SupportTicket", supportTicketSchema);
