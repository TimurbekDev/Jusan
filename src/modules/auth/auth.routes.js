import { Router } from "express";
import authDto from "./auth.dto.js";
import authController from "./auth.controller.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";

export const authRoutes = Router()

authRoutes
    .post('/login',
        ValidationMiddleware(authDto.login()),
        authController.login
    )
    .post('/forgot-password',
        ValidationMiddleware(authDto.forgotPassword()),
        authController.forgotPassword
    )
    .post('/reset-password',
        ValidationMiddleware(authDto.resetPassword()),
        authController.resetPassword
    )
    .post('/refresh-access',
        authController.refreshAccessToken
    )