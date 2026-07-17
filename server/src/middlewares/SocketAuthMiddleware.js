import { verifyAccessToken } from "../helper/jwt.js";

const socketAuthMiddleware = (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Authentication token is required"));
        }

        const decoded = verifyAccessToken(token);

        socket.user = decoded;

        next();
    } catch (error) {
        next(new Error("Invalid or expired token"));
    }
};

export default socketAuthMiddleware;