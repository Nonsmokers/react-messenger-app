const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator/src/validation-result');
const UserModel = require('../models/User');
const createJWToken = require('../utils/createJWToken');


class UsersController {

    constructor(io) {
        this.io = io
    }

    findUser = async (req, res) => {

        const id = req.params.id
        const user = await UserModel.findById(id)
        if (!user) {
            return res.status(404).json('User not found');
        }
        return res.json(user)
    };

    getMe = async (req, res) => {
        let id = req.user._id
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

    loginUser = async (req, res) => {
        console.log(req.body)
        const postData = {
            email: req.body.email,
            password: req.body.password
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        UserModel.findOne({email: postData.email}, async (err, user) => {
            if (err || !user) {
                res.status(404).json('User not found');
            }
            let result = await bcrypt.compare(postData.password, user.password)
            if (!result) {
                res.status(400).json('Email or password is invalid')
            }
            const token = createJWToken(user)
            res.json({status: 'success', token})
        })
    }
}

module.exports = UsersController;