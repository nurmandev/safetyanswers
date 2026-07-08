import mongoose, { Schema, Document } from "mongoose";

export interface IPasswordResetTokenDocument extends Document {
  userId: string;
  userType: "user" | "admin";
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

const passwordResetTokenSchema = new Schema<IPasswordResetTokenDocument>(
  {
    userId: { type: String, required: true, index: true },
    userType: { type: String, enum: ["user", "admin"], required: true },
    token: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
    createdAt: { type: Date, default: Date.now },
  }
);

export const PasswordResetToken = mongoose.model<IPasswordResetTokenDocument>(
  "PasswordResetToken",
  passwordResetTokenSchema
);
