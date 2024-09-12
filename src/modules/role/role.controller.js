import { Role } from "./role.model.js";

class RoleController {

    #_roleModel;
    constructor() {
        this.#_roleModel = Role;
    }

    getRolesByUserId = async (req, res, next) => {
        try {

            if(req.role == 'seller'){

                const roles = await this.#_roleModel.findOne({name : 'staff'})

                res.status(200).send({
                    message: 'Ok',
                    data: roles
                });
            }

            if(req.role == 'admin'){

                const roles = await this.#_roleModel.find()

                res.status(200).send({
                    message: 'Ok',
                    data: roles
                });
            }

        } catch (error) {
            next(error);
        }
    };
}

export default new RoleController();
