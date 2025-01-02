const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPatientQueue = async () => {
  return await prisma.patientQueue.findMany();
};

const updatePatientQueue = async (patientQueue) => {
  const updates = patientQueue.map(queue => 
    prisma.patientQueue.update({
      where: { id: queue.id },
      data: { estimatedTimeToDoctor: queue.estimatedTimeToDoctor }
    })
  );
  return await prisma.$transaction(updates);
};

module.exports = {
  getPatientQueue,
  updatePatientQueue,
};