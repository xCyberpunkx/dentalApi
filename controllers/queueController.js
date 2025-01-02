// src/controllers/patientQueueController.js
const patientQueueService = require("../services/queueService");

const getPatientQueue = async (req, res) => {
  const patientQueue = await patientQueueService.getPatientQueue();
  res.json(patientQueue);
};

const updatePatientQueue = async (req, res) => {
  const updatedQueue = await patientQueueService.updatePatientQueue(req.body);
  res.json(updatedQueue);
};

module.exports = {
  getPatientQueue,
  updatePatientQueue,
};
