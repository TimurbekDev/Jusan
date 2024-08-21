import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import { loginSchema } from "../DTOs/login.dto.js";

export const authRoutes = Router()
    .post('/', ValidationMiddleware(loginSchema), authController.login)