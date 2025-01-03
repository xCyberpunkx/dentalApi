const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const QueueService = require("./services/queueService");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Async function to retrieve and log all patients
async function fetchQueue() {
  try {
    queue = await QueueService.getAllQueue();
    console.log("All queue:", queue);
  } catch (error) {
    console.error("Error fetching queue:", error);
  }
}

// Call the function to fetch and log patients
fetchQueue();

let queue = [];

let interval;

function startCountdown() {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    queue = queue.map((item) => ({
      ...item,
      estimatedTimeToDoctor: Math.max(item.estimatedTimeToDoctor - 1, 0),
    }));

    io.emit("timeUpdate", queue);

    if (queue.every((item) => item.estimatedTimeToDoctor === 0)) {
      clearInterval(interval);
    }
  }, 1000);
}

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send initial times to the client
  socket.emit("initialTimes", queue);

  // Start the countdown if it's not already running
  if (!interval) {
    startCountdown();
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // If all clients disconnect, stop the countdown
    if (io.engine.clientsCount === 0) {
      clearInterval(interval);
      interval = null;
    }
  });
});

// Routes
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const queueRoutes = require("./routes/queueRoutes");
const appointmentTypeRoutes = require("./routes/appointmentTypeRoutes");

app.use("/appointments", appointmentRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/payments", paymentRoutes);
app.use("/queue", queueRoutes);
app.use("/types", appointmentTypeRoutes);

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
