const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Import mongoose for ID validation
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

router.post("/fetch/chatbotConfig", async (req, res) => {
  try {
    const { client_id } = req.body;

    // Validate the client ID
    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const client = await Client.findById(client_id).populate('parameters');

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const parameters = client.parameters;
    if (!parameters) {
      return res.status(404).json({ error: "Parameters not found for the client" });
    }

    return res.status(200).json({
      max_tokens: parameters.max_tokens,
      temperature: parameters.temperature,
      top_p: parameters.top_p,
      API_key: parameters.API_key
    });

  } catch (err) {
    console.error("Error during fetching client details: ", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/update/chatbotConfig", async (req, res) => {
  try {
    const { client_id, max_tokens, temperature, top_p, API_key } = req.body;

    // Validate the client ID
    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    // Find the client by ID
    const client = await Client.findById(client_id).populate("parameters");
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Get the existing parameters or return an error if they don't exist
    let parameters = client.parameters;
    if (!parameters) {
      return res.status(404).json({ error: "Parameters not found for the client" });
    }

    // Update the existing parameters
    parameters.max_tokens = max_tokens ?? parameters.max_tokens;
    parameters.temperature = temperature ?? parameters.temperature;
    parameters.top_p = top_p ?? parameters.top_p;
    parameters.API_key = API_key ?? parameters.API_key;

    // Save the updated parameters
    await parameters.save();

    res.status(200).json({ message: "Parameters updated successfully", parameters });
  } catch (error) {
    console.error("Error updating parameters:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
