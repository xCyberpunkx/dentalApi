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

module.exports = router;
