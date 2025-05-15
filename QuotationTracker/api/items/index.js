const {Router} = require("express");
const item = require("./item.js");
const userjs = require("../users/user.js");

const router = Router();

console.log("item router called......");

router.get("/", item.get);
router.get("/:id", item.getById);
router.post("/",userjs.authUser, item.create);
router.put("/:id",userjs.authUser, item.update);
router.delete("/:id", item.delete);

module.exports = router;


