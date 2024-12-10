// routes/queueRoutes.js
const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queueController");

// Define queue routes
router.post("/", queueController.addPatientToQueue);  // Add patient to queue
router.put("/:id", queueController.updatePatientStatus);  // Update patient status in the queue
router.get("/:id", queueController.getPatientQueue);  // Get specific patient queue
router.get("/", queueController.getAllQueueEntries);  // Get all patients in queue
router.delete("/:id", queueController.deleteQueueEntry);  // Delete patient from queue

module.exports = router;
