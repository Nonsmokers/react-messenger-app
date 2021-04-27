const {check} = require('express-validator');

const signUpValidation = [
    check('email').isEmail(),
    check('fullname').isLength({min: 3}),
    check('password').isLength({min: 3})
];

module.exports = signUpValidation;