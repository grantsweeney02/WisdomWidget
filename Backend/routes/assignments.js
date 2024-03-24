const express = require("express");
const router = express.Router();
const assignmentsController = require("../controllers/assignmentsController");

router.get("/getAssignment", assignmentsController.getAssignment);

module.exports = router;
