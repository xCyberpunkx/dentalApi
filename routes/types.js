const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all appointment types
router.get("/", async (req, res) => {
  try {
    const appointmentTypes = await prisma.appointmentType.findMany();
    res.status(200).json(appointmentTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointment types" });
  }
});

// GET appointment type by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const appointmentType = await prisma.appointmentType.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointmentType) {
      return res.status(404).json({ error: "Appointment type not found" });
    }

    res.status(200).json(appointmentType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointment type" });
  }
});

// POST create a new appointment type
router.post("/", async (req, res) => {
  try {
    const { type } = req.body;

    // Validate required fields
    if (!type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the appointment type
    const newAppointmentType = await prisma.appointmentType.create({
      data: {
        type,
      },
    });

    res.status(201).json(newAppointmentType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create appointment type" });
  }
});

// PUT update appointment type by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    // Validate required fields
    if (!type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update the appointment type
    const updatedAppointmentType = await prisma.appointmentType.update({
      where: { id: parseInt(id) },
      data: {
        type,
      },
    });

    res.status(200).json(updatedAppointmentType);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      // Prisma error code when the appointment type is not found
      return res.status(404).json({ error: "Appointment type not found" });
    }
    res.status(500).json({ error: "Failed to update appointment type" });
  }
});

// DELETE appointment type by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the appointment type
    const deletedAppointmentType = await prisma.appointmentType.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json(deletedAppointmentType);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      // Prisma error code when the appointment type is not found
      return res.status(404).json({ error: "Appointment type not found" });
    }
    res.status(500).json({ error: "Failed to delete appointment type" });
  }
});

module.exports = router;
