const {Router} = require("express");
const qoDetail = require("./qoDetail.js");
const userjs = require("../users/user.js");

const router = Router();

console.log("qoDetail router called......");

router.get("/", qoDetail.get);
// router.get("/qoheader/:id", qoDetail.getByQHId);
router.get("/:id", qoDetail.getById);
router.post("/",userjs.authUser, qoDetail.create);
router.put("/:id",userjs.authUser, qoDetail.update);
router.delete("/:id", qoDetail.delete);

module.exports = router;


