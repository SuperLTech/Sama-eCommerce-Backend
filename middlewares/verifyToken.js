const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * Verify token - Is the user making the request have a valid token.
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    // console.log("🚀 ~ verifyToken ~ authHeader:", authHeader)

    if(authHeader) {
        const token = authHeader 
        jwt.verify(token, process.env.JWT_KEY, (err, user) => { //Verify if token is valid
            if(err) {
                return res.status(403).json({ "message": "Invalid token" }); 
            };
            req.user = user;
            next();
        })
    } else {
       return res.status(401).json('You are not authenticated!');
    };
};

const verifyTokenAndAuthorize = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ "message": "Unauthorized" });
        };
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ "message": "Unauthorized" });
        };
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAdmin }
