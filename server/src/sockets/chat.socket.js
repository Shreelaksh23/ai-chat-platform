import MessageService from "../services/MessageService.js";
import AIService from "../services/AIService.js";

const registerChatSocket = (io, socket) => {

    // ================= JOIN CHAT =================

    socket.on("join-chat", ({ chatId }) => {

        socket.join(`chat:${chatId}`);

        console.log(
            `User ${socket.user.email} joined chat ${chatId}`
        );

    });


    // ================= LEAVE CHAT =================

    socket.on("leave-chat", ({ chatId }) => {

        socket.leave(`chat:${chatId}`);

        console.log(
            `User ${socket.user.email} left chat ${chatId}`
        );

    });


    // ================= SEND MESSAGE =================

    socket.on("send-message", async ({ chatId, content }) => {

        try {

            console.log(
                `📩 Message received from ${socket.user.email}`
            );

            // ---------------------------------
            // 1. Validate input
            // ---------------------------------

            if (!chatId || !content?.trim()) {

                socket.emit("message-error", {
                    message: "Chat ID and message are required",
                });

                return;
            }


            // ---------------------------------
            // 2. Save USER message
            // ---------------------------------

            const userMessage =
                await MessageService.createMessage(
                    socket.user.id,
                    {
                        chatId,
                        role: "user",
                        content: content.trim(),
                    }
                );


            // ---------------------------------
            // 3. Send USER message to room
            // ---------------------------------

            io.to(`chat:${chatId}`).emit(
                "receive-message",
                userMessage
            );


            // ---------------------------------
            // 4. Tell frontend AI is thinking
            // ---------------------------------

            io.to(`chat:${chatId}`).emit(
                "ai-thinking",
                {
                    chatId,
                    thinking: true,
                }
            );


            // ---------------------------------
            // 5. Get conversation history
            // ---------------------------------

            const conversation =
                await MessageService.getMessages(
                    chatId,
                    socket.user.id
                );


            // ---------------------------------
            // 6. Generate AI response
            // ---------------------------------

            const aiResponse =
                await AIService.generateResponse(
                    conversation
                );


            // ---------------------------------
            // 7. Save AI message
            // ---------------------------------

            const assistantMessage =
                await MessageService.createMessage(
                    socket.user.id,
                    {
                        chatId,
                        role: "assistant",
                        content: aiResponse,
                    }
                );


            // ---------------------------------
            // 8. Send AI response to room
            // ---------------------------------

            io.to(`chat:${chatId}`).emit(
                "receive-message",
                assistantMessage
            );


            // ---------------------------------
            // 9. Stop AI thinking
            // ---------------------------------

            io.to(`chat:${chatId}`).emit(
                "ai-thinking",
                {
                    chatId,
                    thinking: false,
                }
            );


        } catch (error) {

            console.error(
                "❌ Send message error:",
                error
            );


            // Stop thinking
            io.to(`chat:${chatId}`).emit(
                "ai-thinking",
                {
                    chatId,
                    thinking: false,
                }
            );


            // Send safe error to frontend
            socket.emit("message-error", {
                message:
                    "Unable to generate AI response. Please try again.",
            });
        }
    });
};

export default registerChatSocket;