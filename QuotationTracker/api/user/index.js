const express = require("express");
const { getUser, getUserById, getIndexPage, getUserTable, getTable, getUserRoleTable, login, getLoginPage } = require("./user");

const router = express.Router();

console.log("user router is....... ");

router.get('/login', getLoginPage);
router.post('/login', login);
router.get("/index", getIndexPage);
router.get("/userTable", getUserTable);
router.get("/userRoleTable", getUserRoleTable);
router.get("/table", getTable);

router.get("/", getUser);
router.get("/:id", getUserById);

module.exports = router;
