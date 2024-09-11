import { config } from "dotenv";

config()

export const emailConfig = {
    user_email : process.env.USER_EMAIL, 
    user_email_pass : process.env.USER_EMAIL_PASSWORD
}