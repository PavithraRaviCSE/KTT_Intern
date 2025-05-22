const {Router} = require("express");
const quotationHeader = require("./qoheader.js");
const quotationDetail = require("../qoDetail/qoDetail.js");
const userjs = require("../users/user.js");

const router = Router();

console.log("quotationHeader router called......");

router.get("/", quotationHeader.get);
router.get("/items/:id", quotationDetail.getByQHId);
router.get("/:id", quotationHeader.getById);
router.post("/",userjs.authUser, quotationHeader.create);
router.put("/:id",userjs.authUser, quotationHeader.update);
router.delete("/:id", quotationHeader.delete);

module.exports = router;


