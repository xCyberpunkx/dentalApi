const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// View all patient profile
router.get("/", async (req, res) => {
  try {
    const type = await prisma.appointmentType.findMany();
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
});

// Add a new type
router.post("/", async (req, res) => {
  const { type } = req.body;
  try {
    const newtype = await prisma.appointmentType.create({
      data: { type },
    });
    res.status(201).json(newtype);
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error });
  }
});

module.exports = router;
