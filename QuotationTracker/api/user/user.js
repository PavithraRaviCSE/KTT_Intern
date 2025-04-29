const { User } = require('../../models/index.js');
const path = require('path');
const bcrypt = require('bcrypt');


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

        const user = await User.findOne({
            where: { userName },
            attributes: ['userName', 'password','UserRoleId']
        });



        console.log('user data:   ', user);

        if (!user) {
            return res.status(401).json({ field: 'emailOrUserName', message: 'email Or UserName not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log("isPasswordValid", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ field: 'password', message: 'Incorrect password' });
        }

        // const token = jwt.sign(
        //     { id: user.id, UserRoleId: user.UserRoleId },
        //     JWT_SECRET,
        //     { expiresIn: '1h' }
        // );

        return res.status(200).json({
            message: 'Login successful',
            // token: token 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' +err});
    }
};

const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/login.html"));
}


const getIndexPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/index.html"));
}
const getUserTable = (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/userTable.html"));
}
const getUserRoleTable = (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/userRoleTable.html"));
}
const getTable = (req, res) => {
    res.sendFile(path.join(__dirname, "../../views/tables.html"));
}
module.exports = {
    getUser,
    getUserById,
    getIndexPage,
    getUserTable,
    getUserRoleTable,
    getTable,
    login,
    getLoginPage
};
