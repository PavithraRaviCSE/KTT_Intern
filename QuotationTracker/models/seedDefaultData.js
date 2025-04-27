const { User, UserRole } = require('./index');  
const { encryptPassword } = require('../api/authUser'); 

async function seedDefaultData() {
    try {
        const roleCount = await UserRole.count();
        if (roleCount === 0) {
            await UserRole.bulkCreate([
                { name: 'Admin' },
                { name: 'User' },
            ]);
            console.log('Default roles inserted');
        }

        const password = await encryptPassword("admin");

        const userCount = await User.count();
        if (userCount === 0) {
            await User.create({
                name: 'Admin',
                email: 'admin@example.com',
                password: password,
                roleId: 1,  
            });
            console.log('Default admin user inserted');
        }
    } catch (error) {
        console.error('Error seeding default data:', error);
    }
}

module.exports = seedDefaultData;
