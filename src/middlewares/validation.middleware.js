import { BadRequestException } from "../exceptions/bad-request.exception.js"

export const ValidationMiddleware = (schema) => {
    return (req, _, next) => {

        const { error, __ } = schema.validate(req.body)

        if (error) throw new BadRequestException(400, error.message)

        next()
    }
}