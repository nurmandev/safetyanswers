import { Router } from "express";
import { PremiumController } from "../controllers/premium.controller";
import { authenticateUser } from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import { createPremiumArticleSchema } from "../validators/premium.validator";

const router = Router();

// Public routes
router.get("/articles", PremiumController.getArticles);
router.get("/articles/:slug", PremiumController.getArticleDetail);
router.get("/categories", PremiumController.getCategories);

// Authenticated user routes
router.post("/articles/:id/purchase", authenticateUser, PremiumController.purchaseArticle);
router.get("/purchases", authenticateUser, PremiumController.getUserPurchases);
router.get("/articles/:slug/download", authenticateUser, PremiumController.downloadArticle);

export default router;
