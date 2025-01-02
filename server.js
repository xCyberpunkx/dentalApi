const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const patientQueueRoutes = require("./routes/queueRoutes");
const patientQueueService = require("./services/queueService");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", patientQueueRoutes);

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let interval;

function startCountdown() {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(async () => {
    let patientQueue = await patientQueueService.getPatientQueue();
    patientQueue = patientQueue.map((queue) => ({
      ...queue,
      estimatedTimeToDoctor: Math.max(queue.estimatedTimeToDoctor - 1, 0),
    }));

    await patientQueueService.updatePatientQueue(patientQueue);

    io.emit("timeUpdate", patientQueue);

    if (patientQueue.every((queue) => queue.estimatedTimeToDoctor === 0)) {
      clearInterval(interval);
    }
  }, 1000);
}

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send initial times to the client
  socket.emit("initialTimes", patientQueue);

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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
