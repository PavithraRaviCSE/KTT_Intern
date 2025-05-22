const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('QuotationTracker', 'postgres', 'Password', {
  host: 'localhost',
  dialect: 'postgres',
});

const models = {};
const modelsDir = __dirname; 
console.log('Loading models dynamically...');

fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js') && file !== 'index.js')
  .forEach(file => {
    const modelPath = path.join(modelsDir, file);
    const createModel = require(modelPath);
    const model = createModel(sequelize, DataTypes);
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.sync = async function () {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');
  } catch (err) {
    console.error(' Failed to sync database:', err);
  }
};

module.exports = models;
