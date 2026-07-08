import { Router } from "express";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";
import bookingRoutes from "./booking.routes";
import adminBookingRoutes from "./adminBooking.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/admin", adminBookingRoutes);
router.use("/user", userRoutes);
router.use("/bookings", bookingRoutes);

export default router;
