const { sequelize, DataTypes } = require('./database.js');
const createUserRoleModel = require('./userrole.js');
const createUserModel = require('./user.js');

const models = {};

models.UserRole = createUserRoleModel(sequelize, DataTypes);
models.User = createUserModel(sequelize, DataTypes);

if (models.UserRole.associate) {
  models.UserRole.associate(models);
}
if (models.User.associate) {
  models.User.associate(models);
}



models.sync = function () {
  return sequelize.sync({ force: false })
    .then(() => {
      console.log('Database synced successfully.');
    })
    .catch((err) => {
      console.error('Failed to sync database:', err);
    });
};

module.exports = models;
