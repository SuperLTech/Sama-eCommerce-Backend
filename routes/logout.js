const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const { username } = req.body;
    // console.log("USERNAME", username)

    try {
        const user = await User.findOne({ username: username });
        if(!user) {
            res.status(401).json({ "message": "User not found" });
            return
        }

        res.status(200).json("User logged out");


    } catch (err) {
        res.status(500).json(err) 
    }
});

module.exports = router