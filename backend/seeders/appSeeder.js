const seedUsers = require('./userSeeder');
const seedRooms = require('./roomSeeder');
const seedMessages = require('./chatSeeder');

(async () => {
    await seedUsers.seedUsers();
    await seedRooms.seedRooms();
    await seedMessages.seedMessages();
})();
