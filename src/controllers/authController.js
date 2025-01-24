const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// SIGNUP LOGIC
const signup = async (req, res) => {
    const { fullName, email, mobile, password, role } = req.body;

    try {
        // Validate mobile number (must be exactly 10 digits)
        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ msg: 'Mobile number must be exactly 10 digits' });
        }

        // Validate strong password (minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ msg: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character' });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Create new user without manually hashing the password here
        user = new User({ fullName, email, mobile, password, role });
        await user.save();

        // Generate JWT Token
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({ msg: 'User registered successfully', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


// LOGIN LOGIC
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        console.log('User found:', user); // Debugging log

        const isMatch = await bcrypt.compare(password, user.password);

        console.log('Password:', password); // Debugging: Log entered password
        console.log('Hashed Password:', user.password); // Debugging: Log stored hashed password
        console.log('Password Match:', isMatch); // Debugging: Log the result of password comparison
	console.log('Request Body:', req.body); // Log the request body for review

        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log('Generated Token:', token); // Debugging
	console.log('Full Name:', user.fullName);

        res.json({ token, fullName: user.fullName });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
module.exports = { signup, login };
