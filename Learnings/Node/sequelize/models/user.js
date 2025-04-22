const { datatype, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define(
    'User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY }
}
);

const Profile = sequelize.define('Profile', {
    bio: DataTypes.STRING
});
//one to one
User.hasOne(Profile);
Profile.belongsTo(User);

//one to many
// User.hasMany(Post);
// Post.belongsTo(User);

// many to many
// Student.belongsToMany(Course, { through: 'StudentCourses' });
// Course.belongsToMany(Student, { through: 'StudentCourses' });



module.exports = User;