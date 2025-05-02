const {Router} = require("express");
const userRole = require("./userrole.js");

const router = Router();

console.log("user role router called......");

router.get("/", userRole.getUserRole);
router.get("/:id", userRole.getUserRoleById);
router.post("/", userRole.addRole);
router.put("/:id", userRole.updateRole);
router.delete("/:id", userRole.deleteRole);


module.exports = router;
