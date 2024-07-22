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
    const clientId = req.query.clientId; // assuming clientId is passed as a query parameter
    if (!clientId) {
        return res.status(400).json({ message: 'Client ID is required' });
    }
    try {
        let config = await paramsModel.findOne({ clientId });
        if (!config) {
            config = new paramsModel({ clientId });
            await config.save();
        }
        res.json(config);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST route to update the configuration
router.post('/update/ChatbotUi', async (req, res) => {
    const clientId = req.body.clientId; // assuming clientId is passed in the body
    if (!clientId) {
        return res.status(400).json({ message: 'Client ID is required' });
    }
    try {
        let config = await paramsModel.findOne({ clientId });
        if (!config) {
            config = new paramsModel({ ...req.body, clientId });
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