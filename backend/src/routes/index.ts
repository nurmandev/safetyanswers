import { Router } from "express";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";
import bookingRoutes from "./booking.routes";
import adminBookingRoutes from "./adminBooking.routes";
import premiumRoutes from "./premium.routes";
import adminPremiumRoutes from "./adminPremium.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/admin", adminBookingRoutes);
router.use("/admin", adminPremiumRoutes);
router.use("/user", userRoutes);
router.use("/bookings", bookingRoutes);
router.use("/premium", premiumRoutes);

export default router;
