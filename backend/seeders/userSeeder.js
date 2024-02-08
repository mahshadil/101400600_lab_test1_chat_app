
const seedUsers = async () => {
    const bcrypt = require("bcryptjs");
    const mongoose = require('mongoose');
    const User = require('../src/models/User'); 

    const users = [
        { _id: '65c410d7de4ac432d47046dc', username: 'mohammadali_talaei', password: await bcrypt.hash('12345', 8) },
        { _id: '65c410d7de4ac432d47046dd', username: 'pritamworld', password: await bcrypt.hash('12345', 8) }
    ];
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
    try {
        await User.deleteMany();
        await User.insertMany(users);
    } catch (error) {
        console.error('Error seeding users:', error);
    }
    mongoose.connection.close();
};

exports.seedUsers = seedUsers;
