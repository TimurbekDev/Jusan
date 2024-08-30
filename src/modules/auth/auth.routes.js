import { Router } from "express";
import authDto from "./auth.dto.js";
import authController from "./auth.controller.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";

export const authRoutes = Router()
    .post('/login', 
        ValidationMiddleware(authDto.login()), 
        authController.login)