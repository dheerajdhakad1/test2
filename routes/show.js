const express = require("express");
const router = express.Router();
const Client = require("../models/clients");
const dotenv = require("dotenv");
const connectDB = require("../database/connect");

dotenv.config();

// Connect to the database
connectDB(process.env.MONGODB_URL).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

router.post("/", async (req, res) => {
  try {
    const client_id = req.body.client_id;
    const client = await Client.findById(client_id).populate('parameters');

    if (!client) {
      return res.status(404).json({ error: "Client not found or does not exist" });
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
    return res.status(500).json({ error: "The client may not exist or the server is at maximum load" });
  }
});

module.exports = router;
