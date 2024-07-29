import { config } from "dotenv";

config()

export const PORT = process.env.PORT
export const DB_URI = process.env.DB_URI