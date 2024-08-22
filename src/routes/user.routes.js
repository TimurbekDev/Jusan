import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import { userCreateSchema } from "../DTOs/user-create.dto.js";

export const userRoutes = Router()

userRoutes
    .post('/',ValidationMiddleware(userCreateSchema),userController.createUser)
    .get('/',userController.getAllUsers)