const mongoose = require('mongoose');
const clients = require('./clients');
const Schema = mongoose.Schema;

// Define the schema for chatbot configuration
const ChatbotUiSchema = new Schema({
    font: {
        type: String,
        default: 'sans-serif',
        enum: ['Raleway', 'Montserrat', 'Roboto', 'Poppins', 'Martel Sans', 'Open Sans', 'sans-serif']
    },
    aiName: {
        type: String,
        default: 'PrimeBot'
    },
    startSentence: {
        type: String,
        default: 'How can I help you today?'
    },
    placeholder: {
        type: String,
        default: 'Type your message'
    },
    avatar: {
        type: String,
        default: '' // URL or base64 string
    },
    headerColor: {
        type: String,
        default: '#8987ec'
    },
    bodyColor: {
        type: String,
        default: '#d6d6d9'
    },
    footerColor: {
        type: String,
        default: '#D1D8C5'
    },
    fontColor: {
        type: String,
        default: '#000000'
    },
    msgBgBot: {
        type: String,
        default: '#3B82F6'
    },
    msgBgUser: {
        type: String,
        default: '#E0E0E0'
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});

// Create the model from the schema
const ChatbotUi = mongoose.model('ChatbotUi', ChatbotUiSchema);

module.exports = ChatbotUi;