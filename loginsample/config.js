const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Students', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true
    }
});

module.exports = sequelize;
