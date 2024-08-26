import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import userDto from "../DTOs/user.dto.js";

export const userRoutes = Router()

userRoutes
    .post('/',ValidationMiddleware(userDto.create),userController.createUser)
    .get('/',userController.getAllUsers)