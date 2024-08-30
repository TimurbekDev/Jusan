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
}

export default new AuthDto