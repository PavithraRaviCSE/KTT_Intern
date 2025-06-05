
const { IdTracker } = require('./index.js');


module.exports = (sequelize, DataTypes) => {
    const QoHeader = sequelize.define('QoHeader', {
        qoNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
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

    // Association setup
    QoHeader.associate = function (models) {
        QoHeader.belongsTo(models.Customer);
        QoHeader.hasMany(models.QoDetail);
    };

    //  Hook must be outside associate!
    QoHeader.beforeCreate(async (quotation, options) => {
        console.log('beforeCreate hook triggered');

        const currentYear = new Date().getFullYear();
        const prefix = 'QTN';

        const IdTracker = quotation.sequelize.models.IdTracker; // ✅ Safe access

        const [tracker] = await IdTracker.findOrCreate({
            where: { name: 'quotation' },
            defaults: { lastNumber: 0 },
            transaction: options.transaction
        });

        const nextNumber = +tracker.lastNumber + 1;
        tracker.lastNumber = nextNumber;
        await tracker.save({ transaction: options.transaction });

        const paddedNumber = String(nextNumber).padStart(4, '0');
        quotation.qoNumber = `${prefix}-${currentYear}-${paddedNumber}`;

        console.log(`Generated qoNumber: ${quotation.qoNumber}`);
    });


    return QoHeader;
};
