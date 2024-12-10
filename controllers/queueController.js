// controllers/queueController.js
const queueService = require("../services/queueService");

// Add a patient to the queue
const addPatientToQueue = async (req, res) => {
    const { patientId, status, estimatedWaitTime, arrivalTime, timeWaited, estimatedTimeToDoctor } = req.body;

    try {
        const queueEntry = await queueService.addPatientToQueue({
            patientId,
            status,
            estimatedWaitTime,
            arrivalTime,
            timeWaited,
            estimatedTimeToDoctor,
        });
        res.status(201).json(queueEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update patient status in the queue
const updatePatientStatus = async (req, res) => {
    const { status, timeWaited, estimatedTimeToDoctor } = req.body;

    try {
        const updatedQueue = await queueService.updatePatientStatusInQueue(req.params.id, {
            status,
            timeWaited,
            estimatedTimeToDoctor,
        });
        res.status(200).json(updatedQueue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View queue entry for a patient
const getPatientQueue = async (req, res) => {
    try {
        const queueEntry = await queueService.getPatientQueueById(req.params.id);
        if (!queueEntry) {
            return res.status(404).json({ message: "Queue entry not found" });
        }
        res.status(200).json(queueEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View all queue entries
const getAllQueueEntries = async (req, res) => {
    try {
        const queueEntries = await queueService.getAllQueueEntries();
        res.status(200).json(queueEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a patient from the queue
const deleteQueueEntry = async (req, res) => {
    try {
        await queueService.removePatientFromQueue(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addPatientToQueue,
    updatePatientStatus,
    getPatientQueue,
    getAllQueueEntries,
    deleteQueueEntry,
};
