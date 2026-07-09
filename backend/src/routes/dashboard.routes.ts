import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticateUser } from "../middlewares/authenticate";

const router = Router();

router.use(authenticateUser);

router.get("/", DashboardController.getDashboard);

export default router;
