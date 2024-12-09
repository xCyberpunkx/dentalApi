const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PatientRepository = {
    async getAllPatients() {
        return prisma.patient.findMany(
        ); // Using async for db operations
    },

    async getPatientById(id) {
        return prisma.patient.findUnique({
            where: { id: parseInt(id) },
        });
    },

    async createPatient(data) {
        return prisma.patient.create({
            data,
        });
    },

    async updatePatient(id, data) {
        return prisma.patient.update({
            where: { id: parseInt(id) },
            data,
        });
    },

    async deletePatient(id) {
        return prisma.patient.delete({
            where: { id: parseInt(id) },
        });
    },
};

module.exports = PatientRepository;
