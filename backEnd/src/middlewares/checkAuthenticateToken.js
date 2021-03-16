const verifyJWToken = require("../utils/verifyJWToken");

const checkAuthenticateToken = async (req, res, next) => {
    if (req.path === "/user/sign-up" || req.path === "/user/sign-in") {
        return next();
    }

    const token = req.headers.token

    try {
        const verifyToken = await verifyJWToken(token)
        req.user = verifyToken.data._doc;
        next();
    } catch (e) {
        res.status(403).json(e.message);
    }
}

module.exports = checkAuthenticateToken;