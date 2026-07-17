import { Server } from "socket.io";
import socketAuthMiddleware from "../middlewares/SocketAuthMiddleware.js";

let io = null;
export const initializeSocket = (httpServer) => {
    if (io) {
        return io;
    }
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        }
    });
    io.use(socketAuthMiddleware);
    return io;
}

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io has not been initialized.");
    }
    return io;
};