import { config } from "dotenv";

config()

export const dbConfig = {
    url : process.env.DB_URI
}