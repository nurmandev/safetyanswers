import { Router } from "express";
import { PremiumController } from "../controllers/premium.controller";
import { authenticateAdmin } from "../middlewares/adminAuth";
import { validate } from "../middlewares/validate";
import {
  createPremiumArticleSchema,
  updatePremiumArticleSchema,
  categorySchema,
} from "../validators/premium.validator";

const router = Router();

router.use(authenticateAdmin);

// Article management
router.get("/premium/articles", PremiumController.adminGetArticles);
router.get("/premium/articles/:id", PremiumController.adminGetArticleById);
router.post(
  "/premium/articles",
  validate(createPremiumArticleSchema),
  PremiumController.adminCreateArticle
);
router.patch(
  "/premium/articles/:id",
  validate(updatePremiumArticleSchema),
  PremiumController.adminUpdateArticle
);
router.delete("/premium/articles/:id", PremiumController.adminDeleteArticle);

// Purchases
router.get("/premium/purchases", PremiumController.adminGetPurchases);

// Analytics
router.get("/premium/analytics", PremiumController.adminGetAnalytics);

// Categories
router.post(
  "/premium/categories",
  validate(categorySchema),
  PremiumController.adminCreateCategory
);
router.patch(
  "/premium/categories/:id",
  validate(categorySchema),
  PremiumController.adminUpdateCategory
);
router.delete("/premium/categories/:id", PremiumController.adminDeleteCategory);

// Download logs
router.get("/premium/downloads", PremiumController.adminGetDownloadLogs);

export default router;
