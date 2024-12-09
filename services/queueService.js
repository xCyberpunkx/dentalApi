// services/queueService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add a patient to the queue
const addPatientToQueue = async ({ patientId, status, estimatedWaitTime, arrivalTime, timeWaited, estimatedTimeToDoctor }) => {
    return prisma.queue.create({
        data: {
            patientId,
            status,
            estimatedWaitTime,
            arrivalTime,
            timeWaited,
            estimatedTimeToDoctor,
        },
    });
};

// Update patient status in the queue
const updatePatientStatusInQueue = async (id, { status, timeWaited, estimatedTimeToDoctor }) => {
    return prisma.queue.update({
        where: { id },
        data: { status, timeWaited, estimatedTimeToDoctor },
    });
};

// Get queue entry for a specific patient by ID
const getPatientQueueById = async (id) => {
    return prisma.queue.findUnique({
        where: { id },
    });
};

// Get all queue entries
const getAllQueueEntries = async () => {
    return prisma.queue.findMany();
};

// Remove a patient from the queue
const removePatientFromQueue = async (id) => {
    return prisma.queue.delete({
        where: { id },
    });
};

module.exports = {
    addPatientToQueue,
    updatePatientStatusInQueue,
    getPatientQueueById,
    getAllQueueEntries,
    removePatientFromQueue,
};
