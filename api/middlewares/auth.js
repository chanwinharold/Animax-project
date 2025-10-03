const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = jwt.verify(req.cookies.token, process.env.TOKEN_KEY_SECRET)
    const userId = token.userId
    req.auth = {
        userId: userId
    }
    next();
}