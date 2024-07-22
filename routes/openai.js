const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const connectDB = require("../database/connect");
const OpenAI = require("openai");
const Parameter = require("../models/parameters");
const Client = require("../models/clients");

// Connect to the database
connectDB(process.env.MONGODB_URL).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

// Function to get client details
async function getClientDetails(req) {
  const client_id = req.body.client_id;
  const client = await Client.findById(client_id).populate('parameters');
  if (!client) {
    return null;
  }
  return client;
}

// Route to handle OpenAI API requests
router.post("/", async (req, res) => {
  try {
    const client = await getClientDetails(req);
    if (!client) {
      return res.status(404).json({ error: "Client not found or does not exist" });
    }
    
    if (!client.parameters || !client.parameters.API_key) {
      return res.status(404).json({ error: "API key not found" });
    }

    const { API_key, temperature, max_tokens, model } = client.parameters;
    const openai = new OpenAI({ apiKey: API_key });

    const content = req.body.message;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content }],
      model,
      temperature,
      max_tokens,
    });

    console.log(completion.choices[0]);
    res.json(completion.choices[0]);
  } catch (error) {
    console.error("Error creating completion:", error);
    res.status(500).send("Error creating completion. Please check your API key or the server might be at maximum load.");
  }
});

module.exports = router;
