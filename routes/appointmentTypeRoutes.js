// src/routes/appointmentTypeRoutes.js

const express = require("express");
const appointmentTypeController = require("../controllers/appointmentTypeController");

const router = express.Router();

// GET all appointment types
router.get("/", appointmentTypeController.getAllAppointmentTypes);

// GET appointment type by ID
router.get("/:id", appointmentTypeController.getAppointmentTypeById);

// POST create a new appointment type
router.post("/", appointmentTypeController.createAppointmentType);

// PUT update appointment type by ID
router.put("/:id", appointmentTypeController.updateAppointmentType);

// DELETE appointment type by ID
router.delete("/:id", appointmentTypeController.deleteAppointmentType);

module.exports = router;
