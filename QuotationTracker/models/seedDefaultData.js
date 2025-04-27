const bcrypt = require('bcrypt');

async function seedDefaultData(UserRole, User) {
    try {
        const [adminRole, userRole] = await Promise.all([
            UserRole.findOrCreate({
                where: { name: 'Admin' },
                defaults: { name: 'Admin', status: 1 }
            }),
            UserRole.findOrCreate({
                where: { name: 'User' },
                defaults: { name: 'User', status: 1 }
            })
        ]);

        const hashedPassword = await bcrypt.hash('admin', 10); 
        const hashedPassword2 = await bcrypt.hash('user', 10); 

        const adminRoleId = adminRole[0].id;  
        const userRoleId = userRole[0].id;  

        console.log('̥*****************ADMINROLE  iD',adminRoleId, "USER ROLE ID***********************" , userRoleId );
        await User.create({
            name: 'admin',
            email: 'admin@example.com',
            password: hashedPassword, 
            phone: '9876543210',
            status: 1,
            UserRoleId: adminRoleId,  // Make sure this key matches your model's foreign key
        });

        await User.create({
            name: 'user',
            email: 'user@example.com',
            password: hashedPassword2, 
            phone: '1234567890',
            status: 1,
            UserRoleId: userRoleId,  // Make sure this key matches your model's foreign key
        });

        console.log('Seeded default data successfully!');
    } catch (error) {
        console.error('Error seeding default data:', error);
    }
}

module.exports = seedDefaultData;
