import { Booking, IBookingDocument } from "../models/Booking";
import { Consultant, IConsultantDocument } from "../models/Consultant";
import { Service, IServiceDocument } from "../models/Service";
import { AuditLog } from "../models/AuditLog";
import { Admin } from "../models/Admin";
import { EmailService } from "./email.service";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants";
import mongoose from "mongoose";

function generateBookingId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BK-${num}`;
}

async function logAudit(data: {
  action: string;
  entity: string;
  entityId: mongoose.Types.ObjectId;
  userId?: string;
  userType?: "user" | "admin";
  details?: Record<string, unknown>;
  ipAddress?: string;
}) {
  try {
    await AuditLog.create(data);
  } catch (error) {
    // Audit log failures should not break the main flow
  }
}

export const BookingService = {
  async createBooking(data: {
    userId?: string;
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;
    organization?: string;
    country?: string;
    service: string;
    category: string;
    title: string;
    description: string;
    preferredDate: string;
    preferredTime: string;
    timezone?: string;
    duration?: number;
    meetingType?: string;
    meetingLocation?: string;
    additionalNotes?: string;
    budget?: number;
    currency?: string;
  }) {
    let bookingId = generateBookingId();
    let exists = await Booking.findOne({ bookingId });
    while (exists) {
      bookingId = generateBookingId();
      exists = await Booking.findOne({ bookingId });
    }

    const preferredDate = new Date(data.preferredDate);
    if (preferredDate <= new Date()) {
      throw new AppError("Preferred date must be in the future", HTTP_STATUS.BAD_REQUEST);
    }

    const dayOfWeek = preferredDate.getDay();
    const consultant = await Consultant.findOne({
      isActive: true,
      isAvailable: true,
      workingDays: dayOfWeek,
    });

    if (consultant) {
      const todayStart = new Date(preferredDate);
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(preferredDate);
      todayEnd.setHours(23, 59, 59, 999);

      const todayBookings = await Booking.countDocuments({
        assignedConsultant: consultant._id,
        preferredDate: { $gte: todayStart, $lte: todayEnd },
        status: { $nin: ["cancelled", "rejected"] },
      });

      if (todayBookings >= consultant.maxDailyBookings) {
        throw new AppError("No available consultants for this date. Please try another date.", HTTP_STATUS.BAD_REQUEST);
      }
    }

    const booking = await Booking.create({
      bookingId,
      user: data.userId || undefined,
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      organization: data.organization,
      country: data.country,
      service: data.service,
      category: data.category,
      title: data.title,
      description: data.description,
      preferredDate,
      preferredTime: data.preferredTime,
      timezone: data.timezone || "UTC",
      duration: data.duration || 60,
      meetingType: data.meetingType || "virtual",
      meetingLocation: data.meetingLocation,
      additionalNotes: data.additionalNotes,
      amount: data.budget || 0,
      currency: data.currency || "USD",
      status: "pending",
      paymentStatus: data.budget ? "unpaid" : "unpaid",
      timeline: [
        {
          action: "Booking submitted",
          date: new Date(),
          by: data.name,
        },
      ],
    });

    await logAudit({
      action: "booking_created",
      entity: "Booking",
      entityId: booking._id,
      userId: data.userId,
      userType: "user",
      details: { bookingId, service: data.service, name: data.name },
    });

    EmailService.sendBookingSubmitted({
      email: data.email,
      name: data.name,
      bookingId,
      service: data.service,
      date: preferredDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: data.preferredTime,
    }).catch(() => {});

    const admins = await Admin.find({ role: { $in: ["admin", "super_admin"] } });
    for (const admin of admins) {
      EmailService.sendAdminNewBooking({
        email: admin.email,
        bookingId,
        name: data.name,
        service: data.service,
        date: preferredDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }).catch(() => {});
    }

    return booking;
  },

  async getBookingById(bookingId: string, userId?: string) {
    const query: Record<string, unknown> = { bookingId };
    if (userId) {
      query.user = userId;
    }

    const booking = await Booking.findOne(query)
      .populate("assignedConsultant", "name email title expertise")
      .populate("user", "name email phone");

    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    return booking;
  },

  async getUserBookings(userId: string, query: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { user: userId };

    if (query.status) {
      filter.status = query.status;
    }

    if (query.search) {
      filter.$or = [
        { bookingId: { $regex: query.search, $options: "i" } },
        { service: { $regex: query.search, $options: "i" } },
        { title: { $regex: query.search, $options: "i" } },
      ];
    }

    const sort: Record<string, 1 | -1> = {};
    const sortField = query.sortBy || "createdAt";
    sort[sortField] = query.sortOrder === "asc" ? 1 : -1;

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("assignedConsultant", "name email title")
        .lean(),
      Booking.countDocuments(filter),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async updateBooking(bookingId: string, userId: string, data: Record<string, unknown>) {
    const booking = await Booking.findOne({ bookingId, user: userId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    if (!["pending", "awaiting_review", "rescheduled"].includes(booking.status)) {
      throw new AppError("This booking cannot be updated in its current status", HTTP_STATUS.BAD_REQUEST);
    }

    const allowedUpdates = [
      "phone", "whatsapp", "organization", "country",
      "title", "description", "preferredDate", "preferredTime",
      "timezone", "duration", "meetingType", "meetingLocation", "additionalNotes",
    ];

    const updates: Record<string, unknown> = {};
    for (const key of allowedUpdates) {
      if (data[key] !== undefined) {
        updates[key] = data[key];
      }
    }

    if (updates.preferredDate) {
      updates.preferredDate = new Date(updates.preferredDate as string);
      if ((updates.preferredDate as Date) <= new Date()) {
        throw new AppError("Preferred date must be in the future", HTTP_STATUS.BAD_REQUEST);
      }
    }

    updates.$push = {
      timeline: {
        action: "Booking updated by client",
        date: new Date(),
        by: booking.name,
      },
    };

    const updated = await Booking.findOneAndUpdate(
      { bookingId, user: userId },
      { $set: updates, $push: { timeline: { action: "Booking updated by client", date: new Date(), by: booking.name } } },
      { new: true, runValidators: true }
    );

    await logAudit({
      action: "booking_updated",
      entity: "Booking",
      entityId: booking._id,
      userId,
      userType: "user",
      details: { bookingId, updates: Object.keys(updates) },
    });

    return updated;
  },

  async cancelBooking(bookingId: string, userId: string, reason?: string) {
    const booking = await Booking.findOne({ bookingId, user: userId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    if (["completed", "cancelled", "rejected"].includes(booking.status)) {
      throw new AppError("This booking cannot be cancelled in its current status", HTTP_STATUS.BAD_REQUEST);
    }

    booking.status = "cancelled";
    booking.cancellationReason = reason;
    booking.timeline.push({
      action: `Booking cancelled${reason ? `: ${reason}` : ""}`,
      date: new Date(),
      by: booking.name,
    });
    await booking.save();

    await logAudit({
      action: "booking_cancelled",
      entity: "Booking",
      entityId: booking._id,
      userId,
      userType: "user",
      details: { bookingId, reason },
    });

    EmailService.sendBookingCancelled({
      email: booking.email,
      name: booking.name,
      bookingId,
      service: booking.service,
      reason,
    }).catch(() => {});

    return booking;
  },

  async rescheduleBooking(bookingId: string, userId: string, data: {
    preferredDate: string;
    preferredTime: string;
    reason?: string;
  }) {
    const booking = await Booking.findOne({ bookingId, user: userId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    if (!["approved", "confirmed", "scheduled"].includes(booking.status)) {
      throw new AppError("This booking cannot be rescheduled in its current status", HTTP_STATUS.BAD_REQUEST);
    }

    const newDate = new Date(data.preferredDate);
    if (newDate <= new Date()) {
      throw new AppError("Preferred date must be in the future", HTTP_STATUS.BAD_REQUEST);
    }

    booking.preferredDate = newDate;
    booking.preferredTime = data.preferredTime;
    booking.status = "rescheduled";
    booking.timeline.push({
      action: `Booking rescheduled to ${newDate.toLocaleDateString()} at ${data.preferredTime}${data.reason ? `: ${data.reason}` : ""}`,
      date: new Date(),
      by: booking.name,
    });
    await booking.save();

    await logAudit({
      action: "booking_rescheduled",
      entity: "Booking",
      entityId: booking._id,
      userId,
      userType: "user",
      details: { bookingId, newDate: data.preferredDate, newTime: data.preferredTime },
    });

    EmailService.sendBookingRescheduled({
      email: booking.email,
      name: booking.name,
      bookingId,
      service: booking.service,
      newDate: newDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      newTime: data.preferredTime,
    }).catch(() => {});

    return booking;
  },

  async getAvailability(query: { date?: string; consultantId?: string; serviceId?: string }) {
    const result: {
      availableDates: string[];
      availableSlots: string[];
      consultants: Array<{ _id: string; name: string; title: string; expertise: string[] }>;
    } = {
      availableDates: [],
      availableSlots: [],
      consultants: [],
    };

    const consultantFilter: Record<string, unknown> = { isActive: true, isAvailable: true };
    if (query.consultantId) {
      consultantFilter._id = query.consultantId;
    }

    const consultants = await Consultant.find(consultantFilter)
      .select("name title expertise workingDays workingHours breakTime maxDailyBookings")
      .lean();

    result.consultants = consultants.map((c) => ({
      _id: c._id.toString(),
      name: c.name,
      title: c.title,
      expertise: c.expertise,
    }));

    const now = new Date();
    const next30Days: string[] = [];
    for (let i = 1; i <= 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();

      const hasAvailableConsultant = consultants.some(
        (c) => c.workingDays.includes(dayOfWeek)
      );

      if (hasAvailableConsultant) {
        next30Days.push(date.toISOString().split("T")[0]);
      }
    }
    result.availableDates = next30Days;

    if (query.date) {
      const targetDate = new Date(query.date);
      const dayOfWeek = targetDate.getDay();
      const availableConsultants = consultants.filter(
        (c) => c.workingDays.includes(dayOfWeek)
      );

      const slots: string[] = [];
      for (const consultant of availableConsultants) {
        const [startHour, startMin] = consultant.workingHours.start.split(":").map(Number);
        const [endHour, endMin] = consultant.workingHours.end.split(":").map(Number);
        const [breakStartH, breakStartM] = consultant.breakTime.start.split(":").map(Number);
        const [breakEndH, breakEndM] = consultant.breakTime.end.split(":").map(Number);

        let hour = startHour;
        let min = startMin;
        while (hour < endHour || (hour === endHour && min < endMin)) {
          const breakStart = breakStartH * 60 + breakStartM;
          const breakEnd = breakEndH * 60 + breakEndM;
          const currentMinutes = hour * 60 + min;

          if (currentMinutes < breakStart || currentMinutes >= breakEnd) {
            const timeStr = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
            if (!slots.includes(timeStr)) {
              slots.push(timeStr);
            }
          }

          min += 30;
          if (min >= 60) {
            hour += 1;
            min = 0;
          }
        }
      }
      result.availableSlots = slots.sort();
    }

    return result;
  },

  async getServices() {
    return Service.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  },

  // Admin methods
  async adminGetBookings(query: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    startDate?: string;
    endDate?: string;
    consultantId?: string;
    category?: string;
    meetingType?: string;
    paymentStatus?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.consultantId) {
      filter.assignedConsultant = query.consultantId;
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.meetingType) {
      filter.meetingType = query.meetingType;
    }

    if (query.paymentStatus) {
      filter.paymentStatus = query.paymentStatus;
    }

    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) {
        (filter.createdAt as Record<string, Date>).$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        (filter.createdAt as Record<string, Date>).$lte = new Date(query.endDate);
      }
    }

    if (query.search) {
      filter.$or = [
        { bookingId: { $regex: query.search, $options: "i" } },
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
        { phone: { $regex: query.search, $options: "i" } },
        { service: { $regex: query.search, $options: "i" } },
        { title: { $regex: query.search, $options: "i" } },
        { organization: { $regex: query.search, $options: "i" } },
      ];
    }

    const sort: Record<string, 1 | -1> = {};
    const sortField = query.sortBy || "createdAt";
    sort[sortField] = query.sortOrder === "asc" ? 1 : -1;

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("assignedConsultant", "name email title expertise")
        .populate("user", "name email")
        .lean(),
      Booking.countDocuments(filter),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async adminGetBookingById(bookingId: string) {
    const booking = await Booking.findOne({ bookingId })
      .populate("assignedConsultant", "name email title expertise phone")
      .populate("user", "name email phone");

    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    return booking;
  },

  async adminUpdateBooking(bookingId: string, adminId: string, data: Record<string, unknown>) {
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    const oldStatus = booking.status;

    const allowedUpdates = [
      "status", "paymentStatus", "amount", "currency",
      "assignedConsultant", "internalNotes", "adminNotes",
      "googleMeetLink", "zoomLink", "microsoftTeamsLink",
      "meetingLocation", "cancellationReason", "preferredDate", "preferredTime",
    ];

    for (const key of allowedUpdates) {
      if (data[key] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (booking as any)[key] = data[key];
      }
    }

    if (data.preferredDate) {
      booking.preferredDate = new Date(data.preferredDate as string);
    }

    const timelineEntry: { action: string; date: Date; by?: string } = {
      action: `Booking updated by admin`,
      date: new Date(),
      by: adminId,
    };

    if (data.status && data.status !== oldStatus) {
      const admin = await Admin.findById(adminId);
      const statusLabels: Record<string, string> = {
        pending: "Pending",
        awaiting_review: "Awaiting Review",
        approved: "Approved",
        confirmed: "Confirmed",
        scheduled: "Scheduled",
        rescheduled: "Rescheduled",
        completed: "Completed",
        cancelled: "Cancelled",
        rejected: "Rejected",
        no_show: "No Show",
      };
      timelineEntry.action = `Status changed from ${statusLabels[oldStatus] || oldStatus} to ${statusLabels[data.status as string] || data.status} by ${admin?.name || "Admin"}`;

      if (data.status === "approved") {
        EmailService.sendBookingApproved({
          email: booking.email,
          name: booking.name,
          bookingId,
          service: booking.service,
          date: booking.preferredDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: booking.preferredTime,
          meetingType: booking.meetingType,
          meetingLink: booking.googleMeetLink || booking.zoomLink || booking.microsoftTeamsLink,
        }).catch(() => {});
      } else if (data.status === "rejected") {
        EmailService.sendBookingRejected({
          email: booking.email,
          name: booking.name,
          bookingId,
          service: booking.service,
          reason: data.cancellationReason as string,
        }).catch(() => {});
      } else if (data.status === "cancelled") {
        EmailService.sendBookingCancelled({
          email: booking.email,
          name: booking.name,
          bookingId,
          service: booking.service,
          reason: data.cancellationReason as string,
        }).catch(() => {});
      } else if (data.status === "completed") {
        EmailService.sendBookingCompleted({
          email: booking.email,
          name: booking.name,
          bookingId,
          service: booking.service,
        }).catch(() => {});
      } else if (data.status === "rescheduled" && data.preferredDate && data.preferredTime) {
        EmailService.sendBookingRescheduled({
          email: booking.email,
          name: booking.name,
          bookingId,
          service: booking.service,
          newDate: new Date(data.preferredDate as string).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          newTime: data.preferredTime as string,
        }).catch(() => {});
      }
    }

    booking.timeline.push(timelineEntry);
    await booking.save();

    await logAudit({
      action: "booking_updated_by_admin",
      entity: "Booking",
      entityId: booking._id,
      userId: adminId,
      userType: "admin",
      details: { bookingId, updates: Object.keys(data) },
    });

    return booking;
  },

  async adminDeleteBooking(bookingId: string, adminId: string) {
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    await Booking.findByIdAndDelete(booking._id);

    await logAudit({
      action: "booking_deleted",
      entity: "Booking",
      entityId: booking._id,
      userId: adminId,
      userType: "admin",
      details: { bookingId },
    });

    return { message: "Booking deleted successfully" };
  },

  async adminUpdateStatus(bookingId: string, adminId: string, status: string, reason?: string) {
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    const oldStatus = booking.status;
    booking.status = status as IBookingDocument["status"];

    if (reason) {
      booking.cancellationReason = reason;
    }

    const admin = await Admin.findById(adminId);
    const statusLabels: Record<string, string> = {
      pending: "Pending",
      awaiting_review: "Awaiting Review",
      approved: "Approved",
      confirmed: "Confirmed",
      scheduled: "Scheduled",
      rescheduled: "Rescheduled",
      completed: "Completed",
      cancelled: "Cancelled",
      rejected: "Rejected",
      no_show: "No Show",
    };

    booking.timeline.push({
      action: `Status changed from ${statusLabels[oldStatus] || oldStatus} to ${statusLabels[status] || status} by ${admin?.name || "Admin"}`,
      date: new Date(),
      by: adminId,
    });

    await booking.save();

    const emailData = {
      email: booking.email,
      name: booking.name,
      bookingId,
      service: booking.service,
    };

    if (status === "approved") {
      EmailService.sendBookingApproved({
        ...emailData,
        date: booking.preferredDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: booking.preferredTime,
        meetingType: booking.meetingType,
        meetingLink: booking.googleMeetLink || booking.zoomLink || booking.microsoftTeamsLink,
      }).catch(() => {});
    } else if (status === "rejected") {
      EmailService.sendBookingRejected({ ...emailData, reason }).catch(() => {});
    } else if (status === "cancelled") {
      EmailService.sendBookingCancelled({ ...emailData, reason }).catch(() => {});
    } else if (status === "completed") {
      EmailService.sendBookingCompleted(emailData).catch(() => {});
    }

    await logAudit({
      action: `booking_${status}`,
      entity: "Booking",
      entityId: booking._id,
      userId: adminId,
      userType: "admin",
      details: { bookingId, oldStatus, newStatus: status },
    });

    return booking;
  },

  async adminAssignConsultant(bookingId: string, adminId: string, consultantId: string) {
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    const consultant = await Consultant.findById(consultantId);
    if (!consultant) {
      throw new AppError("Consultant not found", HTTP_STATUS.NOT_FOUND);
    }

    booking.assignedConsultant = consultant._id;
    if (booking.status === "pending" || booking.status === "awaiting_review") {
      booking.status = "approved";
    }

    const admin = await Admin.findById(adminId);
    booking.timeline.push({
      action: `Consultant ${consultant.name} assigned by ${admin?.name || "Admin"}`,
      date: new Date(),
      by: adminId,
    });

    await booking.save();

    await logAudit({
      action: "consultant_assigned",
      entity: "Booking",
      entityId: booking._id,
      userId: adminId,
      userType: "admin",
      details: { bookingId, consultantId, consultantName: consultant.name },
    });

    EmailService.sendBookingApproved({
      email: booking.email,
      name: booking.name,
      bookingId,
      service: booking.service,
      date: booking.preferredDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: booking.preferredTime,
      consultant: consultant.name,
      meetingType: booking.meetingType,
      meetingLink: booking.googleMeetLink || booking.zoomLink || booking.microsoftTeamsLink,
    }).catch(() => {});

    return booking;
  },

  async adminUpdateNotes(bookingId: string, adminId: string, data: {
    internalNotes?: string;
    adminNotes?: string;
  }) {
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    if (data.internalNotes !== undefined) {
      booking.internalNotes = data.internalNotes;
    }
    if (data.adminNotes !== undefined) {
      booking.adminNotes = data.adminNotes;
    }

    const admin = await Admin.findById(adminId);
    booking.timeline.push({
      action: `Notes updated by ${admin?.name || "Admin"}`,
      date: new Date(),
      by: adminId,
    });

    await booking.save();

    return booking;
  },

  async adminExportBookings(query: {
    startDate?: string;
    endDate?: string;
    status?: string;
    format?: string;
  }) {
    const filter: Record<string, unknown> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) {
        (filter.createdAt as Record<string, Date>).$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        (filter.createdAt as Record<string, Date>).$lte = new Date(query.endDate);
      }
    }

    const bookings = await Booking.find(filter)
      .populate("assignedConsultant", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return bookings;
  },

  async adminGetAnalytics() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [
      totalBookings,
      pendingBookings,
      approvedBookings,
      completedBookings,
      cancelledBookings,
      rejectedBookings,
      monthlyBookings,
      weeklyBookings,
      todayBookings,
      statusDistribution,
      categoryDistribution,
      monthlyRevenue,
      upcomingBookings,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: { $in: ["approved", "confirmed", "scheduled"] } }),
      Booking.countDocuments({ status: "completed" }),
      Booking.countDocuments({ status: "cancelled" }),
      Booking.countDocuments({ status: "rejected" }),
      Booking.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.countDocuments({ createdAt: { $gte: startOfWeek } }),
      Booking.countDocuments({
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        },
      }),
      Booking.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Booking.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Booking.aggregate([
        { $match: { createdAt: { $gte: startOfMonth }, amount: { $gt: 0 } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Booking.find({
        preferredDate: { $gte: now },
        status: { $in: ["approved", "confirmed", "scheduled"] },
      })
        .sort({ preferredDate: 1 })
        .limit(10)
        .populate("assignedConsultant", "name title")
        .lean(),
    ]);

    const monthlyRevenueTotal = monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0;

    return {
      totalBookings,
      pendingBookings,
      approvedBookings,
      completedBookings,
      cancelledBookings,
      rejectedBookings,
      monthlyBookings,
      weeklyBookings,
      todayBookings,
      monthlyRevenue: monthlyRevenueTotal,
      statusDistribution: statusDistribution.map((s: { _id: string; count: number }) => ({
        status: s._id,
        count: s.count,
      })),
      categoryDistribution: categoryDistribution.map((c: { _id: string; count: number }) => ({
        category: c._id,
        count: c.count,
      })),
      upcomingBookings,
    };
  },

  // Consultant management
  async createConsultant(data: Record<string, unknown>) {
    const existing = await Consultant.findOne({ email: data.email });
    if (existing) {
      throw new AppError("A consultant with this email already exists", HTTP_STATUS.CONFLICT);
    }

    return Consultant.create(data);
  },

  async updateConsultant(id: string, data: Record<string, unknown>) {
    const consultant = await Consultant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!consultant) {
      throw new AppError("Consultant not found", HTTP_STATUS.NOT_FOUND);
    }

    return consultant;
  },

  async deleteConsultant(id: string) {
    const consultant = await Consultant.findById(id);
    if (!consultant) {
      throw new AppError("Consultant not found", HTTP_STATUS.NOT_FOUND);
    }

    const activeBookings = await Booking.countDocuments({
      assignedConsultant: id,
      status: { $in: ["pending", "approved", "confirmed", "scheduled"] },
    });

    if (activeBookings > 0) {
      throw new AppError(
        "Cannot delete consultant with active bookings",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await Consultant.findByIdAndDelete(id);
    return { message: "Consultant deleted successfully" };
  },

  async getConsultants(query?: { isActive?: boolean }) {
    const filter: Record<string, unknown> = {};
    if (query?.isActive !== undefined) {
      filter.isActive = query.isActive;
    }
    return Consultant.find(filter).sort({ name: 1 }).lean();
  },

  async getConsultantById(id: string) {
    const consultant = await Consultant.findById(id).lean();
    if (!consultant) {
      throw new AppError("Consultant not found", HTTP_STATUS.NOT_FOUND);
    }
    return consultant;
  },
};
