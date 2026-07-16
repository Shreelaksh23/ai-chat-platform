import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import AuthService from "../services/AuthService.js";

const AuthController = {
    register: asyncHandler(async (req, res) => {
        const result = await AuthService.register(req.body);
        return res.status(201).json(
            new ApiResponse(201,
                "user registred successfully",
                result
            )
        )
    }),
    login: asyncHandler(async (req, res) => {
        const result = await AuthService.login(req.body);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Login successful",
                result
            )
        );
    }),
}

export default AuthController;