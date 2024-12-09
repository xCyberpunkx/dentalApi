const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AppointmentRepository = {
    async getAllAppointments() {
        return prisma.appointment.findMany({
            include: {
                doctor: {
                    select: { // Select only the doctor's first and last name
                        firstName: true,
                        lastName: true,
                    },
                },
                patient: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }, // You can also include patient details if needed
                status: true,  // Include appointment status if needed
                type: true,    // Include appointment type if needed
            },
        });
    },

    async getAppointmentById(id) {
        return prisma.appointment.findUnique({
            where: { id: parseInt(id) },
            include: {
                doctor: {
                    select: { // Select only the doctor's first and last name
                        firstName: true,
                        lastName: true,
                    },
                },
                patient: true, // Include patient details if needed
                status: true,  // Include appointment status if needed
                type: true,    // Include appointment type if needed
            },
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
            include: {
                doctor: {
                    select: { // Select only the doctor's first and last name
                        firstName: true,
                        lastName: true,
                    },
                },
                status: true, // Include appointment status if needed
                type: true,   // Include appointment type if needed
            },
        });
    },
};

module.exports = AppointmentRepository;
