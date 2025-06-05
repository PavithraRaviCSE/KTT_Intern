module.exports = (sequelize, DataTypes) => {
    const IdTracker = sequelize.define('IdTracker', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastNumber: {
            type: DataTypes.BIGINT, 
            defaultValue: 0
        }
    });

    return IdTracker;
};
