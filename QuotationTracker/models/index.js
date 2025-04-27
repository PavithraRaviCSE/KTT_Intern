const { sequelize, DataTypes } = require('./database');
const createUserModel = require('./user');
const createUserRoleModel = require('./userrole');
const seedDefaultData = require('./seedDefaultData');

const UserRole = createUserRoleModel(sequelize, DataTypes);
const User = createUserModel(sequelize, DataTypes);



User.belongsTo(UserRole, {
    foreignKey: {
        name: 'userRoleId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
UserRole.hasMany(User, {
    foreignKey: 'userRoleId'
});

sequelize.sync({ force: false })
    .then(async () => {
        console.log('Database & tables created successfully!');
        await seedDefaultData(UserRole, User);
    })
    .catch((error) => {
        console.error('Error creating database & tables:', error);
    });

module.exports = { User, UserRole };
