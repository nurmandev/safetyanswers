import { Router } from "express";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";
import bookingRoutes from "./booking.routes";
import adminBookingRoutes from "./adminBooking.routes";
import premiumRoutes from "./premium.routes";
import adminPremiumRoutes from "./adminPremium.routes";
import dashboardRoutes from "./dashboard.routes";
import profileRoutes from "./profile.routes";
import notificationRoutes from "./notification.routes";
import settingsRoutes from "./settings.routes";
import supportRoutes from "./support.routes";
import conversationRoutes from "./conversation.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/admin", adminBookingRoutes);
router.use("/admin", adminPremiumRoutes);
router.use("/user", userRoutes);
router.use("/bookings", bookingRoutes);
router.use("/premium", premiumRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/profile", profileRoutes);
router.use("/notifications", notificationRoutes);
router.use("/settings", settingsRoutes);
router.use("/support", supportRoutes);
router.use("/messages", conversationRoutes);

export default router;
