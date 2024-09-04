import { config } from "dotenv";
config()

export const jwtConfig = {
    accessSecretKey: process.env.ACCESS_JWT_SECRET_KEY,
    refreshSecretKey: process.env.REFRESH_JWT_SECRET_KEY,
    accessExpiredTime: process.env.ACCESS_JWT_EXPIRE_TIME,
    refreshExpiredTime: process.env.REFRESH_JWT_EXPIRE_TIME
}