export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  avatarPublicId?: string;
  country?: string;
  institution?: string;
  company?: string;
  jobTitle?: string;
  address?: string;
  state?: string;
  city?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  isVerified: boolean;
  role: "user";
  refreshToken?: string;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "super_admin" | "editor";
  refreshToken?: string;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRefreshToken {
  _id: string;
  token: string;
  userId: string;
  userType: "user" | "admin";
  expiresAt: Date;
  createdAt: Date;
}

export interface IEmailVerificationToken {
  _id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface IPasswordResetToken {
  _id: string;
  userId: string;
  userType: "user" | "admin";
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface ApiResponseData {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
  errors?: string[];
}
