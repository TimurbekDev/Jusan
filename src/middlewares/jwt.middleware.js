import jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { jwtConfig } from "../config/jwt.config.js";

export const verifyJwtToken = (req, _, next ) => {

    const token = req.headers['authorization'];

    if (!token) throw new BadRequestException('token not given')

    jwt.verify(token, jwtConfig.secretKey, (err) => {

        if (err) throw new BadRequestException('Token expired')

        next();
    })
}