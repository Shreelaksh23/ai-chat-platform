import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import MessageService from "../services/MessageService.js";

const MessageController = {
    getMessages: asyncHandler(async (req, res) => {
        const messages = await MessageService.getMessages(
            req.params.chatId,
            req.user.id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Messages fetched successfully",
                messages
            )
        );
    }),
};

export default MessageController;