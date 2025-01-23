const sequelize = require('../config/db');
const User = require('./user');
const Customer = require('./customer');

const syncDb = async () => {
    try {
        await sequelize.sync({ force: false }); // Set `force: true` for initial sync
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = { User, Customer, syncDb };
