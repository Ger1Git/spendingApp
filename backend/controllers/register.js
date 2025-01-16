import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'; // Import with .js extension

dotenv.config();

export const register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the user already exists by username or email
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, password, email });

        // Save the new user to the database
        await newUser.save();

        // Create a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

        // Send the token as a response
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
