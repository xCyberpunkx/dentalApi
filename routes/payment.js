const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Add a new payment
router.post("/", async (req, res) => {
  const { patientId, description, amount, doctorId, date, time, status } =
    req.body;
  try {
    const payment = await prisma.payment.create({
      data: {
        patientId,
        description,
        amount,
        doctorId,
        date,
        time,
        status,
      },
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error adding payment", error });
  }
});

// Update payment status (pending/paid)
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error });
  }
});

// View all payments
router.get("/", async (req, res) => {
  try {
    const payments = await prisma.payment.findMany();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error });
  }
});

// View payment history for a patient
router.get("/patient/:id", async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { patientId: req.params.id },
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
});

// Delete a payment entry
router.delete("/:id", async (req, res) => {
  try {
    await prisma.payment.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error });
  }
});

module.exports = router;
