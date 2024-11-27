const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Add a new patient
// router.post("/", async (req, res) => {
//   const { firstName, lastName, dateOfBirth, phone, email, medicalHistory } =
//     req.body;
//   try {
//     const newPatient = await prisma.patient.create({
//       data: { firstName, lastName, dateOfBirth, phone, email, medicalHistory },
//     });
//     res.status(201).json(newPatient);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding patient", error });
//   }
// });

// View doctor profile
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const doctor = await prisma.doctor.findMany({
      where: { id: id },
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
});

// View all doctor profile
router.get("/", async (req, res) => {
  try {
    const doctor = await prisma.doctor.findMany();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
});

// Add a new doctor
router.post("/", async (req, res) => {
  const { firstName, lastName, specialty } = req.body;
  try {
    const newDoctor = await prisma.doctor.create({
      data: { firstName, lastName, specialty },
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error });
  }
});

module.exports = router;
