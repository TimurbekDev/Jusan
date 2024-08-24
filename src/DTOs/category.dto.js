import Joi from 'joi'

class CategoryDto{

    #_joiValidator;
    constructor() {
        this.#_joiValidator = Joi
    }

    create(){

        return this.#_joiValidator.object({

            name : this.#_joiValidator.string().trim().min(2).max(50),
        })
    }

    update(){

        return this.#_joiValidator.object({

            name : this.#_joiValidator.string().trim().min(2).max(50),
        })
    }
}

export default new CategoryDto