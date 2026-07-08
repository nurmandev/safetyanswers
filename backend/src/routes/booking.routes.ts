import { Router } from "express";
import multer from "multer";
import path from "path";
import { BookingController } from "../controllers/booking.controller";
import { authenticateUser } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadFile } from "../utils/cloudinary";
import {
  createBookingSchema,
  updateBookingSchema,
  rescheduleSchema,
} from "../validators/booking.validator";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), "tmp")),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/jpg",
];
const MAX_SIZE = 100 * 1024 * 1024; // 100MB

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: PDF, DOC, DOCX, PNG, JPEG"));
    }
  },
});

// Public routes
router.post(
  "/",
  validate(createBookingSchema),
  BookingController.createBooking
);
router.get("/availability", BookingController.getAvailability);
router.get("/services", BookingController.getServices);

// File upload route
router.post(
  "/upload",
  authenticateUser,
  upload.array("files", 10),
  async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        ApiResponse.error(res, "No files uploaded", 400);
        return;
      }

      const uploaded = await Promise.all(
        files.map(async (file) => {
          const result = await uploadFile(file.path, "bookings/documents");
          return {
            name: file.originalname,
            url: result.url,
            publicId: result.publicId,
            type: result.type,
            size: result.size,
          };
        })
      );

      ApiResponse.success(res, { files: uploaded }, "Files uploaded successfully");
    } catch (error) {
      ApiResponse.error(res, "Failed to upload files", 500);
    }
  }
);

// Authenticated user routes
router.get("/", authenticateUser, BookingController.getUserBookings);
router.get("/:id", authenticateUser, BookingController.getBookingById);
router.patch(
  "/:id",
  authenticateUser,
  validate(updateBookingSchema),
  BookingController.updateBooking
);
router.delete("/:id", authenticateUser, BookingController.cancelBooking);
router.post(
  "/:id/reschedule",
  authenticateUser,
  validate(rescheduleSchema),
  BookingController.rescheduleBooking
);

export default router;
