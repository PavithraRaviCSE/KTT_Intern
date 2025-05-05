const express = require("express");
const controller = require("./user.js");

const router = express.Router();

console.log("user router is....... ");

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.post('/', controller.create);
router.delete('/:id', controller.delete);


module.exports = router;
