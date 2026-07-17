import MessageService from "../services/MessageService.js";

const registerChatSocket = (io, socket) => {
    console.log(`💬 Chat Socket Initialized for ${socket.user.email}`);

    socket.on("join-chat", ({ chatId }) => {
        const room = `chat_${chatId}`;

        socket.join(room);

        console.log(`${socket.user.email} joined ${room}`);
    });

    socket.on("leave-chat", ({ chatId }) => {
        socket.leave(`chat_${chatId}`);
    });

    socket.on("send-message", async (payload) => {
        try {
            const message = await MessageService.createMessage(
                socket.user.id,
                {
                    chatId: payload.chatId,
                    role: "user",
                    content: payload.content,
                }
            );

            io.to(`chat_${payload.chatId}`).emit(
                "receive-message",
                message
            );
        } catch (error) {
            socket.emit("message-error", {
                message: error.message,
            });
        }
    });
};

export default registerChatSocket;