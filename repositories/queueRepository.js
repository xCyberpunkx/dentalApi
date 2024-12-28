// repositories/queueRepository.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createQueueEntry = async (queueData) => {
  return prisma.queue.create({
    data: queueData,
  });
};

const updateQueueEntry = async (id, queueData) => {
  return prisma.queue.update({
    where: { id },
    data: queueData,
  });
};

const getQueueEntryById = async (id) => {
  return prisma.queue.findUnique({
    where: { id },
  });
};

const getAllQueueEntries = async () => {
  return prisma.queue.findMany();
};

const deleteQueueEntry = async (id) => {
  return prisma.queue.delete({
    where: { id },
  });
};

module.exports = {
  createQueueEntry,
  updateQueueEntry,
  getQueueEntryById,
  getAllQueueEntries,
  deleteQueueEntry,
};
