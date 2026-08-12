import { verifyAccessToken } from "../helper/jwt.js";
import ApiError from "../utils/ApiError.js";

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
        console.log("JWT Error:", error.message);
        console.log(error);

        next(new ApiError(401, error.message));
    }
};

export default socketAuthMiddleware;