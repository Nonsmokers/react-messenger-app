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

    findUsers = async (req, res) => {
        const query = req.query.query;
        const regexValue1 = '^' + query;
        const response = await UserModel.find()
            .or([{
                fullname: {
                    '$regex': regexValue1,
                    '$options': 'i'
                }
            },
                {
                    email: {
                        '$regex': regexValue1,
                        '$options': 'i'
                    }
                }
            ])
        try {
            res.json(response)
        } catch (err) {
            return res.status(404).json({
                status: "error",
                message: err,
            });
        }
    }

    getMe = async (req, res) => {
        let id = req.user._id
        const user = await UserModel.findById(id)
        if (!user) {
            return res.status(404).json('User not found');
        }
        return res.json(user)
    };

    signUpUser = async (req, res) => {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        const user = new UserModel(postData)
        await user.save()
        try {
            res.json(user)
        } catch (reason) {
            res.json(reason)
        }
    }

    signInUser = async (req, res) => {
        const postData = {
            email: req.body.email,
            password: req.body.password
        }
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        await UserModel.findOne({email: postData.email}, (err, user) => {
            console.log(user.confirmed)
            console.log(user.confirmed && user.confirmed)
            if (err || !user) {
                return res.status(404).json({status: 'error', message: 'User not found'});
            }

            //todo: add confirmation mail account
            if (user.confirmed && user.confirmed === false) {
                return res.status(423).json({status: 'error', message: 'User not approved'});
            }
            if (bcrypt.compareSync(postData.password, user.password)) {
                const token = createJWToken(user)
                return res.status(200).json({status: 'success', token})
            } else {
                return res.status(403).json({status: 'error', message: 'Email or password is invalid'})
            }
        })
    }

    verify = async (req, res) => {

        const verifyHash = req.query.hash
        if (!verifyHash) {
            return res.status(422).json({errors: 'Hash not found'});
        }

        await UserModel.find({confirm_hash: verifyHash}, async (err, user) => {
            if (err || !user) {
                return res.status(404).json({message: 'User not found'});
            }

            user.confirmed = true;
            res.json({status: 'success', message: 'Hash is verified'})
        })
    }

    deleteUser = async (req, res) => {
        const id = req.params.id
        const user = await UserModel.findOneAndRemove({_id: id})
        if (!user) {
            res.status(404).json('User not found');
        }
        return res.json(`User removed`)
    };
}

module.exports = UsersController;