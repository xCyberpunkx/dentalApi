const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queueController");

router.get("/", queueController.getAllQueue);

module.exports = router;
