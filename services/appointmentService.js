const AppointmentRepository = require("../repositories/appointmentRepository");

const AppointmentService = {
    async getAllAppointments() {
        return AppointmentRepository.getAllAppointments(); // No need for 'await' here
    },
    async getAllQueueAppointments() {
        return AppointmentRepository.getAllQueueAppointments(); // No need for 'await' here
    },

    async getAppointmentById(id) {
        return AppointmentRepository.getAppointmentById(id); // No need for 'await' here
    },

    async createAppointment(data) {
        return AppointmentRepository.createAppointment(data); // No need for 'await' here
    },

    async updateAppointment(id, data) {
        return AppointmentRepository.updateAppointment(id, data); // No need for 'await' here
    },

    async deleteAppointment(id) {
        return AppointmentRepository.deleteAppointment(id); // No need for 'await' here
    },

    async getAppointmentsByPatientId(patientId) {
        return AppointmentRepository.getAppointmentsByPatientId(patientId); // No need for 'await' here
    },
};

module.exports = AppointmentService;
