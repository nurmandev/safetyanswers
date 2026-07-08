import mongoose, { Schema, Document } from "mongoose";

export interface IEmailVerificationTokenDocument extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

const emailVerificationTokenSchema = new Schema<IEmailVerificationTokenDocument>(
  {
    userId: { type: String, required: true, index: true },
    token: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
    createdAt: { type: Date, default: Date.now },
  }
);

export const EmailVerificationToken = mongoose.model<IEmailVerificationTokenDocument>(
  "EmailVerificationToken",
  emailVerificationTokenSchema
);
