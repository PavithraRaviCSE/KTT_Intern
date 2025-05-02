const express = require("express");
const { authUser, authAdmin } = require("../auth.js");
const user = require("./user");

const router = express.Router();

console.log("user router is....... ");

router.get('/', authUser, user.getUser);
router.get('/:id', authUser, user.getUserById);
router.post('/login', user.login);


module.exports = router;
