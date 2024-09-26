import jwt from "jsonwebtoken"
import { BadRequestException } from "../exceptions/bad-request.exception.js"
import { verifyToken } from "../helpers/jwt.helper.js"

export const checkAuthGuard = (isProtected) => {
    return (req, _, next) => {

        if (!isProtected)
            return next()

        const token = req.headers["authorization"]

        if (!(token
            && token.startsWith("Bearer")
            && token.split(' ')[1]
        )) {
            throw new BadRequestException(`Given token : ${token} is invalid`)
        }

        const accessToken = token.split(' ')[1]

        verifyToken(accessToken)
        

        const {user_id , role} = jwt.decode(accessToken)

        req.userId = user_id
        req.role = role

        next()
    }
}