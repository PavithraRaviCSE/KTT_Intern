module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        name: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    });

 
    return UserRole;
};
