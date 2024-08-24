import Joi from "joi";

class AuthDto{
    
    #_joiValidator;
    constructor() {
        this.#_joiValidator = Joi
    }

    login(){

        return this.#_joiValidator.object({

            email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password : Joi.string().min(6).max(12).required()
        })
    }
}

export default new AuthDto