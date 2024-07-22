const express = require("express");
const router = express.Router();
const Client = require("../models/clients");
const dotenv = require("dotenv");
const connectDB = require("../database/connect");
const bcrypt = require("bcrypt");
dotenv.config();

connectDB(process.env.MONGODB_URL).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Successful login
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
