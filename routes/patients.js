const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Add a new patient
router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    age,
    sex,
    phone,
    email,
    medicalHistory,
  } = req.body;
  try {
    const newPatient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        dateOfBirth,
        age,
        sex,
        phone,
        email,
        medicalHistory
      },
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error });
  }
});

// View patient profile
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const patient = await prisma.patient.findMany({
      where: { id: id },
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
});

// View all patient profile
router.get("/", async (req, res) => {
  try {
    const patient = await prisma.patient.findMany();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
});

// Update patient details
router.put("/:id", async (req, res) => {
  const { firstName, lastName, dateOfBirth, phone, email, medicalHistory } =
    req.body;
  try {
    const updatedPatient = await prisma.patient.update({
      where: { id: req.params.id },
      data: { firstName, lastName, dateOfBirth, phone, email, medicalHistory },
    });
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
});

// Delete a patient
router.delete("/:id", async (req, res) => {
  try {
    await prisma.patient.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error });
  }
});

module.exports = router;
