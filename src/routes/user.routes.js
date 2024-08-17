import { Router } from "express";
import userController from "../controllers/user.controller.js";

export const userRoutes = Router()

userRoutes
    .post('/',userController.createUser)
    .get('/',userController.getAllUsers)