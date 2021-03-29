const UserModel = require('../models/User');

const updateLastVisit = (req, res, next) => {
    UserModel.updateOne(
        {_id: req.user._id},
        {last_visit: new Date()},
        () => {
        }
    );
    next();
}

module.exports = updateLastVisit;