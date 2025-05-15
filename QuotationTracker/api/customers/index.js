const {Router} = require("express");
const customer = require("./customer.js");

const router = Router();

console.log("customer router called......");

router.get("/", customer.get);
router.get("/:id", customer.getById);
router.post("/", customer.create);
router.put("/:id", customer.update);
router.delete("/:id", customer.delete);

module.exports = router;


