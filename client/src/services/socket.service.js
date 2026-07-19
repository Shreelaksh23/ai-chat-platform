import { socket } from "../socket/socket";

// ================= CONNECT =================

export const connectSocket = (token) => {
    if (!token) return;

    socket.auth = {
        token,
    };

    if (!socket.connected) {
        socket.connect();
    }
};

// ================= DISCONNECT =================

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

// ================= JOIN CHAT =================

export const joinChat = (chatId) => {
    socket.emit("join-chat", {
        chatId,
    });
};

// ================= LEAVE CHAT =================

export const leaveChat = (chatId) => {
    socket.emit("leave-chat", {
        chatId,
    });
};

// ================= SEND MESSAGE =================

export const sendMessage = (chatId, content) => {
    socket.emit("send-message", {
        chatId,
        content,
    });
};

// ================= RECEIVE MESSAGE =================

export const onReceiveMessage = (callback) => {
    socket.on("receive-message", callback);
};

// ================= MESSAGE ERROR =================

export const onMessageError = (callback) => {
    socket.on("message-error", callback);
};

// ================= REMOVE LISTENERS =================

export const removeReceiveMessage = () => {
    socket.off("receive-message");
};

export const removeMessageError = () => {
    socket.off("message-error");
};

export default socket;