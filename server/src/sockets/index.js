import registerChatSocket from "./chat.socket.js";

const registerSocketEvents = (io) => {
    io.on("connection", (socket) => {

        console.log(`🟢 ${socket.user.email} Connected`);

        registerChatSocket(io, socket);

        socket.on("disconnect", () => {
            console.log(`🔴 ${socket.user.email} Disconnected`);
        });

    });
};

export default registerSocketEvents;