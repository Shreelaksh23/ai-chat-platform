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
            status: "sending",
        });

        try {

            // Auto rename chat
            if (
                role === "user" &&
                chat.title === "New Chat"
            ) {

                await chat.update({
                    title:
                        content.length > 30
                            ? content.substring(0, 30) + "..."
                            : content,
                });

            }

            await chat.increment("unreadCount");

            await chat.update({
                updatedAt: new Date(),
            });

            await message.update({
                status: "sent",
            });

            return await message.reload();

        } catch (error) {

            await message.update({
                status: "failed",
            });

            throw error;
        }
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


    // ================= GET MESSAGES FOR AI =================
    async getMessagesForAI(chatId) {

        const messages = await Message.findAll({
            where: {
                chatId,
            },
            attributes: [
                "role",
                "content",
                "createdAt",
            ],
            order: [["createdAt", "ASC"]],
        });

        return messages;
    },

};

export default MessageService;