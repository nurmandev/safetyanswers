import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  port: parseInt(env("PORT", "4000"), 10),
  nodeEnv: env("NODE_ENV", "development"),
  mongodbUri: env("MONGODB_URI"),
  jwt: {
    accessSecret: env("JWT_ACCESS_SECRET"),
    refreshSecret: env("JWT_REFRESH_SECRET"),
    accessExpiresIn: env("JWT_ACCESS_EXPIRES_IN", "15m"),
    refreshExpiresIn: env("JWT_REFRESH_EXPIRES_IN", "7d"),
  },
  adminJwt: {
    accessSecret: env("JWT_ADMIN_ACCESS_SECRET"),
    refreshSecret: env("JWT_ADMIN_REFRESH_SECRET"),
    accessExpiresIn: env("JWT_ADMIN_ACCESS_EXPIRES_IN", "15m"),
    refreshExpiresIn: env("JWT_ADMIN_REFRESH_EXPIRES_IN", "7d"),
  },
  cloudinary: {
    cloudName: env("CLOUDINARY_CLOUD_NAME"),
    apiKey: env("CLOUDINARY_API_KEY"),
    apiSecret: env("CLOUDINARY_API_SECRET"),
  },
  smtp: {
    host: env("SMTP_HOST", "smtp.gmail.com"),
    port: parseInt(env("SMTP_PORT", "587"), 10),
    user: env("SMTP_USER", ""),
    pass: env("SMTP_PASS", ""),
    from: env("EMAIL_FROM", "noreply@safetyanswers.com"),
  },
  frontendUrl: env("FRONTEND_URL", "http://localhost:3000"),
  cookieSecret: env("COOKIE_SECRET", "change-me-in-production"),
  isDev: env("NODE_ENV", "development") === "development",
  isProd: env("NODE_ENV", "development") === "production",
};

export const CORS_ORIGIN = config.frontendUrl;
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: config.isProd ? "strict" as const : "lax" as const,
  path: "/",
};
