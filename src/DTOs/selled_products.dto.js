import Joi from 'joi'

class SelledProductDto{
    #_joiValidator ;
    constructor() {
        this.#_joiValidator = Joi
    }

    create(){

        return this.#_joiValidator.object({

            product_id : this.#_joiValidator.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            user_id : this.#_joiValidator.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            selled_price : this.#_joiValidator.number().min(0).required(),
            count : this.#_joiValidator.number().min(0).required()
        })
    }

    update(){

        return this.#_joiValidator.object({

            selled_price : this.#_joiValidator.number().min(0).required(),
            count : this.#_joiValidator.number().min(0).required()
        })
    }
}

export default new SelledProductDto