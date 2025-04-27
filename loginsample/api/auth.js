const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: {username, password } });

  if (user) {
    res.send('Login successful!');
  } else {
    res.send('Invalid credentials');
  }
});

module.exports = router;
