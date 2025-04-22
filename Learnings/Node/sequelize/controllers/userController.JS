const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });
        res.json(user);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Username already exists' });
        }
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.login = async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.updateUser = async (req, res) => {
    await User.update({ username: req.body.username }, { where: { id: req.params.id } });
    res.json({ message: 'User updated' });
};

exports.deleteUser = async (req, res) => {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'User deleted' });
};

// create, destroy, findone, findall, update