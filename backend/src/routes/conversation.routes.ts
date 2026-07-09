import { Router } from "express";
import { ConversationController } from "../controllers/conversation.controller";
import { authenticateUser } from "../middlewares/authenticate";
import { authenticateAdmin } from "../middlewares/adminAuth";

const router = Router();

// ─── USER ROUTES ─────────────────────────────────
const userRouter = Router();
userRouter.use(authenticateUser);
userRouter.get("/conversations", ConversationController.getConversations);
userRouter.post("/conversations", ConversationController.getOrCreateConversation);
userRouter.get("/conversations/:conversationId", ConversationController.getMessages);
userRouter.post("/conversations/:conversationId/messages", ConversationController.sendMessage);
userRouter.patch("/conversations/:conversationId/read", ConversationController.markAsRead);
userRouter.patch("/conversations/:conversationId/archive", ConversationController.archiveConversation);
userRouter.patch("/conversations/:conversationId/unarchive", ConversationController.unarchiveConversation);
userRouter.delete("/messages/:messageId", ConversationController.deleteMessage);
userRouter.get("/unread", ConversationController.getUnreadCount);

// ─── ADMIN ROUTES ────────────────────────────────
const adminRouter = Router();
adminRouter.use(authenticateAdmin);
adminRouter.get("/admin/conversations", ConversationController.adminGetConversations);
adminRouter.post("/admin/conversations/:conversationId/messages", ConversationController.adminSendMessage);

router.use("/", userRouter);
router.use("/", adminRouter);

export default router;
