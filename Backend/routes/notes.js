const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.post("/getNote", notesController.getNote);
router.post("/createNote", notesController.createNote);
router.post("/deleteNote", notesController.deleteNote);

module.exports = router;
