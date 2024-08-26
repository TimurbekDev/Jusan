import { Router } from "express";
import { categoryRoutes } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";
import { userRoutes } from "./user.routes.js";
import { authRoutes } from "./auth.routes.js";
import { verifyJwtToken } from "../middlewares/jwt.middleware.js";
import { selledProductRoutes } from "./selled_product.routes.js";

export const mainRouter = Router()

mainRouter
    .use('/categories',verifyJwtToken,categoryRoutes)
    .use('/products',productRoutes)
    .use('/users',verifyJwtToken,userRoutes)
    .use('/login',authRoutes)
    .use('/selled-products',selledProductRoutes)