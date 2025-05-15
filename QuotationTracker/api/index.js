const express = require("express");
const path = require("path");
const router = express.Router();
const controller = require("./users/user.js");


router.use("/users", require("./users/index.js"));
router.use("/userroles", require("./userroles/index.js"));
router.use("/customers", require("./customers/index.js"));
router.use("/items", require("./items/index.js"));
router.use("/qoheaders", require("./qoheaders/index.js"));
router.use("/qodetail", require("./qodetail/index.js"));



router.get("/quotationMaster", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/quotationMaster.html"));

});


router.get("/clientList", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/clientList.html"));

});
router.use("/table", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/tables.html"));
});


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.get("/logout", controller.logout);

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post("/login", controller.login);

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

router.get("/userlist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/userlist.html"));
});

router.get("/itemlist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/itemlist.html"));
});
router.get("/customerlist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/customerlist.html"));
});
router.get("/userrolelist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/userrolelist.html"));
});

module.exports = router;
