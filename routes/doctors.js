const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// GET all doctors with their specialties
router.get("/", async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { specialty: true }, // Include the specialty
    });
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// GET doctor by ID with specialty
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) },
      include: { specialty: true }, // Include the specialty
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
});

// POST create a new doctor
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, specialtyId } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !specialtyId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create the doctor
    const newDoctor = await prisma.doctor.create({
      data: {
        firstName,
        lastName,
        specialty: {
          connect: { id: parseInt(specialtyId) }, // Connect to existing specialty
        },
      },
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create doctor" });
  }
});

// PUT update doctor by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, specialtyId } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !specialtyId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update the doctor
    const updatedDoctor = await prisma.doctor.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        specialty: {
          connect: { id: parseInt(specialtyId) }, // Update specialty connection
        },
      },
    });

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(500).json({ error: "Failed to update doctor" });
  }
});

// DELETE doctor by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the doctor
    const deletedDoctor = await prisma.doctor.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json(deletedDoctor);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(500).json({ error: "Failed to delete doctor" });
  }
});

module.exports = router;
