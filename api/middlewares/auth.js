const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = Headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY_SECRET)
    const userId = decodedToken.userId
    req.auth = {
        userId: userId
    }
    next();
}