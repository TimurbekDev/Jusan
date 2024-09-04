import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js";

export const generateJwtToken = async (payload) => {

    return await Promise.all([
        jwt.sign(payload,
            jwtConfig.accessSecretKey,
            { expiresIn: jwtConfig.accessExpiredTime }),
        jwt.sign(payload,
            jwtConfig.refreshSecretKey,
            { expiresIn: jwtConfig.refreshExpiredTime })
    ])
}

export const verifyToken = (token) => {

    console.log(token);
    jwt.verify(token, jwtConfig.accessSecretKey, (err, _) => {

        if (err && err instanceof jwt.NotBeforeError) {
            throw new BadRequestException("Not before JWT error");
        }

        if (err && err instanceof jwt.TokenExpiredError) {
            throw new jwt.TokenExpiredError("Token already expired");
        }
        if (err && err instanceof jwt.JsonWebTokenError) {
            throw new BadRequestException("Invalid JWT token");
        }
    });
}