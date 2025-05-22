const {Router} = require("express");
const userRole = require("./userrole.js");

const router = Router();

console.log("user role router called......");

router.get("/", userRole.get);
router.get("/:id", userRole.getById);
router.post("/", userRole.create);
router.put("/:id", userRole.update);
router.delete("/:id", userRole.delete);


module.exports = router;


