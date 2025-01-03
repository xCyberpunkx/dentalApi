const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const QueueRepository = {
  async getAllQueue() {
    return prisma.queue.findMany({
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    }); // Using async for db operations
  },
};

module.exports = QueueRepository;
