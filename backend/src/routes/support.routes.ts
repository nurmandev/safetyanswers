import { Router } from "express";
import { SupportController } from "../controllers/support.controller";
import { authenticateUser } from "../middlewares/authenticate";
import { authenticateAdmin } from "../middlewares/adminAuth";

const router = Router();

// ─── USER ROUTES ─────────────────────────────────
const userRouter = Router();
userRouter.use(authenticateUser);
userRouter.post("/tickets", SupportController.createTicket);
userRouter.get("/tickets", SupportController.getTickets);
userRouter.get("/tickets/:ticketId", SupportController.getTicketById);
userRouter.post("/tickets/:ticketId/replies", SupportController.addReply);
userRouter.get("/faqs", SupportController.getFAQs);
userRouter.get("/categories", SupportController.getCategories);

// ─── ADMIN ROUTES ────────────────────────────────
const adminRouter = Router();
adminRouter.use(authenticateAdmin);
adminRouter.get("/admin/tickets", SupportController.adminGetAllTickets);
adminRouter.post("/admin/tickets/:ticketId/replies", SupportController.adminReplyToTicket);
adminRouter.patch("/admin/tickets/:ticketId/assign", SupportController.adminAssignTicket);
adminRouter.patch("/admin/tickets/:ticketId/status", SupportController.adminUpdateTicketStatus);
adminRouter.post("/admin/faqs", SupportController.adminCreateFAQ);
adminRouter.put("/admin/faqs/:id", SupportController.adminUpdateFAQ);
adminRouter.delete("/admin/faqs/:id", SupportController.adminDeleteFAQ);
adminRouter.post("/admin/categories", SupportController.adminCreateCategory);
adminRouter.put("/admin/categories/:id", SupportController.adminUpdateCategory);
adminRouter.delete("/admin/categories/:id", SupportController.adminDeleteCategory);

router.use("/", userRouter);
router.use("/", adminRouter);

export default router;
