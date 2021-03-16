const jwt = require('jsonwebtoken');

const verifyJWToken = async (token) => {
    return await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || "", (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        })
    })
}

module.exports = verifyJWToken;