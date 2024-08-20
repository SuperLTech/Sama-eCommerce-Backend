const router = require('express').Router();
const { verifyTokenAndAuthorize, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const CryptoJs = require('crypto-js');
const User = require('../models/User');

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            {
                $match: {
                    createdAt: {$gte: lastYear}
                }
            },
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
    // If the user updates a password - we encypt it here
    if(req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_PHRASE).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body //Basically take everything in the body
        }, {new: true});

        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(500).json(err)
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted!");
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET USER
router.get("/:id", verifyTokenAndAuthorize, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // Don't return password in the response
        const { password, ...userDetails } = user._doc

        res.status(200).json({userDetails});

    } catch (err) {
        res.status(500).json(err)
    }
});

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new

    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();

        res.status(200).json({users});

    } catch (err) {
        res.status(500).json(err)
    }
}); 


module.exports = router