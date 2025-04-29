module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1 // 1 - Active, 2 - Inactive
      }
    });
  
    UserRole.associate = function(models) {
      UserRole.hasMany(models.User);
    };
  
    return UserRole;
  };
  