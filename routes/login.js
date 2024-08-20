const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const { username } = req.body;
    // console.log("🚀 ~ router.post ~ username:", username)

    try {

        /**
         * Get a user by the username
         * Decrypt the user's password (user.password)
         * Check if the decrypted password === req.body.password (Password used to login)
         * If false, return status 401 - Unauthorized
         * If true, return status 200 & logged in user
         */
        const user = await User.findOne({ username: username });
        
        if(!user) {
            res.status(401).json({ "message": "Wrong Credentials" });
            return
        }

        // Get & Decrypt password then validate equalness else error  
        const decryptPassword = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD_PHRASE).toString(CryptoJs.enc.Utf8); 

        if(decryptPassword !== req.body.password ) {
            res.status(401).json({ "message": "Wrong Credentials" });
            return
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_KEY,
            { expiresIn:"3d" }
        )
        

        // Don't return password in the response
        const { password, ...others } = user._doc

        res.status(200).json({...others, accessToken});

    } catch (err) {
        res.status(500).json(err) 
    }
});

module.exports = router