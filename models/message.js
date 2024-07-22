const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },
    sender: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    previous: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    } 
});

module.exports = mongoose.model("Message", MessageSchema);
