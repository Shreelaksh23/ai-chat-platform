import { verifyAccessToken } from "../helper/jwt.js"
import ApiError from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized");
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyAccessToken(token);

        req.user = decoded;

        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        console.log(error);

        next(new ApiError(401, error.message));
    }
};

export default authMiddleware;