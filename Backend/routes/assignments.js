const express = require("express");
const router = express.Router();
const assignmentsController = require("../controllers/assignmentsController");

router.post("/getAssignment", assignmentsController.getAssignment);

module.exports = router;
