import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ChatService from "../services/ChatService.js";

const ChatController = {
    //create 
    createChat: asyncHandler(async (req, res) => {
        const chat = await ChatService.createChat(req.user.id, req.body);
        return res.status(201).json(
            new ApiResponse(201, "chat created successfully", chat)
        )
    }),
    //get all
    getChats: asyncHandler(async (req, res) => {
        const chats = await ChatService.getChats(req.user.id);
        return res.status(200).json(
            new ApiResponse(
                200,
                "Chats fetched successfully",
                chats
            )
        );
    }),
    // ================= GET ONE =================
    getChatById: asyncHandler(async (req, res) => {
        const chat = await ChatService.getChatById(
            req.params.chatId,
            req.user.id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Chat fetched successfully",
                chat
            )
        );
    }),

    // ================= UPDATE =================
    renameChat: asyncHandler(async (req, res) => {
        const chat = await ChatService.renameChat(
            req.params.chatId,
            req.user.id,
            req.body.title
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Chat renamed successfully",
                chat
            )
        );
    }),

    // ================= DELETE =================
    deleteChat: asyncHandler(async (req, res) => {
        await ChatService.deleteChat(
            req.params.chatId,
            req.user.id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Chat deleted successfully"
            )
        );
    }),
}

export default ChatController;