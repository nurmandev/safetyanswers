import { z } from "zod";

export const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .trim()
      .optional(),
    phone: z.string().max(20, "Phone cannot exceed 20 characters").trim().optional(),
    country: z.string().max(100, "Country cannot exceed 100 characters").trim().optional(),
    institution: z.string().max(200, "Institution cannot exceed 200 characters").trim().optional(),
    company: z.string().max(200, "Company cannot exceed 200 characters").trim().optional(),
    jobTitle: z.string().max(200, "Job title cannot exceed 200 characters").trim().optional(),
    address: z.string().max(500, "Address cannot exceed 500 characters").trim().optional(),
    state: z.string().max(100, "State cannot exceed 100 characters").trim().optional(),
    city: z.string().max(100, "City cannot exceed 100 characters").trim().optional(),
    bio: z.string().max(1000, "Bio cannot exceed 1000 characters").trim().optional(),
    socialLinks: z
      .object({
        linkedin: z.string().url("Invalid LinkedIn URL").trim().optional().or(z.literal("")),
        twitter: z.string().url("Invalid Twitter URL").trim().optional().or(z.literal("")),
        website: z.string().url("Invalid website URL").trim().optional().or(z.literal("")),
      })
      .optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(128, "New password cannot exceed 128 characters"),
  }),
});

export const notificationsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).default("1"),
    limit: z.string().regex(/^\d+$/).transform(Number).default("20"),
    unreadOnly: z.string().optional(),
    type: z.string().optional(),
    search: z.string().optional(),
  }),
});

export const dashboardQuerySchema = z.object({
  query: z.object({}).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>["body"];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>["body"];
