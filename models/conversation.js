const mongoose = require("mongoose");

const ConversationsSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }
});

module.exports = mongoose.model("Conversation", ConversationsSchema);