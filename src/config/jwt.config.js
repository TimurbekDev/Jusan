import { config } from "dotenv";
config()

export const jwtConfig = {
    secretKey : process.env.JWT_SECRET_KEY,
    expirdeTime : process.env.JWT_EXPIRE_TIME
}