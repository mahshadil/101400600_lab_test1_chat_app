const seedRooms = async () => {
    const mongoose = require('mongoose');
    const Room = require('../src/models/Room'); 

    const rooms = [
        { _id: '65c4282cd2da7d98014e622b', name: 'devops', creator: '65c410d7de4ac432d47046dc', members: [] },
        { _id: '65c4282cd2da7d98014e622c', name: 'cloud computing', creator: '65c410d7de4ac432d47046dc', members: [] },
        { _id: '65c4282cd2da7d98014e622d', name: 'covid19', creator: '65c410d7de4ac432d47046dd', members: [] },
        { _id: '65c4282cd2da7d98014e622e', name: 'sports', creator: '65c410d7de4ac432d47046dd', members: [] },
        { _id: '65c4282cd2da7d98014e622f', name: 'nodejs', creator: '65c410d7de4ac432d47046dd', members: [] },
    ];
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
    try {
        await Room.deleteMany();
        await Room.insertMany(rooms);
        console.log('All users have been successfully added');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
    mongoose.connection.close();
};

exports.seedRooms = seedRooms;
