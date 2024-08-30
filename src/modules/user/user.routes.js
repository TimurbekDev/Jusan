import { Router } from "express";
import userController from "./user.controller.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import userDto from "./user.dto.js";

export const userRoutes = Router()

userRoutes
    .post('/',
        ValidationMiddleware(userDto.create()),
        userController.createUser)
    .get('/',userController.getAllUsers)