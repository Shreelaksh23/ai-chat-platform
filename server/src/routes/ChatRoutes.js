import { Router } from "express";
import MessageController from "../controller/MessageController.js";

import ChatController from "../controller/ChatController.js"
import authMiddleware from "../middlewares/AuthMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", ChatController.createChat);

router.get("/", ChatController.getChats);

router.get("/:chatId", ChatController.getChatById);

router.patch("/:chatId", ChatController.renameChat);

router.delete("/:chatId", ChatController.deleteChat);
router.get(
    "/:chatId/messages",
    MessageController.getMessages
);


export default router;