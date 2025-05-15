module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unitPrice: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        gstPercentage: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        gstAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        totalAmount:{
              type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        user: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    });

    Item.associate = function (models) {
        Item.hasMany(models.QoDetail);
    };

    return Item;
};
