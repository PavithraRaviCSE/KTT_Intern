const { User } = require('../../models/index.js');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWE_SECRET_KEY = "secretKey";

const getUser = async (req, res) => {
    try {
        console.log("user model: ", User);

        const users = await User.findAll({});
        console.log(users);

        res.json(users);
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        console.log("get user error: ", error);
        return res.status(500).json({ message: "An error occurred while fetching users" });
    }
};

const getUserById = async (req, res) => {
    try {
        console.log("user model: ", User);
        const userId = req.params.id;
        const users = await User.findAll({
            where: {
                id: userId
            }
        });

        console.log(users);

        res.json(users);
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        console.log("get user error: ", error);
        return res.status(500).json({ message: "An error occurred while fetching users" });
    }
};


const login = async (req, res) => {
    console.log("login called..........");
    try {
        const { userName, password } = req.body;

        console.log("userpass: ", userName, password);

        const user = await User.findOne({
            where: { userName },
            attributes: ['userName', 'password', 'UserRoleId']
        });


        console.log('user data:   ', user);

        if (!user) {
            return res.status(401).json({ field: 'userName', message: 'username not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log("isPasswordValid", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ field: 'password', message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { id: user.id, UserRoleId: user.UserRoleId, userName: user.userName },
            JWE_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'Strict',
        });

        return res.status(200).json({
            message: 'Login successful',
            auth_token: token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' + err });
    }
};

const logout = async (req, res) => {
    try {
      res.clearCookie('auth_token', {
        httpOnly: true, 
        sameSite: 'Strict', 
        path: '/',  
      });
 
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'An error occurred during logout' });
    }
};

module.exports = {
    getUser,
    getUserById,
    login,
    logout
};
