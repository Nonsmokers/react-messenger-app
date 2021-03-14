const jwt = require('jsonwebtoken');

const verifyJWToken = (token) => {
    new Promise((resolve, reject) => {
        if (token === null) reject((r) => r)
        jwt.verify(token, process.env.JWT_SECRET || "", (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        })
    }).then(r => r.message)
}

module.exports = verifyJWToken;