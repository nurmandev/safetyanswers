import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticateAdmin } from "../middlewares/adminAuth";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate";
import { adminLoginSchema } from "../validators/admin.validator";
import { adminRateLimiter } from "../middlewares/rateLimiter";
import { ROLES } from "../constants";

const router = Router();

router.post("/login", adminRateLimiter, validate(adminLoginSchema), AdminController.login);
router.post("/logout", AdminController.logout);
router.post("/refresh", AdminController.refresh);
router.get("/me", authenticateAdmin, AdminController.getMe);
router.post("/forgot-password", adminRateLimiter, AdminController.forgotPassword);
router.post("/reset-password", adminRateLimiter, AdminController.resetPassword);

router.get(
  "/super-only",
  authenticateAdmin,
  authorize(ROLES.SUPER_ADMIN),
  (req, res) => {
    res.json({ success: true, message: "Super admin access granted" });
  }
);

export default router;
