const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your_jwt_secret_key';

exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ field: 'email', message: 'Email not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ field: 'password', message: 'Incorrect password' });
        }

        // const token = jwt.sign(
        //     { id: user.id, email: user.email },
        //     JWT_SECRET,
        //     { expiresIn: '1h' }
        // );

        return res.status(200).json({
            message: 'Login successful',
            // token: token 
        });

    } catch (err) {
        console.error(err); 
        return res.status(500).json({ message: 'Internal server error' });
    }
};
