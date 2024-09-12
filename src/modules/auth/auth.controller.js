import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js'
import { BadRequestException } from '../../exceptions/bad-request.exception.js'
import { generateJwtToken } from '../../helpers/jwt.helper.js'
import { NotFoundException } from '../../exceptions/not-found.exception.js';
import { sendEmail } from '../../utils/send_email.utils.js';
import { generateOTP } from '../../utils/otp-generator.utils.js';
import { getItem, setItem } from '../../utils/cache.utils.js';
import { jwtConfig } from '../../config/jwt.config.js';

class AuthController {

    #_userModel;
    constructor() {
        this.#_userModel = User;
    }

    //Login method
    login = async (req, res, next) => {

        try {
            const user = await this.#_userModel.findOne({ email: req.body.email })
                .populate('role_id')

            if (!user)
                throw new BadRequestException('Password or Email invalid')

            const result = await bcrypt.compare(req.body.password, user.password)

            if (!result)
                throw new BadRequestException('Password or Email invalid')

            const payload = {
                user_id: user._id,
                role: user.role_id.name
            }

            const [access, refresh] = await generateJwtToken(payload)

            res.status(200).send({
                message: 'Ok',
                data: user,
                accessToken: access,
                refreshToken: refresh
            })
        }
        catch (error) {
            next(error)
        }
    }

    //this method  is used to generate OTP and send it to user email
    forgotPassword = async (req, res, next) => {
        try {

            const { email } = req.body

            const user = await this.#_userModel.findOne({ email })

            if (!user)
                throw new NotFoundException('User not found')

            const otp = generateOTP()

            await sendEmail({
                to: email,
                subject: 'Confirmation Code',
                html: `Code : ${otp}`
            })

            setItem(email, otp)

            res.status(200).send({
                message: `Confirmation code sended to ${email}`,
                code: otp
            })
        }
        catch (error) {
            next(error)
        }
    }

    //this method  is used to verify OTP and reset password
    resetPassword = async (req, res, next) => {
        try {

            const { email, password, code } = req.body
            const user = await this.#_userModel.findOne({ email })

            if (!user)
                throw new NotFoundException('User not found')

            if (!(getItem(email) == code)) {
                throw new BadRequestException('OTP is expired')
            }

            const hashPassword = await bcrypt.hash(password, 12)

            await this.#_userModel.findByIdAndUpdate(user._id, {
                password: hashPassword
            })

            res.status(200).send({
                message: 'Password successfully updated',
            })
        } catch (error) {
            next(error)
        }
    }

    //This method is used to refresh access token
    refreshAccessToken = async (req, res, next) => {
        try {

            const refreshToken = req.headers["refresh-token"]

            jwt.verify(refreshToken, jwtConfig.refreshSecretKey, async (err, payload) => {

                try {
                    if (err && err instanceof jwt.NotBeforeError) {
                        throw new BadRequestException("Not before JWT error");
                    }

                    if (err && err instanceof jwt.TokenExpiredError) {
                        throw new jwt.TokenExpiredError("Token already expired");
                    }
                    if (err && err instanceof jwt.JsonWebTokenError) {
                        throw new BadRequestException("Invalid JWT token");
                    }

                    const [access, __] = await generateJwtToken({
                        user_id: payload.user_id,
                        role: payload.role
                    })

                    res.status(200).send({
                        message: 'Ok',
                        access_token: access
                    })
                } catch (error) {
                    next(error)
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController 