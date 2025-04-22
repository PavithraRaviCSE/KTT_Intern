const { datatype, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  });
  
  module.exports = Product;



  class items extends Model {}
items.init(
  {
  },
  {
    sequelize,

    timestamps: true,

    createdAt: false,

    updatedAt: 'updateTimestamp',
  },
);