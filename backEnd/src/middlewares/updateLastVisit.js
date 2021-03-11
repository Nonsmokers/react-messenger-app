const UserModel = require('../models/User');

const updateLastVisit = (req, res, next) => {
    UserModel.updateOne(
        {_id: "6041297e9533ff06803e4119"},
        {last_visit: new Date()},
        () => {
        }
    );
    next();
}

module.exports = updateLastVisit;