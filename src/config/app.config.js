import { config } from "dotenv";

config()

export const appConfig = {
    port : parseInt(process.env.PORT),
    host : process.env.HOST
}