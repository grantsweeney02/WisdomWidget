const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classesController");


router.post("/createClass", classesController.createClass);
router.post("/getClass", classesController.getClass)
router.put("/updateClass", classesController.updateClass);
router.delete("/deleteClass", classesController.deleteClass);

module.exports = router;
