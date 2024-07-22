const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    time_used: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    clients: [{type: mongoose.Schema.Types.ObjectId, ref: "Client"}],
});

module.exports = mongoose.model("User", UserSchema);