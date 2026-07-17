import { Models } from "../models/index.js";
import { hashPassword, comparePassword } from "../helper/password.js";
import { generateAccessToken } from "../helper/jwt.js";
import ApiError from "../utils/ApiError.js";

const { User } = Models;

const AuthService = {
    register: async (userData) => {
        const { username, email, password } = userData;

        const existingUser = await User.findOne({
            where: {
                email,
            }
        });
        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username, email, password: hashedPassword,
        });

        const token = generateAccessToken({
            id: user.id,
            username:user.username,
            email: user.email,
        });

        const createdUser = await User.findByPk(user.id, {
            attributes: {
                exclude: ["password"],
            }
        });
        return {
            token,
            user: createdUser
        };
    },
    login: async (loginData) => {
        const { email, password } = loginData;
        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isPasswordValid = await comparePassword(
            password,
            user.password
        );
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid email or password");
        }

        await user.update({
            lastLogin: new Date(),
        });

        const token = generateAccessToken({
            id: user.id,
            email: user.email,
        });

        const loggedInUser = await User.findByPk(user.id, {
            attributes: {
                exclude: ["password"],
            },
        });

        return {
            token,
            user: loggedInUser,
        };
    }
}

export default AuthService;