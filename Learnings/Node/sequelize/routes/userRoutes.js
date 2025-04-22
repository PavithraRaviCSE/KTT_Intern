const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/users', auth, controller.getAllUsers);
router.put('/users/:id', auth, controller.updateUser);
router.delete('/users/:id', auth, controller.deleteUser);

module.exports = router;
