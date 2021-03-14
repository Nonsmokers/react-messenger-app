const UserModel = require('../models/User');
const createJWToken = require('../utils/createJWToken');

class UserController {

    findUser = async (req, res) => {
        const id = req.params.id
        const user = await UserModel.findById(id)
        if (!user) {
            return res.status(404).json('User not found');
        }
        return res.json(user)
    };

    createUser = async (req, res) => {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password
        }
        const user = new UserModel(postData)
        await user.save()
        return res.json(user)
    }

    deleteUser = async (req, res) => {
        const id = req.params.id
        const user = await UserModel.findOneAndRemove({_id: id})
        if (!user) {
            res.status(404).json('User not found');
        }
        return res.json(`User removed`)
    };

    login = async (req, res) => {
        const postData = {
            email: req.body.email,
            password: req.body.password
        }
        UserModel.findOne({email: postData.email}, (err, user)=>{
            if (err || !user) {
                res.status(404).json('User not found');
            }
            if(user.password === postData.password){
                const token = createJWToken(postData)
                res.json(token) 
            }else{
                res.status(404).json('email or password is invalid');
            }
        })
    }
}

module.exports = UserController;