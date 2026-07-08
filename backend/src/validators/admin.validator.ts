import { z } from "zod";

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email").toLowerCase().trim(),
    password: z.string().min(1, "Password is required"),
  }),
});

export const adminForgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email").toLowerCase().trim(),
  }),
});

export const adminResetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, "Token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password cannot exceed 128 characters"),
  }),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>["body"];
