const {check} = require('express-validator');

const authValidation = [check('email').isEmail(), check('password').isLength({ min: 3 })];

module.exports = authValidation;