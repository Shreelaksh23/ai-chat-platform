import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export const socket = io(URL, {
    autoConnect: false,
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("✅ Connected", socket.id);
});

socket.on("disconnect", (reason) => {
    console.log("❌ Disconnected:", reason);
});

socket.on("connect_error", (err) => {
    console.log("❌ Connect Error:", err.message);
});