const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const patientRoutes = require("./routes/patients");
const appointmentRoutes = require("./routes/appointments");
const queueRoutes = require("./routes/queue");
const paymentRoutes = require("./routes/payment");
const doctorRoutes = require("./routes/doctors");

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/queue", queueRoutes);
app.use("/payments", paymentRoutes);
app.use("/doctors", doctorRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
