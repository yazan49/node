const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/save", locationController.saveLocation);

module.exports = router;
