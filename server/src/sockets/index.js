import registerChatSocket from "./chat.socket.js";

const onlineUsers = new Map();

export default function registerSocketEvents(io) {

    io.on("connection", (socket) => {

        console.log(`🟢 ${socket.user.email} Connected`);

        // Store User
        onlineUsers.set(socket.user.id, socket.id);

        // Broadcast Online Users
        io.emit("online-users", Array.from(onlineUsers.keys()));

        registerChatSocket(io, socket);

        socket.on("disconnect", () => {

            console.log(`🔴 ${socket.user.email} Disconnected`);

            onlineUsers.delete(socket.user.id);

            io.emit("online-users", Array.from(onlineUsers.keys()));

        });

    });

}

// Export Map (needed later)
export { onlineUsers };