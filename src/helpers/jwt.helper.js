import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";

export const generateJwtToken = () => {
    return jwt.sign(
        { name: 'Timurbek' },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expirdeTime })
}