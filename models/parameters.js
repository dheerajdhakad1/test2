const mongoose = require("mongoose");

const parametersSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  model: {
    type: String,
    default: "gpt-3.5-turbo",
  },
  max_tokens: {
    type: Number,
    default: 150,
  },
  temperature: {
    type: Number,
    default: 0.7,
  },
  top_p: {
    type: Number,
    default: 1.0,
  },
  n: {
    type: Number,
    default: 1,
  },
  stream: {
    type: Boolean,
    default: false,
  },
  stop: {
    type: [String],
    default: null,
  },
  presence_penalty: {
    type: Number,
    default: 0,
  },
  frequency_penalty: {
    type: Number,
    default: 0,
  },
  API_key: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Parameter", parametersSchema);
