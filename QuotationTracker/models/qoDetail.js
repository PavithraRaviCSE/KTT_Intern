module.exports = (sequelize, DataTypes) => {
    const QoDetail = sequelize.define('QoDetail', {
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
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
        discount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        user: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    });

    QoDetail.associate = function (models) {
        QoDetail.belongsTo(models.QoHeader);
        QoDetail.belongsTo(models.Item);
    };

    return QoDetail;
};
