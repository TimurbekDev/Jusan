import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { categoryRoutes } from "../modules/category/category.routes.js";
import { productRoutes } from "../modules/product/product.routes.js";
import { selledProductRoutes } from "../modules/selled-product/selled-product.routes.js";
import { userRoutes } from "../modules/user/user.routes.js";

export const mainRouter = Router()

mainRouter
    .use('/auth',authRoutes)
    .use('/categories',categoryRoutes)
    .use('/products',productRoutes)
    .use('/selled-products',selledProductRoutes)
    .use('/users',userRoutes)