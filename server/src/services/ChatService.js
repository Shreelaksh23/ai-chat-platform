import { Models } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const { Chat } = Models;

const ChatService = {
    //create chat
    async createChat(userId, data) {
        const title = data.title?.trim() || "New Chat";
        const chat = await Chat.create({
            title,
            userId,
        });
        return chat;
    },
    //get all chats
    async getChats(userId) {
        const chats = await Models.Chat.findAll({
            where: {
                userId,
            },
            include: [
                {
                    model: Models.Message,
                    as: "messages",
                    attributes: [
                        "content",
                        "createdAt",
                    ],
                    limit: 1,
                    order: [["createdAt", "DESC"]],
                },
            ],
            order: [["updatedAt", "DESC"]],
        });
        return chats;
    },
    //get chat
    async getChatById(chatId, userId) {
        const chat = await Chat.findOne({
            where: {
                id: chatId,
                userId,
            },
        });
        if (!chat) {
            throw new ApiError(404, "chat not found");
        }
        return chat;
    },
    //rename chat
    async renameChat(chatId, userId, title) {
        const chat = await this.getChatById(chatId, userId);
        chat.title = title;
        if (!title?.trim()) {
            throw new ApiError(400, "Title is required");
        }
        await chat.save();
        return chat;
    },
    //delete chat
    async deleteChat(chatId, userId) {
        const chat = await this.getChatById(chatId, userId)
        chat.isArchived = true;
        await chat.save();
        return;
    },
    async resetUnread(chatId, userId) {
        const chat = await Chat.findOne({
            where: {
                id: chatId,
                userId,
            },
        });
        if (!chat) {
            throw new ApiError(404, "Chat not found");
        }
        await chat.update({
            unreadCount: 0,
        });
        return chat;
    }
}

export default ChatService;