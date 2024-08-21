import { BadRequestException } from "../exceptions/bad-request.exception.js"
import { User } from "../models/user.js"

class UserController {
    constructor(){}

    async getAllUsers(_,res,next){

        try{
            const users = await User.find().populate('role_id')

            res.status(200).send({
                message : 'Ok',
                data : users
            })
        }
        catch(error){
            next(error)
        }
    }

    async createUser(req,res,next){

        const user = new User(req.body)
        try{
            await user.save()

            res.status(201).send({
                message : 'Ok',
                data : [user]
            })
        }
        catch(error){
            next(new BadRequestException(400,error.message))
        }
    }
}

export default new UserController