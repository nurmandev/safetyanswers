import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authenticateUser } from "../middlewares/authenticate";

const router = Router();

router.use(authenticateUser);

router.get("/", NotificationController.getNotifications);
router.patch("/read-all", NotificationController.markAllAsRead);
router.patch("/:id/read", NotificationController.markAsRead);
router.delete("/all", NotificationController.deleteAllNotifications);
router.delete("/:id", NotificationController.deleteNotification);

export default router;
