// src/services/patientQueueService.js
const patientQueueRepository = require("../repositories/queueRepository");

const getPatientQueue = async () => {
  return await patientQueueRepository.getPatientQueue();
};

const updatePatientQueue = async (patientQueue) => {
  return await patientQueueRepository.updatePatientQueue(patientQueue);
};

module.exports = {
  getPatientQueue,
  updatePatientQueue,
};
