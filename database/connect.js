const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {});
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Throw the error to be caught in the calling code
  }
};

module.exports = connectDB;
