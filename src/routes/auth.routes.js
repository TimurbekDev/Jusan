import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import authDto from "../DTOs/auth.dto.js";

export const authRoutes = Router()
    .post('/', ValidationMiddleware(authDto.login()), authController.login)