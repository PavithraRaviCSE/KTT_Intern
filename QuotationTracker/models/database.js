const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('QuotationTracker', 'postgres', 'Password', {
    host: "localhost",
    dialect: "postgres"
});


module.exports = {sequelize, DataTypes};
