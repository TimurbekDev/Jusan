import { Router } from "express";
import userController from "./user.controller.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import userDto from "./user.dto.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

export const userRoutes = Router()

userRoutes
    .post('/',
        ValidationMiddleware(userDto.create()),
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.create)
    .get('/',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.getAll)
    .put('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.updateById)
    .delete('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.deleteById)