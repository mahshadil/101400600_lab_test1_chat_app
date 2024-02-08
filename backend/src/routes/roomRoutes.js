const express = require('express');
const Room = require('../models/Room');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/rooms', authMiddleware, async (req, res) => {
    try {
        const room = new Room({
            name: req.body?.name,
            description: req.body?.description,
            creator: req.user._id 
        });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: "Could not create the room", error: error.message });
    }
});


router.get('/rooms', authMiddleware, async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch rooms", error: error.message });
    }
});



module.exports = router;
