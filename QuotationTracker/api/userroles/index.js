const {Router} = require("express");
const userRole = require("./userrole.js");

const router = Router();

console.log("user role router called......");

router.get("/", userRole.getUserRole);
router.get("/:id", userRole.getUserRoleById);
router.post("/", userRole.addRole);

module.exports = router;
