import Joi from 'joi'

class ProductDto{

    #_joiValidator;
    constructor() {
        this.#_joiValidator = Joi
    }

    create = ()=>{

        return this.#_joiValidator.object({

            name : this.#_joiValidator.string().trim().min(2).max(50),
            price : this.#_joiValidator.number(),
            count : this.#_joiValidator.number(),
            category_id : this.#_joiValidator.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    }

    update = ()=>{

        return this.#_joiValidator.object({

            name : this.#_joiValidator.string().trim().min(2).max(50),
            price : this.#_joiValidator.number(),
            count : this.#_joiValidator.number()
        })
    }
}

export default new ProductDto