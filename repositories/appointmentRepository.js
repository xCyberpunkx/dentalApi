const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AppointmentRepository = {
    async getAllAppointments() {
        return prisma.appointment.findMany(); // Using async for db operations
    },

    async getAppointmentById(id) {
        return prisma.appointment.findUnique({
            where: { id: parseInt(id) },
        });
    },

    async createAppointment(data) {
        return prisma.appointment.create({
            data,
        });
    },

    async updateAppointment(id, data) {
        return prisma.appointment.update({
            where: { id: parseInt(id) },
            data,
        });
    },

    async deleteAppointment(id) {
        return prisma.appointment.delete({
            where: { id: parseInt(id) },
        });
    },

    async getAppointmentsByPatientId(patientId) {
        return prisma.appointment.findMany({
            where: { patientId: parseInt(patientId) },
        });
    },
};

module.exports = AppointmentRepository;
