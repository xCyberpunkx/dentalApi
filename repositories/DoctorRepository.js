const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DoctorRepository = {
    async getAllDoctors() {
        return prisma.doctor.findMany({
            include: { specialty: true },  // Include related specialties
        });
    },

    async getDoctorById(id) {
        return prisma.doctor.findUnique({
            where: { id: parseInt(id) },
            include: { specialty: true },  // Include related specialties
        });
    },

    async createDoctor(data) {
        const { firstName, lastName, specialtyId } = data;

        // Ensure specialtyId is connected properly
        return prisma.doctor.create({
            data: {
                firstName,
                lastName,
                specialty: {
                    connect: { id: parseInt(specialtyId) },  // Connect specialty
                },
            },
        });
    },

    async updateDoctor(id, data) {
        const { firstName, lastName, specialtyId } = data;

        return prisma.doctor.update({
            where: { id: parseInt(id) },
            data: {
                firstName,
                lastName,
                specialty: {
                    connect: { id: parseInt(specialtyId) },  // Connect updated specialty
                },
            },
        });
    },

    async deleteDoctor(id) {
        return prisma.doctor.delete({
            where: { id: parseInt(id) },
        });
    },
};

module.exports = DoctorRepository;
