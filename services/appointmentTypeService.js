// src/services/appointmentTypeService.js

const appointmentTypeRepository = require("../repositories/appointmentTypeRepository");

const getAllAppointmentTypes = () => {
    return appointmentTypeRepository.getAllAppointmentTypes();
};

const getAppointmentTypeById = (id) => {
    return appointmentTypeRepository.getAppointmentTypeById(id);
};

const createAppointmentType = (type) => {
    return appointmentTypeRepository.createAppointmentType(type);
};

const updateAppointmentType = (id, type) => {
    return appointmentTypeRepository.updateAppointmentTypeById(id, type);
};

const deleteAppointmentType = (id) => {
    return appointmentTypeRepository.deleteAppointmentTypeById(id);
};

module.exports = {
    getAllAppointmentTypes,
    getAppointmentTypeById,
    createAppointmentType,
    updateAppointmentType,
    deleteAppointmentType,
};
