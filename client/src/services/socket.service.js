import { socket } from "../socket/socket";

// ================= CONNECT =================

export const connectSocket = (token) => {
    console.log("connectSocket called");
    console.log("Token:", token);

    if (!token) return;

    socket.auth = {
        token,
    };

    console.log("Calling socket.connect()");

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
    console.log(socket.connected);
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

// ================= ONLINE USERS =================

export const onOnlineUsers = (callback) => {
    socket.on("online-users", callback);
};

export const removeOnlineUsers = () => {
    socket.off("online-users");
};

// ================= TYPING =================

export const typing = (chatId) => {

    socket.emit("typing", {
        chatId,
    });

};

// ================= STOP TYPING =================

export const stopTyping = (chatId) => {

    socket.emit("stop-typing", {
        chatId,
    });

};

// ================= LISTENERS =================

export const onTyping = (callback) => {

    socket.on("typing", callback);

};

export const onStopTyping = (callback) => {

    socket.on("stop-typing", callback);

};

// ================= REMOVE =================

export const removeTypingListeners = () => {

    socket.off("typing");

    socket.off("stop-typing");

};