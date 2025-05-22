module.exports = (sequelize, DataTypes) => {
    const QoHeader = sequelize.define('QoHeader', {
        qoNumber: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        qoDate: {
            type: DataTypes.DATE,
            allowNull: false
        }, 
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        subTotal: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        gstAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        user: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    });

    QoHeader.associate = function (models) {
        QoHeader.belongsTo(models.Customer);
        QoHeader.hasMany(models.QoDetail);
    };

    return QoHeader;
};
