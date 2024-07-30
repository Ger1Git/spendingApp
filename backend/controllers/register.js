require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, password, email });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
