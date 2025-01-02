// src/routes/patientQueueRoutes.js
const express = require("express");
const patientQueueController = require("../controllers/queueController");

const router = express.Router();

router.get("/patient-queue", patientQueueController.getPatientQueue);
router.put("/patient-queue", patientQueueController.updatePatientQueue);

module.exports = router;
