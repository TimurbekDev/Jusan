import nodemailer from 'nodemailer'
import { emailConfig } from '../config/email.config.js'



export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: emailConfig.user_email,
            pass: emailConfig.user_email_pass
        }
    })

    await transporter.sendMail({ to, subject, html })
}