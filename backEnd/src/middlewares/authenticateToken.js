const verifyJWToken = require("../utils/verifyJWToken");

const authenticateToken = async (req, res, next) => {
    if (req.path === "/user/login" || req.path === "/user/register") {
        return next();
    }
    try {
        const token = req.headers.token
        const user = await verifyJWToken(token)
        req.user = user
        next()
    } catch (err) {
        res.status(403).json({message: 'auth is invalid'})
    }
}

module.exports = authenticateToken;