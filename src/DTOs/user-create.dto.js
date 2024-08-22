import Joi from "joi";

export const userCreateSchema = Joi.object({

    full_name: Joi.string().min(4).max(50).required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string().min(6).max(12).required(),

    role_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
})