const paramsModel = require('../models/ChatbotUiSchema');
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const connectDB = require("../database/connect");
dotenv.config();

// Connect to the database
connectDB(process.env.MONGODB_URL).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

// GET route to fetch the configuration
router.get('/fetch/ChatbotUi', async (req, res) => {
    try {
        let config = await paramsModel.findOne();
        if (!config) {
            config = await paramsModel.create(req.body); // Create with default or specified values
        }
        res.json(config);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST route to update the configuration
router.post('/update/ChatbotUi', async (req, res) => {
    try {
        let config = await paramsModel.findOne();
        if (!config) {
            config = new paramsModel(req.body);
        } else {
            Object.assign(config, req.body);
        }
        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;