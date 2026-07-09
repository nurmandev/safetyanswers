import { Router } from "express";
import { SettingsController } from "../controllers/settings.controller";
import { authenticateUser } from "../middlewares/authenticate";

const router = Router();

router.use(authenticateUser);

router.get("/", SettingsController.getSettings);
router.patch("/notifications", SettingsController.updateNotificationPreferences);
router.patch("/privacy", SettingsController.updatePrivacySettings);
router.patch("/general", SettingsController.updateGeneral);
router.delete("/account", SettingsController.deleteAccount);

export default router;
