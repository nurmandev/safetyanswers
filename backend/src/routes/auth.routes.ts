import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticateUser } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema,
} from "../validators/auth.validator";
import { authRateLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/register", authRateLimiter, validate(registerSchema), AuthController.register);
router.post("/login", authRateLimiter, validate(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/refresh", AuthController.refresh);
router.get("/me", authenticateUser, AuthController.getMe);
router.get("/verify-email", AuthController.verifyEmail);
router.post("/resend-verification", validate(resendVerificationSchema), AuthController.resendVerification);
router.post("/forgot-password", authRateLimiter, validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/reset-password", authRateLimiter, validate(resetPasswordSchema), AuthController.resetPassword);

export default router;
