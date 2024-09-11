import Joi from "joi";

class AuthDto{
    
    #_joiValidator;
    constructor() {
        this.#_joiValidator = Joi
    }

    login(){

        return this.#_joiValidator.object({

            email : Joi.string().email().required(),
            password : Joi.string().required()
        })
    }

    forgotPassword(){

        return this.#_joiValidator.object({
            email : Joi.string().email().required()
        })
    }

    resetPassword(){

        return this.#_joiValidator.object({

            email : Joi.string().email().required(),
            password : Joi.string().required(),
            code : Joi.number().required()
        })
    }
}

export default new AuthDto