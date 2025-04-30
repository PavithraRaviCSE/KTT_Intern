const express = require("express");
const path = require("path"); 
const {auth} = require("./auth.js");
const router = express.Router();

const checkIfLoggedIn = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return next(); 
    }
    if(auth(token)){
        res.redirect("index");
    }
    else{
        next();
    }
};

router.use("/users", require("./users/index.js"));
router.use("/userroles", require("./userroles/index.js"));
router.get("/login",checkIfLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});



router.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/userlist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/userTable.html"));
});

router.get("/userrolelist", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/userRoleTable.html"));
});

module.exports = router; 