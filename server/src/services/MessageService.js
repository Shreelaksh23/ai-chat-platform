import { Models } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const { Message, Chat } = Models;

const MessageService = {
    // ================= CREATE MESSAGE =================
    async createMessage(userId, data) {
        const { chatId, role, content } = data;

        const chat = await Chat.findOne({
            where: {
                id: chatId,
                userId,
            },
        });

        if (!chat) {
            throw new ApiError(404, "Chat not found");
        }

        const message = await Message.create({
            chatId,
            role,
            content,
            status: "sent",
        });

        return message;
    },

    // ================= GET CHAT HISTORY =================
    async getMessages(chatId, userId) {
        const chat = await Chat.findOne({
            where: {
                id: chatId,
                userId,
            },
        });

        if (!chat) {
            throw new ApiError(404, "Chat not found");
        }

        const messages = await Message.findAll({
            where: {
                chatId,
            },
            order: [["createdAt", "ASC"]],
        });

        return messages;
    },
};

export default MessageService;