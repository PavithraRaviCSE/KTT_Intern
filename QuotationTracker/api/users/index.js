const express = require("express");
const {authUser, authAdmin} = require("../auth.js");
const { getUser, getUserById,login } = require("./user");

const router = express.Router();

console.log("user router is....... ");

router.get('/', authUser, getUser);
router.get('/:id',authUser, getUserById);
router.post('/login',login);

module.exports = router;
