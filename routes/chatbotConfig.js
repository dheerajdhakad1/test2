const express = require("express");
const router = express.Router();
const Parameters = require("../models/parameters");
const Client = require("../models/clients");
const dotenv = require("dotenv");
const connectDB = require("../database/connect");
dotenv.config();

// Connect to the database
connectDB(process.env.MONGODB_URL).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

// GET route to fetch the configuration
router.get("/fetch", async (req, res) => {
  const clientId = req.query.clientId; // assuming clientId is passed as a query parameter
  if (!clientId) {
    return res.status(400).json({ message: 'Client ID is required' });
  }
  try {
    let config = await Parameters.findOne({ clientId });
    if (!config) {
      config = new Parameters({ clientId });
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { client_id, max_tokens, temperature, top_p, API_key } = req.body;

    // Find the client by ID
    const client = await Client.findById(client_id).populate("parameters");
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // If parameters document doesn't exist, create a new one
    let parameters = client.parameters;
    if (!parameters) {
      parameters = new Parameters();
    }

    // Update the parameters
    parameters.max_tokens = max_tokens || parameters.max_tokens;
    parameters.temperature = temperature || parameters.temperature;
    parameters.top_p = top_p || parameters.top_p;
    parameters.API_key = API_key || parameters.API_key;

    // Save the parameters
    await parameters.save();

    // Update the client with the parameters reference if it's a new parameters document
    if (!client.parameters) {
      client.parameters = parameters._id;
      await client.save();
    }

    res.status(200).json({ message: "Parameters updated successfully", parameters });
  } catch (error) {
    console.error("Error updating parameters:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
