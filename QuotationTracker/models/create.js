const models = require('./index.js');
const bcrypt = require('bcrypt');

async function setupAdmin() {
  try {
    // Create or find the role
    const [role, roleCreated] = await models.UserRole.findOrCreate({
      where: { name: 'admin' }
    });
    console.log(roleCreated ? 'Role created:' : 'Role found:', role.name);

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin", 10);

    // Create or find the user
    const [user, userCreated] = await models.User.findOrCreate({
      where: { userName: 'admin' },
      defaults: {
        firstName: "Pavithra",
        lastName: "R",
        password: hashedPassword,
        email: "admin@gmail.com",
        phone: "1234567890",
        UserRoleId: role.id // Associate user with the role
      }
    });
    console.log(userCreated ? 'User created:' : 'User found:', user.userName);

  } catch (err) {
    console.error('Error in setup:', err);
  }
}

setupAdmin();
