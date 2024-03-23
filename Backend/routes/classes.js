const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classesController");


router.post("/create", classesController.createClass);
router.put("/update/:classId", classesController.updateClass);
router.delete("/delete/:classId", classesController.deleteClass);

module.exports = router;
