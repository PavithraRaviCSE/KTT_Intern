const jwt = require('jsonwebtoken');
const JWE_SECRET_KEY = "secretKey";

const auth = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWE_SECRET_KEY, (err, decoded) => {
            if (err) {
                reject("Invalid token");
            } else {
                resolve(decoded);
            }
        });
    });
};

const authUser = async (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Please login first.' });
    }

    try {
        const decoded = await auth(token);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'You are not logged in. Please login first.' });
    }
};

const authAdmin = async (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Please login first.' });
    }

    try {
        const decoded = await auth(token);

        if (decoded.role === 'admin') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'You do not have permission to access this resource.' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'You are not logged in. Please login first.' });
    }
};

module.exports = { authUser, authAdmin ,auth};
