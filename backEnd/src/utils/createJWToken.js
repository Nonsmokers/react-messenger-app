const {reduce} = require("lodash");
const {jwt} = require('jsonwebtoken');


const createJWToken = (user) => {
    return jwt.sign(
        {
            data: reduce(user, (result, value, key) => {
                if (key !== "password") {
                    result[key] = value;
                }
                return result;
            }, {}),
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: "HS256",
        }
    );
};

module.exports = createJWToken;