import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js";

export const generateJwtToken = (id, role_name) => {


    return jwt.sign(
        {
            user_id: id,
            role : role_name
        },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expirdeTime })
}

export const verifyToken = (token) => {

    jwt.verify(token, jwtConfig.secretKey, (err, _) => {
        
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