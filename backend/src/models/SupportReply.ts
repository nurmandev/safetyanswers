import mongoose, { Schema, Document } from "mongoose";

export interface ISupportReplyDocument extends Document {
  ticket: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  senderType: "user" | "admin";
  message: string;
  attachments: {
    name: string;
    url: string;
    publicId: string;
    type: string;
    size: number;
  }[];
  isInternalNote: boolean;
  createdAt: Date;
}

const supportReplySchema = new Schema<ISupportReplyDocument>(
  {
    ticket: { type: Schema.Types.ObjectId, ref: "SupportTicket", required: true },
    sender: { type: Schema.Types.ObjectId, required: true },
    senderType: { type: String, enum: ["user", "admin"], required: true },
    message: { type: String, required: true, trim: true },
    attachments: [{
      name: { type: String, required: true },
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      type: { type: String, required: true },
      size: { type: Number, required: true },
    }],
    isInternalNote: { type: Boolean, default: false },
  },
  { timestamps: true }
);

supportReplySchema.index({ ticket: 1, createdAt: 1 });

export const SupportReply = mongoose.model<ISupportReplyDocument>("SupportReply", supportReplySchema);
