const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    // Check presence
    if(!username || !email || !password) {
        res.status(400).json({ "message": "Password, email and password are required!" });
    }

    // Check duplicate
    const duplicateUsername = await User.findOne({ username: username }).exec();
    const duplicateEmail = await User.findOne({ email: email }).exec();

    if(duplicateUsername || duplicateEmail) return res.sendStatus(409);

    // Encrypt password
    const encryptedPassword = CryptoJs.AES.encrypt(password, process.env.PASSWORD_PHRASE).toString();

    const newUser = new User({
        username: username,
        email: email,
        password: encryptedPassword
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router