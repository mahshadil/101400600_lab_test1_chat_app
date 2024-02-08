const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    message: String,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
    username: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
