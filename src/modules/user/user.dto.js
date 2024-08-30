import Joi from "joi";

class UserDto{
    
    #_joiValidator;
    constructor() {
        this.#_joiValidator = Joi
    }

    create(){

        return this.#_joiValidator.object({

            full_name : this.#_joiValidator.string().min(4).max(50),
            email : this.#_joiValidator.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
            password : this.#_joiValidator.string().min(6).max(12).required(),
            role_id : this.#_joiValidator.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    }

    update(){

        return this.#_joiValidator.object({
            full_name : this.#_joiValidator.string().min(4).max(50),
            email : this.#_joiValidator.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
            password : this.#_joiValidator.string().min(6).max(12).required()
        })
    }
}

export default new UserDto