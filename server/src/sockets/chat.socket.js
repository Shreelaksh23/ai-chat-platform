const registerChatSocket = (io, socket) => {
    console.log(`💬 Chat Socket Initialized for ${socket.user.email}`);

    socket.on("join-chat", (chatId) => {
        const room = `chat_${chatId}`;

        socket.join(room);

        console.log(`${socket.user.email} joined ${room}`);

        // Check who is in the room
        console.log(room);
        console.log(io.sockets.adapter.rooms.get(room));
    });

    socket.on("leave-chat", (chatId) => {
        const room = `chat_${chatId}`;

        socket.leave(room);

        console.log(`${socket.user.email} left ${room}`);
    });
};

export default registerChatSocket;