import bcrypt from 'bcrypt'
import { User } from '../user/user.model.js'
import { BadRequestException } from '../../exceptions/bad-request.exception.js'
import { generateJwtToken } from '../../helpers/jwt.helper.js'

class AuthController {

    #_userModel;
    constructor(){ 
        this.#_userModel = User;
    }

    login = async (req, res, next) =>{

        try {
            const user = await this.#_userModel.findOne({ email: req.body.email })
                .populate('role_id')

            if (!user) 
                throw new BadRequestException('Password or Email invalid')

            const result = await bcrypt.compare(req.body.password, user.password)

            if (!result) 
                throw new BadRequestException('Password or Email invalid')

            const payload = {
                user_id: user._id,
                role: user.role_id.name
            }

            const [ access, refresh ] = await generateJwtToken(payload)
            
            res.status(200).send({
                message: 'Ok',
                data: [user],
                accessToken: access,
                refreshToken: refresh
            })
        }
        catch (error) {
            next(error)
        }
    }
}

export default new AuthController 