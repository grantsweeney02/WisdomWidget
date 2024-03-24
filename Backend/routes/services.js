const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");

router.post("/openai", servicesController.openai);



module.exports = router;
