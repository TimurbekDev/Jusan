import { Router } from "express";
import { logIn, showLogin } from "../controllers/views.controller.js";

export const viewsRoutes = Router()

viewsRoutes
    .get('',showLogin)
    .post('/login',logIn)