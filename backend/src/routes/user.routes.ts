import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import { updateProfileSchema, changePasswordSchema } from "../validators/user.validator";

const router = Router();

router.use(authenticateUser);

router.get("/profile", UserController.getProfile);
router.patch("/profile", validate(updateProfileSchema), UserController.updateProfile);
router.post("/change-password", validate(changePasswordSchema), UserController.changePassword);

export default router;
