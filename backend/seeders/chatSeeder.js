const seedMessages = async () => {
    const mongoose = require('mongoose');
    const Message = require('../src/models/Message'); 

    const chats = [
        { message: "Hi there", room: '65c4282cd2da7d98014e622b', user: '65c410d7de4ac432d47046dc', created_at: new Date() },
        { message: "hello world", room: '65c4282cd2da7d98014e622b', user: '65c410d7de4ac432d47046dd', created_at: new Date() },
    ];
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
    try {
        await Message.insertMany(chats);
        console.log('All users successfully added');
    } catch (error) {
        console.error('Error adding users:', error);
    }
    mongoose.connection.close();
};

exports.seedMessages = seedMessages;
