const UserModel = require('../models/User');

class UserController {

    findUser(req, res) {
        const id = req.params.id
        UserModel.findById(id, (err, user) => {
            if (err) {
                console.log(err.message)
                return res.status(404).json('User not found');
            }
            res.json(user)
        })
    }

    createUser(req, res) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password
        }
        const user = new UserModel(postData)
        user.save(() => {
            console.log("Сохранен объект", user);
        })
        return res.send()
    }

    deleteUser(req, res) {
        const id = req.params.id
        UserModel.findOneAndRemove({_id: id}).then((user) => {
            if (!user) {
                res.status(404).json('User not found');
            }
            res.json(`User ${user.fullname} removed`)
        }).catch(err => {
            res.status(404).json(err.message);
        })
    }
}

module.exports = UserController;