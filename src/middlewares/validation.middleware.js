import { CustomException } from "../utils/customException.js"

export const ValidationMiddleware = (schema) => {
    return (req, _, next) => {

        const { error, __ } = schema.validate(req.body)

        if (error) throw new CustomException(400, error.message)

        next()
    }
}