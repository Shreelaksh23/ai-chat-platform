import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import { registerValidator, loginValidator } from "../validators/AuthValidator.js";
import validateRequest from "../middlewares/ValidationMiddlerware.js";

const router = Router();

router.post("/register", registerValidator, validateRequest, AuthController.register);
router.post("/login", loginValidator, validateRequest, AuthController.login);

export default router;