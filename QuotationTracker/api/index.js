const express = require("express");
const path = require("path");
const router = express.Router();
const controller = require("./users/user.js");

const checkIfLoggedIn = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return next();
    }
    if (controller.auth(token)) {
        res.sendFile("index");
    }
    else {
        next();
    }
};

router.get("/", checkIfLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.get("/logout", controller.logout);
router.get("/login", checkIfLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});


router.get("/clientList", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/clientList.html"));

});
router.use("/table", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/tables.html"));
});

router.use("/users", require("./users/index.js"));
router.use("/userroles", require("./userroles/index.js"));



router.post("/login", controller.login);

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

router.get("/userlist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/userlist.html"));
});

router.get("/userrolelist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/userrolelist.html"));
});

module.exports = router;
