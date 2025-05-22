module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        gstNumber: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1, // 1 - Active, 2 - Inactive
            allowNull: false
        }
    });

    Customer.associate = function (models) {
        Customer.hasMany(models.QoHeader);
    };

    return Customer;
};