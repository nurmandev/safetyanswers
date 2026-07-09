import { Router } from "express";
import multer from "multer";
import path from "path";
import { ProfileController } from "../controllers/profile.controller";
import { authenticateUser } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import { updateProfileSchema, changePasswordSchema } from "../validators/dashboard.validator";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), "tmp")),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const uploadAvatar = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: PNG, JPEG, WEBP"));
    }
  },
});

router.use(authenticateUser);

router.get("/", ProfileController.getProfile);
router.patch("/", validate(updateProfileSchema), ProfileController.updateProfile);
router.post("/password", validate(changePasswordSchema), ProfileController.changePassword);
router.post("/avatar", uploadAvatar.single("avatar"), ProfileController.updateAvatar);
router.delete("/avatar", ProfileController.removeAvatar);

export default router;
