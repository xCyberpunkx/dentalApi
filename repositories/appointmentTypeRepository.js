// src/repositories/appointmentTypeRepository.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllAppointmentTypes = () => {
    return prisma.appointmentType.findMany();
};

const getAppointmentTypeById = (id) => {
    return prisma.appointmentType.findUnique({
        where: { id: parseInt(id) },
    });
};

const createAppointmentType = (type) => {
    return prisma.appointmentType.create({
        data: { type },
    });
};

const updateAppointmentTypeById = (id, type) => {
    return prisma.appointmentType.update({
        where: { id: parseInt(id) },
        data: { type },
    });
};

const deleteAppointmentTypeById = (id) => {
    return prisma.appointmentType.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = {
    getAllAppointmentTypes,
    getAppointmentTypeById,
    createAppointmentType,
    updateAppointmentTypeById,
    deleteAppointmentTypeById,
};
