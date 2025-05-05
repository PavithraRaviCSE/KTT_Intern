const models = require('../../models/index.js');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const JWE_SECRET_KEY = "secretKey";

auth = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWE_SECRET_KEY, (err, decoded) => {
			if (err) reject("Invalid token");
			else resolve(decoded);
		});
	});
};

exports.authUser = async (req, res, next) => {
	const token = req.cookies.auth_token;
	if (!token) return res.status(401).send({ status: false, error: 'No token provided. Please login first.' });

	try {
		const decoded = await auth(token);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).send({ status: false, error: 'You are not logged in. Please login first.' });
	}
};

exports.authAdmin = async (req, res, next) => {
	const token = req.cookies.auth_token;
	if (!token) return res.status(401).send({ status: false, error: 'No token provided. Please login first.' });

	try {
		const decoded = await auth(token);
		if (decoded.role === 'admin') {
			req.user = decoded;
			next();
		} else {
			return res.status(403).send({ status: false, error: 'You do not have permission to access this resource.' });
		}
	} catch (err) {
		return res.status(401).send({ status: false, error: 'You are not logged in. Please login first.' });
	}
};

exports.login = async (req, res) => {
	console.log("login called..........");
	try {
		const { userName, password } = req.body;

		const user = await models.User.findOne({
			where: { userName },
			attributes: ['id', 'userName', 'password', 'UserRoleId']
		});

		if (!user) return res.status(401).send({ status: false, field: 'userName', error: 'Username not found' });

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) return res.status(401).send({ status: false, field: 'password', error: 'Incorrect password' });

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

		return res.status(200).json({ status: true, message: 'Login successful', auth_token: token });

	} catch (err) {
		console.error(err);
		return res.status(500).send({ status: false, error: err.message });
	}
};

exports.logout = async (req, res) => {
	try {
		res.clearCookie('auth_token', {
			httpOnly: true,
			sameSite: 'Strict',
			path: '/',
		});
		res.status(200).json({ status: true, message: 'Logged out successfully' });
	} catch (error) {
		console.error('Error during logout:', error);
		res.status(500).send({ status: false, error: error.message });
	}
};

exports.get = async (req, res) => {
	try {
		const users = await models.User.findAll({ attributes: ['id', 'firstName', 'lastName', 'userName', 'UserRoleId', 'email', 'phone', 'status'] });
		if (!users.length) return res.status(404).send({ status: false, error: 'No users found' });

		res.status(200).json({ status: true, users });
	} catch (error) {
		console.error("get user error: ", error);
		return res.status(500).send({ status: false, error: error.message });
	}
};

exports.getById = async (req, res) => {
	try {
		const userId = req.params.id;
		const users = await models.User.findAll({ where: { id: userId } });

		if (!users.length) return res.status(404).send({ status: false, error: "No users found" });

		res.status(200).json({ status: true, users });
	} catch (error) {
		console.error("get user error: ", error);
		return res.status(500).send({ status: false, error: error.message });
	}
};
exports.create = async (req, res) => {
	try {
		const { firstName, lastName, userName, password, email, phone, UserRoleId } = req.body;

		if (!firstName || !lastName || !userName || !password || !email || !phone || !UserRoleId) {
			return res.status(400).send({ status: false, error: "All fields are required." });
		}

		const existingUser = await models.User.findOne({
			where: {
				[Op.or]: [
					{ userName: req.body.userName },
					{ email: req.body.email },
					{ phone: req.body.phone }
				]
			}
		});

		if (existingUser) {
			if (existingUser.userName === req.body.userName) {
				return res.status(409).send({ status: false, error: "Username already in use." });
			}
			if (existingUser.email === req.body.email) {
				return res.status(409).send({ status: false, error: "Email already in use." });
			}
			if (existingUser.phone === req.body.phone) {
				return res.status(409).send({ status: false, error: "Phone number already in use." });
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await models.User.create({
			firstName,
			lastName,
			userName,
			password: hashedPassword,
			email,
			phone,
			UserRoleId
		});

		console.log("passwed:", hashedPassword);

		return res.status(201).send({ status: true, message: "User created successfully", data: newUser });

	} catch (error) {
		console.error("Create user error:", error);
		return res.status(500).send({ status: false, error: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const userId = req.params.id;
		const userData = req.body;

		const user = await models.User.findByPk(userId);
		if (!user) {
			return res.status(404).send({ status: false, error: "User not found" });
		}

		if (userData.password) {
			const salt = await bcrypt.genSalt(10);
			userData.password = await bcrypt.hash(userData.password, salt);
		}

		await user.update(userData);

		return res.status(200).send({ status: true, message: "User updated successfully", data: user });
	} catch (error) {
		console.error("Update user error:", error);
		return res.status(500).send({ status: false, error: error.message });
	}
};


exports.delete = async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await models.User.findByPk(userId);
		if (!user) {
			return res.status(404).send({ status: false, error: "User not found" });
		}

		await user.destroy();

		return res.status(200).send({ status: true, message: "User deleted successfully" });
	} catch (error) {
		console.error("Delete user error:", error);
		return res.status(500).send({ status: false, error: error.message });
	}
};
