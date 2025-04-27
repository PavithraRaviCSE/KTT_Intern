const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = require('./user')(sequelize, DataTypes);
const UserRole = require('./userrole')(sequelize, DataTypes);
const seedDefaultData = require('./seedDefaultData');

User.belongsTo(UserRole);
UserRole.hasMany(User);

// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Tables created successfully');
//   })
//   .catch((err) => {
//     console.error('Unable to create tables:', err);
//   });

const models = {
    User,
    UserRole,
    seedDefaultData,
    sequelize,
    Sequelize
};

module.exports = models;
