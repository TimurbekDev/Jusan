import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config.js";

export const generateJwtToken = (id, role_id) => {
    
    
    return jwt.sign(
        {
            user_id: id,
            role_id
        },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expirdeTime })
}