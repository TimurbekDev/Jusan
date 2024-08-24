import Joi from 'joi'

class SelledProductDto{
    #_joiValidator ;
    constructor() {
        this.#_joiValidator = Joi
    }

    create(){

        return this.#_joiValidator.object({

            product_id : this.#_joiValidator.string().regex(/^[0-9a-fA-F]{24}$/),
            user_id : this.#_joiValidator.string().regex(/^[0-9a-fA-F]{24}$/),
            selled_price : this.#_joiValidator.number(),
            original_price : this.#_joiValidator.number(),
            count : this.#_joiValidator.number()
        })
    }

    update(){

        return this.#_joiValidator.object({

            selled_price : this.#_joiValidator.number(),
            original_price : this.#_joiValidator.number(),
            count : this.#_joiValidator.number()
        })
    }
}

export default new SelledProductDto