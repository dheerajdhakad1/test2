const emailValidator = require('email-validator');
const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const connectDB = require("../database/connect");
// Email validation middleware

// Connect to the database
connectDB(process.env.MONGODB_URL).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

const validateEmailMiddleware = (req, res, next) => {
    const email = req.body.email;

    if (!email || !emailValidator.validate(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    next();
};

// Route to handle email submission
router.post('/api/submit-email', validateEmailMiddleware, async (req, res) => {
    const email = req.body.email;
    try {
        const newUser = new UserModel({ email });
        await newUser.save();
        res.status(200).json({ message: 'Email is valid and has been submitted' });
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
module.exports = router;