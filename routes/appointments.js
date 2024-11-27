const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        appointmentType: {
          select: {
            type: true,
          },
        },
      },
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

// // Get a specific appointment
// router.get("/:id", async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   try {
//     const appointments = await prisma.appointment.findMany({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).json(appointments);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching patient's appointments", error });
//   }
// });

// // Get all appointments for a specific patient
// router.get("/patient/:id", async (req, res) => {
//   const patientId = parseInt(req.params.id, 10);
//   try {
//     const appointments = await prisma.appointment.findMany({
//       where: {
//         patientId: patientId,
//       },
//     });
//     res.status(200).json(appointments);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching patient's appointments", error });
//   }
// });

// // Create a new appointment
// router.post("/", async (req, res) => {
//   const {
//     patientId,
//     doctorId,
//     appointmentType,
//     date,
//     time,
//     additionalNotes,
//     status,
//   } = req.body;
//   try {
//     const appointment = await prisma.appointment.create({
//       data: {
//         patientId,
//         doctorId,
//         appointmentType,
//         date,
//         time,
//         additionalNotes,
//         status,
//       },
//       include: {
//         doctor: {
//           select: {
//             firstName: true,
//             lastName: true,
//           },
//         },
//       },
//     });
//     res.status(201).json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating appointment", error });
//   }
// });

// // Update appointment
// router.put("/:id", async (req, res) => {
//   const { date, time, status, doctorId, appointmentType } = req.body;
//   try {
//     const updatedAppointment = await prisma.appointment.update({
//       where: { id: parseInt(req.params.id, 10) },
//       data: { date, time, status, doctorId, appointmentType },
//     });
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating appointment", error });
//   }
// });

// // Delete appointment
// router.delete("/:id", async (req, res) => {
//   try {
//     await prisma.appointment.delete({
//       where: { id: parseInt(req.params.id, 10) },
//     });
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting appointment", error });
//   }
// });

module.exports = router;
