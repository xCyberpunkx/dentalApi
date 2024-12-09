const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const paymentRoutes = require('./routes/paymentRoutes');
const queueRoutes = require('./routes/queueRoutes');
const appointmentTypeRoutes = require("./routes/appointmentTypeRoutes");

// Route Definitions
app.use("/appointments", appointmentRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use('/payments', paymentRoutes);
app.use('/queue', queueRoutes);  // Add this route for queue
app.use("/types", appointmentTypeRoutes);  // Add the route for appointment types

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
