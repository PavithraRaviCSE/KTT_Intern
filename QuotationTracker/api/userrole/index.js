const {Router} = require("express");
const { getUserRole, getUserRoleById , getUserRoleTable} = require("./userrole.js");

const router = Router();

router.get("/userRole", getUserRole);
router.get("/userRole/:id", getUserRoleById);
router.get("/userRole/table", getUserRoleTable);

module.exports = router;
