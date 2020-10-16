const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = jwt.verify(token, config.secret);
        req.userData = verifyToken;
        next();
    }

    catch (e) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized, token expired or invalid token, please relogin',
            error: e
        })
    }

}