const verifyJWToken = require("../utils/verifyJWToken");

const authenticateToken = async (req, res, next) => {

    const token = req.headers.token
    try {
        const user = await verifyJWToken(token)
        req.user = user
        next()
    } catch {
        res.status(403).json({message: 'auth is invalid'})
    }
}

module.exports = authenticateToken;