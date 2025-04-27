const {Sequelize,DataTypes} = require("sequelize");

const sequelize = new Sequelize('quotationtracker','postgres','1234',{
    host:"localhost",
    dialect:"postgres"
});


module.exports = {sequelize,DataTypes};
