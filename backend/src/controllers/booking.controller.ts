import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types";

export const BookingController = {
  // Public
  createBooking: asyncHandler(async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    const booking = await BookingService.createBooking({
      userId: authReq.user?.id,
      ...req.body,
    });

    ApiResponse.created(res, { booking }, "Booking submitted successfully");
  }),

  getAvailability: asyncHandler(async (req: Request, res: Response) => {
    const availability = await BookingService.getAvailability(req.query as Record<string, string>);
    ApiResponse.success(res, availability);
  }),

  getServices: asyncHandler(async (req: Request, res: Response) => {
    const services = await BookingService.getServices();
    ApiResponse.success(res, { services });
  }),

  // Authenticated user
  getUserBookings: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await BookingService.getUserBookings(req.user!.id, {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      status: req.query.status as string,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
    });

    ApiResponse.success(res, result);
  }),

  getBookingById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.getBookingById(
      id,
      req.user!.id
    );
    ApiResponse.success(res, { booking });
  }),

  updateBooking: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.updateBooking(
      id,
      req.user!.id,
      req.body
    );
    ApiResponse.success(res, { booking }, "Booking updated successfully");
  }),

  cancelBooking: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.cancelBooking(
      id,
      req.user!.id,
      req.body.reason
    );
    ApiResponse.success(res, { booking }, "Booking cancelled successfully");
  }),

  rescheduleBooking: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.rescheduleBooking(
      id,
      req.user!.id,
      req.body
    );
    ApiResponse.success(res, { booking }, "Reschedule request submitted successfully");
  }),

  // Admin
  adminGetBookings: asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await BookingService.adminGetBookings({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      status: req.query.status as string,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      consultantId: req.query.consultantId as string,
      category: req.query.category as string,
      meetingType: req.query.meetingType as string,
      paymentStatus: req.query.paymentStatus as string,
    });

    ApiResponse.success(res, result);
  }),

  adminGetBookingById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.adminGetBookingById(id);
    ApiResponse.success(res, { booking });
  }),

  adminUpdateBooking: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.adminUpdateBooking(
      id,
      req.user!.id,
      req.body
    );
    ApiResponse.success(res, { booking }, "Booking updated successfully");
  }),

  adminDeleteBooking: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const result = await BookingService.adminDeleteBooking(
      id,
      req.user!.id
    );
    ApiResponse.success(res, result);
  }),

  adminUpdateStatus: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.adminUpdateStatus(
      id,
      req.user!.id,
      req.body.status,
      req.body.reason
    );
    ApiResponse.success(res, { booking }, "Booking status updated successfully");
  }),

  adminAssignConsultant: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.adminAssignConsultant(
      id,
      req.user!.id,
      req.body.consultantId
    );
    ApiResponse.success(res, { booking }, "Consultant assigned successfully");
  }),

  adminUpdateNotes: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const booking = await BookingService.adminUpdateNotes(
      id,
      req.user!.id,
      req.body
    );
    ApiResponse.success(res, { booking }, "Notes updated successfully");
  }),

  adminExportBookings: asyncHandler(async (req: AuthRequest, res: Response) => {
    const bookings = await BookingService.adminExportBookings(req.body);
    ApiResponse.success(res, { bookings });
  }),

  adminGetAnalytics: asyncHandler(async (req: AuthRequest, res: Response) => {
    const analytics = await BookingService.adminGetAnalytics();
    ApiResponse.success(res, analytics);
  }),

  // Consultant management
  createConsultant: asyncHandler(async (req: AuthRequest, res: Response) => {
    const consultant = await BookingService.createConsultant(req.body);
    ApiResponse.created(res, { consultant }, "Consultant created successfully");
  }),

  updateConsultant: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const consultant = await BookingService.updateConsultant(id, req.body);
    ApiResponse.success(res, { consultant }, "Consultant updated successfully");
  }),

  deleteConsultant: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const result = await BookingService.deleteConsultant(id);
    ApiResponse.success(res, result);
  }),

  getConsultants: asyncHandler(async (req: AuthRequest, res: Response) => {
    const consultants = await BookingService.getConsultants({
      isActive: req.query.isActive !== undefined
        ? req.query.isActive === "true"
        : undefined,
    });
    ApiResponse.success(res, { consultants });
  }),

  getConsultantById: asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const consultant = await BookingService.getConsultantById(id);
    ApiResponse.success(res, { consultant });
  }),
};
