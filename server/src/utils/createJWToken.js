const reduce = require("lodash/reduce");
const jwt = require('jsonwebtoken');

const createJWToken = (userData) => {
    return jwt.sign(
        {
            data: reduce(userData, (result, value, key) => {
                    if (key !== "password") {
                        result[key] = value;
                    }
                    return result;
                },
                {}
            ),
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: "HS256",
        }
    );
};

module.exports = createJWToken;