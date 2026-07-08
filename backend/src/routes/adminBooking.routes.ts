import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { authenticateAdmin } from "../middlewares/adminAuth";
import { validate } from "../middlewares/validate";
import {
  adminUpdateBookingSchema,
  assignConsultantSchema,
  updateNotesSchema,
  consultantSchema,
  serviceSchema,
} from "../validators/booking.validator";

const router = Router();

// All admin booking routes require authentication
router.use(authenticateAdmin);

// Booking management
router.get("/bookings", BookingController.adminGetBookings);
router.get("/bookings/:id", BookingController.adminGetBookingById);
router.patch(
  "/bookings/:id",
  validate(adminUpdateBookingSchema),
  BookingController.adminUpdateBooking
);
router.delete("/bookings/:id", BookingController.adminDeleteBooking);
router.patch("/bookings/:id/status", BookingController.adminUpdateStatus);
router.patch(
  "/bookings/:id/assign",
  validate(assignConsultantSchema),
  BookingController.adminAssignConsultant
);
router.patch(
  "/bookings/:id/notes",
  validate(updateNotesSchema),
  BookingController.adminUpdateNotes
);
router.post("/bookings/export", BookingController.adminExportBookings);

// Analytics
router.get("/analytics", BookingController.adminGetAnalytics);

// Consultant management
router.get("/consultants", BookingController.getConsultants);
router.get("/consultants/:id", BookingController.getConsultantById);
router.post(
  "/consultants",
  validate(consultantSchema),
  BookingController.createConsultant
);
router.patch(
  "/consultants/:id",
  validate(consultantSchema),
  BookingController.updateConsultant
);
router.delete("/consultants/:id", BookingController.deleteConsultant);

export default router;
