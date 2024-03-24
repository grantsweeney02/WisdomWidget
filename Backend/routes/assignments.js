const express = require("express");
const router = express.Router();
const assignmentsController = require("../controllers/assignmentsController");

router.post("/getAssignment", assignmentsController.getAssignment);
router.post("/createAssignment", assignmentsController.createAssignment);
router.post("/deleteAssignment", assignmentsController.deleteAssignment);

module.exports = router;
