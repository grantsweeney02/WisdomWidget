const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/retrieveUserData", usersController.retrieveUserData);

module.exports = router;
