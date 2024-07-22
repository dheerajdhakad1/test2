const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  billingInfo: {
    type: String,
    required: false,
  },
  parameters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parameter",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  users: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
});

module.exports = mongoose.model("Client", ClientSchema);
