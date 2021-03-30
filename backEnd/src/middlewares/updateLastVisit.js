const UserModel = require('../models/User');

const updateLastVisit = (req, res, next) => {
    if(req.user){
        UserModel.updateOne(
            {_id: req.user._id},
            {last_visit: new Date()},
            () => {}
        );
        next();
    }else{
        next()
    }
}

module.exports = updateLastVisit;