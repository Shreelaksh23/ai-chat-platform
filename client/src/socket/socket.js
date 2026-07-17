import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL;

export const socket = io(URL, {
    autoConnect: false,
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("✅ Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
    console.log("❌ Socket Disconnected");
});

socket.on("connect_error", (error) => {
    console.error("Socket Error:", error.message);
});