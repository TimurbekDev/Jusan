import { Router } from "express";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import userController from "./user.controller.js";
import userDto from "./user.dto.js";

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
    .get('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.getById
    )
    .put('/:id',
        ValidationMiddleware(userDto.update()),
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.updateById)
    .delete('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.deleteById)