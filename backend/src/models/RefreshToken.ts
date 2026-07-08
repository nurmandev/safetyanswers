import mongoose, { Schema, Document } from "mongoose";

export interface IRefreshTokenDocument extends Document {
  token: string;
  userId: string;
  userType: "user" | "admin";
  expiresAt: Date;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshTokenDocument>({
  token: { type: String, required: true, index: true },
  userId: { type: String, required: true, index: true },
  userType: { type: String, enum: ["user", "admin"], required: true },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
  createdAt: { type: Date, default: Date.now },
});

export const RefreshToken = mongoose.model<IRefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema
);
