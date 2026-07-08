import { z } from "zod";

const bookingStatusEnum = z.enum([
  "pending",
  "awaiting_review",
  "approved",
  "confirmed",
  "scheduled",
  "rescheduled",
  "completed",
  "cancelled",
  "rejected",
  "no_show",
]);

const paymentStatusEnum = z.enum(["unpaid", "pending", "paid", "refunded", "failed"]);
const meetingTypeEnum = z.enum(["virtual", "physical"]);

export const createBookingSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(200).trim(),
    email: z.string().email("Please provide a valid email").toLowerCase().trim(),
    phone: z.string().min(5, "Please provide a valid phone number").max(30).trim(),
    whatsapp: z.string().max(30).trim().optional(),
    organization: z.string().max(200).trim().optional(),
    country: z.string().max(100).trim().optional(),
    service: z.string().min(1, "Service is required").trim(),
    category: z.string().min(1, "Category is required").trim(),
    title: z.string().min(3, "Title must be at least 3 characters").max(500).trim(),
    description: z.string().min(10, "Description must be at least 10 characters").max(5000).trim(),
    preferredDate: z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    }, "Preferred date must be a valid future date"),
    preferredTime: z.string().min(1, "Preferred time is required"),
    timezone: z.string().default("UTC"),
    duration: z.number().min(15, "Duration must be at least 15 minutes").max(480).default(60),
    meetingType: meetingTypeEnum.default("virtual"),
    meetingLocation: z.string().max(500).trim().optional(),
    additionalNotes: z.string().max(5000).trim().optional(),
    budget: z.number().min(0).optional(),
    currency: z.string().max(3).default("USD"),
  }),
});

export const updateBookingSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200).trim().optional(),
    phone: z.string().min(5).max(30).trim().optional(),
    whatsapp: z.string().max(30).trim().optional(),
    organization: z.string().max(200).trim().optional(),
    country: z.string().max(100).trim().optional(),
    title: z.string().min(3).max(500).trim().optional(),
    description: z.string().min(10).max(5000).trim().optional(),
    preferredDate: z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Please provide a valid date").optional(),
    preferredTime: z.string().min(1).optional(),
    timezone: z.string().optional(),
    duration: z.number().min(15).max(480).optional(),
    meetingType: meetingTypeEnum.optional(),
    meetingLocation: z.string().max(500).trim().optional(),
    additionalNotes: z.string().max(5000).trim().optional(),
  }),
});

export const adminUpdateBookingSchema = z.object({
  body: z.object({
    status: bookingStatusEnum.optional(),
    paymentStatus: paymentStatusEnum.optional(),
    amount: z.number().min(0).optional(),
    currency: z.string().max(3).optional(),
    assignedConsultant: z.string().optional(),
    internalNotes: z.string().max(5000).trim().optional(),
    adminNotes: z.string().max(5000).trim().optional(),
    googleMeetLink: z.string().url().optional().or(z.literal("")),
    zoomLink: z.string().url().optional().or(z.literal("")),
    microsoftTeamsLink: z.string().url().optional().or(z.literal("")),
    meetingLocation: z.string().max(500).trim().optional(),
    cancellationReason: z.string().max(2000).trim().optional(),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
  }),
});

export const assignConsultantSchema = z.object({
  body: z.object({
    consultantId: z.string().min(1, "Consultant ID is required"),
  }),
});

export const updateNotesSchema = z.object({
  body: z.object({
    internalNotes: z.string().max(5000).trim().optional(),
    adminNotes: z.string().max(5000).trim().optional(),
  }),
});

export const rescheduleSchema = z.object({
  body: z.object({
    preferredDate: z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    }, "Preferred date must be a valid future date"),
    preferredTime: z.string().min(1, "Preferred time is required"),
    reason: z.string().max(2000).trim().optional(),
  }),
});

export const availabilityQuerySchema = z.object({
  query: z.object({
    date: z.string().optional(),
    consultantId: z.string().optional(),
    serviceId: z.string().optional(),
  }),
});

export const bookingsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).default("1"),
    limit: z.string().regex(/^\d+$/).transform(Number).default("10"),
    status: bookingStatusEnum.optional(),
    search: z.string().optional(),
    sortBy: z.string().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    consultantId: z.string().optional(),
    category: z.string().optional(),
    meetingType: meetingTypeEnum.optional(),
    paymentStatus: paymentStatusEnum.optional(),
  }),
});

export const adminBookingsQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).default("1"),
    limit: z.string().regex(/^\d+$/).transform(Number).default("10"),
    status: bookingStatusEnum.optional(),
    search: z.string().optional(),
    sortBy: z.string().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    consultantId: z.string().optional(),
    category: z.string().optional(),
    meetingType: meetingTypeEnum.optional(),
    paymentStatus: paymentStatusEnum.optional(),
  }),
});

export const consultantSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).trim(),
    email: z.string().email("Please provide a valid email").toLowerCase().trim(),
    phone: z.string().max(30).trim().optional(),
    title: z.string().min(1).max(200).trim(),
    expertise: z.array(z.string().trim()).min(1, "At least one expertise is required"),
    bio: z.string().max(2000).trim().optional(),
    qualifications: z.array(z.string().trim()).optional(),
    workingDays: z.array(z.number().min(0).max(6)).optional(),
    workingHours: z.object({
      start: z.string(),
      end: z.string(),
    }).optional(),
    breakTime: z.object({
      start: z.string(),
      end: z.string(),
    }).optional(),
    timezone: z.string().optional(),
    maxDailyBookings: z.number().min(1).optional(),
    maxWeeklyBookings: z.number().min(1).optional(),
  }),
});

export const serviceSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200).trim(),
    slug: z.string().min(2).max(200).trim().optional(),
    category: z.string().min(1).max(100).trim(),
    description: z.string().min(10).max(2000).trim(),
    shortDescription: z.string().min(10).max(300).trim(),
    duration: z.number().min(15),
    price: z.number().min(0),
    currency: z.string().max(3).default("USD"),
    meetingTypes: z.array(z.enum(["virtual", "physical", "both"])).optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    sortOrder: z.number().optional(),
  }),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>["body"];
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>["body"];
export type AdminUpdateBookingInput = z.infer<typeof adminUpdateBookingSchema>["body"];
