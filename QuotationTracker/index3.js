const createUserRoleModel = require('./userrole.js');
const createUserModel = require('./user.js');
const createCustomerModel = require('./customer.js');
const createItemModel = require('./item.js');
const createQoHeaderModel = require('./qoHeader.js');
const createQoDetailModel = require('./qoDetail.js');

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('QuotationTracker', 'postgres', 'Password', {
  host: "localhost",
  dialect: "postgres"
});

const models = {};

console.log("model index is called.........");

models.UserRole = createUserRoleModel(sequelize, DataTypes);
models.User = createUserModel(sequelize, DataTypes);
models.Customer = createCustomerModel(sequelize, DataTypes);
models.Item = createItemModel(sequelize, DataTypes);
models.QoHeader = createQoHeaderModel(sequelize, DataTypes);
models.QoDetail = createQoDetailModel(sequelize, DataTypes);


Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});


models.sync = async function () {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
};

module.exports = models;
