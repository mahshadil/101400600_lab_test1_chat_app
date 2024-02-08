
const express = require('express');
const Message = require('../models/Message');
const Room = require('../models/Room');
const router = express.Router();


router.get('/rooms/:room/messages', async (req, res) => {
    try {
        const { room } = req.params;
        const messages = await Message.find({ room: room }).populate('user', 'username').sort('createdAt');
        res.json(messages);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching messages', error: error.toString() });
    }
});

router.get('/rooms/:room/name', async (req, res) => {
    try {
        const { room } = req.params;
        const messages = await Room.find({ _id: room }).sort('createdAt');
        res.json(messages);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching messages', error: error.toString() });
    }
});

module.exports = router;
