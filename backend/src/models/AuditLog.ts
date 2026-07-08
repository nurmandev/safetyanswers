import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLogDocument extends Document {
  action: string;
  entity: string;
  entityId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  userType?: "user" | "admin";
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLogDocument>(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },
    entity: {
      type: String,
      required: true,
      trim: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    userType: {
      type: String,
      enum: ["user", "admin"],
    },
    details: {
      type: Schema.Types.Mixed,
    },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

auditLogSchema.index({ entity: 1, entityId: 1 });
auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLogDocument>("AuditLog", auditLogSchema);
