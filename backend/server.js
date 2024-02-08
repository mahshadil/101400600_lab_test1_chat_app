const express = require('express');
const mongoose = require('mongoose');
const auth = require('./src/middleware/auth');
const authRoutes = require('./src/routes/authRoutes');
const roomRoutes = require('./src/routes/roomRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const PORT = process.env.PORT || 4000;
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"], 
        credentials: true 
    }
});
const cors = require('cors');
const Message = require('./src/models/Message');
const User = require('./src/models/User');


mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/chat', roomRoutes);
app.use(chatRoutes);


const router = express.Router();

router.get('/profile', auth, (req, res) => {
    res.send(req.user);
});

app.use(router);


io.on('connection', (socket) => {
    socket.on('joinRoom', ({ room }) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on('leaveRoom', ({ room }) => {
        socket.leave(room);
        console.log(`User left room ${room}`);
    });

    socket.on('typing', ({ room, username }) => {
        io.to(room).emit('typing', username );
    });

    socket.on('sendMessage', async ({ room, message, userId }) => {
        
        const user = await User.findById(userId);
        const newMessage = new Message({
            message: message,
            room: room,
            user: userId,
            username: user.username, 
        });
        await newMessage.save();

        io.to(room).emit('message', newMessage);
    });

});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
