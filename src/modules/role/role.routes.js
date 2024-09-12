import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import roleController from "./role.controller.js";

export const roleRoutes = Router()

roleRoutes
    .get('/',
        checkAuthGuard(true),
        CheckRolesGuard('seller','admin'),
        roleController.getRolesByUserId)