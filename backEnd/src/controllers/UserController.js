const UserModel = require('../models/User');
const createJWToken = require('../utils/createJWToken');
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator/src/validation-result');

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        UserModel.findOne({email: postData.email}, (err, user) => {
            if (err || !user) {
                res.status(404).json('User not found');
            }
            if (bcrypt.compareSync(postData.password, user.password)) {
                const token = createJWToken(postData)
                res.json({status: 'success', token})
            } else {
                res.status(404).json('Email or password is invalid');
            }
        })
    }
}

module.exports = UserController;