const createUserRoleModel = require('./userrole.js');
const createUserModel = require('./user.js');

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('QuotationTracker', 'postgres', 'Password', {
  host: "localhost",
  dialect: "postgres"
});

const models = {};

console.log("model index is called.........");

models.UserRole = createUserRoleModel(sequelize, DataTypes);
models.User = createUserModel(sequelize, DataTypes);

if (models.UserRole.associate) {
  models.UserRole.associate(models);
}
if (models.User.associate) {
  models.User.associate(models);
}

models.sync = async function () {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
};

module.exports = models;
