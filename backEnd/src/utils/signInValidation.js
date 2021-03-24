const {check} = require('express-validator');

const signInValidation = [
    check('email').isEmail(),
    check('password').isLength({min: 3})
];

module.exports = signInValidation;