const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let currentTime = 0;
let timerInterval;

function startCountdown() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      io.emit('timer_update', currentTime);
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send current timer state to newly connected client
  socket.emit('timer_update', currentTime);

  socket.on('start_timer', (time) => {
    currentTime = time;
    io.emit('timer_update', currentTime);
    startCountdown();
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const queueRoutes = require("./routes/queueRoutes");
const appointmentTypeRoutes = require("./routes/appointmentTypeRoutes");
// Route Definitions
app.use("/appointments", appointmentRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/payments", paymentRoutes);
app.use("/queue", queueRoutes); // Add this route for queue
app.use("/types", appointmentTypeRoutes); // Add the route for appointment types

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

